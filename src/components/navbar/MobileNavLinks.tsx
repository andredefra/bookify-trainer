
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

interface MobileNavLinksProps {
  isHomePage: boolean;
  scrollToSection: (sectionId: string) => void;
  setMobileMenuOpen: (isOpen: boolean) => void;
}

const MobileNavLinks = ({ isHomePage, scrollToSection, setMobileMenuOpen }: MobileNavLinksProps) => {
  return (
    <div className="flex flex-col items-center space-y-8 w-full px-6">
      {isHomePage ? (
        <button 
          onClick={() => scrollToSection('hero')} 
          className="w-full py-3 text-lg font-medium text-center text-primary flex items-center justify-center gap-2"
        >
          <Home size={20} />
          Home
        </button>
      ) : (
        <Link 
          to="/" 
          className="w-full py-3 text-lg font-medium text-center text-primary flex items-center justify-center gap-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Home size={20} />
          Home
        </Link>
      )}
      {isHomePage ? (
        <button 
          onClick={() => scrollToSection('features')} 
          className="w-full py-3 text-lg font-medium text-center text-primary"
        >
          Features
        </button>
      ) : (
        <Link 
          to="/#features" 
          className="w-full py-3 text-lg font-medium text-center text-primary"
          onClick={() => setMobileMenuOpen(false)}
        >
          Features
        </Link>
      )}
      {isHomePage ? (
        <button 
          onClick={() => scrollToSection('how-it-works')} 
          className="w-full py-3 text-lg font-medium text-center text-primary"
        >
          How it works
        </button>
      ) : (
        <Link 
          to="/#how-it-works" 
          className="w-full py-3 text-lg font-medium text-center text-primary"
          onClick={() => setMobileMenuOpen(false)}
        >
          How it works
        </Link>
      )}
      {isHomePage ? (
        <button 
          onClick={() => scrollToSection('pricing')} 
          className="w-full py-3 text-lg font-medium text-center text-primary"
        >
          Pricing
        </button>
      ) : (
        <Link 
          to="/#pricing" 
          className="w-full py-3 text-lg font-medium text-center text-primary"
          onClick={() => setMobileMenuOpen(false)}
        >
          Pricing
        </Link>
      )}
      <div className="pt-4 w-full flex flex-col space-y-3">
        <Link 
          to="/login" 
          className="w-full py-3 text-center text-primary border border-primary/20 rounded-full"
          onClick={() => setMobileMenuOpen(false)}
        >
          Demo Login
        </Link>
        <Link 
          to="/register" 
          className="w-full py-3 text-center text-white bg-primary rounded-full"
          onClick={() => setMobileMenuOpen(false)}
        >
          Try the Demo
        </Link>
      </div>
    </div>
  );
};

export default MobileNavLinks;
