
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const AuthButtons = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center space-x-4">
      <Link
        to="/login"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-accent transition-colors duration-200 focus:outline-none border border-border/40 shadow-sm bg-background text-sm font-medium"
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
