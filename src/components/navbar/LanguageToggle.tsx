
import { useLanguage } from '@/context/LanguageContext';
import { Languages } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle = ({ className }: LanguageToggleProps) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`flex items-center ${className || ''}`}>
      <ToggleGroup type="single" value={language} onValueChange={(value) => value && setLanguage(value as 'en' | 'it')}>
        <ToggleGroupItem value="en" aria-label="Toggle English" className="px-2 py-1 h-8">
          <span className="flex items-center gap-1">
            <span className="text-xs">🇬🇧</span>
            <span className="text-xs hidden md:inline">EN</span>
          </span>
        </ToggleGroupItem>
        <ToggleGroupItem value="it" aria-label="Toggle Italian" className="px-2 py-1 h-8">
          <span className="flex items-center gap-1">
            <span className="text-xs">🇮🇹</span>
            <span className="text-xs hidden md:inline">IT</span>
          </span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default LanguageToggle;
