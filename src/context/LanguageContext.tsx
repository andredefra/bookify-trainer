// Language context provider
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Language, translations } from '@/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  // Check if there's a language preference in localStorage
  const getSavedLanguage = (): Language => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      
      // Se siamo su /user, forza italiano come default
      if (currentPath === '/user') {
        return 'it';
      }
      
      // Se siamo su /user-en, forza inglese
      if (currentPath === '/user-en') {
        return 'en';
      }
      
      // Se siamo su /dashboard (trainer), forza inglese
      if (currentPath === '/dashboard') {
        return 'en';
      }
      
      const saved = localStorage.getItem('language');
      return (saved === 'en' || saved === 'it') ? saved as Language : 'en'; // Default to English
    }
    return 'en'; // Default to English
  };

  const [preferredLanguage, setLanguageState] = useState<Language>(() => {
    // Forza la lingua in base alla route alla prima inizializzazione
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      if (currentPath === '/user') {
        return 'it';
      }
      if (currentPath === '/user-en') {
        return 'en';
      }
      if (currentPath === '/dashboard') {
        return 'en'; // Force English for trainer dashboard
      }
    }
    return getSavedLanguage();
  });

  // Home URLs determine the rendered language without saving an inferred choice.
  const language = location.pathname === '/' ? 'it'
    : location.pathname === '/en' ? 'en'
    : location.pathname === '/user-find-trainer' ? 'it'
    : location.pathname === '/user-find-trainer-en' ? 'en'
    : location.pathname === '/prossimamente' ? 'it'
    : location.pathname === '/coming-soon' ? 'en'
    : preferredLanguage;

  // Forza la lingua in base alla route quando cambia
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === '/user' && language !== 'it') {
      setLanguageState('it');
    } else if (currentPath === '/user-en' && language !== 'en') {
      setLanguageState('en');
    } else if (currentPath === '/dashboard' && language !== 'en') {
      setLanguageState('en'); // Force English for trainer dashboard
    }
  }, [location.pathname, language]);

  // Only an explicit selection is a saved preference, never browser detection.
  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLanguage);
    }
  }, []);

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
