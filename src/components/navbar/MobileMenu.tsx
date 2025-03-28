
import { useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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
  const { t } = useLanguage();
  
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

  return (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button variant="ghost" size="icon" className="relative">
          {!mobileMenuOpen ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0 w-full max-w-xs">
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="font-display text-xl font-bold text-primary">
              Personal.ai
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="mb-6">
            <MobileNavLinks 
              isHomePage={isHomePage} 
              scrollToSection={scrollToSection} 
              setMobileMenuOpen={setMobileMenuOpen} 
            />
          </div>
          
          {/* Language toggle in mobile menu */}
          <div className="mt-4 mb-6">
            <LanguageToggle className="w-full" />
          </div>
          
          <div className="mt-auto flex flex-col gap-3">
            <Link to="/login" className="w-full">
              <Button variant="outline" className="w-full" size="lg">
                {t('auth.login')}
              </Button>
            </Link>
            <Link to="/register" className="w-full">
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
