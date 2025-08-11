import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import CustomText from './CustomText';

type TextXXLProps = {
    children?: ReactNode;
    style?: Object;
}

const TextXXL: React.FC<TextXXLProps> = ({children, style}) => {
  return (
    <CustomText style={[textStyle.text, style]}>{children}</CustomText>
  )
}

const textStyle = StyleSheet.create({
  text:{
    fontSize: 30
  },
});

export default TextXXL