import ContentContainer from '@/components/ContentContainer';
import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import { usePopup } from '@/contexts/PopUpContext';
import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import React, { useContext, useState } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import globalStyles, { colors } from '../Styles/global-styles';
import { AUTH } from '../firebase/FirebaseConfig'; // dopasuj ścieżkę do swojego eksportu AUTH
import { addRecipe } from '../firebase/firebaseDB';

type FormState = {
  title: string;
  description: string;
  ingredientsInput: string;
  stepsInput: string;
};

const Create = () => {
  const {textData} = useContext(UserPrefsContext);
  const {showPopup} = usePopup();

  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
    ingredientsInput: '',
    stepsInput: '',
  });
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
      const user = AUTH.currentUser;
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
        title2lower: title.trim().toLowerCase(),
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
        pictures: [] as string[],
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

  return (
    <ContentContainer>
      <KeyboardAvoidingView behavior='padding' style={[{width: '95%', boxShadow: `0 0 10px 5px ${colors.secondary}`}, globalStyles.textContainer]}>
      <ScrollView>
        <View style={[{flexDirection: 'column'},globalStyles.centerElement]}>
          <Text style={[globalStyles.textXXL, globalStyles.centerElement]}>{textData.createScreen.header}</Text>
          <Image
            source={require('@/assets/images/icons/logo.png')}
            style={{ width: 40, height: 40, alignSelf: 'center'}}
          />
        </View>
        <View style={{ marginVertical: 10, width: '100%' }}>
          <FormField
            title={textData.createScreen.titlePlaceholderText}
            value={form.title}
            handleChangeText={e => setForm(prev => ({ ...prev, title: e }))}
            keyboardType="default"
            styleText={{color: colors.text1}}
            placeHolderColor={colors.text2}
          />
        </View>

        <View style={{ marginVertical: 10, width: '100%' }}>
          <FormField
            title={textData.createScreen.descriptionPlaceholderText}
            value={form.description}
            handleChangeText={e => setForm(prev => ({ ...prev, description: e }))}
            keyboardType="default"
            multiline={true}
            styleText={{color: colors.text1}}
            placeHolderColor={colors.text2}
          />
        </View>

        <View style={{ marginVertical: 10, width: '100%' }}>
          <FormField
            title={textData.createScreen.ingredientsPlaceholderText}
            value={form.ingredientsInput}
            handleChangeText={e => setForm(prev => ({ ...prev, ingredientsInput: e }))}
            keyboardType="default"
            multiline={true}
            styleText={{color: colors.text1}}
            placeHolderColor={colors.text2}
          />
        </View>      

        <View style={{ marginVertical: 10, width: '100%' }}>
          <FormField
            title={textData.createScreen.stepsPlaceholderText}
            value={form.stepsInput}
            handleChangeText={e => setForm(prev => ({ ...prev, stepsInput: e }))}
            keyboardType="default"
            multiline={true}
            styleText={{color: colors.text1}}
            placeHolderColor={colors.text2}
          />
        </View>

        <CustomButton text={textData.createScreen.buttonText} handlePress={handleAddingRecipe}></CustomButton>
      </ScrollView>
      </KeyboardAvoidingView>
    </ContentContainer>
  );
};

export default Create;
