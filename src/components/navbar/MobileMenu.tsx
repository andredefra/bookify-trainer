
import { useEffect } from 'react';
import { Menu, Globe, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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
  
  const handleLanguageChange = (lang: 'en' | 'it') => {
    setLanguage(lang);
    
    // Navigate to the appropriate route
    if (lang === 'en') {
      navigate('/');
    } else {
      navigate('/it');
    }
  };

  return (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" onClick={(e) => e.stopPropagation()}>
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0 w-full max-w-xs">
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-5">
            <Link to="/" className="font-display text-xl font-bold text-primary">
              Personal.ai
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close</span>
              <X className="h-4 w-4" />
            </Button>
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
                <DropdownMenuTrigger 
                  asChild
                >
                  <Button 
                    variant="outline" 
                    className="w-full justify-between bg-background"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>{language === 'en' ? '🇬🇧 English' : '🇮🇹 Italiano'}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="w-[200px] bg-background"
                >
                  <DropdownMenuItem 
                    className={`flex items-center gap-2 cursor-pointer ${language === 'en' ? 'bg-accent/30' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLanguageChange('en');
                    }}
                  >
                    <span className="text-base mr-1">🇬🇧</span>
                    <span className="text-sm">English</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className={`flex items-center gap-2 cursor-pointer ${language === 'it' ? 'bg-accent/30' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLanguageChange('it');
                    }}
                  >
                    <span className="text-base mr-1">🇮🇹</span>
                    <span className="text-sm">Italiano</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
