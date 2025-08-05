import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import globalStyles, { colors } from '../app/Styles/global-styles.js';

type CustomButtonProps = {
    text: string;
    handlePress?: () => void;
    isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({text, handlePress, isLoading}) => {
  return (
    <TouchableOpacity 
        style={[buttonStyle.button, {opacity: isLoading ? 0.5 : 1}]}
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
    width: '80%',
    alignSelf: 'center',
    borderRadius: 15,
    marginBottom: 20,
    marginTop: 20
  },
});

export default CustomButton