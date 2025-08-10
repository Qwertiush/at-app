import { UserPrefsContext } from '@/contexts/UserPrefsContext'
import React, { useContext } from 'react'
import { Image, ImageSourcePropType, View } from 'react-native'

type AvatarProps = {
    source: ImageSourcePropType
    style?: object
}

const Avatar: React.FC<AvatarProps> = ({source, style}) => {
  const {themeData} = useContext(UserPrefsContext);

  return (
    <View>
        <Image source={source} style={[{ width: 100, height: 100, borderRadius: 50, borderWidth: 5, borderColor: themeData.secondary }, style]} />
    </View>
  )
}

export default Avatar