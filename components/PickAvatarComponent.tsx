import { usePopup } from '@/contexts/PopUpContext'
import { UserPrefsContext } from '@/contexts/UserPrefsContext'
import { removeImageFromCloudinary, updateUsersAvatar, uploadImageToCloudinary } from '@/firebase/firebaseDB'
import { useAuth } from '@/hooks/useAuth'
import * as ImagePicker from 'expo-image-picker'
import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import CustomIconButton from './CustomIconButton'
import CustomImage from './CustomPrymitives/CustomImage'
import LoadingComponent from './LoadingComponent'
import PickImageComponent from './PickImageComponent'

const PickAvatarComponent = () => {
  const {user} = useAuth();
  const {themeData} = useContext(UserPrefsContext);
  const {showPopup, hidePopup} = usePopup();

  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(null);

  //TODO reload popupa
  const uploadPhoto = async () => {
    try{
      showPopup({
          title: 'no need',
          content: 'for that',
          clear: true,
          childForPopUp: <View style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' }}><LoadingComponent/></View>
      });

      if (!image || image.canceled || !image.assets || image.assets.length === 0) {
        console.log('Image not picked...');
        return;
      }

      const uri = image.assets[0].uri;

      hidePopup();

      removeImageFromCloudinary(user?.avatarUrl || '');
      const picUrl = await uploadImageToCloudinary(uri);


      if(!user){
        console.error('User not found, cannot update avatar');
        return;
      }

      updateUsersAvatar(user.uid, picUrl);
      
      hidePopup();
      showPopup({
          title: 'Pic added',
          content: 'It is good.',
      });
    }catch(e){
      hidePopup();
      console.error('Error uploading photo: ', e);
      showPopup({
          title: 'Pic not added',
          content: 'It is not good.',
      });
    }
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