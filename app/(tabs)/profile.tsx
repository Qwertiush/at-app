import CustomButton from '@/components/CustomButton'
import { useAuth } from '@/hooks/useAuth'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { logoutUser } from '../firebase/firebaseAuth'
import globalStyles from '../Styles/global-styles'

const Profile = () => {
  const {user, loading} = useAuth();

  if (loading) return <Text>Ładowanie...</Text>;

  return (
    <View style={globalStyles.container}>
      <Text>Witaj, {user?.username}!</Text>
      <Text>Email: {user?.email}</Text>
      <Image source={{ uri: user?.avatarUrl }} />
      <CustomButton text='Log Out' handlePress={logoutUser}></CustomButton>
    </View>
  )
}

export default Profile