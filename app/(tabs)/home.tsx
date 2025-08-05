import RecipeCard from '@/components/RecipeCard';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { RecipeProps } from '../../components/RecipeCard'; // Assuming you have a type definition for RecipeProps
import { DB } from '../firebase/FirebaseConfig';
import globalStyles from '../Styles/global-styles';

const Home = () => {
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(DB, 'recipes'),
      (snapshot) => {
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as RecipeProps[];

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
    <ScrollView style={{ width: '100%' }}>
      
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
      
    </ScrollView>
    </View>
  )
}

export default Home