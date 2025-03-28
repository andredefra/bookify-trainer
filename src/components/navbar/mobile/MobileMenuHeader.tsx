
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';
import { useLanguage } from '@/context/LanguageContext';

interface MobileMenuHeaderProps {
  onClose: () => void;
}

const MobileMenuHeader = ({ onClose }: MobileMenuHeaderProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center justify-between mb-5">
      <Link 
        to="/" 
        className="font-display text-xl font-bold text-primary"
        onClick={onClose}
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
  );
};

export default MobileMenuHeader;
