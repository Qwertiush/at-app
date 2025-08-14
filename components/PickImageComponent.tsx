import { usePopup } from '@/contexts/PopUpContext'
import { UserPrefsContext } from '@/contexts/UserPrefsContext'
import * as ImagePicker from 'expo-image-picker'
import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import CustomIconButton from './CustomIconButton'
import CustomImage from './CustomPrymitives/CustomImage'

const PickImageComponent = () => {
  const {themeData} = useContext(UserPrefsContext);
  const {showPopup, hidePopup} = usePopup();

  const [avatar, setAvatar] = useState<ImagePicker.ImagePickerResult | null>(null);
  
  const pickPhoto = async () => {
    setAvatar(null);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
    alert('App need acces to photos in order to change avatar.');
    return;
  }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], // lub 'videos'
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log('Wybrany plik:', uri);

      setAvatar(result);
    }
  };
  //TODO reload popupa
  const uploadPhoto = () => {
    if (!avatar || avatar.canceled || !avatar.assets || avatar.assets.length === 0) {
      console.log('Image not picked...');
      return;
    }

    const uri = avatar.assets[0].uri;
    console.log('Uploading photo to ... ' + uri);

    hidePopup();

    showPopup({
        title: 'Pic not changed yet',
        content: 'but will be',
    });

    // upload
  };

  return (
    <View style={{width: '100%'}}>
        <CustomIconButton
            iconSource={require('@/assets/images/icons/camera.png')}
            handlePress={pickPhoto}
        />
        {
        avatar?.assets ?
        <View style={{width: '100%', alignItems: 'center'}}>
            <CustomImage source={{ uri: avatar.assets[0].uri}} dimentions={{width: 150, height: 150}} removeTint={true} style={{borderRadius: 70, borderWidth: 5, borderColor: themeData.secondary}}/>
            <CustomIconButton
            iconSource={require('@/assets/images/icons/create.png')}
            handlePress={uploadPhoto}
            />
        </View>
        :
            <></>
        }
    </View>
  )
}

export default PickImageComponent