
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const AuthButtons = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center space-x-4">
      <Link
        to="/login"
        className="px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/5 rounded-full"
      >
        {t('auth.login')}
      </Link>
      <Link
        to="/register"
        className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors rounded-full"
      >
        {t('auth.register')}
      </Link>
    </div>
  );
};

export default AuthButtons;
