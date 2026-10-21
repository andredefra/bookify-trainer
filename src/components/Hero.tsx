import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CreditCard, MessageCircle, Users, Dumbbell, Sparkles, Globe, ShoppingBag, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import AppPreview from '@/components/hero/AppPreview';
import PhonePreview from '@/components/home/PhonePreview';
import '@/components/hero/hero.css';

const Hero = () => {
  const { t } = useLanguage();
  const pills = [Users, Dumbbell, Calendar, MessageCircle, CreditCard, Sparkles, Globe, ShoppingBag];
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
  );
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const onChange = () => setIsDesktop(mql.matches);
    mql.addEventListener('change', onChange);
    onChange();
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return (
    <section className="trainer-brand trainer-hero relative overflow-hidden bg-brand-canvas text-brand-text pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="hero-glow pointer-events-none" aria-hidden="true" />
      <div className="hero-grid pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div className="text-center">
          <p className="hero-kicker rounded-full font-brand-mono uppercase text-brand-highlight"><span className="hero-kicker-dot" aria-hidden="true" />{t('hero.positioning')}</p>
          <h1 className="trainer-headline mx-auto mt-7 max-w-[1240px] text-[32px] leading-[1.02] text-balance md:text-[42px] xl:text-[50px]">
            <span className="hero-line-a block">{t('hero.headlineA')}</span>
            <span className="hero-line-b block text-brand-highlight">{t('hero.headlineB')}</span>
          </h1>
          <p className="hero-subtitle mx-auto mt-6 max-w-[830px] text-base leading-relaxed text-brand-text/70 md:text-[19.5px]">{t('hero.subtitle')} <strong className="font-bold text-brand-text">{t('hero.subtitleStrong')}</strong></p>
          <div className="mx-auto mt-7 grid max-w-[600px] grid-cols-2 justify-items-stretch gap-[11px] sm:grid-cols-4">
            {pills.map((Icon, i) => <div key={i} className="hero-pill rounded-full font-brand-mono uppercase"><Icon className="h-4 w-4 shrink-0 text-brand-highlight" /><span>{t(`hero.pill${i + 1}`)}</span></div>)}
          </div>
          <div className="hero-actions mx-auto mt-8 flex max-w-xl flex-col items-stretch justify-center gap-3 md:max-w-none md:flex-row">
            <Button asChild size="lg" className="hero-primary h-auto rounded-full bg-brand-highlight px-9 py-4 text-[16.5px] font-bold text-brand-canvas hover:bg-brand-highlight/90"><Link to="/register">{t('hero.cta')}</Link></Button>
            <Button asChild variant="ghost" size="lg" className="h-auto rounded-full border border-brand-text/30 px-7 py-[15px] text-base font-semibold text-brand-text hover:bg-brand-text/10"><a href="#how-it-works" onClick={e => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}><span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-brand-text/10"><Play className="h-3 w-3" /></span>{t('hero.ctaSecondary')}</a></Button>
          </div>
          <p className="hero-trust mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13.5px] text-brand-text/45"><span>{t('hero.trust1')}</span><span aria-hidden="true">·</span><b className="text-brand-text/75">{t('hero.trust2')}</b><span aria-hidden="true">·</span><span>{t('hero.trust3')}</span></p>
        </div>
        {isDesktop ? <AppPreview /> : (
          <div className="mt-[58px] flex justify-center">
            <PhonePreview step={5} />
          </div>
        )}

      </div>
    </section>
  );
};
export default Hero;
