import CommentCard from '@/components/CommentCard'
import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import { RecipeContext } from '@/contexts/RecipeContext'
import { RecipeComment } from '@/models/Comment'
import { getAuth } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, FlatList, View } from 'react-native'
import globalStyles from '../Styles/global-styles'
import { addComment, subscribeToCommentsByRecipeId } from '../firebase/firebaseDB'

type CommentState = {
  content: string
}

type CommentsProps ={
  recipeId: string
}

const Comments: React.FC<CommentsProps> = ({recipeId}) => {
  const { recipe } = useContext(RecipeContext);

  const [itemsLimit, setItemsLimit] = useState(4); 
  const [comments, setComments] = useState<RecipeComment[]>([]);

  const [newComment, setNewComment] = useState<CommentState>({
    content: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>();

  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if(recipe?.id){
      const unsubscribe = subscribeToCommentsByRecipeId(setComments,itemsLimit, recipe?.id);
      return () => unsubscribe(); 
    }
  }, [itemsLimit]);

  const loadMoreRecipes = () => {
    setItemsLimit((prev) => prev + 5);
  }

  const handleAddingComment = async () => {
    setIsSubmitting(true);
    const {content} = newComment;
    
    if (!content.trimEnd()) {
      Alert.alert("comment can't be mt!");
      return;
    }

    if(!currentUser?.uid || !recipe?.id) return;
    const comment2send: Omit<RecipeComment, 'id' | 'createdAt'> = {
      description: content.trim(),
      authorId: currentUser?.uid,
      recipeId: recipe?.id
    }

    const response = await addComment(comment2send);

    console.log(response);
    setNewComment({content: ''});
    setIsSubmitting(false);
  }

  return (
    <View style={globalStyles.container}>
      <View style={{width: '100%'}}>
        <FormField
          title='Comment'
          value={newComment.content}
          handleChangeText = {e => setNewComment(prev => ({...prev, content: e}))}
          multiline = {true}
          style={{width: '90%'}}
        />
        <CustomButton text='Add comment' handlePress={handleAddingComment} isLoading={isSubmitting}/>
      </View>
      <FlatList
        style={{width: '100%'}}
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CommentCard comment={item} />}
        onEndReached={loadMoreRecipes}
        onEndReachedThreshold={0.1}
      >
      </FlatList>
    </View>
  )
}

export default Comments