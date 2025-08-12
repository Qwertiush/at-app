import ContentContainer from '@/components/ContentContainer'
import UserProfile from '@/components/UserProfile'
import { useAuth } from '@/hooks/useAuth'
import React from 'react'

const Profile = () => {
  const {user} = useAuth();

  return (
    <ContentContainer>
      <UserProfile user2Show={user}/>
    </ContentContainer>
  )
}

export default Profile