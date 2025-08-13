import ContentContainer from '@/components/ContentContainer';
import CustomIconButton from '@/components/CustomIconButton';
import TextXL from '@/components/CustomPrymitives/Text/TextXL';
import LoadingComponent from '@/components/LoadingComponent';
import RecipeCard from '@/components/RecipeCard';
import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import { getRandomFavouriteRecipe, getRandomRecipe } from '@/firebase/firebaseDB';
import { useAuth } from '@/hooks/useAuth';
import { Recipe } from '@/models/Recipe';
import React, { useContext, useState } from 'react';
import { View } from 'react-native';

const RandomScreen = () => {

  const {user} = useAuth();
  const {textData} = useContext(UserPrefsContext)

  const [recipe,setRecipe] = useState<Recipe>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(textData.randomScreen.text1);

  const handleWait = () => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }

  const handleGetRandomRecipe = async () => {
    setLoading(true);
    const result = await getRandomRecipe();
    setRecipe(result);
    handleWait();
  }

  const handleGetRandomFavouriteRecipe = async () => {
    setLoading(true);
    const result = await getRandomFavouriteRecipe(user?.uid as string);
    if(!result){
        setErrorMessage(textData.randomScreen.text2)
        setLoading(false);
        return;
    }

    setRecipe(result);
    handleWait();
  }

  if (loading){
    return (
        <ContentContainer>
            <LoadingComponent/>
        </ContentContainer>
    );
  }
  return (
    <ContentContainer style={{width: '100%'}}>
        <TextXL>{errorMessage}</TextXL>
        <View style={{flexDirection: 'row', gap: '20%'}}>
            <CustomIconButton iconSource={require('@/assets/images/icons/random.png')} handlePress={handleGetRandomRecipe}/>
            <CustomIconButton iconSource={require('@/assets/images/icons/favs.png')} handlePress={handleGetRandomFavouriteRecipe}/>
        </View>
        <View style={{width: '100%'}}>
        {
            recipe
            ?
            <RecipeCard recipe={recipe}/>
            :
            <></>
        }
        </View>
    </ContentContainer>
  );
}

export default RandomScreen