import ContentContainer from '@/components/ContentContainer'
import LoadingComponent from '@/components/LoadingComponent'
import UserProfile from '@/components/UserProfile'
import { useAuth } from '@/hooks/useAuth'
import React from 'react'

const Profile = () => {
  const {user, loading} = useAuth();

  if (loading) return <LoadingComponent/>;

  return (
    <ContentContainer>
      <UserProfile user={user} loading={loading}/>
    </ContentContainer>
  )
}

export default Profile