import { Timestamp } from "firebase/firestore";

export type RecipeProps = {
  id: string;
  title: string;
  description: string;
  authorId: string;
  createdAt: Timestamp;
  ingredients: string[];
  steps: string[];
  pictures?: string[];
};

export type CreateRecipeInput = Omit<RecipeProps, "id" | "createdAt">;