import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import { ImageBackground } from 'expo-image';
import React, { useContext, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

type GalleryComponentProps ={
    images:  string[];
}

const GalleryComponent: React.FC<GalleryComponentProps> = ({images}) => {
  const {themeData} = useContext(UserPrefsContext);

  const [image, setImage] = useState<number>(0);

  const handleGoLeft = () => {
    if(images.length <= 1) return;

    if(image == 0){
        setImage(images.length - 1)
    }
    else{
        setImage(image - 1);
    }
  }

  const handleGoRight = () => {
    if(images.length <= 1) return;

    if(image == images.length - 1){
        setImage(0)
    }
    else{
        setImage(image + 1);
    }
  }

  return (
    <View style={[styles.container,{boxShadow: `0 0 10px 5px ${themeData.secondary}`,flexDirection: 'row'}]}>
        {
        images[image] 
        ?
        <ImageBackground
            source={{uri: images[image]}}
            style={styles.image}
            imageStyle={{ borderRadius: 20 }}
        >
            <TouchableOpacity style={styles.button} onPress={handleGoLeft}/>
            <TouchableOpacity style={styles.button} onPress={handleGoRight}/>
        </ImageBackground>
        :
        <Image
            source={require('@/assets/images/picturePlaceholder.png')}
            style={{width: '100%', height: '100%', borderRadius: 20}}
        />
        }
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 10,
        width: '90%',
        height: 400,
        borderRadius: 20,
    },
    image:{
        width: '100%', 
        height: '100%', 
        flexDirection: 'row',
    },
    button:{
        width: '50%'
    }
});

export default GalleryComponent