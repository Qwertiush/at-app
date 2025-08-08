import { Timestamp } from "firebase/firestore";

export type Recipe = {
  id: string;
  title: string;
  title2lower?: string
  partialTitle?: string[]
  description: string;
  authorId: string;
  createdAt: Timestamp;
  ingredients: string[];
  steps: string[];
  pictures?: string[];
};

export type CreateRecipeInput = Omit<Recipe, "id" | "createdAt">;