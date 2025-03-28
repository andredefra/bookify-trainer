
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';
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

  return (
    <div className={`flex items-center ${className || ''}`}>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-accent transition-colors duration-200 focus:outline-none">
          <Globe className="h-4 w-4" />
          <span className="text-sm font-medium hidden md:inline">
            {language === 'en' ? '🇬🇧 EN' : '🇮🇹 IT'}
          </span>
          <span className="text-sm font-medium md:hidden">
            {language === 'en' ? '🇬🇧' : '🇮🇹'}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setLanguage('en')}
          >
            <span className="text-sm">🇬🇧</span>
            <span className="text-sm">English</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setLanguage('it')}
          >
            <span className="text-sm">🇮🇹</span>
            <span className="text-sm">Italiano</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageToggle;
