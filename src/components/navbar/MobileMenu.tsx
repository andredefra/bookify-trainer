
import { Menu, X } from 'lucide-react';
import MobileNavLinks from './MobileNavLinks';

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
  return (
    <>
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="p-2 text-primary rounded-full"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] glass z-50 animate-fade-in flex flex-col items-center pt-10">
          <MobileNavLinks
            isHomePage={isHomePage}
            scrollToSection={scrollToSection}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        </div>
      )}
    </>
  );
};

export default MobileMenu;
