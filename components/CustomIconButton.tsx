import { colors } from '@/app/Styles/global-styles';
import React from 'react';
import { ColorValue, Image, ImageSourcePropType, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

type CustomIconButtonProps = {
    iconSource: ImageSourcePropType
    handlePress?: () => void;
    isLoading?: boolean;
    style?: ViewStyle;
    tintColor?: ColorValue;
}

const CustomIconButton: React.FC<CustomIconButtonProps> = ({iconSource, handlePress, isLoading, style, tintColor}) => {
  return (
      <TouchableOpacity 
          style={[buttonStyle.button, {opacity: isLoading ? 0.5 : 1}, style]}
          activeOpacity={0.7}
          onPress={handlePress}
          disabled={isLoading}
      >
        <Image
            source={iconSource}
            style={{ width: 30, height: 30, alignSelf: 'center' }}
            tintColor={tintColor ?? colors.text3}
        />
      </TouchableOpacity>
    )
}

const buttonStyle = StyleSheet.create({
  button:{
    backgroundColor: colors.secondary,
    padding: 10,
    alignSelf: 'center',
    borderRadius: 15,
    marginBottom: 20,
    marginTop: 20
  },
});

export default CustomIconButton