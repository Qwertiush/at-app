import ContentContainer from '@/components/ContentContainer';
import CustomIconButton from '@/components/CustomIconButton';
import CustomImage from '@/components/CustomPrymitives/CustomImage';
import FormField from '@/components/CustomPrymitives/FormField';
import TextM from '@/components/CustomPrymitives/Text/TextM';
import TextXXL from '@/components/CustomPrymitives/Text/TextXXL';
import GalleryPreview from '@/components/GalleryPreview';
import LoadingComponent from '@/components/LoadingComponent';
import { usePopup } from '@/contexts/PopUpContext';
import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import { useAuth } from '@/hooks/useAuth';
import React, { useContext, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { addRecipe } from '../../firebase/firebaseDB';
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
  const {showPopup} = usePopup();

  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
    ingredientsInput: '',
    stepsInput: '',
  });
  const [pictures, setPictures] = useState<string[]>([]);
  const [picPath, setPicPath] = useState<string>('');

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

  const SubmitForm = async () => {
    try {
      if (!user) {
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
        pictures: pictures,
      };

      const id = await addRecipe(newRecipe);
      showPopup({
          title: textData.addinngRecipeSuccessPopup.title,
          content: textData.addinngRecipeSuccessPopup.content,
      });
      
      setForm({ title: '', description: '', ingredientsInput: '', stepsInput: '' });
    } catch (error: any) {
      console.error('Error while saving recipe:', error);
      showPopup({
          title: textData.addinngRecipeSuccessPopup.title,
          content: textData.addinngRecipeSuccessPopup.content,
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
          iconSource={require('@/assets/images/icons/create.png')} 
          handlePress={handleAddingRecipe}
        />
      </ScrollView>
      </KeyboardAvoidingView>
    </ContentContainer>
  );
};

export default Create;
