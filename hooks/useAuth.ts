import { AUTH, DB } from '@/firebase/FirebaseConfig';
import { User } from "@/models/User";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  useEffect(() => {
    let unsubscribeUserDoc: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(
      AUTH,
      (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          const userRef = doc(DB, "users", firebaseUser.uid);
          unsubscribeUserDoc = onSnapshot(userRef, (snapshot) => {
            if (snapshot.exists()) {
              setUser({ uid: firebaseUser.uid, ...snapshot.data() } as User);
            } else {
              setUser(null);
            }
            setLoadingUser(false);
          });
        } else {
          setUser(null);
          setLoadingUser(false);
          if (unsubscribeUserDoc) {
            unsubscribeUserDoc();
            unsubscribeUserDoc = null;
          }
        }
      }
    );

    return () => {
      unsubscribeAuth();
      if (unsubscribeUserDoc) unsubscribeUserDoc();
    };
  }, []);

  return { user, loadingUser };
};
