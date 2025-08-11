import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import React, { useContext } from 'react';
import { ColorValue, Image, ImageSourcePropType, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

type CustomIconButtonProps = {
    iconSource: ImageSourcePropType
    handlePress?: () => void;
    isLoading?: boolean;
    style?: ViewStyle;
    styleIcon?: Object;
    tintColor?: ColorValue;
}

const CustomIconButton: React.FC<CustomIconButtonProps> = ({iconSource, handlePress, isLoading, style, tintColor, styleIcon}) => {
  const {themeData} = useContext(UserPrefsContext);
  
  return (
      <TouchableOpacity 
          style={[buttonStyle.button, {backgroundColor: themeData.secondary, opacity: isLoading ? 0.5 : 1}, style]}
          activeOpacity={0.7}
          onPress={handlePress}
          disabled={isLoading}
      >
        <Image
            source={iconSource}
            style={[{ width: 30, height: 30, alignSelf: 'center' }, styleIcon]}
            tintColor={tintColor ?? themeData.buttontxt}
        />
      </TouchableOpacity>
    )
}

const buttonStyle = StyleSheet.create({
  button:{
    padding: 10,
    alignSelf: 'center',
    borderRadius: 15,
    marginBottom: 20,
    marginTop: 20
  },
});

export default CustomIconButton