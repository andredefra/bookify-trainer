import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
const AuthButtons = () => {
  const { t, language } = useLanguage();
  const { pathname } = useLocation();
  const home = language === 'it' ? '/' : language === 'in' ? '/in' : '/en';
  return (
    <div className="flex items-center gap-3">
      {pathname === '/login' ? (
        <Button asChild size="sm" className="rounded-full px-5"><Link to={home}>{t('auth.backToSite')}</Link></Button>
      ) : (
        <Button asChild size="sm" className="rounded-full px-5"><Link to="/login">{t('auth.register')}</Link></Button>
      )}
    </div>
  );
};
export default AuthButtons;
