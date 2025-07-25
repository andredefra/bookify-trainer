
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle = ({ className }: LanguageToggleProps) => {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleLanguageChange = (lang: 'en' | 'it') => {
    setLanguage(lang);
    const currentPath = window.location.pathname;
    
    if (currentPath === '/user' || currentPath === '/user-en') {
      navigate(lang === 'en' ? '/user-en' : '/user');
    } else {
      navigate(lang === 'en' ? '/' : '/it');
    }
  };

  return (
    <div className={`flex items-center ${className || ''}`}>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-accent transition-colors duration-200 focus:outline-none border border-border/40 shadow-sm bg-background w-full justify-center">
          <Globe className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">
            {language === 'en' ? 'UK' : 'IT'}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36 bg-background">
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
  );
};

export default LanguageToggle;
