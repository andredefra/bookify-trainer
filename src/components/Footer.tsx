
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
    title: 'Company',
    links: [{
      name: 'About',
      href: '/about'
    }, {
      name: 'Contact',
      href: '/contact'
    }, {
      name: 'Careers',
      href: '/careers'
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block">
              <span className="font-display text-xl font-bold tracking-tight text-primary">Personal.ai</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">The all-in-one platform for personal trainers.</p>
          </div>
          
          {footerLinks.map((group, idx) => <div key={idx} className="">
              <h3 className="text-sm font-semibold text-primary">{group.title}</h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link, linkIdx) => <li key={linkIdx}>
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>)}
              </ul>
            </div>)}
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} mypersonalai ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};

export default Footer;
