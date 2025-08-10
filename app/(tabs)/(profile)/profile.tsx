import globalStyles from '@/app/Styles/global-styles'
import ContentContainer from '@/components/ContentContainer'
import LoadingComponent from '@/components/LoadingComponent'
import UserProfile from '@/components/UserProfile'
import { useAuth } from '@/hooks/useAuth'
import React from 'react'

const Profile = () => {
  const {user, loading} = useAuth();

  if (loading) return <LoadingComponent/>;

  return (
    <ContentContainer style={globalStyles.container}>
      <UserProfile user={user} loading={loading}/>
    </ContentContainer>
  )
}

export default Profile