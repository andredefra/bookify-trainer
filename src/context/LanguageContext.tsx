
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language, translations } from '@/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  console.log("LanguageProvider rendering");
  // Check if there's a language preference in localStorage
  const getSavedLanguage = (): Language => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      return (saved === 'en' || saved === 'it') ? saved as Language : 'en';
    }
    return 'en';
  };

  const [language, setLanguageState] = useState<Language>(getSavedLanguage);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  const t = (key: string): string => {
    if (!translations[language]) {
      console.warn(`Missing translations for language: ${language}`);
      return key;
    }
    
    const translation = translations[language][key as keyof typeof translations[typeof language]];
    if (key === 'footer.copyright') {
      return translation?.replace('{year}', new Date().getFullYear().toString()) || key;
    }
    return translation || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  console.log("useLanguage called");
  const context = useContext(LanguageContext);
  console.log("useLanguage context:", context);
  if (context === undefined) {
    console.error("useLanguage: context is undefined! This means the component is not wrapped in LanguageProvider");
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
