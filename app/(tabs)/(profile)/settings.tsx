import globalStyles, { colors } from '@/app/Styles/global-styles'
import ContentContainer from '@/components/ContentContainer'
import CustomButton from '@/components/CustomButton'
import CustomIconButton from '@/components/CustomIconButton'
import CustomImage from '@/components/CustomPrymitives/CustomImage'
import LoadingComponent from '@/components/LoadingComponent'
import PickImageComponent from '@/components/PickImageComponent'
import SimpleDropdown from '@/components/SimpleDropdown'
import { usePopup } from '@/contexts/PopUpContext'
import { UserPrefsContext } from '@/contexts/UserPrefsContext'
import { languages } from '@/data/lang-data'
import { themes } from '@/data/theme-data'
import { logoutUser } from '@/firebase/firebaseAuth'
import { useAuth } from '@/hooks/useAuth'
import { router } from 'expo-router'
import React, { useContext } from 'react'
import { ScrollView, View } from 'react-native'

const Settings = () => {
  const {lang, textData, setLang, theme, themeData, setTheme} = useContext(UserPrefsContext);
  const {showPopup} = usePopup();

  const {user, loadingUser} = useAuth();

  const handleLoggingOut = () => {
    showPopup({
      title: textData.loggingOutPopup.title,
      content: textData.loggingOutPopup.content,
      onConfirm: (decison) => {
        if(decison){
          logoutUser();
        }
      }
    });
  }

  const handleChangingAvatar = () => {
    showPopup({
      title: textData.changeAvatarPopUp.title,
      content: textData.changeAvatarPopUp.content,
      childForPopUp: (
        <PickImageComponent/>
      )
    });
  }

  const handleChangingLanguage = () => {
    showPopup({
      title: textData.changeLanguagePopUp.title,
      content: textData.changeLanguagePopUp.content,
      childForPopUp: (
        <View>
          <SimpleDropdown elements={[{name:'Polski', value: 'pl'},{name:'English', value: 'en'}]} defaultValue={lang} callBack={(val)=>{setLang(val as keyof typeof languages)}}/>
        </View>
      )
    });
  }

  const handleChangingTheme = () => {
    showPopup({
      title: textData.changeThemePopUp.title,
      content: textData.changeThemePopUp.content,
      childForPopUp: (
        <View>
          <SimpleDropdown elements={textData.themesText} defaultValue={theme} callBack={(val)=>{setTheme(val as keyof typeof themes)}}/>
        </View>
      )
    });
  }

  const handleShowingInfo = () => {
    showPopup({
      title: textData.appInformationsPopUp.title,
      content: textData.appInformationsPopUp.content,
    });
  }

  if (loadingUser) return (
    <ContentContainer>
      <LoadingComponent/>
    </ContentContainer>
    );

  return (
    <ContentContainer>
      <View style={[globalStyles.textContainer, {marginTop: 60, width: '95%', height: '100%',backgroundColor: themeData.bc2}]}>
        <ScrollView>
          <View style={{width: '100%', height: '100%',}}>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' , marginBottom: 20}}>
              <CustomIconButton iconSource={require('@/assets/images/icons/arrow.png')} style={{ marginTop: 10, marginBottom: 0}} handlePress={ () => router.replace('/profile') }/>
              <CustomImage
                source={require('@/assets/images/icons/logo.png')}
                dimentions={{width: 50, height: 50}}
              />
              <CustomIconButton iconSource={require('@/assets/images/icons/log-out.png')} style={{ marginTop: 10, marginBottom: 0, backgroundColor: colors.error}} handlePress={handleLoggingOut}/>
            </View>
            <CustomButton text={textData.settingsScreen.changePicText} style={{width: '100%', marginTop: 10, marginBottom: 0}} handlePress={handleChangingAvatar}/>
            <CustomButton text={textData.settingsScreen.changeLanguageTxt} style={{width: '100%', marginTop: 10, marginBottom: 0}} handlePress={handleChangingLanguage}/>
            <CustomButton text={textData.settingsScreen.changeThemeTxt} style={{width: '100%', marginTop: 10, marginBottom: 0}} handlePress={handleChangingTheme}/>
            <CustomButton text={textData.settingsScreen.appInfoTxt} style={{width: '100%', marginTop: 10, marginBottom: 0}} handlePress={handleShowingInfo}/>
          </View>
        </ScrollView>
      </View>
    </ContentContainer>
  )
}

export default Settings