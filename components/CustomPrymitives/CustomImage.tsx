import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import React, { useContext } from 'react';
import { DimensionValue, Image, ImageSourcePropType, StyleSheet, ViewStyle } from 'react-native';

type CustomImageProps ={
    source: ImageSourcePropType;
    dimentions: {width: DimensionValue, height: DimensionValue};
    style?: ViewStyle;
    removeTint?: boolean;
}

const CustomImage: React.FC<CustomImageProps> = ({source, dimentions, style, removeTint}) => {
  const {themeData} = useContext(UserPrefsContext);
  
  return (
    <Image
        source={source}
        style={[imageStyle.image,{width: dimentions.width, height: dimentions.height}, style]}
        tintColor={removeTint ? undefined : themeData.text1}
    />
  )
}

const imageStyle = StyleSheet.create({
  image:{

  },
});

export default CustomImage