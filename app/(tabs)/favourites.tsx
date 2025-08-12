import ContentContainer from '@/components/ContentContainer';
import CustomImage from '@/components/CustomPrymitives/CustomImage';
import TextM from '@/components/CustomPrymitives/Text/TextM';
import TextXXL from '@/components/CustomPrymitives/Text/TextXXL';
import LoadingComponent from '@/components/LoadingComponent';
import RecipeCard from '@/components/RecipeCard';
import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import { useAuth } from '@/hooks/useAuth';
import { Recipe } from '@/models/Recipe';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StatusBar, View } from 'react-native';
import { subscribeToLikedRecipes } from '../../firebase/firebaseDB';
import globalStyles from '../Styles/global-styles';

const Favourites = () => {
  const {textData, themeData} = useContext(UserPrefsContext);

  const [itemsLimit, setItemsLimit] = useState(10); 
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loadingRecipes, setLoadingRecipes] = useState<boolean>(true)

  const {user, loadingUser} = useAuth();

  useEffect(() => {
    if(!loadingUser && user?.uid){
      const unsubscribe = subscribeToLikedRecipes(setRecipes,user?.uid,itemsLimit);
      setLoadingRecipes(false);
      return () => unsubscribe();
    }
  }, [user, itemsLimit]);

    const loadMoreRecipes = () => {
    setItemsLimit((prev) => prev + 10);
  }

  if(loadingUser || loadingRecipes){
    return (
      <ContentContainer>
        <LoadingComponent/>
      </ContentContainer>
    );
  }

  return (
    <>
    <ContentContainer style={globalStyles.container}>
      <FlatList
      style={{
        width: '100%',
        paddingTop: StatusBar.currentHeight,
      }}
      data={recipes}
      keyExtractor={(item)=>item.id}
      renderItem={({item}) => <RecipeCard recipe={item}/>}
      onEndReached={loadMoreRecipes}
      onEndReachedThreshold={0.1}
      ListHeaderComponent={
        <View style={[globalStyles.centerElement, globalStyles.textContainer,{flexDirection: 'row', alignItems: 'center', backgroundColor: themeData.bc2}]}>
          <TextXXL>{textData.favouritesScreen.header1}</TextXXL>
          <CustomImage
            source={require('@/assets/images/icons/logo.png')}
            dimentions={{width: 50, height: 50}}
          />
          <TextXXL>{textData.favouritesScreen.header2}</TextXXL>
        </View>
        }
      ListFooterComponent={
        <TextM style={{
            paddingTop: 10,
            paddingBottom: 200,
            alignSelf: 'center',
          }}>
            {textData.favouritesScreen.text1}
        </TextM>
      }
      >
      </FlatList>
    </ContentContainer>
    </>
  )
}

export default Favourites