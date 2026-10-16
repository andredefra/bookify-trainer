
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import type { Language } from '@/translations';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturesGrid from '@/components/home/FeaturesGrid';
import HowItWorksSteps from '@/components/home/HowItWorksSteps';
import PricingSection from '@/components/PricingSection';
import GymStudioSection from '@/components/home/GymStudioSection';
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

  useEffect(() => {
    document.documentElement.lang = language;

    const updateLink = (selector: string, attributes: Record<string, string>) => {
      let link = document.head.querySelector<HTMLLinkElement>(selector);
      if (!link) {
        link = document.createElement('link');
        document.head.appendChild(link);
      }
      Object.entries(attributes).forEach(([name, value]) => {
        link.setAttribute(name, value);
      });
    };

    updateLink('link[rel="canonical"]', { rel: 'canonical', href: canonical });
    const alternates = {
      it: 'https://mypersonal.fit/',
      en: 'https://mypersonal.fit/en',
      'x-default': 'https://mypersonal.fit/',
    };
    Object.entries(alternates).forEach(([hreflang, href]) => {
      updateLink(`link[rel="alternate"][hreflang="${hreflang}"]`, {
        rel: 'alternate', hreflang, href,
      });
    });
  }, [language, canonical]);

  if (redirectToEnglish) {
    return <Navigate to={`/en${location.search}${location.hash}`} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div id="hero">
          <Hero />
        </div>
        <FeaturesGrid />
        <HowItWorksSteps />
        <PricingSection />
        <GymStudioSection />
        <RegistrationCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
