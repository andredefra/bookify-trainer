import { useEffect, useRef, useState } from 'react';
import { Home, Users, Dumbbell, Calendar, MessageCircle, CreditCard, LineChart, Check, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const railIcons = [Home, Users, Dumbbell, Calendar, MessageCircle, CreditCard, LineChart];
const localeFor = (language: string) => language === 'it' ? 'it-IT' : language === 'in' ? 'en-IN' : 'en-US';

const AppPreview = () => {
  const { t, language } = useLanguage();
  const clients = [1, 2, 3, 4, 5].map(n => t(`heroPreview.client${n}`));
  // Animate toward the localized value so each market keeps its own currency and amounts.
  const values = [1, 2, 3, 4].map(n => t(`heroPreview.kpi${n}Value`));
  const targets = values.map(v => Number(v.replace(/\D/g, '')));
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const element = ref.current;
    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
    if (!element || !motion.matches) return;
    setProgress(0);
    let frame = 0;
    const stopMotion = () => {
      if (!motion.matches) { cancelAnimationFrame(frame); setProgress(1); }
    };
    motion.addEventListener('change', stopMotion);
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const fraction = Math.min((now - start) / 1200, 1);
        setProgress(1 - Math.pow(1 - fraction, 3));
        if (fraction < 1 && motion.matches) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.15 });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); motion.removeEventListener('change', stopMotion); };
  }, []);

  return (
    <div ref={ref} className="hero-preview-wrapper relative mx-auto mt-[58px] max-w-[1060px]" role="img" aria-label={t('heroPreview.title')}>
      <div className="hero-preview-window">
        <div className="hero-preview-titlebar">
          <div className="flex gap-1.5" aria-hidden="true"><i className="bg-brand-pain" /><i className="bg-brand-highlight" /><i className="bg-brand-result" /></div>
          <span className="hero-preview-address font-brand-mono">app.mypersonal.fit/dashboard</span>
        </div>
        <div className="hero-preview-scroll">
          <div className="hero-preview-body">
            <div className="hero-preview-rail" aria-hidden="true">
              {railIcons.map((Icon, i) => <span key={i} className={i === 0 ? 'active' : ''}><Icon size={16} /></span>)}
            </div>
            <div className="hero-preview-main">
              <div className="flex items-center justify-between gap-4">
                <h2 className="trainer-headline hero-preview-heading">{t('heroPreview.title')}</h2>
                <span className="hero-preview-range font-brand-mono">{t('heroPreview.range')}</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {targets.map((target, i) => (
                  <div key={i} className={`hero-preview-kpi kpi-${i + 1}`}>
                    <p className="hero-preview-label font-brand-mono">{t(`heroPreview.kpi${i + 1}Label`)}</p>
                    <p className="hero-preview-value font-brand-mono" aria-label={t(`heroPreview.kpi${i + 1}Value`)}>
                      {progress === 1 ? t(`heroPreview.kpi${i + 1}Value`) : `${values[i].match(/^\D*/)?.[0] ?? ''}${Math.round(target * progress).toLocaleString(localeFor(language))}`}
                    </p>
                    <p className="hero-preview-delta">{t(`heroPreview.kpi${i + 1}Delta`)}</p>
                  </div>
                ))}
              </div>
              <div className="hero-preview-columns">
                <div className="hero-preview-panel">
                  <h3 className="hero-preview-label font-brand-mono">{t('heroPreview.clientsLabel')}</h3>
                  <div className="mt-2">
                    {clients.map((name, i) => (
                      <div key={name} className="hero-preview-client">
                        <span className="hero-preview-avatar font-brand-mono">{name.split(' ').map(part => part[0]).join('')}</span>
                        <span className="hero-preview-name">{name}</span>
                        <span className={`hero-preview-tag font-brand-mono tag-${i + 1}`}>{t(`heroPreview.tag${i + 1}`)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hero-preview-panel">
                  <h3 className="hero-preview-label font-brand-mono">{t('heroPreview.agendaLabel')}</h3>
                  <div className="hero-preview-days">
                    {[2, 2, 3, 1, 2, 0, 0].map((filled, i) => (
                      <div key={i} className={`hero-preview-day font-brand-mono ${i === 2 ? 'today' : ''}`}>
                        <span>{t(`heroPreview.d${i + 1}`)}</span><b>{19 + i}</b>
                        <div className="grid gap-1">{[0, 1, 2].map(slot => <i key={slot} className={slot < filled ? 'filled' : ''} />)}</div>
                      </div>
                    ))}
                  </div>
                  <h3 className="hero-preview-label mt-5 font-brand-mono">{t('heroPreview.revenueLabel')}</h3>
                  <div className="hero-preview-chart" aria-hidden="true">
                    {[38, 46, 42, 58, 66, 82].map((height, i) => <div key={i} className={`chart-bar bar-${height} ${i > 3 ? 'highlight' : ''}`} />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-preview-notification notification-left hidden lg:flex">
        <span className="notification-icon result"><Check size={18} /></span>
        <div><p>{t('heroPreview.notif1Title')}</p><small>{t('heroPreview.notif1Sub')}</small></div>
      </div>
      <div className="hero-preview-notification notification-right hidden lg:flex">
        <span className="notification-icon"><Sparkles size={18} /></span>
        <div><p>{t('heroPreview.notif2Title')}</p><small>{t('heroPreview.notif2Sub')}</small></div>
      </div>
    </div>
  );
};
export default AppPreview;