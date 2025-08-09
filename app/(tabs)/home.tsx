import ContentContainer from '@/components/ContentContainer';
import FormField from '@/components/FormField';
import LoadingComponent from '@/components/LoadingComponent';
import RecipeCard from '@/components/RecipeCard';
import { useAuth } from '@/hooks/useAuth';
import { Recipe } from '@/models/Recipe';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Text, View } from 'react-native';
import { subscribeToFilteredRecipes, subscribeToRecipes } from '../firebase/firebaseDB';
import globalStyles, { colors } from '../Styles/global-styles';
//TODO when user deleted - (change recipes/comments - to "user deleted")
const Home = () => {
  const {user, loading} = useAuth();

  const [itemsLimit, setItemsLimit] = useState(10); 
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if(searchQuery != ''){
      const unsubscribe = subscribeToFilteredRecipes(setRecipes,searchQuery.toLowerCase(),itemsLimit);
      return () => unsubscribe(); 
    }
    const unsubscribe = subscribeToRecipes(setRecipes,itemsLimit);
      return () => unsubscribe(); 
  }, [itemsLimit, searchQuery]);

  const loadMoreRecipes = () => {
    setItemsLimit((prev) => prev + 10);
  }

  if (loading) return <LoadingComponent/>;

  return (
    
    <ContentContainer style={globalStyles.container}>
      <KeyboardAvoidingView behavior='padding' style={[{width: '100%',position: 'absolute', left: 0, top: 0, zIndex: 10},globalStyles.contentContainer]}>
        <View style={[globalStyles.textContainer,{width: '90%', boxShadow: `0 0 10px 5px ${colors.secondary}`}]}>
        <View style={[{flexDirection: 'row', width: '100%',borderTopLeftRadius: 20, borderTopRightRadius: 20, justifyContent:'center'}]}>
            <Text style={[globalStyles.textXXL, globalStyles.centerElement]}>What's new in </Text>
            <Image
              source={require('@/assets/images/icons/logo.png')}
              style={{ width: 50, height: 50, alignSelf: 'center' }}
            />
            <Text style={[globalStyles.textXXL, globalStyles.centerElement]}> ?</Text>
          </View>
        <FormField title='Search...' value={searchQuery} handleChangeText={setSearchQuery} style={{width: '90%', marginBottom: 10, marginTop: 0}}></FormField>
        </View>
      </KeyboardAvoidingView>
      <FlatList
        style={[{width: '100%', paddingTop: 180}]}
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        onEndReached={loadMoreRecipes}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          <Text style={[globalStyles.centerElement, globalStyles.textM,{paddingTop: 10, paddingBottom: 200}]}>You have reached the end.</Text>
        }
        >
      </FlatList>
    </ContentContainer>
  )
}

export default Home