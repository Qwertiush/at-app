import { RecipeProps } from '@/models/Recipe';
import { User } from '@/models/User';
import React, { createContext, useState } from 'react';

type RecipeContextType = {
  recipe: RecipeProps | null;
  setRecipe: React.Dispatch<React.SetStateAction<RecipeProps | null>>;
  userRecipeContext: User | null,
  setUserRecipecontext: React.Dispatch<React.SetStateAction<User | null>>;
};

export const RecipeContext = createContext<RecipeContextType>({
  recipe: null,
  setRecipe: () => {},
  userRecipeContext: null,
  setUserRecipecontext: () => {}
});

export const RecipeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [recipe, setRecipe] = useState<RecipeProps | null>(null);
  const [userRecipeContext, setUserRecipecontext] = useState<User | null>(null);

  return (
    <RecipeContext.Provider value={{ recipe, setRecipe, userRecipeContext, setUserRecipecontext }}>
      {children}
    </RecipeContext.Provider>
  );
};
