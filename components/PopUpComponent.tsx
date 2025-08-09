import { colors } from '@/app/Styles/global-styles';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PopUpComponent = () => {
  return (
    <View>
      <Text>PopUpComponent</Text>
    </View>
  )
}

const popUpStyle = StyleSheet.create({
  container:{
    backgroundColor: colors.secondary,
    padding: 20,
    textAlign: 'center',
    width: '80%',
    height: '40%',
    borderRadius: 15,
    position: 'absolute',
    left: 0,
    top: 0
  },
});

export default PopUpComponent