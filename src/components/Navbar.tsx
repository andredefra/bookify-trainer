
import { useState, useEffect } from 'react';
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

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Show desktop menu on PC screens (>=1024px), mobile menu on smaller screens
  const [isDesktopScreen, setIsDesktopScreen] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktopScreen(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const shouldShowMobileMenu = !isDesktopScreen;
  const shouldShowDesktopMenu = isDesktopScreen;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 px-6 lg:px-10 ${
        scrolled ? 'py-3 glass-navbar' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        <div className="flex-none">
          <BrandLogo />
        </div>
        
        {/* Show NavLinks only on desktop screens (>=1024px) */}
        {shouldShowDesktopMenu && (
          <NavLinks isHomePage={isHomePage} scrollToSection={scrollToSection} />
        )}
        
        <div className="flex-none flex items-center gap-3">
          {shouldShowDesktopMenu && <LanguageToggle />}
          {shouldShowDesktopMenu && <AuthButtons />}
        </div>
        
        {shouldShowMobileMenu && (
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
