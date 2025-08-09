import { RecipeComment } from "@/models/Comment";
import { Reaction } from "@/models/Reaction";
import { CreateRecipeInput, Recipe } from "@/models/Recipe";
import { User } from "@/models/User";
import { addDoc, collection, deleteDoc, doc, getCountFromServer, getDoc, getDocs, increment, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { DB } from "./FirebaseConfig";

//User
export const createUserProfile = async (user: User) => {
  const userRef = doc(DB, "users", user.uid);
  await setDoc(userRef, {
    username: user.username || "Nowy użytkownik",
    email: user.email,
    avatarUrl: user.avatarUrl || "",
    createdAt: serverTimestamp()
  });
};

export const getUserProfile = async (uid: string) => {
  const userRef = doc(DB, "users", uid);
  const snapshot = await getDoc(userRef);
  return snapshot.exists() ? snapshot.data() : null;
};

//Recipe
export const getAllRecipes = async (): Promise<Recipe[]> => {
  const recipesRef = collection(DB, "recipes");
  const snapshot = await getDocs(recipesRef);

  const recipes = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Recipe[];

  return recipes;
};

export const subscribeToFilteredRecipes = (
  onSuccess: (recipes: Recipe[]) => void,
  searchQuery: string,
  limitCount: number
) => {
  const queryParts = searchQuery.toLowerCase().split(" ").filter(Boolean);

  const q = query(
    collection(DB, "recipes"),
    where("searchIndex", "array-contains-any", queryParts),
    limit(limitCount)
  );

  return onSnapshot(q, (snapshot) => {
    const rawList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Recipe[];

    // Client side filtering
    const filteredList = rawList.filter((item) =>
      queryParts.every((word) => item.searchIndex.includes(word))
    );

    onSuccess(filteredList);
  });
};

export const addRecipe = async (recipe: CreateRecipeInput) => {
  try {
    const docRef = await addDoc(collection(DB, "recipes"), {
      ...recipe,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding recipe: ", e);
    throw e;
  }
};

export const subscribeToRecipes = (
  onSuccess: (recipes: Recipe[]) => void,
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
      })) as Recipe[];

      onSuccess(list);
    },
    (error) => {
      if (onError) onError(error);
      else console.error("Snapshot error:", error);
    }
  );
};

export const subscribeToRecipeById = (
  onSuccess: (recipe: Recipe) => void,
  recipeId: string,
  onError?: (error: any) => void,
) => {
  const recipeDocRef = doc(DB, "recipes", recipeId);

  return onSnapshot(
    recipeDocRef,
    (docSnapshot) => {
      if (docSnapshot.exists()) {
        const recipeData = docSnapshot.data() as Recipe;
        onSuccess(recipeData);
      } else {
        console.warn(`Recipe with id ${recipeId} does not exist.`);
      }
    },
    (error) => {
      if (onError) onError(error);
      else console.error("Snapshot error:", error);
    }
  );
};

export const subscribeToUsersRecipes = (
  onSuccess: (data: { recipes: Recipe[]; count: number }) => void,
  limited: number,
  userId: string,
  onError?: (error: any) => void,

) => {
  const q = query(
    collection(DB, "recipes"),
    where("authorId","==",userId),
    limit(limited)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Recipe[];

      onSuccess({recipes: list, count: snapshot.size});
    },
    (error) => {
      if (onError) onError(error);
      else console.error("Snapshot error:", error);
    }
  );
};

export const subscribeToLikedRecipes = (
  onSuccess: (recipes: Recipe[]) => void,
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
        })) as Recipe[];

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

export const deleteRecipeById = async (id: string): Promise<void> => {
  // 1. Usuń komentarze związane z tym przepisem
  const commentsQuery = query(collection(DB, "comments"), where("recipeId", "==", id));
  const commentsSnapshot = await getDocs(commentsQuery);
  const commentDeletions = commentsSnapshot.docs.map((docu) => deleteDoc(doc(DB, "comments", docu.id)));

  // 2. Usuń reakcje związane z tym przepisem
  const reactionsQuery = query(collection(DB, "reactions"), where("recipeId", "==", id));
  const reactionsSnapshot = await getDocs(reactionsQuery);
  const reactionDeletions = reactionsSnapshot.docs.map((docu) => deleteDoc(doc(DB, "reactions", docu.id)));

  // 3. Usuń sam przepis
  const recipeDeletion = deleteDoc(doc(DB, "recipes", id));

  // 4. Poczekaj na wszystkie operacje
  await Promise.all([...commentDeletions, ...reactionDeletions, recipeDeletion]);
};

//Reaction
export const getNrOfReactionsByRecipeId = async (id: string): Promise<number> => {
  const q = query(
    collection(DB, "reactions"),
    where("recipeId", "==", id),
  );

  const snapshot = await getCountFromServer(q);
  const count = snapshot.data().count;

  return typeof count == 'number' ? count : 0;
}

//returns 1 upvoted, 0 - no upvote but reaction exists, -1 - no reaction
export const checkIfAddedReactionToRecipe = async (recipeId: string, userId: string): Promise<number> => {
  const q = query(
    collection(DB, "reactions"),
    where("recipeId", "==", recipeId),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);
  const reactions =snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Reaction[];

  if(reactions.length <= 0){
    return -1;
  }

  const value: number = reactions[0].type;

  return typeof value == 'number' ? value : -1;
}
//TODO add field to receipe - upvotes ad update when reacted (+1/-1)
export const addReaction = async (reaction: Omit<Reaction, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(DB, "reactions"), {
      ...reaction
    });
    const recipeRef = doc(DB, "recipes", reaction.recipeId);
    await updateDoc(recipeRef, {
      upVotes: increment(1)
    });

    return docRef.id;
  } catch (e) {
    console.error("Error adding reaction: ", e);
    throw e;
  }
}


export const getReactionIdByRecipeAndUserIds = async (recipeId: string, userId: string): Promise<string> =>{
    const q = query(
    collection(DB, "reactions"),
    where("recipeId", "==", recipeId),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);
  const reactions =snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Reaction[];

  if(reactions.length <= 0){
    return '-1';
  }

  const value: string = reactions[0].id;

  return typeof value == 'string' ? value : '-1';
}

export const deleteReactionById = async (reactionId: string): Promise<void> =>{
  try{
    const reactionRef = doc(DB, "reactions", reactionId);
    const snapshot = await getDoc(reactionRef);

    if (!snapshot.exists()) {
      throw new Error("Reaction not found");
    }

    const recipeId = snapshot.data().recipeId;

    if (!recipeId) {
      throw new Error("Recipe ID not found in reaction data");
    }

    const recipeRef = doc(DB, "recipes", recipeId);
    await updateDoc(recipeRef, {
      upVotes: increment(-1)
    });

    await deleteDoc(doc(DB,"reactions",reactionId));

  } catch (e) {
    console.error("Error while deleting reaction: ", e);
    throw e;
  }
}
//Comment

export const subscribeToCommentsByRecipeId = (
  onSuccess: (recipes: RecipeComment[]) => void,
  limited: number,
  recipeId: string,
  onError?: (error: any) => void,

) => {
  const q = query(
    collection(DB, "comments"),
    where("recipeId","==",recipeId),
    orderBy("createdAt", "desc"),
    limit(limited)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as RecipeComment[];

      onSuccess(list);
    },
    (error) => {
      if (onError) onError(error);
      else console.error("Snapshot error:", error);
    }
  );
};

export const addComment = async (comment: Omit<RecipeComment, 'id' | 'createdAt'>): Promise<string> => {
  try{
    const docRef = await addDoc(collection(DB, "comments"), {
      ...comment,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  }catch(e){
    console.error("Error adding comment: ", e);
    throw e;
  }
}

export default createUserProfile;