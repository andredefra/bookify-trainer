
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

interface NavLinksProps {
  isHomePage: boolean;
  scrollToSection: (sectionId: string) => void;
}

const NavLinks = ({ isHomePage, scrollToSection }: NavLinksProps) => {
  return (
    <div className="flex space-x-8 items-center">
      {isHomePage ? (
        <button 
          onClick={() => scrollToSection('hero')} 
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
        >
          <Home size={16} />
          Home
        </button>
      ) : (
        <Link 
          to="/" 
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
        >
          <Home size={16} />
          Home
        </Link>
      )}
      {isHomePage ? (
        <button 
          onClick={() => scrollToSection('features')} 
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Features
        </button>
      ) : (
        <Link 
          to="/#features" 
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Features
        </Link>
      )}
      {isHomePage ? (
        <button 
          onClick={() => scrollToSection('how-it-works')} 
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          How it works
        </button>
      ) : (
        <Link 
          to="/#how-it-works" 
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          How it works
        </Link>
      )}
      {isHomePage ? (
        <button 
          onClick={() => scrollToSection('pricing')} 
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Pricing
        </button>
      ) : (
        <Link 
          to="/#pricing" 
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Pricing
        </Link>
      )}
    </div>
  );
};

export default NavLinks;
