
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = [{
    title: 'Product',
    links: [{
      name: 'Features',
      href: '/#features'
    }, {
      name: 'Pricing',
      href: '/#pricing'
    }, {
      name: 'How It Works',
      href: '/#how-it-works'
    }]
  }, {
    title: 'Legal',
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

  return <footer className="bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-12 gap-8">
          {/* Logo and description */}
          <div className="col-span-12 md:col-span-5 lg:col-span-6">
            <Link to="/" className="inline-block">
              <span className="font-display text-xl font-bold tracking-tight text-primary">Personal.ai</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">The all-in-one platform for personal trainers.</p>
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
                    <Link 
                      to={link.href} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                    {/* Display copyright next to the third item */}
                    {idx === 1 && linkIdx === 2 && (
                      <p className="absolute right-6 lg:right-8 text-sm text-muted-foreground">
                        &copy; {currentYear} mypersonalai ltd. All rights reserved.
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>;
};

export default Footer;
