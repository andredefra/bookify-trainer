
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import PricingSection from '@/components/PricingSection';
import RegistrationCTA from '@/components/RegistrationCTA';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

const Index = () => {
  const { setLanguage } = useLanguage();
  
  // Scroll to the top when the page loads and set language to English
  useEffect(() => {
    window.scrollTo(0, 0);
    setLanguage('en');
  }, [setLanguage]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div id="hero">
          <Hero />
        </div>
        <Features />
        <HowItWorks />
        <PricingSection />
        <RegistrationCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
