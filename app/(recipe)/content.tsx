import Avatar from '@/components/Avatar';
import ContentContainer from '@/components/ContentContainer';
import CustomButton from '@/components/CustomButton';
import { formatDate } from '@/components/RecipeCard';
import { RecipeContext } from '@/contexts/RecipeContext';
import { Reaction } from '@/models/Reaction';
import { router } from 'expo-router';
import { getAuth } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import globalStyles, { colors } from '../Styles/global-styles';
import { addReaction, checkIfAddedReactionToRecipe, deleteReactionById, deleteRecipeById, getNrOfReactionsByRecipeId, getReactionIdByRecipeAndUserIds } from '../firebase/firebaseDB';

const Content = () => {
  const { recipe, userRecipeContext } = useContext(RecipeContext);

  const [upvotes, setupVotes] = useState<number>();
  const [reacted, setReacted] = useState<number>();

  const [reload, setReload] = useState<boolean>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>();

  const auth = getAuth();
  const currentUser = auth.currentUser;

  const addUpVote = async () => {
    setIsSubmitting(true);
    if(reacted != -1){
      alert("You arleady added reaction to this.")
      return;
    }

    if (!recipe?.id || !currentUser?.uid) return;
    const newReaction: Omit<Reaction, 'id'> = {
      recipeId: recipe?.id,
      userId: currentUser?.uid,
      type: 1
    }

    const response = await addReaction(newReaction);

    setReload(!reload);
    setIsSubmitting(false);
  }

  const addDownVote = async () => {
    if (!recipe?.id || !currentUser?.uid) return;
    const response = await getReactionIdByRecipeAndUserIds(recipe?.id,currentUser.uid);

    if(response == '-1'){
      return;
    }

    await deleteReactionById(response);

    setReload(!reload);
  }

  const deleteRecipe = async () => {
    if(recipe?.id)
    await deleteRecipeById(recipe?.id);
    router.replace('/(tabs)/home');
  }

  useEffect(() => {
    const fetchUpvotes = async () => {
      if (recipe?.id) {
        const upvotes = await getNrOfReactionsByRecipeId(recipe.id);
        setupVotes(upvotes);
      }
    }
    const checkIfReacted = async () => {
      if(recipe?.id && currentUser?.uid){
        const reacted = await checkIfAddedReactionToRecipe(recipe.id, currentUser?.uid );
        setReacted(reacted);
      }
    }

    fetchUpvotes();
    checkIfReacted();
  },[reload]);

  if (!recipe) return <Text>Loading recipe...</Text>;

  return (
    <ContentContainer style={globalStyles.container}>
      <ScrollView style={{width: '100%'}}>
        <View style={[globalStyles.contentContainer,{width: '90%', flexDirection: 'row', justifyContent: 'center', alignSelf:'center',gap: '10%'}]}>
          {recipe.authorId == currentUser?.uid ? <CustomButton text='X( Delete' style={{ backgroundColor: colors.error}} handlePress={deleteRecipe} isLoading={isSubmitting}></CustomButton> : <></>}
          {reacted == 1 ? <CustomButton text=':( Down vote?' handlePress={addDownVote} isLoading={isSubmitting} style={{backgroundColor: colors.error}}/> : <CustomButton text=':) Up vote?' handlePress={addUpVote} isLoading={isSubmitting} style={{backgroundColor: colors.succes}}/>}
        </View>
        {upvotes != 1 ? <Text style={[globalStyles.textM, globalStyles.centerElement, globalStyles.textContainer,{boxShadow: `0 0 10px 5px ${colors.secondary}`}]}>{upvotes} users like this recipe so far!</Text> : <Text style={[globalStyles.textM, globalStyles.centerElement, globalStyles.textContainer,{boxShadow: `0 0 10px 5px ${colors.secondary}`}]}>{upvotes} user likes this recipe so far!</Text>}
        <View style={styles.card}>
          <Text style={styles.title}>{recipe.title}</Text>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={[{flexDirection: 'column'}, globalStyles.centerElement]}>
              <Text style={styles.meta}> By: {userRecipeContext?.username ?? 'Unknown'}</Text>
              <Text style={styles.meta}>
                Created: {formatDate(recipe.createdAt)}
              </Text>
            </View>
            <View>
              {userRecipeContext?.avatarUrl ? <Avatar source={{uri: userRecipeContext?.avatarUrl}} style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 2}}/> : <Avatar source={require('@/assets/images/icons/def_avatar.png')}  style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 2}}/>}
            </View>
          </View>
          <Text style={styles.description}>{recipe.description}</Text>

          <Text style={styles.sectionTitle}>Ingredients:</Text>
          {recipe.ingredients.map((item, index) => (
            <Text key={index} style={styles.listItem}>• {item}</Text>
          ))}

          <Text style={styles.sectionTitle}>Steps:</Text>
          {recipe.steps.map((step, index) => (
            <Text key={index} style={styles.listItem}>{index + 1}. {step}</Text>
          ))}
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
    backgroundColor: colors.bc2,
    padding: 16,
    borderRadius: 10,
    margin: 12,
    elevation: 3,
    shadowColor: colors.bc2,
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
    color: '#888'
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