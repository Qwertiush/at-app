import { Stack } from 'expo-router'
import React from 'react'

const ContentLayout = () => {
  return (
    <>
      <Stack>  
        <Stack.Screen name="content" options={{ title: "Content", headerShown: false }} />
        <Stack.Screen name="edit" options={{ title: "Edit", headerShown: false }} />
      </Stack>
    </>
  )
}

export default ContentLayout