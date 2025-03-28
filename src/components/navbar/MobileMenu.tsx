
import { useEffect } from 'react';
import { Menu, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import MobileNavLinks from './MobileNavLinks';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/context/LanguageContext';

interface MobileMenuProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isHomePage: boolean;
  scrollToSection: (section: string) => void;
}

const MobileMenu = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  isHomePage,
  scrollToSection,
}: MobileMenuProps) => {
  const { t, language, setLanguage } = useLanguage();
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen, setMobileMenuOpen]);

  const handleLanguageChange = () => {
    const newLanguage = language === 'en' ? 'it' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button variant="ghost" size="icon" className="relative">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0 w-full max-w-xs">
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="font-display text-xl font-bold text-primary">
              Personal.ai
            </Link>
            
            {/* Language toggle button directly in the header */}
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2 px-3" 
              onClick={handleLanguageChange}
            >
              <Globe className="h-4 w-4" />
              <span>{language === 'en' ? '🇬🇧' : '🇮🇹'}</span>
            </Button>
          </div>
          
          <div className="mb-6">
            <MobileNavLinks 
              isHomePage={isHomePage} 
              scrollToSection={scrollToSection} 
              setMobileMenuOpen={setMobileMenuOpen} 
            />
          </div>
          
          <div className="flex flex-col space-y-3 mt-auto">
            <Link to="/login" className="w-full block">
              <Button variant="outline" className="w-full" size="lg">
                {t('auth.login')}
              </Button>
            </Link>
            <Link to="/register" className="w-full block">
              <Button className="w-full" size="lg">
                {t('auth.register')}
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
