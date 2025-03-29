
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
    <div className="flex items-center absolute left-1/2 transform -translate-x-1/2">
      <div className="flex items-center">
        <NavItem
          to="/"
          label={t('nav.home')}
          sectionId="hero"
          icon={Home}
          isHomePage={isHomePage}
          scrollToSection={scrollToSection}
          className="px-3"
        />
      </div>
      
      <div className="flex items-center">
        <NavItem
          to="/#features"
          label={t('nav.features')}
          sectionId="features"
          isHomePage={isHomePage}
          scrollToSection={scrollToSection}
          className="px-3"
        />
        
        <NavItem
          to="/#how-it-works"
          label={t('nav.howItWorks')}
          sectionId="how-it-works"
          isHomePage={isHomePage}
          scrollToSection={scrollToSection}
          className="px-3"
        />
        
        <NavItem
          to="/#pricing"
          label={t('nav.pricing')}
          sectionId="pricing"
          isHomePage={isHomePage}
          scrollToSection={scrollToSection}
          className="px-3"
        />
      </div>
    </div>
  );
};

export default NavLinks;
