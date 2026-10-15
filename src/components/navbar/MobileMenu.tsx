
import { useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import MobileNavLinks from './MobileNavLinks';
import { useLanguage } from '@/context/LanguageContext';
import MobileMenuHeader from './mobile/MobileMenuHeader';
import LanguageSwitcher from '../LanguageSwitcher';
import MobileAuthButtons from './mobile/MobileAuthButtons';

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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  
  const handleOpenMenu = () => {
    setMobileMenuOpen(true);
  };
  
  const handleCloseMenu = () => {
    setMobileMenuOpen(false);
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
        className="relative z-50 text-brand-text" 
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
          className="trainer-brand p-0 w-full max-w-sm overflow-y-auto bg-brand-canvas text-brand-text border-l border-brand-border [&>button]:hidden"
        >
          <div className="p-5 flex flex-col h-full bg-brand-canvas">
            <MobileMenuHeader onClose={handleCloseMenu} />
            
            <MobileNavLinks 
              isHomePage={isHomePage} 
              scrollToSection={scrollToSection} 
              setMobileMenuOpen={setMobileMenuOpen} 
              className="mb-4"
            />
            
            <div className="mb-5">
              <LanguageSwitcher theme="trainer" onChange={handleCloseMenu} align="center" className="w-full justify-center" />
            </div>
            
            <MobileAuthButtons onButtonClick={handleCloseMenu} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileMenu;
