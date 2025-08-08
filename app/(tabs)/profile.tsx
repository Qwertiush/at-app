import LoadingComponent from '@/components/LoadingComponent'
import UserProfile from '@/components/UserProfile'
import { useAuth } from '@/hooks/useAuth'
import React from 'react'
import { View } from 'react-native'
import globalStyles from '../Styles/global-styles'

const Profile = () => {
  const {user, loading} = useAuth();

  

  if (loading) return <LoadingComponent/>;

  return (
    <View style={globalStyles.container}>
      <UserProfile user={user} loading={loading}/>
    </View>
  )
}

export default Profile