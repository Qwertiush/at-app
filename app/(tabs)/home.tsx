import FormField from '@/components/FormField';
import LoadingComponent from '@/components/LoadingComponent';
import RecipeCard from '@/components/RecipeCard';
import { useAuth } from '@/hooks/useAuth';
import { RecipeProps } from '@/models/Recipe';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { subscribeToRecipes } from '../firebase/firebaseDB';
import globalStyles from '../Styles/global-styles';

const Home = () => {
  const {user, loading} = useAuth();

  const [itemsLimit, setItemsLimit] = useState(4); 
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsubscribe = subscribeToRecipes(setRecipes,itemsLimit);
    return () => unsubscribe(); 
  }, [itemsLimit]);

  const loadMoreRecipes = () => {
    setItemsLimit((prev) => prev + 5);
  }

  if (loading) return <LoadingComponent/>;

  return (
    <View style={[globalStyles.container, { paddingTop: 30 }]}>
      <FlatList 
        style={{width: '100%'}}
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
          <Text style={[globalStyles.centerElement, globalStyles.textM,{paddingTop: 10, paddingBottom: 100}]}>You have reached the end.</Text>
        }
        >
      </FlatList>
      <FormField title='query...' value={searchQuery} handleChangeText={setSearchQuery} style={{position: 'absolute', bottom: 10}}></FormField>
    </View>
  )
}

export default Home