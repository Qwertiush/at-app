import { logoutUser } from '@/app/firebase/firebaseAuth'
import globalStyles, { colors } from '@/app/Styles/global-styles'
import ContentContainer from '@/components/ContentContainer'
import CustomButton from '@/components/CustomButton'
import CustomIconButton from '@/components/CustomIconButton'
import SimpleDropdown from '@/components/SimpleDropdown'
import { usePopup } from '@/contexts/PopUpContext'
import { UserPrefsContext } from '@/contexts/UserPrefsContext'
import { languages } from '@/data/lang-data'
import { themes } from '@/data/theme-data'
import React, { useContext } from 'react'
import { Image, ScrollView, View } from 'react-native'

const Settings = () => {
  const {lang, textData, setLang, theme, themeData, setTheme} = useContext(UserPrefsContext);
  const {showPopup} = usePopup();

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
      childForPopUp:(
        <View>
          <CustomButton text={textData.changeAvatarPopUp.button}/>
        </View>
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

  return (
    <ContentContainer style={globalStyles.container}>
      <View style={[globalStyles.textContainer, {marginTop: 60, width: '90%', height: '100%',backgroundColor: themeData.bc2}]}>
        <ScrollView>
          <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
            <Image
              source={require('@/assets/images/icons/logo.png')}
              style={{ width: 50, height: 50, alignSelf: 'center' }}
              tintColor={themeData.text1}
            />
            <CustomButton text={textData.settingsScreen.changePicText} style={{width: '100%', marginTop: 10, marginBottom: 0}} handlePress={handleChangingAvatar}/>
            <CustomButton text={textData.settingsScreen.changeLanguageTxt} style={{width: '100%', marginTop: 10, marginBottom: 0}} handlePress={handleChangingLanguage}/>
            <CustomButton text={textData.settingsScreen.changeThemeTxt} style={{width: '100%', marginTop: 10, marginBottom: 0}} handlePress={handleChangingTheme}/>
            <CustomIconButton iconSource={require('@/assets/images/icons/log-out.png')} style={{ marginTop: 10, marginBottom: 0, backgroundColor: colors.error}} handlePress={handleLoggingOut}/>
          </View>
        </ScrollView>
      </View>
    </ContentContainer>
  )
}

export default Settings