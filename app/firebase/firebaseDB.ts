import { CreateRecipeInput, RecipeProps } from "@/models/Recipe";
import { User } from "@/models/User";
import { addDoc, collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { DB } from "./FirebaseConfig";

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

export const subscribeToRecipes = (
  onSuccess: (recipes: RecipeProps[]) => void,
  limited: number,
  onError?: (error: any) => void,

) => {
  const q = query(
    collection(DB, "recipes"),
    orderBy("createdAt", "desc"),
    limit(limited)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as RecipeProps[];

      onSuccess(list);
    },
    (error) => {
      if (onError) onError(error);
      else console.error("Snapshot error:", error);
    }
  );
};

export const subscribeToLikedRecipes = (
  onSuccess: (recipes: RecipeProps[]) => void,
  userId: string | undefined,
  limited: number,
  onError?: (error: any) => void,
) => {
  const q = query(
    collection(DB, "reactions"),
    where("userId", "==", userId),
    where("type", "==", 1),
    limit(limited)
  );

  return onSnapshot(
    q,
    async (snapshot) => {
      try {
        const reactionDocs = snapshot.docs.map(doc => doc.data());
        const recipeIds = reactionDocs.map((reaction: any) => reaction.recipeId);

        // max 10 elementów!
        if (recipeIds.length === 0) {
          onSuccess([]);
          return;
        }

        const recipesQuery = query(
          collection(DB, "recipes"),
          where("__name__", "in", recipeIds.slice(0, 10)) // tylko max 10 ID na raz
        );

        const recipesSnapshot = await getDocs(recipesQuery);
        const recipes = recipesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as RecipeProps[];

        onSuccess(recipes);
      } catch (error) {
        if (onError) onError(error);
        else console.error("🔥 Błąd podczas pobierania przepisów:", error);
      }
    },
    (error) => {
      if (onError) onError(error);
      else console.error("Snapshot error:", error);
    }
  );
};