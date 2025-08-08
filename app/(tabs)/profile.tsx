import Avatar from '@/components/Avatar'
import CustomButton from '@/components/CustomButton'
import LoadingComponent from '@/components/LoadingComponent'
import RecipeCard from '@/components/RecipeCard'
import { useAuth } from '@/hooks/useAuth'
import { Recipe } from '@/models/Recipe'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Text, View } from 'react-native'
import globalStyles from '../Styles/global-styles'
import { logoutUser } from '../firebase/firebaseAuth'
import { subscribeToUsersRecipes } from '../firebase/firebaseDB'

const Profile = () => {
  const {user, loading} = useAuth();

  const [itemsLimit, setItemsLimit] = useState(4); 
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipesCount, setRecipesCount] = useState<number>();

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
    setItemsLimit((prev) => prev + 5);
  }

  const handlePictureChange = () => {
    console.log("Changing profile picture");
  }
  const handleLoggingOut = () => {
    logoutUser();
  }

  if (loading) return <LoadingComponent/>;

  return (
    <View style={globalStyles.container}>
      <>
        <View
          style={[
            globalStyles.centerElement,
            {
              width: '100%',
              flexDirection: 'column',
              paddingVertical: 20,
            },
          ]}
        >
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
            Joined {user?.createdAt?.toDate().toLocaleDateString()}!
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
                style={{ width: 20, height: 20, marginRight: 6 }}
              />
              <Text style={[globalStyles.textM]}>Recipes:</Text>
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
                style={{ width: 20, height: 20, marginRight: 6 }}
              />
              <Text style={[globalStyles.textM]}>Likes:</Text>
              <Text style={[globalStyles.textM, { marginLeft: 4 }]}>0</Text>
            </View>
          </View>
          <View style={[{width: '85%', flexDirection: 'row', justifyContent: 'space-between'}, globalStyles.centerElement]}>
              <CustomButton text='Change Avatar' style={{width: '40%'}} handlePress={handlePictureChange}/>
              <CustomButton text='Log Out' style={{width: '40%'}} handlePress={handleLoggingOut}/>
          </View>
          <Text
            style={[
              globalStyles.textXL,
              { textAlign: 'center', marginTop: 20 },
              globalStyles.centerElement,
            ]}
          >
            Your's recipes:
          </Text>
        </View>
      </>
      <FlatList
        style={{width: '100%', flex: 1}}
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        onEndReached={loadMoreRecipes}
        onEndReachedThreshold={0.1}
      >
      </FlatList>
    </View>
  )
}

export default Profile