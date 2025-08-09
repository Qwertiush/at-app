import { languages } from '@/data/lang-data';
import React, { createContext, useEffect, useState } from 'react';

// Typ jednego języka (np. en.ts)
type LanguageData = typeof languages['en'];

type UserPrefsContextType = {
  lang: keyof typeof languages;
  textData: LanguageData;
  setLang: (lang: keyof typeof languages) => void;
};

export const UserPrefsContext = createContext<UserPrefsContextType>({
  lang: 'en',
  textData: languages.en,
  setLang: () => {},
});

export const UserPrefsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<keyof typeof languages>('en');

  const textData = languages[lang];

  useEffect(() => {
    const fetchUserPrefs = () => {
      //TODO add userPrefs to databes to fetch language and other prefs
      setLang('pl'); 
    };

    fetchUserPrefs();
  }, []);

  return (
    <UserPrefsContext.Provider value={{ lang, textData, setLang }}>
      {children}
    </UserPrefsContext.Provider>
  );
};
