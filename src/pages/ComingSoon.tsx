import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import '@/components/hero/hero.css';

// Paste the Typeform share URL here to show the embedded form; empty = nothing rendered.
const TYPEFORM_URL = '';
const EMAIL = 'andrea.mypersonal.fit@gmail.com';
const MONO = "'JetBrains Mono', ui-monospace, monospace";
const DISPLAY = "'Archivo', sans-serif";

const ComingSoon = () => {
  const { t, language } = useLanguage();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="trainer-brand flex min-h-screen flex-col bg-brand-canvas text-brand-text">
      <Navbar />
      <main className="flex-grow">
        <section className="trainer-hero relative isolate overflow-hidden bg-[#0A0A0A] px-5 pb-20 pt-32 text-center md:pt-40">
          <div className="hero-glow pointer-events-none" aria-hidden="true" />
          <div className="mx-auto max-w-[760px]">
            <p className="hero-kicker rounded-full uppercase" style={{ fontFamily: MONO, color: '#F6C124' }}>
              <span className="hero-kicker-dot" aria-hidden="true" />{t('soon.kicker')}
            </p>
            <h1 className="mt-6 uppercase leading-[1.05] text-[34px] md:text-[50px]" style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 118, 'wght' 900", color: '#FFFFFF' }}>
              {t('soon.titleA')}<br /><span style={{ color: '#F6C124' }}>{t('soon.titleB')}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[600px] text-[15.5px] leading-relaxed" style={{ color: '#bdb7aa' }}>{t('soon.body')}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`mailto:${EMAIL}`} className="hero-primary rounded-full px-8 py-[14px] text-[15px] font-bold" style={{ background: '#F6C124', color: '#0A0A0A' }}>{t('soon.write')}</a>
              <Link to={language === 'en' ? '/en' : '/'} className="rounded-full border px-8 py-[13px] text-[15px] font-bold" style={{ borderColor: '#3a3a3a', color: '#ddd7ca' }}>{t('soon.home')}</Link>
            </div>
            <p className="mt-4 break-all" style={{ fontFamily: MONO, fontSize: 11, color: '#8c8678' }}>{EMAIL}</p>
            {TYPEFORM_URL && (
              <div className="mx-auto mt-10 w-full overflow-hidden rounded-[14px] border" style={{ borderColor: '#242424' }}>
                <iframe src={TYPEFORM_URL} title="Typeform" className="block h-[560px] w-full" style={{ border: 0 }} allow="camera; microphone; autoplay; encrypted-media;" />
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ComingSoon;
