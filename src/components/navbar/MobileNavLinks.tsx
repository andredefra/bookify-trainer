import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import NavItem from './NavItem';

interface MobileNavLinksProps {
  isHomePage: boolean;
  scrollToSection: (sectionId: string) => void;
  setMobileMenuOpen: (isOpen: boolean) => void;
}

const MobileNavLinks = ({ isHomePage, scrollToSection, setMobileMenuOpen }: MobileNavLinksProps) => {
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="flex flex-col items-center p-6 space-y-4 w-full h-full overflow-y-auto">
      <div className="flex justify-center w-full">
        <NavItem
          to="/"
          label="Home"
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
          label="Features"
          sectionId="features"
          isHomePage={isHomePage}
          isMobile={true}
          scrollToSection={scrollToSection}
          onClick={closeMobileMenu}
          className="justify-center"
        />
        
        <NavItem
          to="/#how-it-works"
          label="How it works"
          sectionId="how-it-works"
          isHomePage={isHomePage}
          isMobile={true}
          scrollToSection={scrollToSection}
          onClick={closeMobileMenu}
          className="justify-center"
        />
        
        <NavItem
          to="/#pricing"
          label="Pricing"
          sectionId="pricing"
          isHomePage={isHomePage}
          isMobile={true}
          scrollToSection={scrollToSection}
          onClick={closeMobileMenu}
          className="justify-center"
        />
      </div>
      
      <div className="pt-6 w-full flex flex-col space-y-4">
        <Link 
          to="/login" 
          className="w-full py-3 text-center text-primary font-medium border border-primary/20 rounded-full"
          onClick={closeMobileMenu}
        >
          Demo Login
        </Link>
        <Link 
          to="/register" 
          className="w-full py-3 text-center text-white font-medium bg-primary rounded-full"
          onClick={closeMobileMenu}
        >
          Try the Demo
        </Link>
      </div>
    </div>
  );
};

export default MobileNavLinks;
