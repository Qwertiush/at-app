import globalStyles from '@/app/Styles/global-styles'
import { usePopup } from '@/contexts/PopUpContext'
import { UserPrefsContext } from '@/contexts/UserPrefsContext'
import { addReaction, checkIfAddedReaction, deleteReactionById, getReactionIdByRecipeAndUserIds, subscribeToUsersRecipes } from '@/firebase/firebaseDB'
import { useAuth } from '@/hooks/useAuth'
import { Reaction } from '@/models/Reaction'
import { Recipe } from '@/models/Recipe'
import { User } from '@/models/User'
import { router } from 'expo-router'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import Avatar from './Avatar'
import ContentContainer from './ContentContainer'
import CustomIconButton from './CustomIconButton'
import CustomImage from './CustomPrymitives/CustomImage'
import TextM from './CustomPrymitives/Text/TextM'
import TextXL from './CustomPrymitives/Text/TextXL'
import TextXXL from './CustomPrymitives/Text/TextXXL'
import LoadingComponent from './LoadingComponent'
import RecipeCard from './RecipeCard'

type UserProfileProps = {
 user2Show: User | null,
}

const UserProfile: React.FC<UserProfileProps> = ({user2Show}) => {
  const {textData, themeData, listLimit} = useContext(UserPrefsContext);
  const {showPopup} = usePopup();
  const {user, loadingUser} = useAuth();

  const [itemsLimit, setItemsLimit] = useState(listLimit); 
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipesCount, setRecipesCount] = useState<number>();

  const [reacted, setReacted] = useState<number>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>();
  
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

  useEffect(() => {
    const checkIfReacted = async () => {
      if(user2Show?.uid && user?.uid){
        const reactedVal = await checkIfAddedReaction(user2Show?.uid, user?.uid );

        setReacted(reactedVal);
      }
    }
    checkIfReacted();
  }, [user, user2Show]);

  const loadMoreRecipes = () => {
    setItemsLimit((prev) => prev + listLimit);
  }

  const handleSettingsPress = () => {
    router.replace('/settings');
  }

  const handleVoting = () => {
    console.log("reacted value:", reacted);
    if (reacted == -1) {
      addUpVote();
    } else {
      addDownVote();
    }
  }


  const addUpVote = async () => {
    try{
      setIsSubmitting(true);
      if(reacted != -1){
        
        setIsSubmitting(false);
        return;
      }
  
      if (!user2Show?.uid || !user?.uid){
        
        setIsSubmitting(false);
        return;
      } 
      const newReaction: Omit<Reaction, 'id'> = {
        objectId: user2Show?.uid,
        userId: user?.uid,
        type: 2
      }
  
      const response = await addReaction(newReaction,"users");
  
      setIsSubmitting(false);
    }
    catch(e){
      console.log(e);      
    }
  }

  const addDownVote = async () => {
      setIsSubmitting(true);
      if (!user2Show?.uid || !user?.uid){
        setIsSubmitting(false);
        return;
      }
      const response = await getReactionIdByRecipeAndUserIds(user2Show?.uid,user.uid);
  
      if(response == '-1'){
        setIsSubmitting(false);
        return;
      }
  
      await deleteReactionById(response,"users");
  
      setIsSubmitting(false);
    }
  

  if(loadingUser)
    return (
      <ContentContainer>
        <LoadingComponent/>
      </ContentContainer>  
    );

  if(user2Show == null){
    return(
    <ContentContainer>
      <TextXL>User has been removed.</TextXL>
    </ContentContainer> 
    );
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
              {user?.uid == user2Show?.uid ?
              <CustomIconButton iconSource={require('@/assets/images/icons/settings.png')} handlePress={handleSettingsPress}/> 
              :
              reacted == -1
              ?
              <CustomIconButton iconSource={require('@/assets/images/icons/upvote.png')} style={{backgroundColor: themeData.succes}} handlePress={handleVoting} isLoading={isSubmitting}/>
              :
              <CustomIconButton iconSource={require('@/assets/images/icons/downvote.png')} style={{backgroundColor: themeData.error}} handlePress={handleVoting} isLoading={isSubmitting}/>
              }
            </View>
            <View>
              {user2Show?.avatarUrl ? 
              <Avatar source={{ uri: user2Show.avatarUrl }} />
              : 
              <Avatar source={require('@/assets/images/icons/def_avatar.png')} />
              }
            </View>
            <TextXXL>{user2Show?.username}</TextXXL>
            <TextM>{textData.profileScreen.text1} {user2Show?.createdAt?.toDate().toLocaleDateString()}</TextM>
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
                <TextM>{user2Show.nrOfRecipes}</TextM>
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
                <TextM>{user2Show.upVotes}</TextM>
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