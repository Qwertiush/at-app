import CommentCard from '@/components/CommentCard'
import ContentContainer from '@/components/ContentContainer'
import CustomIconButton from '@/components/CustomIconButton'
import FormField from '@/components/CustomPrymitives/FormField'
import LoadingComponent from '@/components/LoadingComponent'
import { usePopup } from '@/contexts/PopUpContext'
import { RecipeContext } from '@/contexts/RecipeContext'
import { UserPrefsContext } from '@/contexts/UserPrefsContext'
import { useAuth } from '@/hooks/useAuth'
import { RecipeComment } from '@/models/Comment'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, KeyboardAvoidingView, View } from 'react-native'
import { addComment, subscribeToCommentsByRecipeId } from '../../firebase/firebaseDB'
import globalStyles, { colors } from '../Styles/global-styles'

type CommentState = {
  content: string
}

const Comments = () => {
  const {user, loadingUser} = useAuth();
  const { recipeId } = useContext(RecipeContext);
  const {textData, themeData} = useContext(UserPrefsContext);
  const {showPopup} = usePopup();

  const [itemsLimit, setItemsLimit] = useState(10); 
  const [comments, setComments] = useState<RecipeComment[]>([]);
  const [loadingComments, setLoadingComments] = useState<boolean>(true);

  const [newComment, setNewComment] = useState<CommentState>({
    content: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>();

  useEffect(() => {
    setLoadingComments(true);
    if(recipeId && user?.uid && user){
      const unsubscribe = subscribeToCommentsByRecipeId(setComments,itemsLimit, recipeId);
      setLoadingComments(false);
      return () => unsubscribe(); 
    }
  }, [itemsLimit, recipeId, user]);

  const loadMoreComments = () => {
    setItemsLimit((prev) => prev + 10);
  }

  const handleAddingComment = async () => {
    setIsSubmitting(true);
    const {content} = newComment;
    
    if (!content.trimEnd()) {
      showPopup({
      title: textData.validateCommentPopup.title,
      content: textData.validateCommentPopup.content,
    });
      setIsSubmitting(false);
      return;
    }

    if(!user?.uid || !recipeId){
      setIsSubmitting(false);
      return;
    } 
    const comment2send: Omit<RecipeComment, 'id' | 'createdAt'> = {
      description: content.trim(),
      authorId: user?.uid,
      recipeId: recipeId
    }

    const response = await addComment(comment2send);

    setNewComment({content: ''});
    setIsSubmitting(false);
  }

  if(loadingUser)
    return (
      <ContentContainer>
        <LoadingComponent/>
      </ContentContainer>
    );

  return (
    <ContentContainer>
    <KeyboardAvoidingView behavior='padding' style={[{width: '100%'},globalStyles.container]}>
      {
        loadingComments
      ?
      <LoadingComponent/>
      :
        <FlatList
          style={{width: '100%'}}
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CommentCard comment={item} />}
          onEndReached={loadMoreComments}
          onEndReachedThreshold={0.1}
          inverted
        >
        </FlatList>
      }
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