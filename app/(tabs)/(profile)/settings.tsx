import { logoutUser } from '@/app/firebase/firebaseAuth'
import globalStyles, { colors } from '@/app/Styles/global-styles'
import ContentContainer from '@/components/ContentContainer'
import CustomButton from '@/components/CustomButton'
import CustomIconButton from '@/components/CustomIconButton'
import { usePopup } from '@/contexts/PopUpContext'
import { UserPrefsContext } from '@/contexts/UserPrefsContext'
import React, { useContext } from 'react'
import { Image, ScrollView, View } from 'react-native'

const Settings = () => {
  const {textData} = useContext(UserPrefsContext);
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
      title: "Error",
      content: "Not implemented yet",
    });
  }

  const handleChangingLanguage = () => {
    showPopup({
      title: "Error",
      content: "Not implemented yet",
    });
  }

  return (
    <ContentContainer style={globalStyles.container}>
      <View style={[globalStyles.textContainer, {marginTop: 60, width: '90%', height: '100%'}]}>
        <ScrollView>
          <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
            <Image
              source={require('@/assets/images/icons/logo.png')}
              style={{ width: 50, height: 50, alignSelf: 'center' }}
            />
            <CustomButton text={textData.settingsScreen.changePicText} style={{width: '100%', marginTop: 10, marginBottom: 0}} handlePress={handleChangingAvatar}/>
            <CustomButton text={textData.settingsScreen.changeLanguageTxt} style={{width: '100%', marginTop: 10, marginBottom: 0}} handlePress={handleChangingLanguage}/>
            <CustomIconButton iconSource={require('@/assets/images/icons/log-out.png')} style={{ marginTop: 10, marginBottom: 0, backgroundColor: colors.error}} handlePress={handleLoggingOut}/>
          </View>
        </ScrollView>
      </View>
    </ContentContainer>
  )
}

export default Settings