import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/models/Recipe';
import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import globalStyles from '../Styles/global-styles';
import { subscribeToLikedRecipes } from '../firebase/firebaseDB';

const Favourites = () => {

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
    <View style={globalStyles.container}>
      <FlatList
      style={[{width: '100%'},globalStyles.contentContainerFL]}
      data={recipes}
      keyExtractor={(item)=>item.id}
      renderItem={({item}) => <RecipeCard recipe={item}/>}
      onEndReached={loadMoreRecipes}
      onEndReachedThreshold={0.1}
      ListHeaderComponent={
        <View style={[globalStyles.centerElement,{flexDirection: 'row'}]}>
          <Text style={[globalStyles.textXXL, globalStyles.centerElement]}>Your's favourite </Text>
          <Image
            source={require('@/assets/images/icons/logo.png')}
            style={{ width: 50, height: 50, alignSelf: 'center' }}
          />
          <Text style={[globalStyles.textXXL, globalStyles.centerElement]}> recipes.</Text>
        </View>
        }
      ListFooterComponent={
        <Text style={[globalStyles.centerElement, globalStyles.textM,{paddingTop: 10, paddingBottom: 120}]}>You have reached the end.</Text>
      }
      >
      </FlatList>
    </View>
    </>
  )
}

export default Favourites