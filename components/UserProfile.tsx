import { subscribeToUsersRecipes } from '@/app/firebase/firebaseDB'
import globalStyles, { colors } from '@/app/Styles/global-styles'
import { usePopup } from '@/contexts/PopUpContext'
import { UserPrefsContext } from '@/contexts/UserPrefsContext'
import { Recipe } from '@/models/Recipe'
import { User } from '@/models/User'
import { router } from 'expo-router'
import { getAuth } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Image, Text, View } from 'react-native'
import Avatar from './Avatar'
import CustomIconButton from './CustomIconButton'
import RecipeCard from './RecipeCard'

type UserProfileProps = {
 user: User | null,
 loading: boolean
}

const UserProfile: React.FC<UserProfileProps> = ({user,loading}) => {
  
  const [itemsLimit, setItemsLimit] = useState(10); 
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipesCount, setRecipesCount] = useState<number>();
  const {textData} = useContext(UserPrefsContext);
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
              globalStyles.centerElement,
              globalStyles.textContainer,
              {
                width: '95%',
                flexDirection: 'column',
                paddingVertical: 20,
                boxShadow: `0 0 10px 5px ${colors.secondary}`,
              },
            ]}
          >
            <View style={[{width: '100%', flexDirection: 'row', justifyContent: 'center', gap: '10%'}, globalStyles.centerElement]}>
              {user?.uid == currentUser?.uid ? <CustomIconButton iconSource={require('@/assets/images/icons/settings.png')} handlePress={handleSettingsPress}/> : <CustomIconButton iconSource={require('@/assets/images/icons/upvote.png')} style={{backgroundColor: colors.succes}} handlePress={handleVoting}/>}
            </View>
            <View style={[globalStyles.centerElement, { marginBottom: 12 }]}>
              {user?.avatarUrl ? (
                <Avatar source={{ uri: user.avatarUrl }} />
              ) : (
                <Avatar source={require('@/assets/images/icons/def_avatar.png')} />
              )}
            </View>
            <Text style={[globalStyles.textXXL, { textAlign: 'center', marginBottom: 8 }]}>
              {user?.username}!
            </Text>
            <Text style={[globalStyles.textXL, { textAlign: 'center', marginBottom: 20 }]}>
              {textData.profileScreen.text1} {user?.createdAt?.toDate().toLocaleDateString()}!
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 30,
                }}
              >
                <Image
                  source={require('@/assets/images/icons/recipe.png')}
                  style={{ width: 30, height: 30, marginRight: 6 }}
                />
                <Text style={[globalStyles.textM]}>{textData.profileScreen.text2}</Text>
                <Text style={[globalStyles.textM, { marginLeft: 4 }]}>{recipesCount}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={require('@/assets/images/icons/favs.png')}
                  style={{ width: 30, height: 30, marginRight: 6 }}
                />
                <Text style={[globalStyles.textM]}>{textData.profileScreen.text3}</Text>
                <Text style={[globalStyles.textM, { marginLeft: 4 }]}>0</Text>
              </View>
            </View>
            {user?.uid == currentUser?.uid ? 
              <Text
                style={[
                  globalStyles.textXL,
                  { textAlign: 'center', marginTop: 20 },
                  globalStyles.centerElement,
                ]}
              >
              {textData.profileScreen.text4}
              </Text> :
              <Text
                style={[
                  globalStyles.textXL,
                  { textAlign: 'center', marginTop: 20 },
                  globalStyles.centerElement,
                ]}
              >
              {user?.username}{textData.profileScreen.text5}
              </Text>
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