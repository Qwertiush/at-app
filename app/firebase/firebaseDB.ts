import { doc, getDoc, setDoc } from "firebase/firestore";
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
