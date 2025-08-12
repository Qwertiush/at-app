import globalStyles from '@/app/Styles/global-styles'
import { usePopup } from '@/contexts/PopUpContext'
import { UserPrefsContext } from '@/contexts/UserPrefsContext'
import { subscribeToUsersRecipes } from '@/firebase/firebaseDB'
import { useAuth } from '@/hooks/useAuth'
import { Recipe } from '@/models/Recipe'
import { User } from '@/models/User'
import { router } from 'expo-router'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import Avatar from './Avatar'
import CustomIconButton from './CustomIconButton'
import CustomImage from './CustomPrymitives/CustomImage'
import TextM from './CustomPrymitives/Text/TextM'
import TextXXL from './CustomPrymitives/Text/TextXXL'
import LoadingComponent from './LoadingComponent'
import RecipeCard from './RecipeCard'

type UserProfileProps = {
 user2Show: User | null,
}

const UserProfile: React.FC<UserProfileProps> = ({user2Show}) => {
  
  const [itemsLimit, setItemsLimit] = useState(10); 
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipesCount, setRecipesCount] = useState<number>();
  const {textData, themeData} = useContext(UserPrefsContext);
  const {showPopup} = usePopup();

  const {user, loadingUser} = useAuth();
  const [loadingRecipes, setLoadingRecipes] = useState<boolean>(true);

  useEffect(() => {
    setLoadingRecipes(true);
    if (!loadingUser && user2Show?.uid && user) {
      const unsubscribe = subscribeToUsersRecipes(({ recipes, count }) => {
        setRecipes(recipes);
        setRecipesCount(count);
      }, itemsLimit, user2Show.uid);
      setLoadingRecipes(false);
      return () => unsubscribe();
    }
  }, [user, user2Show, itemsLimit]);

  const loadMoreRecipes = () => {
    setItemsLimit((prev) => prev + 10);
  }

  const handleSettingsPress = () => {
    router.push('/settings');
  }
  const handleVoting = () => {
    showPopup({
      title: "Error",
      content: "Not implemented yet",
    });
  }

  if(loadingUser)
    return <LoadingComponent/>

  return (
    <>
        <View style={globalStyles.contentContainer}>
          <View
            style={[
              globalStyles.textContainer,
              {
                width: '95%',
                flexDirection: 'column',
                paddingVertical: 20,
                boxShadow: `0 0 10px 5px ${themeData.secondary}`,
                backgroundColor: themeData.bc2,
                alignItems: 'center',
                gap: 5
              },
            ]}
          >
            <View style={[{width: '100%', flexDirection: 'row', justifyContent: 'center', gap: '10%'}, globalStyles.centerElement]}>
              {user?.uid == user2Show?.uid ?
              <CustomIconButton iconSource={require('@/assets/images/icons/settings.png')} handlePress={handleSettingsPress}/> 
              :
              <CustomIconButton iconSource={require('@/assets/images/icons/upvote.png')} style={{backgroundColor: themeData.succes}} handlePress={handleVoting}
            />}
            </View>
            <View>
              {user2Show?.avatarUrl ? 
              <Avatar source={{ uri: user2Show.avatarUrl }} />
              : 
              <Avatar source={require('@/assets/images/icons/def_avatar.png')} />
              }
            </View>
            <TextXXL>{user2Show?.username}!</TextXXL>
            <TextM>{textData.profileScreen.text1} {user2Show?.createdAt?.toDate().toLocaleDateString()}!</TextM>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
                gap: '10%'
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <CustomImage
                  source={require('@/assets/images/icons/recipe.png')}
                  dimentions={{width: 30, height: 30}}
                />
                <TextM>{textData.profileScreen.text2}</TextM>
                <TextM>{recipesCount}</TextM>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <CustomImage
                  source={require('@/assets/images/icons/favs.png')}
                  dimentions={{width: 30, height: 30}}
                />
                <TextM>{textData.profileScreen.text3}</TextM>
                <TextM>0</TextM>
              </View>
            </View>
            {user?.uid == user2Show?.uid 
            ? 
            <TextM>{textData.profileScreen.text4}</TextM>
            :
            <TextM>{user2Show?.username}{textData.profileScreen.text5}</TextM>
            }
          </View>
        </View>
        {
        loadingRecipes 
        ?
          <LoadingComponent/>
        :
          <FlatList
            style={{width: '100%', flex: 1, marginTop: 10}}
            data={recipes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <RecipeCard recipe={item} />}
            onEndReached={loadMoreRecipes}
            onEndReachedThreshold={0.1}
          />
        }
      </>
  )
}

export default UserProfile