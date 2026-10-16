
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import type { Language } from '@/translations';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturesGrid from '@/components/home/FeaturesGrid';
import HowItWorksSteps from '@/components/home/HowItWorksSteps';
import PricingSection from '@/components/PricingSection';
import RegistrationCTA from '@/components/RegistrationCTA';
import Footer from '@/components/Footer';

const Index = ({ language }: { language: Language }) => {
  const location = useLocation();
  const savedLanguage = localStorage.getItem('language');
  const browserLanguage = navigator.languages?.[0] || navigator.language;
  const redirectToEnglish = location.pathname === '/' && (
    savedLanguage === 'en' ||
    (savedLanguage === null && !browserLanguage?.toLowerCase().startsWith('it'))
  );
  const canonical = `https://mypersonal.fit${language === 'it' ? '/' : '/en'}`;
  
  // Language comes from the route, not a timer or a stored default.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [language]);

  if (redirectToEnglish) {
    return <Navigate to={`/en${location.search}${location.hash}`} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet htmlAttributes={{ lang: language }}>
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="it" href="https://mypersonal.fit/" />
        <link rel="alternate" hrefLang="en" href="https://mypersonal.fit/en" />
        <link rel="alternate" hrefLang="x-default" href="https://mypersonal.fit/" />
      </Helmet>
      <Navbar />
      
      <main className="flex-grow">
        <div id="hero">
          <Hero />
        </div>
        <FeaturesGrid />
        <HowItWorksSteps />
        <PricingSection />
        <RegistrationCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
