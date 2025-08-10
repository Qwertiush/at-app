import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import globalStyles from '../app/Styles/global-styles.js';

type CustomButtonProps = {
    text: string;
    handlePress?: () => void;
    isLoading?: boolean;
    style?: ViewStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({text, handlePress, isLoading, style}) => {
  const {themeData} = useContext(UserPrefsContext);
  
  return (
    <TouchableOpacity 
        style={[buttonStyle.button, {backgroundColor: themeData.secondary, opacity: isLoading ? 0.5 : 1}, style]}
        activeOpacity={0.7}
        onPress={handlePress}
        disabled={isLoading}
    >
      <Text style={[globalStyles.textM, globalStyles.centerElement,{color: themeData.buttontxt}]}>{text}</Text>
    </TouchableOpacity>
  )
}

const buttonStyle = StyleSheet.create({
  button:{
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