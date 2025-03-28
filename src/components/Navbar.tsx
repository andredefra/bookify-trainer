
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';
import BrandLogo from './navbar/BrandLogo';
import NavLinks from './navbar/NavLinks';
import AuthButtons from './navbar/AuthButtons';
import MobileMenu from './navbar/MobileMenu';
import LanguageToggle from './navbar/LanguageToggle';
import { useScrollHandler } from './navbar/useScrollHandler';
import { useSectionScroll } from './navbar/useSectionScroll';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const scrolled = useScrollHandler();
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/' || location.pathname === '/it';
  
  // Get scroll to section function
  const scrollToSection = useSectionScroll(isHomePage, setMobileMenuOpen);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 lg:px-10 ${
        scrolled ? 'py-3 glass' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <BrandLogo />
        
        {!isMobile ? (
          <div className="flex-1 flex justify-center">
            <NavLinks isHomePage={isHomePage} scrollToSection={scrollToSection} />
          </div>
        ) : null}
        
        <div className="flex items-center gap-3">
          <LanguageToggle />
          {!isMobile && <AuthButtons />}
        </div>
        
        {isMobile && (
          <div className="ml-auto">
            <MobileMenu 
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              isHomePage={isHomePage}
              scrollToSection={scrollToSection}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
