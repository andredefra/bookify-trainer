import { useState, useEffect } from 'react';
import { Menu, X, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) {
      // If not on home page, navigate to home page with hash
      return;
    }
    
    setMobileMenuOpen(false); // Close mobile menu if open
    
    if (sectionId === 'hero') {
      // Scroll to top for hero section
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 lg:px-10 ${
        scrolled ? 'py-3 glass' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-primary"
        >
          <span className="font-display text-2xl font-bold tracking-tight">Personal.ai</span>
        </Link>
        
        {!isMobile ? (
          <div className="flex-1 flex justify-center ml-16">
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
          </div>
        ) : (
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-primary rounded-full"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
        
        {!isMobile && (
          <div className="flex items-center space-x-4">
            <Link 
              to="/login" 
              className="px-4 py-2 text-sm font-medium text-primary rounded-full transition-colors"
            >
              Demo Login
            </Link>
            <Link 
              to="/register" 
              className="px-5 py-2 text-sm font-medium text-white bg-primary rounded-full button-hover"
            >
              Try the Demo
            </Link>
          </div>
        )}
      </div>
      
      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] glass z-50 animate-fade-in flex flex-col items-center pt-10">
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
