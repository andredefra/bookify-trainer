import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const UserFooter = () => {
  const { t } = useLanguage();
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
    <footer className="bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-12 gap-8">
          {/* Logo and description */}
          <div className="col-span-12 md:col-span-5 lg:col-span-6">
            <Link to="/user" className="inline-block">
              <span className="font-display text-xl font-bold tracking-tight text-primary">MyPersonal.fit</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">{t('userFooter.description')}</p>
            <div className="mt-8">{/* Increased margin to align with other links */}
              <Link 
                to="/" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
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
              <h3 className="text-sm font-semibold text-primary">{group.title}</h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    {link.href.startsWith('#') ? (
                      <button
                        onClick={() => handleInternalLinkClick(link.href)}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <Link 
                        to={link.href} 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
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
        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">MyPersonal ltd.</p>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;