import globalStyles from '@/app/Styles/global-styles';
import ContentContainer from '@/components/ContentContainer';
import CustomIconButton from '@/components/CustomIconButton';
import CustomImage from '@/components/CustomPrymitives/CustomImage';
import FormField from '@/components/CustomPrymitives/FormField';
import TextM from '@/components/CustomPrymitives/Text/TextM';
import TextXXL from '@/components/CustomPrymitives/Text/TextXXL';
import GalleryPreview from '@/components/GalleryPreview';
import { usePopup } from '@/contexts/PopUpContext';
import { RecipeContext } from '@/contexts/RecipeContext';
import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import { editRecipe } from '@/firebase/firebaseDB';
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';

type FormState = {
  title: string;
  description: string;
  ingredientsInput: string;
  stepsInput: string;
};

const Edit = () => {
  const { user, loadingUser } = useAuth();
  const { recipe, userRecipeContext, recipeId } = useContext(RecipeContext);
  const { textData, themeData } = useContext(UserPrefsContext);
  const { showPopup } = usePopup();
  const [ form, setForm ] = useState<FormState>({
      title: recipe?.title as string,
      description: recipe?.description as string,
      ingredientsInput: recipe?.ingredients.join(',') as string,
      stepsInput: recipe?.steps.join(',') as string,
    });
  const [pictures, setPictures] = useState<string[]>(recipe?.pictures as string[]);
  const [picPath, setPicPath] = useState<string>('');

  const handleAddingPhotoToPreview = () => {
    if(!picPath.trim()){
      showPopup({
        title: "href can't be empty",
        content: "",
      });
      return;
    }
    //Limit to 4 picures
    if(pictures.length>=4){
      showPopup({
        title: "can't add more than 4 pics",
        content: "",
      });
      return;
    }

    setPictures(prev => [...prev, picPath as string]);
    setPicPath('');
  }

  const handleRemovingPhotoFromPreview = (id: number) => {
    showPopup({
      title: 'Confirm action',
      content: 'Do you really want to remove this pic?',
      onConfirm: (decison) => {
        if(decison){
          setPictures(prev => prev.filter((_, i) => i !== id));
        }
      }
    });
  }

  const handleEditingRecipe = () => {
    showPopup({
      title: textData.addingRecipePopup.title,
      content: textData.editRecipePopup.content,
      onConfirm: (decison) => {
        if(decison){
          submitForm();
        }
      }
    });
  }

  //Function creates structure to imporve searching expirience "pasta" - [p,pa,pas,past,past]
  function generateSearchIndex(title: string, ingredients: string[]) {
    const allWords = (title + " " + ingredients.join(" ")).toLowerCase().split(" ");
    const uniqueWords = new Set<string>();

    for (const word of allWords) {
      for (let i = 1; i <= word.length; i++) {
        uniqueWords.add(word.substring(0, i));
      }
    }

    return Array.from(uniqueWords);
  }

  const submitForm = async () => {
    try {
          if (!user?.uid) {
            showPopup({
              title: textData.notLoggedInPopup.title,
              content: textData.notLoggedInPopup.content,
            });
            return;
          }
    
          const { title, description, ingredientsInput, stepsInput } = form;
    
          if (!title.trim() || !description.trim()) {
            showPopup({
              title: textData.addingRecipeError1Popup.title,
              content: textData.addingRecipeError1Popup.content,
            });
            return;
          }
    
          const newRecipe = {
            title: title.trim(),
            searchIndex: generateSearchIndex(
              title,
              ingredientsInput
              .toLowerCase()
              .split(',')
              .map(i => i.trim())
              .filter(i => i.length > 0)),
            description: description.trim(),
            ingredients: ingredientsInput
              .toLowerCase()
              .split(',')
              .map(i => i.trim())
              .filter(i => i.length > 0),
            steps: stepsInput
              .split(',')
              .map(s => s.trim())
              .filter(s => s.length > 0),
            pictures: pictures,
          };
          if(!recipeId) return;

          const id = await editRecipe(newRecipe,recipeId);
          showPopup({
              title: textData.edittingRecipeSuccessPopup.title,
              content: textData.edittingRecipeSuccessPopup.content,
          });
          router.replace('/content')
          
        } catch (error: any) {
          console.error('Error while saving recipe:', error);
          showPopup({
              title: textData.edittingRecipeErrorPopup.title,
              content: textData.edittingRecipeErrorPopup.content,
          });
        }
  }

  return (
    <ContentContainer style={{flex: 1}}>
      <KeyboardAvoidingView behavior='padding' style={[{marginTop: 40 ,flex: 1, width: '95%', boxShadow: `0 0 10px 5px ${themeData.secondary}`,backgroundColor: themeData.bc2}, globalStyles.textContainer]}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 20}}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[{flexDirection: 'column', alignItems: 'center'}]}>
          <TextXXL>{textData.editRecipeScreen.header}</TextXXL>
          <CustomImage
            source={require('@/assets/images/icons/logo.png')}
            dimentions={{width: 40, height: 40}}
          />
        </View>

        {/*TODO Implement choosing photo from gallery*/}
        <TextM style={{alignSelf: 'center', marginTop: 10}}>Add photos</TextM>
        <FormField title='Enter href for photo...' value={picPath as string} handleChangeText={setPicPath}/>
        <CustomIconButton iconSource={require('@/assets/images/icons/create.png')} handlePress={handleAddingPhotoToPreview}/>
        <GalleryPreview pictures={pictures} onRemovePicture={handleRemovingPhotoFromPreview}/>
        {/*------------------------------------------*/}

        <FormField
          title={textData.createScreen.titlePlaceholderText}
          value={form.title}
          handleChangeText={e => setForm(prev => ({ ...prev, title: e }))}
        />
        <FormField
          title={textData.createScreen.descriptionPlaceholderText}
          value={form.description}
          handleChangeText={e => setForm(prev => ({ ...prev, description: e }))}
          multiline={true}
        />
        <FormField
          title={textData.createScreen.ingredientsPlaceholderText}
          value={form.ingredientsInput}
          handleChangeText={e => setForm(prev => ({ ...prev, ingredientsInput: e }))}
          multiline={true}
        />   
        <FormField
          title={textData.createScreen.stepsPlaceholderText}
          value={form.stepsInput}
          handleChangeText={e => setForm(prev => ({ ...prev, stepsInput: e }))}
          multiline={true}
        />
        <CustomIconButton 
          iconSource={require('@/assets/images/icons/edit.png')} 
          handlePress={handleEditingRecipe}
        />
      </ScrollView>
      </KeyboardAvoidingView>
    </ContentContainer>
  );
}

export default Edit