import CommentCard from '@/components/CommentCard'
import ContentContainer from '@/components/ContentContainer'
import CustomIconButton from '@/components/CustomIconButton'
import FormField from '@/components/FormField'
import { RecipeContext } from '@/contexts/RecipeContext'
import { UserPrefsContext } from '@/contexts/UserPrefsContext'
import { RecipeComment } from '@/models/Comment'
import { getAuth } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, FlatList, KeyboardAvoidingView, View } from 'react-native'
import globalStyles, { colors } from '../Styles/global-styles'
import { addComment, subscribeToCommentsByRecipeId } from '../firebase/firebaseDB'

type CommentState = {
  content: string
}

const Comments = () => {
  const { recipeId } = useContext(RecipeContext);
  const {textData, themeData} = useContext(UserPrefsContext);

  const [itemsLimit, setItemsLimit] = useState(10); 
  const [comments, setComments] = useState<RecipeComment[]>([]);

  const [newComment, setNewComment] = useState<CommentState>({
    content: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>();

  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if(recipeId){
      const unsubscribe = subscribeToCommentsByRecipeId(setComments,itemsLimit, recipeId);
      return () => unsubscribe(); 
    }
  }, [itemsLimit, recipeId]);

  const loadMoreRecipes = () => {
    setItemsLimit((prev) => prev + 10);
  }

  const handleAddingComment = async () => {
    setIsSubmitting(true);
    const {content} = newComment;
    
    if (!content.trimEnd()) {
      Alert.alert("comment can't be mt!");
      setIsSubmitting(false);
      return;
    }

    if(!currentUser?.uid || !recipeId){
      setIsSubmitting(false);
      return;
    } 
    const comment2send: Omit<RecipeComment, 'id' | 'createdAt'> = {
      description: content.trim(),
      authorId: currentUser?.uid,
      recipeId: recipeId
    }

    const response = await addComment(comment2send);

    setNewComment({content: ''});
    setIsSubmitting(false);
  }

  return (
    <ContentContainer style={globalStyles.container}>
    <KeyboardAvoidingView behavior='padding' style={[{width: '100%'},globalStyles.container]}>
      <FlatList
        style={{width: '100%'}}
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CommentCard comment={item} />}
        onEndReached={loadMoreRecipes}
        onEndReachedThreshold={0.1}
        inverted
      >
      </FlatList>
      <View style={{flexDirection: 'row', gap: '5%', justifyContent: 'center', width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20, boxShadow: `0 0 10px 5px ${colors.secondary}`, backgroundColor: themeData.bc2}}>
        <FormField
          title={textData.commentsScreen.commentPlaceholderText}
          value={newComment.content}
          handleChangeText = {e => setNewComment(prev => ({...prev, content: e}))}
          multiline = {true}
          style={{width: '70%', marginTop: 0}}
        />
        <CustomIconButton iconSource={require('@/assets/images/icons/create.png')} handlePress={handleAddingComment} isLoading={isSubmitting}/>   
      </View>
    </KeyboardAvoidingView>
    </ContentContainer>

  )
}

export default Comments