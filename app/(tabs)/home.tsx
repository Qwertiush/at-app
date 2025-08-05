import RecipeCard from '@/components/RecipeCard';
import { RecipeProps } from '@/models/Recipe'; // Assuming you have a type definition for RecipeProps
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { DB } from '../firebase/FirebaseConfig';
import globalStyles from '../Styles/global-styles';

const Home = () => {
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);
  useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(DB, 'recipes'),
    async (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as RecipeProps[];

      list.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

      setRecipes(list);
    },
    (error) => {
      console.error("Snapshot error:", error);
    }
  );

  return () => unsubscribe();
}, []);

  return (
    <View style={[globalStyles.container, { paddingTop: 30 }]}>
      <Text style={globalStyles.textXXL}>What's new today?</Text>
      <ScrollView style={{ width: '100%' }}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe}/>
        ))} 
      </ScrollView>
    </View>
  )
}

export default Home