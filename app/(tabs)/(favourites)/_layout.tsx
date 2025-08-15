import { Stack } from 'expo-router'
import React from 'react'

const FavouritesLayout = () => {
  return (
    <>
      <Stack>  
        <Stack.Screen name="favourites" options={{ title: "Favourites", headerShown: false }} />
        <Stack.Screen name="favUsers" options={{ title: "Users", headerShown: false }} />
      </Stack>
    </>
  )
}

export default FavouritesLayout