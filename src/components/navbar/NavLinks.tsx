
import { Home } from 'lucide-react';
import NavItem from './NavItem';

interface NavLinksProps {
  isHomePage: boolean;
  scrollToSection: (sectionId: string) => void;
}

const NavLinks = ({ isHomePage, scrollToSection }: NavLinksProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center">
        <NavItem
          to="/"
          label="Home"
          sectionId="hero"
          icon={Home}
          isHomePage={isHomePage}
          scrollToSection={scrollToSection}
        />
      </div>
      
      <div className="flex space-x-8 items-center ml-8">
        <NavItem
          to="/#features"
          label="Features"
          sectionId="features"
          isHomePage={isHomePage}
          scrollToSection={scrollToSection}
        />
        
        <NavItem
          to="/#how-it-works"
          label="How it works"
          sectionId="how-it-works"
          isHomePage={isHomePage}
          scrollToSection={scrollToSection}
        />
        
        <NavItem
          to="/#pricing"
          label="Pricing"
          sectionId="pricing"
          isHomePage={isHomePage}
          scrollToSection={scrollToSection}
        />
      </div>
    </div>
  );
};

export default NavLinks;
