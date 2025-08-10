import { Stack } from 'expo-router'
import React from 'react'

const ProfileLayout = () => {
  return (
    <>
      <Stack>  
        <Stack.Screen name="profile" options={{ title: "Profile", headerShown: false }} />
        <Stack.Screen name="settings" options={{ title: "Settings", headerShown: false }} />
      </Stack>
    </>
  )
}

export default ProfileLayout