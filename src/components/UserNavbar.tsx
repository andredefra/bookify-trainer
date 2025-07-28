import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const UserNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleLanguageChange = (lang: 'en' | 'it') => {
    setLanguage(lang);
    const currentPath = window.location.pathname;
    
    if (currentPath === '/user' || currentPath === '/user-en') {
      navigate(lang === 'en' ? '/user-en' : '/user');
    } else {
      navigate(lang === 'en' ? '/' : '/it');
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { key: 'userNav.features', href: '#features' },
    { key: 'userNav.pricing', href: '#pricing' },
    { key: 'userNav.about', href: '#about' },
  ];

  const handleMenuClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/user" className="flex items-center">
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
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span className="uppercase">{language}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleLanguageChange('it')}>
                  🇮🇹 Italiano
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                  🇬🇧 English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/user-login">
              <Button variant="outline" size="sm">
                {t('userNav.login')}
              </Button>
            </Link>
            <Link to="/user-register">
              <Button size="sm">
                {t('userNav.startTrial')}
              </Button>
            </Link>
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
                <div className="flex items-center space-x-2 mb-2">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">{t('nav.language')}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleLanguageChange('it')}
                    className={`px-3 py-1 text-sm rounded ${
                      language === 'it' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
                    }`}
                  >
                    🇮🇹 IT
                  </button>
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`px-3 py-1 text-sm rounded ${
                      language === 'en' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
                    }`}
                  >
                    🇬🇧 EN
                  </button>
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="px-3 py-2 space-y-2">
                <Link to="/user-login" className="block">
                  <Button variant="outline" className="w-full">
                    {t('userNav.login')}
                  </Button>
                </Link>
                <Link to="/user-register" className="block">
                  <Button className="w-full">
                    {t('userNav.startTrial')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;