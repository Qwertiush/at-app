import { colors } from '@/app/Styles/global-styles'
import React from 'react'
import { Image, ImageSourcePropType, View } from 'react-native'

type AvatarProps = {
    source: ImageSourcePropType
    style?: object
}

const Avatar: React.FC<AvatarProps> = ({source, style}) => {
  return (
    <View>
        <Image source={source} style={[{ width: 100, height: 100, borderRadius: 50, borderWidth: 5, borderColor: colors.secondary }, style]} />
    </View>
  )
}

export default Avatar