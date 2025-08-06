import Avatar from '@/components/Avatar'
import CustomButton from '@/components/CustomButton'
import LoadingComponent from '@/components/LoadingComponent'
import { useAuth } from '@/hooks/useAuth'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { logoutUser } from '../firebase/firebaseAuth'
import globalStyles from '../Styles/global-styles'

const Profile = () => {
  const {user, loading} = useAuth();

  const handlePictureChange = () => {
    console.log("Changing profile picture");
  }

  if (loading) return <LoadingComponent/>;

  return (
    <View style={globalStyles.container}>
      <Image
        source={require('@/assets/images/icons/logo.png')}
        style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 50 }}
      />
      <View style={globalStyles.centered}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View style={{flex: 1, margin: 20}}>
            {user?.avatarUrl ? <Avatar source={{ uri: user?.avatarUrl }} />: <CustomButton text='Uplad Profile Image' handlePress={handlePictureChange}/> }
          </View>
          <View style={[{flexDirection: 'column', margin: 20},globalStyles.centerElement]}>
            <Text style={globalStyles.textXL}>Welcome, {user?.username}!</Text>
            <Text>Email: {user?.email}</Text>
          </View>
        </View>
      </View>
      
      
      
      <CustomButton text='Log Out' handlePress={logoutUser}></CustomButton>
    </View>
  )
}

export default Profile