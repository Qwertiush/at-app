import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import React, { useContext } from 'react';
import { DimensionValue, Image, ImageSourcePropType, StyleSheet, ViewStyle } from 'react-native';

type CustomImageProps ={
    source: ImageSourcePropType;
    dimentions: {width: DimensionValue, height: DimensionValue};
    style?: ViewStyle;
}

const CustomImage: React.FC<CustomImageProps> = ({source, dimentions, style}) => {
  const {themeData} = useContext(UserPrefsContext);
  
  return (
    <Image
        source={source}
        style={[imageStyle.image,{width: dimentions.width, height: dimentions.height}, style]}
        tintColor={themeData.text1}
    />
  )
}

const imageStyle = StyleSheet.create({
  image:{

  },
});

export default CustomImage