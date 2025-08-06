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
      <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', justifyContent: 'space-between', marginTop: 40}}>
        <View style={[{flex: 1}, globalStyles.centerElement]}>
            {user?.avatarUrl ? <Avatar source={{ uri: user?.avatarUrl }} />: <Avatar source={require('@/assets/images/icons/def_avatar.png')}/> }
        </View>
        <View style={globalStyles.centerElement}>
          <Image
            source={require('@/assets/images/icons/logo.png')}
            style={{ width: 120, height: 120}}
          />
        </View>
      </View>
      <View style={[globalStyles.centered,{width: '100%'}]}>
        <View style={{width: '100%'}}>
          <View style={[{flexDirection: 'column', margin: 20},globalStyles.centerElement]}>
            <Text style={globalStyles.textXL}>Welcome, {user?.username}!</Text>
            <Text>Email: {user?.email}</Text>
          </View>
          <CustomButton text='Change avatar' handlePress={handlePictureChange} style={{width: '100%', borderRadius: 0}}/>
          <CustomButton text='Log Out' handlePress={logoutUser} style={{width: '100%', borderRadius: 0}}></CustomButton>
        </View>
      </View>
      
    </View>
  )
}

export default Profile