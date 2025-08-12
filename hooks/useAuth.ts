// src/hooks/useAuth.ts

import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { AUTH } from "../firebase/FirebaseConfig";
import { getUserProfile } from "../firebase/firebaseDB";
import { User } from "../models/User";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(AUTH, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const profile = await getUserProfile(firebaseUser.uid);
        if (profile) {
          setUser({ uid: firebaseUser.uid, ...profile } as User);
        }
      } else {
        setUser(null);
      }
      setLoadingUser(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loadingUser };
};
