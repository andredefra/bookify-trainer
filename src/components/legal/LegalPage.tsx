import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

const MONO = "'JetBrains Mono', ui-monospace, monospace";
const DISPLAY = "'Archivo', sans-serif";

const PROSE_CSS = `
.legal-prose { color: #3f3a33; font-size: 15.5px; line-height: 1.78; }
.legal-prose > :first-child { margin-top: 0 !important; padding-top: 0; border-top: 0; }
.legal-prose p { margin-top: 15px; }
.legal-prose strong { color: #0A0A0A; font-weight: 700; }
.legal-prose h2 {
  font-family: 'Archivo', sans-serif;
  font-variation-settings: 'wdth' 112, 'wght' 900;
  text-transform: uppercase;
  color: #0A0A0A;
  font-size: 19px;
  line-height: 1.14;
  margin-top: 42px;
  margin-bottom: 14px;
  padding-top: 24px;
  border-top: 1px solid #ECE7DB;
}
.legal-prose h3 {
  font-family: 'Archivo', sans-serif;
  font-variation-settings: 'wdth' 112, 'wght' 900;
  text-transform: uppercase;
  color: #0A0A0A;
  font-size: 14.5px;
  line-height: 1.2;
  margin-top: 28px;
  margin-bottom: 10px;
}
.legal-prose ul { margin-top: 14px; padding-left: 20px; list-style: disc; }
.legal-prose li { margin-top: 9px; padding-left: 4px; }
.legal-prose li::marker { color: #B98A00; }
.legal-prose a { color: #8a6a00; text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }
.legal-prose a:hover { color: #0A0A0A; }
.legal-prose a:focus-visible { outline: 2px solid #B98A00; outline-offset: 2px; border-radius: 2px; }
.legal-updated {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-weight: 700;
  font-size: 10.5px;
  letter-spacing: .08em;
  color: #938C7C;
  margin-bottom: 26px;
}
@media (min-width: 768px) {
  .legal-prose { font-size: 16px; }
  .legal-prose h2 { font-size: 21px; }
}
`;

type Current = 'privacy' | 'terms' | 'cookies';

const PAGES: { id: Current; href: string; k: string }[] = [
  { id: 'privacy', href: '/privacy', k: 'footer.privacy' },
  { id: 'terms', href: '/terms', k: 'footer.terms' },
  { id: 'cookies', href: '/cookies', k: 'footer.cookies' },
];

const LegalPage = ({ title, current, children }: { title: string; current: Current; children: ReactNode }) => {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main
        className="flex-grow bg-[#ECE7DB] px-5 pb-20 pt-28 md:px-10 md:pb-24 md:pt-32"
        style={{ color: '#0A0A0A', ['--border' as string]: '43 25% 84%', ['--foreground' as string]: '0 0% 4%', ['--ring' as string]: '45 92% 55%' } as CSSProperties}
      >
        <style>{PROSE_CSS}</style>

        <div className="mx-auto max-w-[780px]">
          <p
            className="uppercase"
            style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10, letterSpacing: '.18em', color: '#938C7C' }}
          >
            mypersonal.fit
          </p>

          <h1
            className="mt-4 uppercase text-[30px] leading-[1.04] md:text-[42px]"
            style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 118, 'wght' 900", color: '#0A0A0A' }}
          >
            {title}
          </h1>

          <div
            className="mt-7 rounded-[18px] border px-6 py-8 md:px-10 md:py-11"
            style={{ borderColor: '#E0DACB', background: '#FFFFFF' }}
          >
            <div className="legal-prose">{children}</div>
          </div>

          <nav className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="legal">
            {PAGES.map((p) =>
              p.id === current ? (
                <span
                  key={p.id}
                  aria-current="page"
                  className="uppercase"
                  style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10, letterSpacing: '.14em', color: '#0A0A0A' }}
                >
                  {t(p.k)}
                </span>
              ) : (
                <Link
                  key={p.id}
                  to={p.href}
                  className="rounded uppercase transition-colors hover:text-[#0A0A0A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B98A00]"
                  style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10, letterSpacing: '.14em', color: '#938C7C' }}
                >
                  {t(p.k)}
                </Link>
              )
            )}
          </nav>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalPage;
