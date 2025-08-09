import { subscribeToRecipeById } from '@/app/firebase/firebaseDB';
import { Recipe } from '@/models/Recipe';
import { User } from '@/models/User';
import React, { createContext, useEffect, useState } from 'react';

type RecipeContextType = {
  recipeId: string | null,
  setRecipeId: React.Dispatch<React.SetStateAction<string | null>>;
  recipe: Recipe | null;
  setRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>;
  userRecipeContext: User | null,
  setUserRecipecontext: React.Dispatch<React.SetStateAction<User | null>>;
};

export const RecipeContext = createContext<RecipeContextType>({
  recipeId: null,
  setRecipeId: () => {},
  recipe: null,
  setRecipe: () => {},
  userRecipeContext: null,
  setUserRecipecontext: () => {}
});

export const RecipeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [recipeId, setRecipeId] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [userRecipeContext, setUserRecipecontext] = useState<User | null>(null);

  useEffect(() => {
    if(recipeId != null){
      const unsubscribe = subscribeToRecipeById(setRecipe, recipeId);
      return () => unsubscribe();
    }
  }, [recipeId]);
  

  return (
    <RecipeContext.Provider value={{recipeId, setRecipeId ,recipe, setRecipe, userRecipeContext, setUserRecipecontext }}>
      {children}
    </RecipeContext.Provider>
  );
};
