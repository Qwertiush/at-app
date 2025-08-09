import CustomButton from '@/components/CustomButton'
import { UserPrefsContext } from '@/contexts/UserPrefsContext'
import { Link, router } from 'expo-router'
import React, { useContext, useState } from 'react'
import { Image, KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'
import FormField from '../../components/FormField'
import globalStyles, { colors } from '../Styles/global-styles'
import { loginUser } from '../firebase/firebaseAuth'

const SignIn = () => {
  const {textData} = useContext(UserPrefsContext);

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
    <KeyboardAvoidingView behavior='padding' style={[globalStyles.container, {backgroundColor: colors.bc}]}>
      <ScrollView>
        <View style={globalStyles.centeredV}>
          <Image
            source={require('../../assets/images/icons/logo.png')}
            style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 50 }}
          />
          <Text style={globalStyles.textXL}>
            {textData.signInScreen.header}
            <Image
              source={require('../../assets/images/icons/logo.png')}
              style={{ width: 30, height: 30, alignSelf: 'center'}}
            />
          </Text>
          <FormField title={textData.signInScreen.emailPlaceholderText} value={form.email} handleChangeText={(e)=>setForm({...form, email: e})} keyboardType="email-address" />
          <FormField title={textData.signInScreen.passwordPlaceholderText} value={form.password} handleChangeText={(e)=>setForm({...form, password: e})} keyboardType="password" />
          <CustomButton text={textData.signInScreen.button} handlePress={submitForm} isLoading={isSubmitting}/>
          <View>
            <Text style={globalStyles.textM}>{textData.signInScreen.text1}<Link href={'/sign-up'} style={{color: colors.secondary}}>{textData.signInScreen.text2}</Link></Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignIn