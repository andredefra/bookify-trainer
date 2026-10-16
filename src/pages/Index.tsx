
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturesGrid from '@/components/home/FeaturesGrid';
import HowItWorksSteps from '@/components/home/HowItWorksSteps';
import PricingSection from '@/components/PricingSection';
import RegistrationCTA from '@/components/RegistrationCTA';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

const Index = () => {
  const { setLanguage } = useLanguage();
  
  // Scroll to the top when the page loads and set language to English
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set language to English with a small delay to ensure provider is ready
    const timer = setTimeout(() => {
      setLanguage('en');
    }, 0);
    
    return () => clearTimeout(timer);
  }, [setLanguage]);

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
        <RegistrationCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
