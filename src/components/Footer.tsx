import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const MONO = "'JetBrains Mono', ui-monospace, monospace";

const Footer = () => {
  const { language, t } = useLanguage();

  const footerLinks = [
    {
      title: t('footer.product'),
      links: [
        { name: t('nav.features'), href: '/#features' },
        { name: t('nav.pricing'), href: '/#pricing' },
        { name: t('nav.howItWorks'), href: '/#how-it-works' },
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
        { name: 'Cookies', href: '/cookies' },
      ],
    },
  ];

  return (
    <footer
      className="bg-[#0A0A0A] px-5 py-14 md:px-10 md:py-16"
      style={{ borderTop: '1px solid rgba(236,231,219,.10)', color: '#ECE7DB', ['--border' as string]: '0 0% 16%' } as CSSProperties}
    >
      <div className="mx-auto max-w-[1080px] text-left">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12 md:gap-8">
          <div className="col-span-2 md:col-span-6">
            <Link
              to={language === 'it' ? '/' : '/en'}
              className="inline-flex shrink-0 items-center gap-2.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C124]"
              aria-label="mypersonal.fit"
            >
              <img
                src="/brand/logo-biceps.png"
                alt=""
                className="h-8 w-8 object-contain"
                onError={(event) => { event.currentTarget.hidden = true; }}
              />
              <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 18, color: '#ECE7DB' }}>
                mypersonal<span style={{ color: '#F6C124' }}>.fit</span>
              </span>
            </Link>

            <p
              className="mt-4 max-w-[360px] text-[13.5px] leading-[1.6]"
              style={{ color: 'rgba(236,231,219,.56)' }}
            >
              {t('footer.description')}
            </p>

            <Link
              to={language === 'it' ? '/user' : '/user-en'}
              className="mt-6 inline-flex max-w-[360px] items-start gap-2 rounded-[12px] border px-4 py-3 text-[12.5px] font-semibold leading-[1.45] transition-colors hover:bg-[rgba(246,193,36,.14)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C124]"
              style={{ borderColor: 'rgba(246,193,36,.32)', background: 'rgba(246,193,36,.07)', color: '#F6C124' }}
            >
              <span className="min-w-0">{t('footer.userPlatformLink')}</span>
              <span aria-hidden="true" className="shrink-0">&#8594;</span>
            </Link>
          </div>

          <div className="hidden md:block md:col-span-2" />

          {footerLinks.map((group, idx) => (
            <div key={idx} className="col-span-1 md:col-span-2">
              <h3
                className="uppercase"
                style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10, letterSpacing: '.18em', color: 'rgba(236,231,219,.42)' }}
              >
                {group.title}
              </h3>
              <ul className="mt-4 space-y-[11px]">
                {group.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      to={link.href}
                      className="rounded text-[13.5px] text-[rgba(236,231,219,.62)] transition-colors hover:text-[#F6C124] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C124]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6" style={{ borderTop: '1px solid rgba(236,231,219,.10)' }}>
          <p
            className="text-center uppercase"
            style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10, letterSpacing: '.14em', color: 'rgba(236,231,219,.38)' }}
          >
            MyPersonal ltd.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
