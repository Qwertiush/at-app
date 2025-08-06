import globalStyles from '@/app/Styles/global-styles'
import React from 'react'
import { Text, View } from 'react-native'

const LoadingComponent = () => {
  return (
    <View style={globalStyles.container}>
      <Text>Loading...</Text>
    </View>
  )
}

export default LoadingComponent