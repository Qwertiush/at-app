import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Image, KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'
import FormField from '../../components/FormField'
import globalStyles, { colors } from '../Styles/global-styles'
import { loginUser } from '../firebase/firebaseAuth'

const SignIn = () => {
  const [form, setForm] = useState({
    email:'',
    password:''
  })

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = () => {
    console.log('Form submitted:', form);
    signIn();
  }

  const signIn = async ()=>{
    setIsSubmitting(true);
    try{
      const response = await loginUser(form.email, form.password);
      console.log(response);
      router.push('/(tabs)/home');
    }catch(error) {
      console.error('Error signing in:', error);
      alert('X( Sign in failed: ' + error);
    }finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View style={globalStyles.container}>
      <KeyboardAvoidingView behavior='padding'>
      <ScrollView>
        <View style={globalStyles.centeredV}>
          <Image
            source={require('../../assets/images/icons/logo.png')}
            style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 50 }}
          />
          <Text style={globalStyles.textXL}>Log in <Text style={{color: colors.secondary}}>AT</Text></Text>
          <FormField title='Email' value={form.email} handleChangeText={(e)=>setForm({...form, email: e})} keyboardType="email-address" />
          <FormField title='Password' value={form.password} handleChangeText={(e)=>setForm({...form, password: e})} keyboardType="password" />
          <CustomButton text='Log In' handlePress={submitForm} isLoading={isSubmitting}/>
          <View>
            <Text style={globalStyles.textM}>Don't have an account? <Link href={'/sign-up'} style={{color: colors.secondary}}>Sign Up</Link></Text>
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default SignIn