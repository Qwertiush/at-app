import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import CustomText from './CustomText';

type TextXLProps = {
    children?: ReactNode;
    style?: Object;
}

const TextXL: React.FC<TextXLProps> = ({children, style}) => {
  return (
    <CustomText style={[textStyle.text, style]}>{children}</CustomText>
  )
}

const textStyle = StyleSheet.create({
  text:{
    fontSize: 20
  },
});


export default TextXL