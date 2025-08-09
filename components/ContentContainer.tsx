import globalStyles from '@/app/Styles/global-styles';
import React from 'react';
import { ImageBackground, View, ViewStyle } from 'react-native';

type ContentContainerProps = {
    children: React.ReactNode;
    style?: ViewStyle;
}

const ContentContainer: React.FC<ContentContainerProps> = ({children}) => {
  return (
    <ImageBackground
        style={globalStyles.container}
        source={require('@/assets/images/bc_pattern.jpg')}
    >
        <View
            style={[{backgroundColor: 'rgba(233, 197, 121, 0.7)', width: '100%'},globalStyles.container]}
        >
            {children}
        </View>
    </ImageBackground>
  )
}

export default ContentContainer