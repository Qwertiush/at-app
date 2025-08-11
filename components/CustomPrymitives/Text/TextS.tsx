import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import CustomText from './CustomText';

type TextSProps = {
    children?: ReactNode;
    style?: Object;
}

const TextS: React.FC<TextSProps> = ({children, style}) => {
  return (
    <CustomText style={[textStyle.text, style]}>{children}</CustomText>
  )
}

const textStyle = StyleSheet.create({
  text:{
    fontSize: 14
  },
});


export default TextS