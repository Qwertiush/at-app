import ContentContainer from '@/components/ContentContainer';
import UserProfile from '@/components/UserProfile';
import { RecipeContext } from '@/contexts/RecipeContext';
import React, { useContext } from 'react';

const Author = () => {
  const {userRecipeContext} = useContext(RecipeContext);

  return (
    <ContentContainer>
      <UserProfile user2Show={userRecipeContext} />
    </ContentContainer>
  )
}

export default Author