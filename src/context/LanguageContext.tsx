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
      return (saved === 'en' || saved === 'it' || saved === 'in') ? saved as Language : 'en'; // Default to English
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

  // Routes that map to a locale determine the rendered language without saving an inferred choice.
  const routeLanguageFor = (path: string): Language | null =>
    path === '/' || path === '/user' || path === '/user-find-trainer' || path === '/prossimamente' ? 'it'
    : path === '/en' || path === '/user-en' || path === '/user-find-trainer-en' || path === '/coming-soon' ? 'en'
    : path === '/in' || path.startsWith('/in-') ? 'in'
    : null;

  const isLang = (v: unknown): v is Language => v === 'it' || v === 'en' || v === 'in';

  const [rememberedRouteLanguage, setRememberedRouteLanguage] = useState<Language | null>(() => {
    try {
      const v = sessionStorage.getItem('routeLanguage');
      return isLang(v) ? v : null;
    } catch { return null; }
  });
  // Language explicitly picked with the selector on the current (neutral) page.
  const [pickedOnPage, setPickedOnPage] = useState<{ path: string; lang: Language } | null>(null);

  const mappedLanguage = routeLanguageFor(location.pathname);

  useEffect(() => {
    if (!mappedLanguage) return;
    setRememberedRouteLanguage(mappedLanguage);
    try { sessionStorage.setItem('routeLanguage', mappedLanguage); } catch { /* ignore */ }
  }, [mappedLanguage]);

  const neutralFallback = (): Language => {
    if (pickedOnPage && pickedOnPage.path === location.pathname) return pickedOnPage.lang;
    if (rememberedRouteLanguage) return rememberedRouteLanguage;
    try {
      const saved = localStorage.getItem('language');
      if (isLang(saved)) return saved;
    } catch { /* ignore */ }
    if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('it')) return 'it';
    return 'en';
  };

  const language: Language = mappedLanguage
    ?? (location.pathname === '/dashboard' ? preferredLanguage : neutralFallback());

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
    setPickedOnPage({ path: window.location.pathname, lang: newLanguage });
    try { localStorage.setItem('language', newLanguage); } catch { /* ignore */ }
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
