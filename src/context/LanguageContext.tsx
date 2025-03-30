
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language, translations } from '@/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Check if there's a language preference in localStorage
  const getSavedLanguage = (): Language => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      return (saved === 'en' || saved === 'it') ? saved as Language : 'en';
    }
    return 'en';
  };

  const [language, setLanguage] = useState<Language>(getSavedLanguage);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

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
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
