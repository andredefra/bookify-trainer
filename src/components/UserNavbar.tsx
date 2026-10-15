import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const UserNavbar = ({ onJoinWaitlist }: { onJoinWaitlist?: () => void } = {}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const handleJoinWaitlist = () => {
    setIsMenuOpen(false);
    if (onJoinWaitlist) onJoinWaitlist();
    else navigate(`${language === 'en' ? '/user-en' : '/user'}?waitlist=1`);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { key: 'userNav.features', href: '#features' },
    { key: 'userNav.pricing', href: '#pricing' },
    { key: 'userNav.about', href: '#about' },
  ];

  const handleMenuClick = (href: string) => {
    const currentPath = window.location.pathname;
    
    // Se siamo su /user o /user-en, fai scroll nella pagina corrente
    if (currentPath === '/user' || currentPath === '/user-en') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Se siamo su altre pagine (login/register), naviga alla landing con l'anchor
      const targetPage = language === 'en' ? '/user-en' : '/user';
      navigate(targetPage + href);
      
      // Dopo la navigazione, aspetta che la pagina sia caricata e poi fai scroll
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to={language === 'it' ? '/user' : '/user-en'} className="flex items-center">
              <span className="font-display text-xl font-bold tracking-tight text-primary">
                MyPersonal.fit
              </span>
              <span className="ml-2 text-sm font-medium text-muted-foreground">
                {t('userNav.forUsers')}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleMenuClick(item.href)}
                  className="text-muted-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors cursor-pointer"
                >
                  {t(item.key)}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />

            <Link to="/user-login">
              <Button variant="outline" size="sm">
                {t('userNav.login')}
              </Button>
            </Link>
            <Button size="sm" onClick={handleJoinWaitlist}>
              {t('userNav.startTrial')}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleMenuClick(item.href)}
                  className="text-muted-foreground hover:text-primary block px-3 py-2 text-base font-medium transition-colors w-full text-left"
                >
                  {t(item.key)}
                </button>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="px-3 py-2">
                <LanguageSwitcher onChange={() => setIsMenuOpen(false)} align="start" />
              </div>

              {/* Mobile Actions */}
              <div className="px-3 py-2 space-y-2">
                <Link to="/user-login" className="block">
                  <Button variant="outline" className="w-full">
                    {t('userNav.login')}
                  </Button>
                </Link>
                <Button className="w-full" onClick={handleJoinWaitlist}>
                  {t('userNav.startTrial')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;