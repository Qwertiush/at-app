import CustomButton from '@/components/CustomButton'
import { UserPrefsContext } from '@/contexts/UserPrefsContext'
import { Link, router } from 'expo-router'
import React, { useContext, useState } from 'react'
import { Image, ImageBackground, KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'
import FormField from '../../components/FormField'
import globalStyles from '../Styles/global-styles'
import { loginUser } from '../firebase/firebaseAuth'

const SignIn = () => {
  const {textData, themeData} = useContext(UserPrefsContext);

  const [form, setForm] = useState({
    email:'',
    password:''
  })

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = () => {
    signIn();
  }

  const signIn = async ()=>{
    setIsSubmitting(true);
    try{
      const response = await loginUser(form.email, form.password);
      router.push('/(tabs)/home');
    }catch(error) {
      console.error('Error signing in:', error);
      alert('X( Sign in failed: ' + error);
    }finally {
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
                {textData.signInScreen.header}
              </Text>
              <Image
                source={require('@/assets/images/icons/logo.png')}
                style={{ width: 40, height: 40, alignSelf: 'center' }}
                tintColor={themeData.text1}
              />
            </View>
            <FormField title={textData.signInScreen.emailPlaceholderText} value={form.email} handleChangeText={(e)=>setForm({...form, email: e})} keyboardType="email-address" />
            <FormField title={textData.signInScreen.passwordPlaceholderText} value={form.password} handleChangeText={(e)=>setForm({...form, password: e})} keyboardType="password" />
            <CustomButton text={textData.signInScreen.button} handlePress={submitForm} isLoading={isSubmitting}/>
            <View>
              <Text style={[globalStyles.textM,{color: themeData.text1}]}>{textData.signInScreen.text1}<Link href={'/sign-up'} style={{color: themeData.secondary}}>{textData.signInScreen.text2}</Link></Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

export default SignIn