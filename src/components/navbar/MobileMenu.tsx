
import { Menu, X } from 'lucide-react';
import { useEffect } from 'react';
import MobileNavLinks from './MobileNavLinks';
import BrandLogo from './BrandLogo';

interface MobileMenuProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  isHomePage: boolean;
  scrollToSection: (sectionId: string) => void;
}

const MobileMenu = ({ 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  isHomePage,
  scrollToSection 
}: MobileMenuProps) => {
  
  // Add effect to prevent scrolling when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      // Disable scrolling on body
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when menu closes
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup function to ensure scroll is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="p-2 text-primary rounded-full"
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] z-50 bg-background">
          <div className="h-full overflow-y-auto">
            <MobileNavLinks
              isHomePage={isHomePage}
              scrollToSection={scrollToSection}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
