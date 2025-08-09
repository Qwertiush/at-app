import globalStyles from '@/app/Styles/global-styles';
import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import React, { useContext } from 'react';
import { Text, View } from 'react-native';

const LoadingComponent = () => {
  const {textData} = useContext(UserPrefsContext);

  return (
    <View style={globalStyles.container}>
      <Text>{textData.loadingComponent.text1}</Text>
    </View>
  )
}

export default LoadingComponent