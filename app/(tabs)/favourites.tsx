import RecipeCard from '@/components/RecipeCard';
import { RecipeProps } from '@/models/Recipe';
import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import globalStyles from '../Styles/global-styles';
import { subscribeToLikedRecipes } from '../firebase/firebaseDB';

const Favourites = () => {
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = subscribeToLikedRecipes(setRecipes,user?.uid,10);
    return () => unsubscribe(); 
  }, []);

  return (
    <View style={globalStyles.container}>
      <FlatList
      style={{width: '100%', marginTop: 40}}
      data={recipes}
      keyExtractor={(item)=>item.id}
      renderItem={({item}) => <RecipeCard recipe={item}/>}
      onEndReached={()=>{}}
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
      >
      </FlatList>
    </View>
  )
}

export default Favourites