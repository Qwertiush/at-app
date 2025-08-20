import ContentContainer from '@/components/ContentContainer';
import CustomIconButton from '@/components/CustomIconButton';
import CustomImage from '@/components/CustomPrymitives/CustomImage';
import FormField from '@/components/CustomPrymitives/FormField';
import TextXXL from '@/components/CustomPrymitives/Text/TextXXL';
import GalleryPreview from '@/components/GalleryPreview';
import LoadingComponent from '@/components/LoadingComponent';
import PickImageComponent from '@/components/PickImageComponent';
import { usePopup } from '@/contexts/PopUpContext';
import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import { useAuth } from '@/hooks/useAuth';
import * as ImagePicker from 'expo-image-picker';
import React, { useContext, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { addRecipe, uploadImageToCloudinary } from '../../firebase/firebaseDB';
import globalStyles from '../Styles/global-styles';

type FormState = {
  title: string;
  description: string;
  ingredientsInput: string;
  stepsInput: string;
};

const Create = () => {
  const {user, loadingUser} = useAuth();
  const {textData, themeData} = useContext(UserPrefsContext);
  const {showPopup, hidePopup} = usePopup();

  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
    ingredientsInput: '',
    stepsInput: '',
  });
  const [pictures, setPictures] = useState<ImagePicker.ImagePickerAsset[]>([]);

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

  const handleAddingPhotoToPreview = (result: ImagePicker.ImagePickerResult) => {
    if (!result || result.canceled) {
      showPopup({ title: "Nie wybrano zdjęcia", content: "" });
      return;
    }

    if (pictures.length >= 4) {
      showPopup({ title: "Nie można dodać więcej niż 4 zdjęcia", content: "" });
      return;
    }

    setPictures(prev => [...prev, result.assets[0]]);
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

  const handleAddingRecipe = () => {
    showPopup({
      title: textData.addingRecipePopup.title,
      content: textData.addingRecipePopup.content,
      onConfirm: (decison) => {
        if(decison){
          SubmitForm();
        }
      }
    });
  }

  const handlePicturesUploading = async () => {
    try {
      const uploaded = await Promise.all(
        pictures.map(async (pic) => {
          const picUrl = await uploadImageToCloudinary(pic.uri);
          console.log('Picture uploaded:', picUrl);
          return picUrl;
        })
      );
      return uploaded;
    } catch (error) {
      console.error('Error uploading pictures:', error);
      throw error;
    }
  };


  const SubmitForm = async () => {
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

      const uploadedPics = await handlePicturesUploading();
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
        authorId: user.uid,
        ingredients: ingredientsInput
          .toLowerCase()
          .split(',')
          .map(i => i.trim())
          .filter(i => i.length > 0),
        steps: stepsInput
          .split(',')
          .map(s => s.trim())
          .filter(s => s.length > 0),
        upVotes: 0,
        pictures: uploadedPics,
      };

      const id = await addRecipe(newRecipe);
      showPopup({
          title: textData.addinngRecipeSuccessPopup.title,
          content: textData.addinngRecipeSuccessPopup.content,
      });
      setForm({ title: '', description: '', ingredientsInput: '', stepsInput: '' });
      setPictures([]);
      hidePopup();
    } catch (error: any) {
      console.error('Error while saving recipe:', error);
      showPopup({
          title: textData.addingRecipeError2Popup.title,
          content: textData.addingRecipeError2Popup.content,
      });
    }
  };

  if(loadingUser)
    return(
      <ContentContainer>
        <LoadingComponent/>
      </ContentContainer>
    );

  return (
    <ContentContainer style={{flex: 1}}>
      <KeyboardAvoidingView behavior='padding' style={[{marginTop: 40 ,flex: 1, width: '95%', boxShadow: `0 0 10px 5px ${themeData.secondary}`,backgroundColor: themeData.bc2}, globalStyles.textContainer]}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 20}}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[{flexDirection: 'column', alignItems: 'center'}]}>
          <TextXXL>{textData.createScreen.header}</TextXXL>
          <CustomImage
            source={require('@/assets/images/icons/logo.png')}
            dimentions={{width: 40, height: 40}}
          />
        </View>

        <PickImageComponent setPhoto={handleAddingPhotoToPreview}/>
        <GalleryPreview pictures={pictures.map((pic)=>pic.uri)} onRemovePicture={handleRemovingPhotoFromPreview}/>

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
          iconSource={require('@/assets/images/icons/create.png')} 
          handlePress={handleAddingRecipe}
        />
      </ScrollView>
      </KeyboardAvoidingView>
    </ContentContainer>
  );
};

export default Create;
