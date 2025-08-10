import Avatar from '@/components/Avatar';
import ContentContainer from '@/components/ContentContainer';
import CustomIconButton from '@/components/CustomIconButton';
import { formatDate } from '@/components/RecipeCard';
import { usePopup } from '@/contexts/PopUpContext';
import { RecipeContext } from '@/contexts/RecipeContext';
import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import { Reaction } from '@/models/Reaction';
import { router } from 'expo-router';
import { getAuth } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import globalStyles, { colors } from '../Styles/global-styles';
import { addReaction, checkIfAddedReactionToRecipe, deleteReactionById, deleteRecipeById, getReactionIdByRecipeAndUserIds } from '../firebase/firebaseDB';

const Content = () => {
  const { recipe, userRecipeContext, recipeId } = useContext(RecipeContext);
  const {textData, themeData} = useContext(UserPrefsContext);
  const {showPopup} = usePopup();

  const [reacted, setReacted] = useState<number>();

  const [reload, setReload] = useState<boolean>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>();

  const auth = getAuth();
  const currentUser = auth.currentUser;

  const addUpVote = async () => {
    setIsSubmitting(true);
    if(reacted != -1){
      alert("You arleady added reaction to this.")
      setIsSubmitting(false);
      return;
    }

    if (!recipeId || !currentUser?.uid){
      setIsSubmitting(false);
      return;
    } 
    const newReaction: Omit<Reaction, 'id'> = {
      recipeId: recipeId,
      userId: currentUser?.uid,
      type: 1
    }

    const response = await addReaction(newReaction);

    setReload(!reload);
    setIsSubmitting(false);
  }

  const addDownVote = async () => {
    setIsSubmitting(true);
    if (!recipeId || !currentUser?.uid){
      setIsSubmitting(false);
      return;
    }
    const response = await getReactionIdByRecipeAndUserIds(recipeId,currentUser.uid);

    if(response == '-1'){
      setIsSubmitting(false);
      return;
    }

    await deleteReactionById(response);

    setReload(!reload);
    setIsSubmitting(false);
  }

  const handledeleteRecipe = () => {
    showPopup({
      title: textData.deleterecipePopup.title,
      content: textData.deleterecipePopup.content,
      onConfirm: (decison) => {
        if(decison){
          deleteRecipe();
        }
      }
    });
  }

  const deleteRecipe = async () => {
    try{
      if(recipeId){
        await deleteRecipeById(recipeId);
        showPopup({
          title: textData.deleteRecipeSuccess.title,
          content: textData.deleteRecipeSuccess.content,
        });
        router.replace('/(tabs)/home');
      }
    }catch(e){
      showPopup({
        title: textData.deleteRecipeError.title,
        content: textData.deleteRecipeError.content + ": " + e,
      });
    }
  }

  useEffect(() => {
    const checkIfReacted = async () => {
      if(recipeId && currentUser?.uid){
        const reactedVal = await checkIfAddedReactionToRecipe(recipeId, currentUser?.uid );
        setReacted(reactedVal);
        console.log(reactedVal);
      }
    }

    checkIfReacted();
  }, [reload, recipeId, currentUser?.uid]);

  if (!recipe) return <Text>Loading recipe...</Text>;

  return (
    <ContentContainer style={globalStyles.container}>
      <ScrollView style={{width: '100%'}}>
        <View style={[globalStyles.contentContainer,{width: '90%', flexDirection: 'row', justifyContent: 'center', alignSelf:'center',gap: '10%'}]}>
          {
          recipe.authorId == currentUser?.uid 
          ?
          <CustomIconButton iconSource={require('@/assets/images/icons/delete.png')} style={{ backgroundColor: colors.error}} handlePress={handledeleteRecipe} isLoading={isSubmitting}/> :
            <></>
          }
          {
          reacted == 1 
          ?
          <CustomIconButton iconSource={require('@/assets/images/icons/downvote.png')} handlePress={addDownVote} isLoading={isSubmitting} style={{backgroundColor: colors.error}}/> 
          : 
          <CustomIconButton iconSource={require('@/assets/images/icons/upvote.png')} handlePress={addUpVote} isLoading={isSubmitting} style={{backgroundColor: colors.succes}}/>
          }
        </View>
        {
        recipe.upVotes != 1 
        ? 
        <Text style={[globalStyles.textM, globalStyles.centerElement, globalStyles.textContainer,{boxShadow: `0 0 10px 5px ${colors.secondary}`, color: themeData.text1, backgroundColor: themeData.bc2}]}>{recipe.upVotes}{textData.recipeScreen.header1}</Text> 
        : 
        <Text style={[globalStyles.textM, globalStyles.centerElement, globalStyles.textContainer,{boxShadow: `0 0 10px 5px ${colors.secondary}`, color: themeData.text1, backgroundColor: themeData.bc2}]}>{recipe.upVotes}{textData.recipeScreen.header2}</Text>
        }
        <View style={[styles.card,{backgroundColor: themeData.bc2, shadowColor: themeData.bc2,}]}>
          <Text style={[styles.title,{color: themeData.text1}]}>{recipe.title}</Text>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={[{flexDirection: 'column'}, globalStyles.centerElement]}>
              <Text style={[styles.meta,{color: themeData.text2}]}>{textData.recipeScreen.text1}{userRecipeContext?.username ?? 'Unknown'}</Text>
              <Text style={[styles.meta,{color: themeData.text2}]}>
                {textData.recipeScreen.text2}{formatDate(recipe.createdAt)}
              </Text>
            </View>
            <View>
              {
              userRecipeContext?.avatarUrl 
              ? 
              <Avatar source={{uri: userRecipeContext?.avatarUrl}} style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 2}}/> 
              : 
              <Avatar source={require('@/assets/images/icons/def_avatar.png')}  style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 2}}/>
              }
            </View>
          </View>
          <Text style={[styles.description,{color: themeData.text1}]}>{recipe.description}</Text>

          <Text style={[styles.sectionTitle,{color: themeData.text1}]}>{textData.recipeScreen.text3}</Text>
          {recipe.ingredients.map((item, index) => (
            <Text key={index} style={[styles.listItem,{color: themeData.text1}]}>• {item}</Text>
          ))}

          <Text style={[styles.sectionTitle,{color: themeData.text1}]}>{textData.recipeScreen.text4}</Text>
          {recipe.steps.map((step, index) => (
            <Text key={index} style={[styles.listItem,{color: themeData.text1}]}>{index + 1}. {step}</Text>
          ))}
          <Image
            source={require('@/assets/images/icons/logo.png')}
            style={{ width: 30, height: 30, alignSelf: 'flex-end' }}
          />
        </View>
      </ScrollView>
    </ContentContainer>
  )
}

export default Content

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    width:'90%',
    padding: 16,
    borderRadius: 10,
    margin: 12,
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4
  },
  meta: {
    fontSize: 12,
  },
  description: {
    marginVertical: 12,
    fontSize: 14
  },
  sectionTitle: {
    fontWeight: '600',
    marginTop: 10
  },
  listItem: {
    marginLeft: 10,
    fontSize: 14
  }
});