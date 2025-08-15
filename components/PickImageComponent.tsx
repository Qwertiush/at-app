import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import CustomIconButton from './CustomIconButton'

type PickImageComponentProps ={
  setPhoto: (pic: ImagePicker.ImagePickerResult) => void;
}

const PickImageComponent: React.FC<PickImageComponentProps>= ({setPhoto}) => {
  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(null);
  
  const pickPhoto = async () => {
    setImage(null);
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

      setImage(result);
      setPhoto(result)
    }
  };

  return (
      <CustomIconButton
        iconSource={require('@/assets/images/icons/camera.png')}
        handlePress={pickPhoto}
      />
  )
}

export default PickImageComponent