import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const UserFooter = () => {
  const { language, t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [{
    title: t('footer.product'),
    links: [{
      name: t('userNav.features'),
      href: '#features'
    }, {
      name: t('userNav.pricing'),
      href: '#pricing'
    }, {
      name: t('userNav.about'),
      href: '#about'
    }]
  }, {
    title: t('footer.legal'),
    links: [{
      name: 'Privacy',
      href: '/privacy'
    }, {
      name: 'Terms',
      href: '/terms'
    }, {
      name: 'Cookies',
      href: '/cookies'
    }]
  }];

  const handleInternalLinkClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="trainer-brand bg-[#0A0A0A] border-t border-[#242424] text-left">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-12 gap-8">
          {/* Logo and description */}
          <div className="col-span-12 md:col-span-5 lg:col-span-6">
            <Link to="/user" className="inline-block">
              <span className="text-lg text-white" style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontWeight: 800 }}>mypersonal<span className="text-[#F6C124]">.fit</span></span>
            </Link>
            <p className="mt-4 text-sm text-[#a8a296]">{t('userFooter.description')}</p>
            <div className="mt-8">{/* Increased margin to align with other links */}
              <Link 
                to={language === 'it' ? '/it' : '/'} 
                className="text-sm text-[#a8a296] hover:text-[#F6C124] transition-colors"
              >
                {t('userFooter.trainerPlatformLink')}
              </Link>
            </div>
          </div>
          
          {/* Spacer for alignment */}
          <div className="hidden md:block md:col-span-1"></div>
          
          {/* Footer Links */}
          {footerLinks.map((group, idx) => (
            <div key={idx} className="col-span-6 md:col-span-3 lg:col-span-2">
              <h3 className="text-[11px] uppercase text-[#F6C124]" style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontWeight: 700, letterSpacing: '.18em' }}>{group.title}</h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    {link.href.startsWith('#') ? (
                      <button
                        onClick={() => handleInternalLinkClick(link.href)}
                        className="text-sm text-[#a8a296] hover:text-[#F6C124] transition-colors cursor-pointer"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <Link 
                        to={link.href} 
                        className="text-sm text-[#a8a296] hover:text-[#F6C124] transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Copyright section - moved to bottom */}
        <div className="mt-12 pt-6 border-t border-[#242424]">
          <p className="text-[10px] uppercase text-[#5e5849] text-center" style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontWeight: 700, letterSpacing: '.18em' }}>MyPersonal ltd.</p>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;