import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { AUTH } from "./FirebaseConfig";

export const registerUser = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(AUTH, email, password);
};

export const loginUser = async (email: string, password: string) => {
  return signInWithEmailAndPassword(AUTH, email, password);
};

export const logoutUser = async () => {
  return signOut(AUTH);
};
