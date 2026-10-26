import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { demoTrainers } from '@/data/trainerMockData';
import { indiaDemoProfiles } from '@/data/publicDemoProfiles';

export default function ProfileExampleStrip() {
  const { language, t } = useLanguage();
  const trainer = language === 'in' ? indiaDemoProfiles[0] : demoTrainers[0];
  if (!trainer) return null;
  return <div className="trainer-brand mt-3 grid items-center gap-8 bg-brand-canvas p-7 text-brand-text md:grid-cols-[5fr_6fr] md:p-9">
    <div>
      <h3 className="trainer-headline text-2xl leading-tight md:text-[28px]">{t('profileExample.title')}</h3>
      <p className="mt-3 text-sm leading-relaxed text-brand-text/70">{t('profileExample.text')}</p>
      <Button asChild className="mt-6 h-auto min-h-10 max-w-full whitespace-normal rounded-full bg-brand-highlight px-5 font-bold text-brand-canvas hover:bg-brand-highlight/90"><Link to={`/trainer/${trainer.slug}?lang=${language}`}>{t('profileExample.button')}<ArrowUpRight className="shrink-0" /></Link></Button>
    </div>
    <article className="mx-auto w-full max-w-sm overflow-hidden rounded-lg border border-brand-border bg-brand-surface">
      <img src={trainer.profileImage} alt={trainer.name} className="h-44 w-full object-cover object-center" />
      <div className="p-4">
        <p className="font-bold">{trainer.name}</p>
        <div className="mt-2 flex flex-wrap gap-2">{trainer.credentials?.map(credential => <span key={credential} className="rounded border border-brand-highlight/30 px-2 py-1 font-brand-mono text-[10px] font-bold text-brand-highlight">{t(`cred.${credential}`)}</span>)}</div>
        <p className="mt-3 font-brand-mono text-lg font-bold text-brand-highlight">{language === 'in' ? `₹${trainer.hourlyRate.toLocaleString('en-IN')}` : `€${trainer.hourlyRate}`} <span className="text-xs text-brand-text/70">{t('market.perHour')}</span></p>
      </div>
    </article>
  </div>;
}