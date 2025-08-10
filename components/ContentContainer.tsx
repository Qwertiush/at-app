import globalStyles from '@/app/Styles/global-styles';
import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import React, { useContext } from 'react';
import { ImageBackground, View, ViewStyle } from 'react-native';

type ContentContainerProps = {
    children: React.ReactNode;
    style?: ViewStyle;
}

const ContentContainer: React.FC<ContentContainerProps> = ({children}) => {
  const {themeData} = useContext(UserPrefsContext);
  
  return (
    <ImageBackground
        style={globalStyles.container}
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

export default ContentContainer