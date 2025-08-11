import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import React, { useContext } from 'react';
import { ColorValue, StyleSheet, TextInput } from 'react-native';

type FormFieldProps = {
    title: string;
    value: string;
    handleChangeText: (text: string) => void;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'password';
    multiline?: boolean;
    style?: object;
    placeHolderColor?: ColorValue
}

const FormField: React.FC<FormFieldProps> = ({title,value,handleChangeText,keyboardType, multiline, style, placeHolderColor}) => {
  const {themeData} = useContext(UserPrefsContext);
  
  return (
      <TextInput
        style={[FormFieldStyle.input, {color: themeData.text1,backgroundColor: themeData.bc2}, style]}
        value={value}
        onChangeText={handleChangeText}
        secureTextEntry={keyboardType === 'password'}
        autoCapitalize="none"
        placeholder={title}
        placeholderTextColor={placeHolderColor ? placeHolderColor : themeData.text2}
        multiline={multiline}
      />
  )
}

const FormFieldStyle = StyleSheet.create({
  input:{
    padding: 10,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 20,
    fontSize: 16,
  }
});

export default FormField