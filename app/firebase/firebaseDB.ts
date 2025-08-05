import { RecipeProps } from "@/components/RecipeCard";
import { CreateRecipeInput } from "@/models/Recipe";
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { DB } from "./FirebaseConfig";

export type User = {
    uid: string;
    username?: string;
    email: string;
    avatarUrl?: string;
    createdAt?: Date;
}

export const createUserProfile = async (user: User) => {
  const userRef = doc(DB, "users", user.uid);
  await setDoc(userRef, {
    username: user.username || "Nowy użytkownik",
    email: user.email,
    avatarUrl: user.avatarUrl || "",
    createdAt: user.createdAt || new Date()
  });
};

export const getUserProfile = async (uid: string) => {
  const userRef = doc(DB, "users", uid);
  const snapshot = await getDoc(userRef);
  return snapshot.exists() ? snapshot.data() : null;
};

export const getAllRecipes = async (): Promise<RecipeProps[]> => {
  const recipesRef = collection(DB, "recipes");
  const snapshot = await getDocs(recipesRef);

  const recipes = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as RecipeProps[];  // Rzutujemy, bo firestore nie daje pełnych typów

  return recipes;
};

export const addRecipe = async (recipe: CreateRecipeInput) => {
  try {
    const docRef = await addDoc(collection(DB, "recipes"), {
      ...recipe,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};