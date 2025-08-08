import ContentContainer from '@/components/ContentContainer';
import UserProfile from '@/components/UserProfile';
import { RecipeContext } from '@/contexts/RecipeContext';
import React, { useContext } from 'react';
import globalStyles from '../Styles/global-styles';

const Author = () => {
  const {userRecipeContext} = useContext(RecipeContext);

  return (
    <ContentContainer style={globalStyles.container}>
      <UserProfile user={userRecipeContext} loading={false} />
    </ContentContainer>
  )
}

export default Author