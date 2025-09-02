
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

interface MobileAuthButtonsProps {
  onButtonClick: () => void;
}

const MobileAuthButtons = ({ onButtonClick }: MobileAuthButtonsProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col space-y-3 mt-auto">
      <Link 
        to="/login" 
        className="w-full block"
        onClick={onButtonClick}
      >
        <Button variant="outline" className="w-full" size="lg">
          {t('auth.login')}
        </Button>
      </Link>
      <Link 
        to="/dashboard" 
        className="w-full block"
        onClick={onButtonClick}
      >
        <Button className="w-full" size="lg">
          {t('auth.register')}
        </Button>
      </Link>
    </div>
  );
};

export default MobileAuthButtons;
