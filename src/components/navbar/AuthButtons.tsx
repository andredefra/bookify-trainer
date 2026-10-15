import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
const AuthButtons = () => {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-3">
      <Button asChild variant="outline" size="sm" className="border-brand-text/50 bg-transparent text-brand-text hover:bg-brand-text/10"><Link to="/login">{t('auth.login')}</Link></Button>
      <Button asChild size="sm" className="rounded-full px-5"><Link to="/register">{t('auth.register')}</Link></Button>
    </div>
  );
};
export default AuthButtons;
