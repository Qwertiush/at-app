import { RecipeComment } from "@/models/Comment";
import { Reaction } from "@/models/Reaction";
import { CreateRecipeInput, EditRecipeInput, Recipe } from "@/models/Recipe";
import { User } from "@/models/User";
import { addDoc, collection, deleteDoc, doc, getCountFromServer, getDoc, getDocs, increment, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { DB } from "./FirebaseConfig";

//Reactions - [1 - recipe, 2 - user]

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

export const getUsersByName = (
  onSuccess: (users: User[]) => void,
  searchQuery: string,
  limitCount: number
) => {

  const q = query(
    collection(DB, "users"),
    where("username", "==", searchQuery.trim()),
    limit(limitCount)
  );

  return onSnapshot(q, (snapshot) => {
    const userList = snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    })) as User[];

    onSuccess(userList);
  });
};

export const updateUsersAvatar = async (uid: string, path2Picture: string) =>{
  const userRef = doc(DB, "users", uid);
    await updateDoc(userRef, {
      avatarUrl: path2Picture
    });
}
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
    const userRef = doc(DB,'users',recipe.authorId);
    await updateDoc(userRef, {
      nrOfRecipes: increment(1)
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding recipe: ", e);
    throw e;
  }
};

export const editRecipe = async (recipe: EditRecipeInput, recipeId: string) => {
  try {
    const recipeRef = doc(DB, 'recipes', recipeId);
    await setDoc(
      recipeRef,
      { ...recipe, updatedAt: serverTimestamp() },
      { merge: true }
    );
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw error;
  }
};
//TODO better algorythm
export const getRandomRecipe = async (): Promise<Recipe> => {
  const snapshot = await getDocs(collection(DB, "recipes"));
  const allIds = snapshot.docs.map(doc => doc.id);
  const randomId = allIds[Math.floor(Math.random() * allIds.length)];

  const recipeRef = doc(DB, "recipes", randomId);
  const snapshotRecipe = await getDoc(recipeRef);
  const result = {
    id: randomId,
    ...snapshotRecipe.data()
  };
  return result as Recipe;
}

export const getRandomFavouriteRecipe = async (authorId: string): Promise<Recipe | null> => {
  const reactionsRef = collection(DB, "reactions");
  const q = query(
    reactionsRef,
    where("userId", "==", authorId)
  );
  const snapshot = await getDocs(q);

  if(snapshot.empty){
    return null;
  }
  
  const allIds = snapshot.docs.map(doc => doc.data().objectId);

  if(allIds.length === 0){
    return null;
  }

  const randomId = allIds[Math.floor(Math.random() * allIds.length)];

  const recipeRef = doc(DB, "recipes", randomId);
  const snapshotRecipe = await getDoc(recipeRef);

  if(!snapshotRecipe.exists()){
    return null;
  }

  const result = {
    id: randomId,
    ...snapshotRecipe.data()
  };
  return result as Recipe;
}


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
        const recipeIds = reactionDocs.map((reaction: any) => reaction.objectId);

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
        else console.error("🔥 Errow while fetching recipes:", error);
      }
    },
    (error) => {
      if (onError) onError(error);
      else console.error("Snapshot error:", error);
    }
  );
};

export const subscribeToLikedUsers = (
  onSuccess: (recipes: User[]) => void,
  userId: string | undefined,
  limited: number,
  onError?: (error: any) => void,
) => {
  const q = query(
    collection(DB, "reactions"),
    where("userId", "==", userId),
    where("type", "==", 2),
    limit(limited)
  );

  return onSnapshot(
    q,
    async (snapshot) => {
      try {
        const reactionDocs = snapshot.docs.map(doc => doc.data());
        const recipeIds = reactionDocs.map((reaction: any) => reaction.objectId);

        if (recipeIds.length === 0) {
          onSuccess([]);
          return;
        }

        const usersQuery = query(
          collection(DB, "users"),
          where("__name__", "in", recipeIds.slice(0, 10)) // tylko max 10 ID na raz
        );

        const usersSnapshot = await getDocs(usersQuery);
        const users = usersSnapshot.docs.map(doc => ({
          uid: doc.id,
          ...doc.data(),
        })) as User[];

        onSuccess(users);
      } catch (error) {
        if (onError) onError(error);
        else console.error("🔥 Errow while fetching users:", error);
      }
    },
    (error) => {
      if (onError) onError(error);
      else console.error("Snapshot error:", error);
    }
  );
};

export const deleteRecipeById = async (id: string, userId: string): Promise<void> => {
  const commentsQuery = query(collection(DB, "comments"), where("recipeId", "==", id));
  const commentsSnapshot = await getDocs(commentsQuery);
  const commentDeletions = commentsSnapshot.docs.map((docu) => deleteDoc(doc(DB, "comments", docu.id)));

  const reactionsQuery = query(collection(DB, "reactions"), where("recipeId", "==", id));
  const reactionsSnapshot = await getDocs(reactionsQuery);
  const reactionDeletions = reactionsSnapshot.docs.map((docu) => deleteDoc(doc(DB, "reactions", docu.id)));

  const userRef = doc(DB,'users',userId);
    await updateDoc(userRef, {
      nrOfRecipes: increment(-1)
    });

  const recipeDeletion = deleteDoc(doc(DB, "recipes", id));

  // 4. Poczekaj na wszystkie operacje
  await Promise.all([...commentDeletions, ...reactionDeletions, recipeDeletion]);
};

//Reaction
export const getNrOfReactionsByRecipeId = async (id: string): Promise<number> => {
  const q = query(
    collection(DB, "reactions"),
    where("objectId", "==", id),
  );

  const snapshot = await getCountFromServer(q);
  const count = snapshot.data().count;

  return typeof count == 'number' ? count : 0;
}

//returns 1 upvoted, 0 - no upvote but reaction exists, -1 - no reaction
export const checkIfAddedReaction = async (objectId: string, userId: string): Promise<number> => {
  const q = query(
    collection(DB, "reactions"),
    where("objectId", "==", objectId),
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

export const addReaction = async (reaction: Omit<Reaction, 'id'>, forWhatCollection: string): Promise<string> => {
  try {
    const docRef = await addDoc(collection(DB, "reactions"), {
      ...reaction
    });
    const obiectRef = doc(DB, forWhatCollection, reaction.objectId);
    await updateDoc(obiectRef, {
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
    where("objectId", "==", recipeId),
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

export const deleteReactionById = async (reactionId: string, whatCollection: string): Promise<void> =>{
  try{
    const reactionRef = doc(DB, "reactions", reactionId);
    const snapshot = await getDoc(reactionRef);

    if (!snapshot.exists()) {
      throw new Error("Reaction not found");
    }

    const recipeId = snapshot.data().objectId;

    if (!recipeId) {
      throw new Error("Recipe ID not found in reaction data");
    }

    const recipeRef = doc(DB, whatCollection, recipeId);
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
//TODO adding/removing pictures for recipe
export async function uploadImageToCloudinary(imageUri: string) {
  // 2️⃣ Pobierz podpis z backendu
  const signRes = await fetch("http://192.168.1.19:3000/pictures/uploadSign");
  const { timestamp, signature, apiKey, cloudName, uploadPreset } = await signRes.json();

  // 3️⃣ Przygotuj FormData
  const data = new FormData();
  data.append("file", {
    uri: imageUri,
    type: "image/jpeg",
    name: "upload.jpg",
  } as any);
  data.append("api_key", apiKey);
  data.append("timestamp", timestamp.toString());
  data.append("signature", signature);
  data.append("upload_preset", uploadPreset);

  // 4️⃣ Wyślij do Cloudinary
  const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: data,
  });

  const file = await cloudRes.json();
  console.log("Cloudinary URL:", file.secure_url);
  return file.secure_url;
}

const getPublicId = (imageUrl: string) => {
  const regex = /\/upload\/v\d+\/(.+)\.[a-zA-Z0-9]+$/;
  const match = imageUrl.match(regex);
  if (match && match[1]) {
    return match[1];
  }
  return '404';
};

export async function removeImageFromCloudinary(imageUrl: string){
  try{
    const publicId = getPublicId(imageUrl);
    if(publicId === '404') return;

    console.log("Public ID to delete:", publicId);

    const signRes = await fetch(`http://192.168.1.19:3000/pictures/deleteSign?public_id=${encodeURIComponent(publicId)}`);
    const { timestamp, signature, apiKey, cloudName, public_id } = await signRes.json();

    const formData = new FormData();
    formData.append("public_id", public_id);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);

    const cloudRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await cloudRes.json();
    console.log("Cloudinary delete result:", result);
  } catch (error) {
    console.error("Error removing image from Cloudinary:", error);
    throw error;
  }
}

export default createUserProfile;