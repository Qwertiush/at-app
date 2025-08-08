import { Timestamp } from "firebase/firestore";

export type RecipeComment = {
  id: string;
  description: string;
  authorId: string;
  recipeId: string;
  createdAt: Timestamp;
};

export type CreateRecipeInput = Omit<Comment, "id" | "createdAt">;