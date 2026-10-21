import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import PhonePreview from './PhonePreview';

const emphasize = (text: string) => text.split(/\*\*(.+?)\*\*/).map((part, i) =>
  i % 2 ? <strong key={i} className="font-bold text-brand-highlight">{part}</strong> : part
);

const HowItWorksSteps = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let interval: ReturnType<typeof setInterval> | undefined;
    const update = () => {
      if (interval !== undefined) clearInterval(interval);
      interval = undefined;
      if (!manual && !preference.matches) interval = setInterval(() => setActive(prev => (prev + 1) % 6), 3200);
    };
    update();
    preference.addEventListener('change', update);
    return () => { if (interval !== undefined) clearInterval(interval); preference.removeEventListener('change', update); };
  }, [manual]);

  return (
    <section id="how-it-works" className="home-how trainer-brand relative overflow-hidden bg-brand-canvas px-5 py-16 text-brand-text md:px-10 md:py-[68px]">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-180px] h-[460px] w-[900px] -translate-x-1/2 bg-[image:var(--how-glow)]" />
      <div className="relative mx-auto max-w-[1080px]">
        <div className="text-center">
          <p className="how-mono inline-flex items-center gap-[9px] rounded-full border border-brand-highlight/30 bg-brand-highlight/[.08] px-4 py-2 text-[11px] font-bold uppercase text-brand-highlight"><span aria-hidden="true" className="h-[7px] w-[7px] shrink-0 rounded-full bg-brand-highlight shadow-[var(--how-dot-shadow)]" />{t('how2.kicker')}</p>
          <h2 className="how-heading mt-5 text-[29px] uppercase leading-[1.05] md:text-[41px]">{t('how2.titleA')}<br /><span className="text-brand-highlight">{t('how2.titleB')}</span></h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[15px] leading-relaxed text-brand-text/[.56] md:text-[15.5px]">{t('how2.sub')}</p>
        </div>
        <div className="mt-10 grid grid-cols-1 items-start gap-6 md:mt-[42px] lg:grid-cols-2 lg:gap-[26px]">
          <div className="how-phone-column order-first flex justify-center lg:order-last"><PhonePreview step={active} /></div>
          <div className="how-steps flex min-w-0 flex-col gap-2">
            {Array.from({ length: 6 }, (_, i) => <Button key={i} type="button" variant="ghost" className="how-step w-full text-left" aria-pressed={active === i} onClick={() => { setManual(true); setActive(i); }}>
              <span className="how-mono how-step-number w-5 shrink-0 pt-[2px] text-[11.5px] font-extrabold">{String(i + 1).padStart(2, '0')}</span>
              <span className="min-w-0"><span className="how-step-title mb-[5px] block text-[14.5px] uppercase leading-[1.15]">{t(`how2.s${i + 1}.t`)}</span><span className="how-step-description block text-[12.6px] leading-[1.5] md:text-[12.4px]">{emphasize(t(`how2.s${i + 1}.d`))}</span></span>
            </Button>)}
          </div>
        </div>
        <div className="mt-10 text-center"><Button asChild className="h-auto w-full rounded-full bg-brand-highlight px-9 py-[15px] text-[15.5px] font-bold text-brand-canvas hover:bg-brand-highlight/90 sm:w-auto"><Link to="/login">{t('how2.cta')}</Link></Button>
          <p className="mt-4 text-[12.5px] leading-relaxed text-brand-text/[.45]">{t('how2.m1')} · <strong className="text-brand-text/80">{t('how2.m2')}</strong> · {t('how2.m3')}</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSteps;