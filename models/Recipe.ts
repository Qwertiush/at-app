import { Timestamp } from "firebase/firestore";

// pełny przepis, taki jak go dostajesz z Firestore
export type RecipeProps = {
  id: string;
  title: string;
  description: string;
  authorId: string;
  createdAt: Timestamp; // albo Date, jeśli od razu konwertujesz
  ingredients: string[];
  steps: string[];
  pictures?: string[];
};

// to, co użytkownik podaje przy tworzeniu nowego przepisu
export type CreateRecipeInput = Omit<RecipeProps, "id" | "createdAt">;