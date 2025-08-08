import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import { User } from '@/models/User';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import globalStyles, { colors } from '../Styles/global-styles';
import { registerUser } from '../firebase/firebaseAuth';
import { createUserProfile } from '../firebase/firebaseDB';

const SignUp = () => {
  const [form, setForm] = useState({
    email:'',
    username:'',
    password:''
  })

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = () => {
    signUp();
  }

  const signUp = async () => {
    setIsSubmitting(true);
    try{
      const response = await registerUser(form.email, form.password);
      const firebaseuser = response.user;

      const user: User ={
        uid: firebaseuser.uid,
        username: form.username,
        email: form.email,
        avatarUrl: ''
      }

      createUserProfile(user);

      alert('Sign up successful');
      router.push('/sign-in');
    }catch(error) {
      alert('Sign up failed: ' + error);
    }finally{
      setIsSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={globalStyles.container}>
      <ScrollView>
        <View style={globalStyles.centeredV}>
          <Image
            source={require('../../assets/images/icons/logo.png')}
            style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 50 }}
          />
          <Text style={globalStyles.textXL}>Sign up for <Text style={{color: colors.secondary}}>AT</Text> account</Text>
          <FormField title='Email' value={form.email} handleChangeText={(e)=>setForm({...form, email: e})} keyboardType="email-address" />
            <FormField title='Username' value={form.username} handleChangeText={(e)=>setForm({...form, username: e})} keyboardType="default" />
          <FormField title='Password' value={form.password} handleChangeText={(e)=>setForm({...form, password: e})} keyboardType="password" />
          <CustomButton text='Sign Up' handlePress={submitForm} isLoading={isSubmitting}/>
          <View>
            <Text style={globalStyles.textM}>Arleady have an account? <Link href={'/sign-in'} style={{color: colors.secondary}}>Log In</Link></Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignUp