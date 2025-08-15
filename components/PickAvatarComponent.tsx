import { usePopup } from '@/contexts/PopUpContext'
import { UserPrefsContext } from '@/contexts/UserPrefsContext'
import * as ImagePicker from 'expo-image-picker'
import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import CustomIconButton from './CustomIconButton'
import CustomImage from './CustomPrymitives/CustomImage'
import PickImageComponent from './PickImageComponent'

const PickAvatarComponent = () => {
  const {themeData} = useContext(UserPrefsContext);
  const {showPopup, hidePopup} = usePopup();

  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(null);

  //TODO reload popupa
  const uploadPhoto = () => {
    if (!image || image.canceled || !image.assets || image.assets.length === 0) {
      console.log('Image not picked...');
      return;
    }

    const uri = image.assets[0].uri;
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
        <PickImageComponent setPhoto={setImage}/>
        {
        image?.assets ?
        <View style={{width: '100%', alignItems: 'center'}}>
            <CustomImage source={{ uri: image.assets[0].uri}} dimentions={{width: 150, height: 150}} removeTint={true} style={{borderRadius: 100, borderWidth: 5, borderColor: themeData.secondary}}/>
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

export default PickAvatarComponent