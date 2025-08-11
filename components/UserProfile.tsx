import { subscribeToUsersRecipes } from '@/app/firebase/firebaseDB'
import globalStyles from '@/app/Styles/global-styles'
import { usePopup } from '@/contexts/PopUpContext'
import { UserPrefsContext } from '@/contexts/UserPrefsContext'
import { Recipe } from '@/models/Recipe'
import { User } from '@/models/User'
import { router } from 'expo-router'
import { getAuth } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import Avatar from './Avatar'
import CustomIconButton from './CustomIconButton'
import CustomImage from './CustomPrymitives/CustomImage'
import TextM from './CustomPrymitives/Text/TextM'
import TextXXL from './CustomPrymitives/Text/TextXXL'
import RecipeCard from './RecipeCard'

type UserProfileProps = {
 user: User | null,
 loading: boolean
}

const UserProfile: React.FC<UserProfileProps> = ({user,loading}) => {
  
  const [itemsLimit, setItemsLimit] = useState(10); 
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipesCount, setRecipesCount] = useState<number>();
  const {textData, themeData} = useContext(UserPrefsContext);
  const {showPopup} = usePopup();

  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!loading && user?.uid) {
      const unsubscribe = subscribeToUsersRecipes(({ recipes, count }) => {
      setRecipes(recipes);
      setRecipesCount(count);
    }, itemsLimit, user.uid);
    return () => unsubscribe();
    }
  }, [loading, user, itemsLimit]);

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
              {user?.uid == currentUser?.uid ?
              <CustomIconButton iconSource={require('@/assets/images/icons/settings.png')} handlePress={handleSettingsPress}/> 
              :
              <CustomIconButton iconSource={require('@/assets/images/icons/upvote.png')} style={{backgroundColor: themeData.succes}} handlePress={handleVoting}
            />}
            </View>
            <View>
              {user?.avatarUrl ? 
              <Avatar source={{ uri: user.avatarUrl }} />
              : 
              <Avatar source={require('@/assets/images/icons/def_avatar.png')} />
              }
            </View>
            <TextXXL>{user?.username}!</TextXXL>
            <TextM>{textData.profileScreen.text1} {user?.createdAt?.toDate().toLocaleDateString()}!</TextM>
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
            {user?.uid == currentUser?.uid 
            ? 
            <TextM>{textData.profileScreen.text4}</TextM>
            :
            <TextM>{user?.username}{textData.profileScreen.text5}</TextM>
            }
          </View>
        </View>
        <FlatList
          style={{width: '100%', flex: 1, marginTop: 10}}
          data={recipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RecipeCard recipe={item} />}
          onEndReached={loadMoreRecipes}
          onEndReachedThreshold={0.1}
        >
        </FlatList>
      </>
  )
}

export default UserProfile