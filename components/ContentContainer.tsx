import globalStyles from '@/app/Styles/global-styles';
import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import React, { useContext } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

type ContentContainerProps = {
    children: React.ReactNode;
    style?: Object;
}

const ContentContainer: React.FC<ContentContainerProps> = ({children}) => {
  const {themeData} = useContext(UserPrefsContext);
  
  return (
    <ImageBackground
        style={ContainerStyle.container}
        source={require('@/assets/images/bc_pattern.jpg')}
        resizeMode='repeat'
    >
        <View
            style={[{backgroundColor: themeData.overlay, width: '100%'},globalStyles.container]}
        >
            {children}
        </View>
    </ImageBackground>
  )
}

const ContainerStyle= StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContentContainer