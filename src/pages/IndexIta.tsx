
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import PricingSection from '@/components/PricingSection';
import RegistrationCTA from '@/components/RegistrationCTA';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';

const IndexIta = () => {
  // Scroll to the top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set language to Italian when this page loads
    localStorage.setItem('language', 'it');
  }, []);

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

export default IndexIta;
