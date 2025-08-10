import { languages } from '@/data/lang-data';
import { themes } from '@/data/theme-data';
import React, { createContext, useEffect, useState } from 'react';

// Typ jednego języka (np. en.ts)
type LanguageData = typeof languages['en'];
type ThemeData = typeof themes['dark'];

type UserPrefsContextType = {
  lang: keyof typeof languages;
  textData: LanguageData;
  setLang: (lang: keyof typeof languages) => void;

  theme: keyof typeof themes;
  themeData: ThemeData;
  setTheme: (theme: keyof typeof themes) => void;
};

export const UserPrefsContext = createContext<UserPrefsContextType>({
  lang: 'en',
  textData: languages.en,
  setLang: () => {},

  theme: 'dark',
  themeData: themes.dark,
  setTheme: () => {},
});

export const UserPrefsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<keyof typeof languages>('en');
  const [theme, setTheme] = useState<keyof typeof themes>('dark');

  const textData = languages[lang];
  const themeData = themes[theme];

  useEffect(() => {
    const fetchUserPrefs = () => {
      //TODO add userPrefs to databes to fetch language and other prefs
      setLang('pl');
      setTheme('dark');
    };

    fetchUserPrefs();
  }, []);

  return (
    <UserPrefsContext.Provider value={{ lang, textData, setLang, theme, themeData, setTheme }}>
      {children}
    </UserPrefsContext.Provider>
  );
};
