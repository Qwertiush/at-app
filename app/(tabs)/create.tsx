import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
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
  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
    ingredientsInput: '',
    stepsInput: '',
  });
//Function creates structure to imporve searching expirience "pasta" - [p,pa,pas,past,past]
const generatePartialTitle = (title: string): string[] => {
  const words = title.toLowerCase().split(/\s+/);
  const partials = new Set<string>();

  words.forEach(word => {
    for (let i = 1; i <= word.length; i++) {
      partials.add(word.slice(0, i));
    }
  });

  return Array.from(partials);
};

  const SubmitForm = async () => {
    try {
      const user = AUTH.currentUser;
      if (!user) {
        Alert.alert('Błąd', 'Nie jesteś zalogowany.');
        return;
      }

      const { title, description, ingredientsInput, stepsInput } = form;

      if (!title.trim() || !description.trim()) {
        Alert.alert('Błąd', 'Tytuł i opis są wymagane.');
        return;
      }

      const newRecipe = {
        title: title.trim(),
        title2lower: title.trim().toLowerCase(),
        partialTitle: generatePartialTitle(title),
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
      Alert.alert('Sukces', `Przepis zapisany. ID: ${id}`);
      
      setForm({ title: '', description: '', ingredientsInput: '', stepsInput: '' });
    } catch (error: any) {
      console.error('Failed to save recipe:', error);
      Alert.alert('Błąd', 'Nie udało się zapisać przepisu: ' + (error?.message || error));
    }
  };

  return (
    <View style={globalStyles.container}>
    <KeyboardAvoidingView behavior='padding' style={{width: '100%'}}>
    <ScrollView>
      <View style={[{flexDirection: 'row'},globalStyles.centerElement]}>
        <Text style={[globalStyles.textXL, globalStyles.centerElement]}>Create Something new with </Text>
        <Image
          source={require('@/assets/images/icons/logo.png')}
          style={{ width: 40, height: 40, alignSelf: 'center'}}
        />
      <Text style={[globalStyles.textXL, globalStyles.centerElement]}> !</Text>
      </View>
      <View style={{ marginVertical: 10, width: '100%' }}>
        <FormField
          title="Title"
          value={form.title}
          handleChangeText={e => setForm(prev => ({ ...prev, title: e }))}
          keyboardType="default"
          style={{backgroundColor: colors.highlight}}
          styleText={{color: colors.text1}}
          placeHolderColor={colors.text2}
        />
      </View>

      <View style={{ marginVertical: 10, width: '100%' }}>
        <FormField
          title="Description"
          value={form.description}
          handleChangeText={e => setForm(prev => ({ ...prev, description: e }))}
          keyboardType="default"
          multiline={true}
          style={{backgroundColor: colors.highlight}}
          styleText={{color: colors.text1}}
          placeHolderColor={colors.text2}
        />
      </View>

      <View style={{ marginVertical: 10, width: '100%' }}>
        <FormField
          title="Ingredients (comma-separated)"
          value={form.ingredientsInput}
          handleChangeText={e => setForm(prev => ({ ...prev, ingredientsInput: e }))}
          keyboardType="default"
          multiline={true}
          style={{backgroundColor: colors.highlight}}
          styleText={{color: colors.text1}}
          placeHolderColor={colors.text2}
        />
      </View>      

      <View style={{ marginVertical: 10, width: '100%' }}>
        <FormField
          title="Steps (comma-separated)"
          value={form.stepsInput}
          handleChangeText={e => setForm(prev => ({ ...prev, stepsInput: e }))}
          keyboardType="default"
          multiline={true}
          style={{backgroundColor: colors.highlight}}
          styleText={{color: colors.text1}}
          placeHolderColor={colors.text2}
        />
      </View>

      <CustomButton text='Add recipe' handlePress={SubmitForm}></CustomButton>
    </ScrollView>
    </KeyboardAvoidingView>
    </View>
  );
};

export default Create;
