import ContentContainer from '@/components/ContentContainer';
import RecipeCard from '@/components/RecipeCard';
import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import { Recipe } from '@/models/Recipe';
import { getAuth } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import globalStyles from '../Styles/global-styles';
import { subscribeToLikedRecipes } from '../firebase/firebaseDB';

const Favourites = () => {
  const {textData, themeData} = useContext(UserPrefsContext);

  const [itemsLimit, setItemsLimit] = useState(10); 
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = subscribeToLikedRecipes(setRecipes,user?.uid,itemsLimit);
    return () => unsubscribe(); 
  }, []);

    const loadMoreRecipes = () => {
    setItemsLimit((prev) => prev + 10);
  }

  return (
    <>
    <ContentContainer style={globalStyles.container}>
      <FlatList
      style={[{width: '100%'},globalStyles.contentContainerFL]}
      data={recipes}
      keyExtractor={(item)=>item.id}
      renderItem={({item}) => <RecipeCard recipe={item}/>}
      onEndReached={loadMoreRecipes}
      onEndReachedThreshold={0.1}
      ListHeaderComponent={
        <View style={[globalStyles.centerElement, globalStyles.textContainer,{flexDirection: 'row', backgroundColor: themeData.bc2}]}>
          <Text style={[globalStyles.textXXL, globalStyles.centerElement,{color: themeData.text1}]}>{textData.favouritesScreen.header1}</Text>
          <Image
            source={require('@/assets/images/icons/logo.png')}
            style={{ width: 50, height: 50, alignSelf: 'center' }}
            tintColor={themeData.text1}
          />
          <Text style={[globalStyles.textXXL, globalStyles.centerElement,{color: themeData.text1}]}>{textData.favouritesScreen.header2}</Text>
        </View>
        }
      ListFooterComponent={
        <Text style={[globalStyles.centerElement, globalStyles.textM,{paddingTop: 10, paddingBottom: 120, color: themeData.text1}]}>{textData.favouritesScreen.text1}</Text>
      }
      >
      </FlatList>
    </ContentContainer>
    </>
  )
}

export default Favourites