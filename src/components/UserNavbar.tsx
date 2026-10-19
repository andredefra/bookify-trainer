import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    { key: 'consumerMarket.nav', href: language === 'it' ? '/user-find-trainer' : '/user-find-trainer-en' },
    { key: 'userNav.pricing', href: '#pricing' },
    { key: 'userNav.about', href: '#about' },
  ];

  const handleMenuClick = (href: string) => {
    if (href.startsWith('/')) {
      navigate(href);
      setIsMenuOpen(false);
      return;
    }
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
    <nav className="trainer-brand fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[#242424] text-left" style={{ background: 'rgba(10,10,10,.92)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to={language === 'it' ? '/user' : '/user-en'} className="flex items-center">
              <span className="text-base text-white sm:text-lg" style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontWeight: 800 }}>
                mypersonal<span className="text-[#F6C124]">.fit</span>
              </span>
              <span className="ml-2 text-[10px] uppercase text-[#7d7668]" style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontWeight: 700, letterSpacing: '.18em' }}>
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
                  className="text-[#a8a296] hover:text-[#F6C124] px-3 py-2 text-sm font-medium transition-colors cursor-pointer"
                >
                  {t(item.key)}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher theme="trainer" />

            <Link to="/user-login">
              <span className="inline-flex items-center rounded-full border border-[#3a3a3a] px-4 py-1.5 text-sm font-medium text-[#ddd7ca] transition-colors hover:border-[#F6C124]">
                {t('userNav.login')}
              </span>
            </Link>
            <button type="button" onClick={handleJoinWaitlist} className="rounded-full bg-[#F6C124] px-4 py-1.5 text-sm font-semibold text-[#0A0A0A]">
              {t('userNav.startTrial')}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#ddd7ca] hover:text-[#F6C124] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F6C124]"
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-[#242424]">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleMenuClick(item.href)}
                  className="text-[#a8a296] hover:text-[#F6C124] block px-3 py-2 text-base font-medium transition-colors w-full text-left"
                >
                  {t(item.key)}
                </button>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="px-3 py-2">
                <LanguageSwitcher theme="trainer" onChange={() => setIsMenuOpen(false)} align="start" />
              </div>

              {/* Mobile Actions */}
              <div className="px-3 py-2 space-y-2">
                <Link to="/user-login" className="block">
                  <span className="flex w-full justify-center rounded-full border border-[#3a3a3a] py-2 font-medium text-[#ddd7ca]">
                    {t('userNav.login')}
                  </span>
                </Link>
                <button type="button" className="w-full rounded-full bg-[#F6C124] py-2 font-semibold text-[#0A0A0A]" onClick={handleJoinWaitlist}>
                  {t('userNav.startTrial')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;