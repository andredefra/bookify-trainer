
import { Home } from 'lucide-react';
import NavItem from './NavItem';
import { useLanguage } from '@/context/LanguageContext';

interface NavLinksProps {
  isHomePage: boolean;
  scrollToSection: (sectionId: string) => void;
}

const NavLinks = ({ isHomePage, scrollToSection }: NavLinksProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center justify-center w-full mx-auto">
      <div className="flex items-center">
        <NavItem
          to="/"
          label={t('nav.home')}
          sectionId="hero"
          icon={Home}
          isHomePage={isHomePage}
          scrollToSection={scrollToSection}
        />
      </div>
      
      <div className="flex space-x-4 items-center ml-8">
        <NavItem
          to="/#features"
          label={t('nav.features')}
          sectionId="features"
          isHomePage={isHomePage}
          scrollToSection={scrollToSection}
        />
        
        <NavItem
          to="/#how-it-works"
          label={t('nav.howItWorks')}
          sectionId="how-it-works"
          isHomePage={isHomePage}
          scrollToSection={scrollToSection}
        />
        
        <NavItem
          to="/#pricing"
          label={t('nav.pricing')}
          sectionId="pricing"
          isHomePage={isHomePage}
          scrollToSection={scrollToSection}
        />
      </div>
    </div>
  );
};

export default NavLinks;
