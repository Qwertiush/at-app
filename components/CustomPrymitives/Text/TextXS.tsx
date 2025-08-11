import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import CustomText from './CustomText';

type TextXSProps = {
    children?: ReactNode;
    style?: Object;
}

const TextXS: React.FC<TextXSProps> = ({children, style}) => {
  return (
    <CustomText style={[textStyle.text, style]}>{children}</CustomText>
  )
}

const textStyle = StyleSheet.create({
  text:{
    fontSize: 12
  },
});


export default TextXS