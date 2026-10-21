
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

interface MobileAuthButtonsProps {
  onButtonClick: () => void;
}

const MobileAuthButtons = ({ onButtonClick }: MobileAuthButtonsProps) => {
  const { t, language } = useLanguage();
  const { pathname } = useLocation();
  const isLogin = pathname === '/login';
  const home = language === 'it' ? '/' : language === 'in' ? '/in' : '/en';

  return (
    <div className="flex flex-col space-y-3 mt-auto">
      <Link
        to={isLogin ? home : '/login'}
        className="w-full block"
        onClick={onButtonClick}
      >
        <Button className="w-full rounded-full" size="lg">
          {isLogin ? t('auth.backToSite') : t('auth.register')}
        </Button>
      </Link>
    </div>
  );
};

export default MobileAuthButtons;
