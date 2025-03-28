import { useEffect, useRef } from 'react';
import { Menu, Globe, X, Flag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetClose } from '@/components/ui/sheet';
import MobileNavLinks from './MobileNavLinks';
import { useLanguage } from '@/context/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const navigate = useNavigate();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  
  const handleLanguageChange = (lang: 'en' | 'it') => {
    setMobileMenuOpen(false);
    setLanguage(lang);
    setTimeout(() => {
      if (lang === 'en') {
        navigate('/');
      } else {
        navigate('/it');
      }
    }, 100);
  };

  const handleOpenMenu = () => {
    setMobileMenuOpen(true);
  };
  
  useEffect(() => {
    const resetMenu = () => {
      setMobileMenuOpen(false);
    };
    
    window.addEventListener('popstate', resetMenu);
    
    return () => {
      window.removeEventListener('popstate', resetMenu);
    };
  }, [setMobileMenuOpen]);

  return (
    <>
      <Button 
        ref={menuButtonRef}
        variant="ghost" 
        size="icon" 
        className="fixed relative z-50" 
        onClick={handleOpenMenu}
        aria-label={t('nav.openMenu') || "Open menu"}
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      <Sheet 
        open={mobileMenuOpen} 
        onOpenChange={setMobileMenuOpen}
      >
        <SheetContent 
          side="right" 
          className="p-0 w-full max-w-xs overflow-y-auto"
        >
          <div className="p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-5">
              <Link 
                to="/" 
                className="font-display text-xl font-bold text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Personal.ai
              </Link>
              <SheetClose asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  aria-label={t('nav.closeMenu') || "Close menu"}
                >
                  <X className="h-4 w-4" />
                </Button>
              </SheetClose>
            </div>
            
            <MobileNavLinks 
              isHomePage={isHomePage} 
              scrollToSection={scrollToSection} 
              setMobileMenuOpen={setMobileMenuOpen} 
              className="mb-4"
            />
            
            <div className="bg-accent/30 py-2 px-2 rounded-lg border border-border/40 mb-5">
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium">{t('nav.selectLanguage') || 'Select language'}:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between bg-background"
                    >
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>{language === 'en' ? 'UK' : 'IT'}</span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="center"
                    className="w-[200px] bg-background"
                  >
                    <DropdownMenuItem 
                      className={`flex items-center gap-2 cursor-pointer ${language === 'en' ? 'bg-accent/30' : ''}`}
                      onClick={() => handleLanguageChange('en')}
                    >
                      <div className="w-5 h-4 flex items-center justify-center relative overflow-hidden rounded-sm">
                        <Flag className="h-4 w-4 text-blue-800" />
                      </div>
                      <span className="text-sm">UK</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={`flex items-center gap-2 cursor-pointer ${language === 'it' ? 'bg-accent/30' : ''}`}
                      onClick={() => handleLanguageChange('it')}
                    >
                      <div className="w-5 h-4 flex items-center justify-center relative overflow-hidden rounded-sm border-[0.5px] border-gray-300">
                        <div className="absolute inset-0 grid grid-cols-3">
                          <div className="bg-green-600"></div>
                          <div className="bg-white"></div>
                          <div className="bg-red-600"></div>
                        </div>
                      </div>
                      <span className="text-sm">IT</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3 mt-auto">
              <Link 
                to="/login" 
                className="w-full block"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button variant="outline" className="w-full" size="lg">
                  {t('auth.login')}
                </Button>
              </Link>
              <Link 
                to="/register" 
                className="w-full block"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full" size="lg">
                  {t('auth.register')}
                </Button>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileMenu;
