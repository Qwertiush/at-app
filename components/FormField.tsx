import React from 'react';
import { ColorValue, StyleSheet, TextInput, View } from 'react-native';
import globalStyles, { colors } from '../app/Styles/global-styles.js';

type FormFieldProps = {
    title: string;
    value: string;
    handleChangeText: (text: string) => void;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'password';
    multiline?: boolean;
    style?: object;
    styleText?: object;
    placeHolderColor?: ColorValue
}

const FormField: React.FC<FormFieldProps> = ({title,value,handleChangeText,keyboardType, multiline, style, styleText, placeHolderColor}) => {
  return (
    <View style={[FormFieldStyle.input, style]}>
      <TextInput
        style={[globalStyles.textM, {color: colors.text1}, styleText]}
        value={value}
        onChangeText={handleChangeText}
        secureTextEntry={keyboardType === 'password'}
        autoCapitalize="none"
        placeholder={title}
        placeholderTextColor={placeHolderColor ? placeHolderColor : colors.text2}
        multiline={multiline}
      />
    </View>
  )
}

const FormFieldStyle = StyleSheet.create({
  input:{
    backgroundColor: colors.bc2,
    padding: 10,
    textAlign: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 20
  }
});

export default FormField