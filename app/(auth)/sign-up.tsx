import CustomButton from '@/components/CustomButton';
import FormField from '@/components/CustomPrymitives/FormField';
import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import { User } from '@/models/User';
import { Link, router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import { registerUser } from '../../firebase/firebaseAuth';
import { createUserProfile } from '../../firebase/firebaseDB';
import globalStyles from '../Styles/global-styles';

const SignUp = () => {
  const {textData, themeData} = useContext(UserPrefsContext);

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
    <KeyboardAvoidingView behavior='padding' style={[globalStyles.container, {backgroundColor: themeData.bc}]}>
      <ImageBackground
        style={globalStyles.container}
        source={require('@/assets/images/bc1.png')}
        tintColor={themeData.text1}
      >
        <ScrollView>
          <View style={globalStyles.centeredV}>
            <Image
              source={require('../../assets/images/icons/logo.png')}
              style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 50 }}
              tintColor={themeData.text1}
            />
            <View style={{flexDirection: 'row'}}>
              <Text style={[globalStyles.textXL,{color: themeData.text1, alignSelf: 'center'}]}>
                {textData.signUpScreen.header1}
              </Text>
              <Image
                source={require('@/assets/images/icons/logo.png')}
                style={{ width: 40, height: 40, alignSelf: 'center' }}
                tintColor={themeData.text1}
              />
              <Text style={[globalStyles.textXL,{color: themeData.text1, alignSelf: 'center'}]}>
                {textData.signUpScreen.header2}
              </Text>
            </View>
            <FormField title={textData.signUpScreen.emailPlaceholderText} value={form.email} handleChangeText={(e)=>setForm({...form, email: e})} keyboardType="email-address" />
              <FormField title={textData.signUpScreen.usernamePlaceholderText} value={form.username} handleChangeText={(e)=>setForm({...form, username: e})} keyboardType="default" />
            <FormField title={textData.signUpScreen.passwordPlaceholderText} value={form.password} handleChangeText={(e)=>setForm({...form, password: e})} keyboardType="password" />
            <CustomButton text={textData.signUpScreen.button} handlePress={submitForm} isLoading={isSubmitting}/>
            <View>
              <Text style={[globalStyles.textM,{color: themeData.text1}]}>{textData.signUpScreen.text1}<Link href={'/sign-in'} style={{color: themeData.secondary}}>{textData.signUpScreen.text2}</Link></Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

export default SignUp