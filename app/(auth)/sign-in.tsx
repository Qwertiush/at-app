import CustomButton from '@/components/CustomButton'
import TextM from '@/components/CustomPrymitives/Text/TextM'
import TextXL from '@/components/CustomPrymitives/Text/TextXL'
import { UserPrefsContext } from '@/contexts/UserPrefsContext'
import { Link, router } from 'expo-router'
import React, { useContext, useState } from 'react'
import { Image, ImageBackground, KeyboardAvoidingView, ScrollView, View } from 'react-native'
import FormField from '../../components/CustomPrymitives/FormField'
import { loginUser } from '../../firebase/firebaseAuth'
import globalStyles from '../Styles/global-styles'

const SignIn = () => {
  const {textData, themeData} = useContext(UserPrefsContext);

  const [errorMessage, setErrorMessage] = useState<string>('');

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
      setErrorMessage('');
      router.replace('/(tabs)/home');
    }catch(error) {
      const message = error instanceof Error ? error.message : String(error);
      setErrorMessage(message);
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
              <TextXL style={{color: themeData.text1, alignSelf: 'center'}}>
                {textData.signInScreen.header}
              </TextXL>
              <Image
                source={require('@/assets/images/icons/logo.png')}
                style={{ width: 40, height: 40, alignSelf: 'center' }}
                tintColor={themeData.text1}
              />
            </View>
            {
              errorMessage != ''
            ?
              <TextM style={{color: themeData.error}}>{textData.signInScreen.errorMessage}</TextM>
            :
              <></>
            }
            <FormField title={textData.signInScreen.emailPlaceholderText} value={form.email} handleChangeText={(e)=>setForm({...form, email: e})} keyboardType="email-address" />
            <FormField title={textData.signInScreen.passwordPlaceholderText} value={form.password} handleChangeText={(e)=>setForm({...form, password: e})} keyboardType="password" />
            <CustomButton text={textData.signInScreen.button} handlePress={submitForm} isLoading={isSubmitting}/>
            <View>
              <TextM style={{color: themeData.text1, textAlign: 'center', marginTop: 20}}>{textData.signInScreen.text1}<Link href={'/sign-up'} style={{color: themeData.secondary}}>{textData.signInScreen.text2}</Link></TextM>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

export default SignIn