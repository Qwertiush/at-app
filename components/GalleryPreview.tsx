import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import { ImageBackground } from 'expo-image';
import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import CustomImage from './CustomPrymitives/CustomImage';

type GalleryPreviewProps = {
    pictures: string[];
    onRemovePicture: (id: number) => void;
}

const GalleryPreview: React.FC<GalleryPreviewProps> = ({pictures, onRemovePicture}) => {
  const {themeData} = useContext(UserPrefsContext);

  return (
    <View style={[styles.container, {backgroundColor: themeData.bc}]}>
        {pictures.map((pic, index) => {
            console.log(pic);
           return (
            <ImageBackground
                key={index}
                source={{uri: pic}}
                style={{width: 80, height: 80}}
                imageStyle={{borderRadius: 20}}
            >
                <TouchableOpacity style={styles.button} onPress={() => onRemovePicture(index)}>
                    <CustomImage source={require('@/assets/images/icons/delete.png')} dimentions={{width: '40%', height: '40%'}} style={{backgroundColor: themeData.overlay,borderRadius: 20}}/>
                </TouchableOpacity>
            </ImageBackground>)
        })}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    height: 100,
    padding: 10,
    alignSelf: 'center',
    borderRadius: 20,
  },
  button:{
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 5,
  }
});

export default GalleryPreview