import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import globalStyles, { colors } from '../app/Styles/global-styles.js';

type FormFieldProps = {
    title: string;
    value: string;
    handleChangeText: (text: string) => void;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'password';
    multiline?: boolean;
    style?: object;
}

const FormField: React.FC<FormFieldProps> = ({title,value,handleChangeText,keyboardType, multiline, style}) => {
  return (
    <View style={FormFieldStyle.input}>
      <TextInput
        style={[globalStyles.textM, {color: colors.text3}, style]}
        value={value}
        onChangeText={handleChangeText}
        secureTextEntry={keyboardType === 'password'}
        autoCapitalize="none"
        placeholder={`Enter your ${title.toLowerCase()}`}
        placeholderTextColor={colors.bc}
        multiline={multiline}
      />
    </View>
  )
}

const FormFieldStyle = StyleSheet.create({
  input:{
    backgroundColor: colors.base,
    padding: 10,
    textAlign: 'center',
    width: '80%',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 20
  },
});

export default FormField