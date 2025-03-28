
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
              <div className="absolute inset-0 bg-blue-700">
                <div className="absolute inset-0">
                  {/* UK flag - Union Jack */}
                  <div className="absolute inset-0 bg-blue-700"></div>
                  <div className="absolute inset-0">
                    {/* White diagonal crosses */}
                    <div className="absolute h-[2px] w-[200%] bg-white top-0 left-[-50%] origin-center rotate-45 transform translate-y-[8px]"></div>
                    <div className="absolute h-[2px] w-[200%] bg-white top-0 left-[-50%] origin-center -rotate-45 transform translate-y-[8px]"></div>
                    
                    {/* Red diagonal crosses */}
                    <div className="absolute h-[1px] w-[200%] bg-red-600 top-0 left-[-50%] origin-center rotate-45 transform translate-y-[8px]"></div>
                    <div className="absolute h-[1px] w-[200%] bg-red-600 top-0 left-[-50%] origin-center -rotate-45 transform translate-y-[8px]"></div>
                    
                    {/* White cross */}
                    <div className="absolute h-[40%] w-[8%] bg-white left-[46%] top-0"></div>
                    <div className="absolute h-[8%] w-[40%] bg-white left-[30%] top-[46%]"></div>
                    
                    {/* Red cross */}
                    <div className="absolute h-[20%] w-[5%] bg-red-600 left-[47.5%] top-0"></div>
                    <div className="absolute h-[5%] w-[20%] bg-red-600 left-[40%] top-[47.5%]"></div>
                  </div>
                </div>
              </div>
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
