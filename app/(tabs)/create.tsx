import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import globalStyles from '../Styles/global-styles';
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
        description: description.trim(),
        authorId: user.uid,
        ingredients: ingredientsInput
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
    <ScrollView contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.textXL}>Create a New Recipe</Text>

      <View style={{ marginVertical: 10, width: '100%' }}>
        <FormField
          title="Title"
          value={form.title}
          handleChangeText={e => setForm(prev => ({ ...prev, title: e }))}
          keyboardType="default"
          style={{ width: '100%' }}
        />
      </View>

      <View style={{ marginVertical: 10, width: '100%' }}>
        <FormField
          title="Description"
          value={form.description}
          handleChangeText={e => setForm(prev => ({ ...prev, description: e }))}
          keyboardType="default"
          multiline={true}
        />
      </View>

      <View style={{ marginVertical: 10, width: '100%' }}>
        <FormField
          title="Ingredients (comma-separated)"
          value={form.ingredientsInput}
          handleChangeText={e => setForm(prev => ({ ...prev, ingredientsInput: e }))}
          keyboardType="default"
          multiline={true}
        />
      </View>

      <View style={{ marginVertical: 10, width: '100%' }}>
        <FormField
          title="Steps (comma-separated)"
          value={form.stepsInput}
          handleChangeText={e => setForm(prev => ({ ...prev, stepsInput: e }))}
          keyboardType="default"
          multiline={true}
        />
      </View>

      <CustomButton text='Add recipe' handlePress={SubmitForm}></CustomButton>
    </ScrollView>
  );
};

export default Create;
