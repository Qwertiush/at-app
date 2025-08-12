import ContentContainer from '@/components/ContentContainer';
import CustomIconButton from '@/components/CustomIconButton';
import CustomImage from '@/components/CustomPrymitives/CustomImage';
import FormField from '@/components/CustomPrymitives/FormField';
import TextM from '@/components/CustomPrymitives/Text/TextM';
import TextXXL from '@/components/CustomPrymitives/Text/TextXXL';
import LoadingComponent from '@/components/LoadingComponent';
import RecipeCard from '@/components/RecipeCard';
import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import { useAuth } from '@/hooks/useAuth';
import { Recipe } from '@/models/Recipe';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, View } from 'react-native';
import { subscribeToFilteredRecipes, subscribeToRecipes } from '../../firebase/firebaseDB';
import globalStyles from '../Styles/global-styles';
//TODO when user deleted - (change recipes/comments - to "user deleted")
const Home = () => {
  const {user, loadingUser} = useAuth();
  const {textData, themeData} = useContext(UserPrefsContext);

  const [itemsLimit, setItemsLimit] = useState(10); 
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loadingRecipes, setLoadingRecipes] = useState<boolean>(true)

  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setLoadingRecipes(true);
    if(searchQuery != ''){
      const unsubscribe = subscribeToFilteredRecipes(setRecipes,searchQuery.toLowerCase(),itemsLimit);
      setLoadingRecipes(false);
      return () => unsubscribe(); 
    }
    const unsubscribe = subscribeToRecipes(setRecipes,itemsLimit);
      setLoadingRecipes(false);
      return () => unsubscribe(); 
  }, [itemsLimit, searchQuery]);

  const loadMoreRecipes = () => {
    setItemsLimit((prev) => prev + 10);
  }

  if (loadingUser)
     return (
     <ContentContainer>
      <LoadingComponent/>
    </ContentContainer>
    );

  return (
    
    <ContentContainer>
      <KeyboardAvoidingView 
      behavior='padding' 
      style={[{
        width: '100%',
        position: 'absolute', 
        left: 0, 
        top: 0, 
        zIndex: 10
        },
        globalStyles.contentContainer
      ]}>
        <View style={[
          globalStyles.textContainer,
          {
            width: '90%',
            backgroundColor: themeData.bc2,
            boxShadow: `0 0 10px 5px ${themeData.secondary}`
          }]}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            justifyContent:'center'
          }}>
            <TextXXL>{textData.homeScreen.header}</TextXXL>
            <CustomImage 
              source={require('@/assets/images/icons/logo.png')} 
              dimentions={{width:50,height:50}}
            />
            <TextXXL>?</TextXXL>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <FormField
              title={textData.homeScreen.searchBarPlaceholderText} 
              value={searchQuery} 
              handleChangeText={setSearchQuery} 
              style={{ width: '80%', marginBottom: 10, marginTop: 0}}
            />
            <CustomIconButton iconSource={require('@/assets/images/icons/delete.png')} style={{backgroundColor: 'transparent'}} styleIcon={{width: 20, height: 20}} handlePress={()=>setSearchQuery('')}/>
          </View>
        </View>
      </KeyboardAvoidingView>
      {
        loadingRecipes
        ?
        <LoadingComponent/>
        :
        <FlatList
          style={[{width: '100%', paddingTop: 180}]}
          data={recipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RecipeCard recipe={item} />}
          onEndReached={loadMoreRecipes}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            <TextM style={{
              paddingTop: 10,
              paddingBottom: 200,
              alignSelf: 'center',
            }}>
              {textData.homeScreen.text1}
            </TextM>
          }
          >
        </FlatList>
      }
    </ContentContainer>
  )
}

export default Home