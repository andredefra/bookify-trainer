
import { Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

interface MobileLanguageSelectorProps {
  onLanguageChange: () => void;
}

const MobileLanguageSelector = ({ onLanguageChange }: MobileLanguageSelectorProps) => {
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleLanguageChange = (lang: 'en' | 'it') => {
    setLanguage(lang);
    const currentPath = window.location.pathname;
    
    setTimeout(() => {
      if (currentPath === '/user' || currentPath === '/user-en') {
        navigate(lang === 'en' ? '/user-en' : '/user');
      } else if (lang === 'en') {
        navigate('/');
      } else {
        navigate('/it');
      }
    }, 100);
    
    if (onLanguageChange) {
      onLanguageChange();
    }
  };

  return (
    <div className="bg-accent/30 py-2 px-2 rounded-lg border border-border/40 mb-5">
      <div className="flex flex-col space-y-2">
        <span className="text-sm font-medium">{t('nav.selectLanguage')}:</span>
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
              <div className="w-5 h-4 flex items-center justify-center relative overflow-hidden rounded-sm border-[0.5px] border-gray-300">
                <img 
                  src="/lovable-uploads/368261f4-bf4e-430f-9556-dfe2c0a73c98.png" 
                  alt="UK flag" 
                  className="w-full h-full object-cover"
                />
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
  );
};

export default MobileLanguageSelector;
