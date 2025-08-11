import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import React, { ReactNode, useContext } from 'react';
import { StyleSheet, Text } from 'react-native';

type CustomTextProps = {
    children?: ReactNode;
    style?: Object;
}

const CustomText: React.FC<CustomTextProps> = ({children, style}) => {
  const {themeData} = useContext(UserPrefsContext);
  return (
    <Text 
      style={[
        textStyle.text,
        {color: themeData.text1}, 
        style
    ]}>
      {children}
    </Text>
  )
}
const textStyle = StyleSheet.create({
  text:{
    fontFamily: 'Helvetica',
  },
});

export default CustomText