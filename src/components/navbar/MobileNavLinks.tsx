
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import NavItem from './NavItem';
import { useLanguage } from '@/context/LanguageContext';

interface MobileNavLinksProps {
  isHomePage: boolean;
  scrollToSection: (sectionId: string) => void;
  setMobileMenuOpen: (isOpen: boolean) => void;
  className?: string;
}

const MobileNavLinks = ({ isHomePage, scrollToSection, setMobileMenuOpen, className = '' }: MobileNavLinksProps) => {
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const { t } = useLanguage();

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className="flex justify-center w-full">
        <NavItem
          to="/"
          label={t('nav.home')}
          sectionId="hero"
          icon={Home}
          isHomePage={isHomePage}
          isMobile={true}
          scrollToSection={scrollToSection}
          onClick={closeMobileMenu}
          className="justify-center"
        />
      </div>
      
      <div className="w-full flex flex-col items-center space-y-4 mt-2">
        <NavItem
          to="/#features"
          label={t('nav.features')}
          sectionId="features"
          isHomePage={isHomePage}
          isMobile={true}
          scrollToSection={scrollToSection}
          onClick={closeMobileMenu}
          className="justify-center"
        />
        
        <NavItem
          to="/#how-it-works"
          label={t('nav.howItWorks')}
          sectionId="how-it-works"
          isHomePage={isHomePage}
          isMobile={true}
          scrollToSection={scrollToSection}
          onClick={closeMobileMenu}
          className="justify-center"
        />
        
        <NavItem
          to="/#pricing"
          label={t('nav.pricing')}
          sectionId="pricing"
          isHomePage={isHomePage}
          isMobile={true}
          scrollToSection={scrollToSection}
          onClick={closeMobileMenu}
          className="justify-center"
        />
      </div>
    </div>
  );
};

export default MobileNavLinks;
