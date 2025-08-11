import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import CustomText from './CustomText';

type TextMProps = {
    children?: ReactNode;
    style?: Object;
}

const TextM: React.FC<TextMProps> = ({children, style}) => {
  return (
    <CustomText style={[textStyle.text, style]}>{children}</CustomText>
  )
}

const textStyle = StyleSheet.create({
  text:{
    fontSize: 16
  },
});

export default TextM