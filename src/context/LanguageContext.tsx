
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'it';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.howItWorks': 'How it works',
    'nav.pricing': 'Pricing',
    'auth.login': 'Demo Login',
    'auth.register': 'Try the Demo',
    
    // Hero
    'hero.title': 'The all-in-one platform for personal trainers',
    'hero.subtitle': 'Simplify scheduling, payments, and client management in one seamless platform.',
    'hero.cta': 'Try the Demo',
    'hero.secondaryCta': 'See How It Works',
    
    // Features
    'features.title': 'Everything You Need to Grow Your Training Business',
    'features.subtitle': 'Personal.ai streamlines your operations so you can focus on what matters most: your clients.',
    
    // How it works
    'howItWorks.title': 'How It Works',
    'howItWorks.subtitle': 'Getting started is simple. Follow these steps to streamline your training business.',
    'howItWorks.step1.title': 'Create your profile and sync your Google Calendar',
    'howItWorks.step1.description': 'Set up your profile with your services, pricing, and availability. Connect your Google Calendar to sync your existing schedule.',
    'howItWorks.step2.title': 'Share your personal page and set session rules',
    'howItWorks.step2.description': 'Share your custom URL with clients. Set up your working hours, session types, and booking rules.',
    'howItWorks.step3.title': 'Get booked and paid automatically via Stripe',
    'howItWorks.step3.description': 'Clients book available slots and pre-authorize payment. Get paid automatically after sessions are completed.',
    'howItWorks.cta.title': 'Ready to transform your training business?',
    'howItWorks.cta.description': 'Join thousands of personal trainers who have simplified their scheduling and increased their revenue.',
    'howItWorks.cta.button': 'Get Started for Free',
    
    // Pricing
    'pricing.title': 'Simple, Transparent Pricing',
    'pricing.subtitle': 'Choose the plan that works best for your business. No hidden fees or long-term commitments.',
    'pricing.clientsAccess': 'Always free for clients — they access premium features through your subscription',
    'pricing.monthly': 'Monthly',
    'pricing.annual': 'Annual',
    'pricing.save': 'Save 15%',
    'pricing.freemium.title': 'Freemium',
    'pricing.freemium.price': '€0',
    'pricing.freemium.period': '/month',
    'pricing.freemium.fee': '+ 5% transaction fee',
    'pricing.freemium.cta': 'Start for Free',
    'pricing.pro.title': 'Pro',
    'pricing.pro.price': '€29',
    'pricing.pro.priceAnnual': '€24',
    'pricing.pro.period': '/month',
    'pricing.pro.fee': '+ 2.5% transaction fee',
    'pricing.pro.cta': 'Upgrade to Pro',
    'pricing.pro.recommended': 'RECOMMENDED',
    'pricing.features.unlimitedSessions': 'Unlimited Sessions',
    'pricing.features.googleCalendar': 'Google Calendar Integration',
    'pricing.features.personalTrainerPage': 'Personal Trainer Page',
    'pricing.features.clientMessaging': 'Client Messaging',
    'pricing.features.clientManagement': 'Client Management',
    'pricing.features.everythingFreemium': 'Everything in Freemium',
    'pricing.features.lowerFee': 'Lower Transaction Fee (2.5%)',
    'pricing.features.paymentIntegration': 'Payment Integration',
    'pricing.features.prioritySupport': 'Priority Support',
    'pricing.features.advancedAnalytics': 'Advanced Analytics',
    'pricing.features.waitlistManagement': 'Waitlist Management',
    'pricing.features.customPrograms': 'Custom Training Programs',
    'pricing.features.fitnessTracking': 'Fitness Progress Tracking',
    'pricing.disclaimer1': 'All plans include secure payment processing. Transaction fees are charged only on successful payments. You can upgrade, downgrade, or cancel your subscription at any time.',
    'pricing.disclaimer2': 'Your clients never pay for the app — they get access to premium features through your subscription',
    
    // Registration CTA
    'cta.title': 'Be the First to Know When We Launch',
    'cta.description': 'Register for the demo today and get a special discounted price when we officially launch.',
    'cta.button': 'Fill the Form to get Early Access',
    
    // Footer
    'footer.description': 'The all-in-one platform for personal trainers.',
    'footer.copyright': '© {year} mypersonalai ltd. All rights reserved.',
    'footer.product': 'Product',
    'footer.legal': 'Legal'
  },
  it: {
    // Navigation
    'nav.home': 'Home',
    'nav.features': 'Funzionalità',
    'nav.howItWorks': 'Come funziona',
    'nav.pricing': 'Prezzi',
    'auth.login': 'Demo Login',
    'auth.register': 'Prova la Demo',
    
    // Hero
    'hero.title': 'La piattaforma all-in-one per personal trainer',
    'hero.subtitle': 'Semplifica programmazione, pagamenti e gestione dei clienti in un\'unica piattaforma.',
    'hero.cta': 'Prova la Demo',
    'hero.secondaryCta': 'Scopri Come Funziona',
    
    // Features
    'features.title': 'Tutto ciò di cui hai bisogno per far crescere la tua attività',
    'features.subtitle': 'Personal.ai semplifica le tue operazioni così puoi concentrarti su ciò che conta di più: i tuoi clienti.',
    
    // How it works
    'howItWorks.title': 'Come Funziona',
    'howItWorks.subtitle': 'Iniziare è semplice. Segui questi passaggi per ottimizzare la tua attività di training.',
    'howItWorks.step1.title': 'Crea il tuo profilo e sincronizza Google Calendar',
    'howItWorks.step1.description': 'Configura il tuo profilo con i tuoi servizi, prezzi e disponibilità. Connetti il tuo Google Calendar per sincronizzare il tuo programma esistente.',
    'howItWorks.step2.title': 'Condividi la tua pagina personale e imposta le regole',
    'howItWorks.step2.description': 'Condividi il tuo URL personalizzato con i clienti. Imposta i tuoi orari di lavoro, tipi di sessione e regole di prenotazione.',
    'howItWorks.step3.title': 'Ricevi prenotazioni e pagamenti automatici tramite Stripe',
    'howItWorks.step3.description': 'I clienti prenotano gli slot disponibili e pre-autorizzano il pagamento. Ricevi i pagamenti automaticamente dopo il completamento delle sessioni.',
    'howItWorks.cta.title': 'Pronto a trasformare la tua attività di training?',
    'howItWorks.cta.description': 'Unisciti a migliaia di personal trainer che hanno semplificato la loro programmazione e aumentato le entrate.',
    'howItWorks.cta.button': 'Inizia Gratuitamente',
    
    // Pricing
    'pricing.title': 'Prezzi Semplici e Trasparenti',
    'pricing.subtitle': 'Scegli il piano più adatto alla tua attività. Nessuna commissione nascosta o impegno a lungo termine.',
    'pricing.clientsAccess': 'Sempre gratuito per i clienti — accedono alle funzionalità premium tramite il tuo abbonamento',
    'pricing.monthly': 'Mensile',
    'pricing.annual': 'Annuale',
    'pricing.save': 'Risparmia 15%',
    'pricing.freemium.title': 'Freemium',
    'pricing.freemium.price': '€0',
    'pricing.freemium.period': '/mese',
    'pricing.freemium.fee': '+ 5% commissione sulle transazioni',
    'pricing.freemium.cta': 'Inizia Gratis',
    'pricing.pro.title': 'Pro',
    'pricing.pro.price': '€29',
    'pricing.pro.priceAnnual': '€24',
    'pricing.pro.period': '/mese',
    'pricing.pro.fee': '+ 2.5% commissione sulle transazioni',
    'pricing.pro.cta': 'Passa a Pro',
    'pricing.pro.recommended': 'CONSIGLIATO',
    'pricing.features.unlimitedSessions': 'Sessioni Illimitate',
    'pricing.features.googleCalendar': 'Integrazione Google Calendar',
    'pricing.features.personalTrainerPage': 'Pagina Personal Trainer',
    'pricing.features.clientMessaging': 'Messaggistica Cliente',
    'pricing.features.clientManagement': 'Gestione Clienti',
    'pricing.features.everythingFreemium': 'Tutto di Freemium',
    'pricing.features.lowerFee': 'Commissione Ridotta (2.5%)',
    'pricing.features.paymentIntegration': 'Integrazione Pagamenti',
    'pricing.features.prioritySupport': 'Supporto Prioritario',
    'pricing.features.advancedAnalytics': 'Analisi Avanzate',
    'pricing.features.waitlistManagement': 'Gestione Liste d\'Attesa',
    'pricing.features.customPrograms': 'Programmi Personalizzati',
    'pricing.features.fitnessTracking': 'Monitoraggio Progressi Fitness',
    'pricing.disclaimer1': 'Tutti i piani includono elaborazione sicura dei pagamenti. Le commissioni sulle transazioni vengono addebitate solo sui pagamenti riusciti. Puoi aggiornare, declassare o annullare il tuo abbonamento in qualsiasi momento.',
    'pricing.disclaimer2': 'I tuoi clienti non pagano mai per l\'app — ottengono accesso alle funzionalità premium tramite il tuo abbonamento',
    
    // Registration CTA
    'cta.title': 'Sii il Primo a Sapere Quando Lanciamo',
    'cta.description': 'Registrati per la demo oggi e ottieni un prezzo scontato speciale quando lanciamo ufficialmente.',
    'cta.button': 'Compila il Modulo per Accesso Anticipato',
    
    // Footer
    'footer.description': 'La piattaforma all-in-one per personal trainer.',
    'footer.copyright': '© {year} mypersonalai ltd. Tutti i diritti riservati.',
    'footer.product': 'Prodotto',
    'footer.legal': 'Legale'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Check if there's a language preference in localStorage
  const getSavedLanguage = (): Language => {
    const saved = localStorage.getItem('language');
    return (saved === 'en' || saved === 'it') ? saved : 'en';
  };

  const [language, setLanguage] = useState<Language>(getSavedLanguage);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[language][key as keyof typeof translations[typeof language]];
    if (key === 'footer.copyright') {
      return translation?.replace('{year}', new Date().getFullYear().toString()) || key;
    }
    return translation || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
