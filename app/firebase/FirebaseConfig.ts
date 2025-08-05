import { firebaseConfigObj } from '@/firebaseconfigobject';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
// @ts-ignore – getReactNativePersistence is not recognized by TypeScript for some reason but doesn't affect the app functionality
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig =firebaseConfigObj;

export const FIREBASEAPP = initializeApp(firebaseConfig);
export const AUTH = initializeAuth(FIREBASEAPP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const DB = getFirestore(FIREBASEAPP);