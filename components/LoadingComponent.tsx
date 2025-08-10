import globalStyles from '@/app/Styles/global-styles';
import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import React, { useContext } from 'react';
import { Image } from 'react-native';
import ContentContainer from './ContentContainer';

const LoadingComponent = () => {
  const {textData} = useContext(UserPrefsContext);

  return (
    <ContentContainer style={globalStyles.container}>
      <Image
        source={require('../assets/images/icons/loading.png')}
        style={{ width: 100, height: 100, alignSelf: 'center' }}
      />
    </ContentContainer>
  )
}

export default LoadingComponent