import { Timestamp } from "firebase/firestore";

export type Recipe = {
  id: string;
  title: string;
  searchIndex: string[]
  description: string;
  authorId: string;
  createdAt: Timestamp;
  ingredients: string[];
  steps: string[];
  upVotes: number;
  pictures?: string[];
};

export type CreateRecipeInput = Omit<Recipe, "id" | "createdAt">;