import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import globalStyles, { colors } from '../app/Styles/global-styles.js';

type CustomButtonProps = {
    text: string;
    handlePress?: () => void;
    isLoading?: boolean;
    style?: ViewStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({text, handlePress, isLoading, style}) => {
  return (
    <TouchableOpacity 
        style={[buttonStyle.button, {opacity: isLoading ? 0.5 : 1}, style]}
        activeOpacity={0.7}
        onPress={handlePress}
        disabled={isLoading}
    >
      <Text style={[globalStyles.textM, globalStyles.centerElement,{color: colors.text3}]}>{text}</Text>
    </TouchableOpacity>
  )
}

const buttonStyle = StyleSheet.create({
  button:{
    backgroundColor: colors.secondary,
    padding: 20,
    textAlign: 'center',
    minWidth: '40%',
    alignSelf: 'center',
    borderRadius: 15,
    marginBottom: 20,
    marginTop: 20
  },
});

export default CustomButton