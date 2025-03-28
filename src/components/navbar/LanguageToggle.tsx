
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
    
    // Navigate to the appropriate route
    if (lang === 'en') {
      navigate('/');
    } else {
      navigate('/it');
    }
  };

  return (
    <div className={`flex items-center ${className || ''}`}>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-accent transition-colors duration-200 focus:outline-none border border-border/40 shadow-sm bg-primary/10">
          <Globe className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">
            {language === 'en' ? '🇬🇧' : '🇮🇹'}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuItem 
            className={`flex items-center gap-2 cursor-pointer ${language === 'en' ? 'bg-accent/30' : ''}`}
            onClick={() => handleLanguageChange('en')}
          >
            <span className="text-base mr-1">🇬🇧</span>
            <span className="text-sm">English</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={`flex items-center gap-2 cursor-pointer ${language === 'it' ? 'bg-accent/30' : ''}`}
            onClick={() => handleLanguageChange('it')}
          >
            <span className="text-base mr-1">🇮🇹</span>
            <span className="text-sm">Italiano</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageToggle;
