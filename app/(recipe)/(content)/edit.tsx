import globalStyles from '@/app/Styles/global-styles';
import ContentContainer from '@/components/ContentContainer';
import CustomIconButton from '@/components/CustomIconButton';
import CustomImage from '@/components/CustomPrymitives/CustomImage';
import FormField from '@/components/CustomPrymitives/FormField';
import TextXXL from '@/components/CustomPrymitives/Text/TextXXL';
import GalleryPreview from '@/components/GalleryPreview';
import LoadingComponent from '@/components/LoadingComponent';
import PickImageComponent from '@/components/PickImageComponent';
import { usePopup } from '@/contexts/PopUpContext';
import { RecipeContext } from '@/contexts/RecipeContext';
import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import { editRecipe, removeImageFromCloudinary, uploadImageToCloudinary } from '@/firebase/firebaseDB';
import { useAuth } from '@/hooks/useAuth';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';

type FormState = {
  title: string;
  description: string;
  ingredientsInput: string;
  stepsInput: string;
};
//TODO removing/adding pictures with cloudinary
const Edit = () => {
  const { user, loadingUser } = useAuth();
  const { recipe, userRecipeContext, recipeId } = useContext(RecipeContext);
  const { textData, themeData } = useContext(UserPrefsContext);
  const { showPopup, hidePopup } = usePopup();
  const [ form, setForm ] = useState<FormState>({
      title: recipe?.title as string,
      description: recipe?.description as string,
      ingredientsInput: recipe?.ingredients.join(',') as string,
      stepsInput: recipe?.steps.join(',') as string,
    });
  const [pictures, setPictures] = useState<string[]>(recipe?.pictures as string[]);

  const [picsToUpload, setPicsToUpload] = useState<string[]>([]);
  const [picsToRemove, setPicsToRemove] = useState<string[]>([]);

  const handleAddingPhotoToPreview = (result: ImagePicker.ImagePickerResult) => {
    if (!result || result.canceled) {
      showPopup({ title: "Nie wybrano zdjęcia", content: "" });
      return;
    }

    if (pictures.length + picsToUpload.length >= 4) {
      showPopup({ title: "Nie można dodać więcej niż 4 zdjęcia", content: "" });
      return;
    }

    setPicsToUpload(prev => [...prev, result.assets[0].uri]);
  }

  const handleRemovingPhotoFromPreview = (id: number) => {
    showPopup({
      title: 'Confirm action',
      content: 'Do you really want to remove this pic?',
      onConfirm: (decison) => {
        if(decison){
          setPicsToRemove(prev => [...prev, pictures[id]]);
          setPictures(prev => prev.filter((_, i) => i !== id));
        }
      }
    });
  }

  const handleRemovingUploadingPhoto2Cloud = async () => {
    try {
      await Promise.all(picsToRemove.map(pic => removeImageFromCloudinary(pic)));

      const uploadedUrls = await Promise.all(
        picsToUpload.map(pic => uploadImageToCloudinary(pic))
      );

      return uploadedUrls;
    } catch (error) {
      console.error("Error while uploading pics", error);
      return [];
    }
  };




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
          showPopup({
            title: 'no need',
            content: 'for that',
            clear: true,
            childForPopUp: <View style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' }}><LoadingComponent/></View>
          });

          if (!user?.uid) {
            hidePopup();
            showPopup({
              title: textData.notLoggedInPopup.title,
              content: textData.notLoggedInPopup.content,
            });
            return;
          }
    
          const { title, description, ingredientsInput, stepsInput } = form;
    
          if (!title.trim() || !description.trim()) {
            hidePopup();
            showPopup({
              title: textData.addingRecipeError1Popup.title,
              content: textData.addingRecipeError1Popup.content,
            });
            return;
          }
          
          const uploadedUrls = await handleRemovingUploadingPhoto2Cloud();
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
            pictures: [...pictures, ...uploadedUrls],
          };
          if(!recipeId) return;

          const id = await editRecipe(newRecipe,recipeId);
          hidePopup();
          showPopup({
              title: textData.edittingRecipeSuccessPopup.title,
              content: textData.edittingRecipeSuccessPopup.content,
          });
          hidePopup();
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
        <CustomIconButton iconSource={require('@/assets/images/icons/arrow.png')} style={{ marginTop: 10, marginBottom: 0}} handlePress={ () => router.replace('/content') }/>
        <View style={[{flexDirection: 'column', alignItems: 'center'}]}>
          <TextXXL>{textData.editRecipeScreen.header}</TextXXL>
          <CustomImage
            source={require('@/assets/images/icons/logo.png')}
            dimentions={{width: 40, height: 40}}
          />
        </View>

        <PickImageComponent setPhoto={handleAddingPhotoToPreview}/>
        <GalleryPreview pictures={[...pictures, ...picsToUpload]} onRemovePicture={handleRemovingPhotoFromPreview}/>

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