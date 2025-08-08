import FormField from '@/components/FormField';
import LoadingComponent from '@/components/LoadingComponent';
import RecipeCard from '@/components/RecipeCard';
import { useAuth } from '@/hooks/useAuth';
import { Recipe } from '@/models/Recipe';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Text, View } from 'react-native';
import { subscribeToRecipes, subscribeToRecipesWithQuery } from '../firebase/firebaseDB';
import globalStyles from '../Styles/global-styles';

const Home = () => {
  const {user, loading} = useAuth();

  const [itemsLimit, setItemsLimit] = useState(10); 
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if(searchQuery != ''){
      const unsubscribe = subscribeToRecipesWithQuery(setRecipes,searchQuery.toLowerCase(),itemsLimit);
      return () => unsubscribe(); 
    }
    const unsubscribe = subscribeToRecipes(setRecipes,itemsLimit);
      return () => unsubscribe(); 
  }, [itemsLimit, searchQuery]);

  const loadMoreRecipes = () => {
    setItemsLimit((prev) => prev + 10);
  }

  console.log(searchQuery);

  if (loading) return <LoadingComponent/>;

  return (
    <>
    <View style={globalStyles.container}>
      <FlatList
        style={[{width: '100%'}, globalStyles.contentContainerFL]}
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        onEndReached={loadMoreRecipes}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={
          <View style={[globalStyles.centerElement,{flexDirection: 'row'}]}>
            <Text style={[globalStyles.textXXL, globalStyles.centerElement]}>What's new in </Text>
            <Image
              source={require('@/assets/images/icons/logo.png')}
              style={{ width: 50, height: 50, alignSelf: 'center' }}
            />
            <Text style={[globalStyles.textXXL, globalStyles.centerElement]}> ?</Text>
          </View>
        }
        ListFooterComponent={
          <Text style={[globalStyles.centerElement, globalStyles.textM,{paddingTop: 10, paddingBottom: 120}]}>You have reached the end.</Text>
        }
        >
      </FlatList>
      <KeyboardAvoidingView behavior='padding' style={{width: '100%'}}>
        <FormField title='query...' value={searchQuery} handleChangeText={setSearchQuery} style={{width: '90%'}}></FormField>
      </KeyboardAvoidingView>
    </View>
    </>
  )
}

export default Home