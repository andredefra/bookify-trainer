import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UserNavbar from '@/components/UserNavbar';
import UserFooter from '@/components/UserFooter';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Search, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/context/LanguageContext';
import { demoTrainers } from '@/data/trainerMockData';
import './find-trainer.css';

export const MarketplacePage = ({ consumer = false }: { consumer?: boolean }) => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [city, setCity] = useState('');
  const [showDemoDialog, setShowDemoDialog] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="trainer-brand trainer-market min-h-screen flex flex-col bg-brand-canvas text-brand-text">
      {consumer ? <UserNavbar /> : <Navbar />}
      <main className="flex-grow">
        <section className="market-hero relative overflow-hidden bg-brand-canvas px-5 pb-12 pt-32 text-center md:pt-36">
          <div className="market-glow" aria-hidden="true" />
          <div className="mx-auto max-w-6xl">
            <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-brand-highlight/30 bg-brand-highlight/5 px-4 py-2 font-brand-mono text-[10px] font-bold uppercase text-brand-highlight sm:text-xs">
              <span className="market-dot h-[7px] w-[7px] shrink-0 rounded-full bg-brand-highlight" />
              {t('market.kicker')}
            </div>
            <h1 className="trainer-headline mt-6 text-[30px] leading-[1.08] sm:text-[38px] lg:text-[46px]">
              <span className="block">{t('market.titleA')}</span>
              <span className="block text-brand-highlight">{t('market.titleB')}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[620px] text-base leading-relaxed text-brand-text/70">{t(consumer ? 'consumerMarket.subtitle' : 'market.subtitle')}</p>
            <form onSubmit={event => event.preventDefault()} className="mx-auto mt-8 flex max-w-[920px] flex-col gap-3 md:flex-row">
              <div className="relative min-w-0 flex-[1.7]">
                <Search aria-hidden="true" className="absolute left-4 top-4 h-5 w-5 text-brand-text/50" />
                <Input aria-label={t('market.searchPh')} placeholder={t('market.searchPh')} value={searchQuery} onChange={event => setSearchQuery(event.target.value)} className="market-field h-[52px] rounded-xl pl-12 pr-4 text-brand-text placeholder:text-brand-text/45 focus-visible:ring-brand-highlight" />
              </div>
              <div className="relative min-w-0 flex-1">
                <MapPin aria-hidden="true" className="absolute left-4 top-4 h-5 w-5 text-brand-text/50" />
                <Input aria-label={t('market.cityPh')} placeholder={t('market.cityPh')} value={city} onChange={event => setCity(event.target.value)} className="market-field h-[52px] rounded-xl pl-12 pr-4 text-brand-text placeholder:text-brand-text/45 focus-visible:ring-brand-highlight" />
              </div>
              <Button type="submit" className="h-[52px] rounded-xl bg-brand-highlight px-8 font-bold text-brand-canvas hover:bg-brand-highlight/90"><Search className="mr-2 h-4 w-4" />{t('market.searchBtn')}</Button>
            </form>
            <div className="mx-auto mt-5 flex max-w-5xl flex-wrap justify-center gap-2">
              {Array.from({ length: 8 }, (_, index) => (
                <Button key={index} type="button" aria-pressed={index === 0} variant={index === 0 ? 'default' : 'outline'} className={`h-9 rounded-full px-4 text-xs ${index === 0 ? 'bg-brand-highlight font-bold text-brand-canvas hover:bg-brand-highlight/90' : 'border-brand-text/20 bg-transparent text-brand-text/70 hover:bg-brand-text/10 hover:text-brand-text'}`}>{t(`market.f${index + 1}`)}</Button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-screen px-5 py-9 text-brand-canvas md:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-bold">{t('market.count').replace('{n}', String(demoTrainers.length))}</p>
              <p className="market-muted font-brand-mono text-[10px] font-bold uppercase sm:text-xs">{t('market.sort')}</p>
            </div>
            <aside data-demo-notice className="market-demo-notice mb-6 flex flex-col gap-2 sm:flex-row sm:gap-4">
              <span className="shrink-0 font-brand-mono text-xs font-bold uppercase">{t('market.demoLabel')}</span>
              <p className="text-sm leading-relaxed">{t('market.demoNotice')}</p>
            </aside>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {demoTrainers.map(trainer => {
                const today = trainer.availableLabel === 'Disponibile oggi';
                const availabilityKey = today ? 'availableToday' : trainer.availableLabel === 'Libera da giovedì' ? 'availableThursday' : 'availableMonday';
                return (
                  <article key={trainer.id} className="market-card flex min-w-0 flex-col overflow-hidden rounded-2xl" data-trainer-card>
                    <div className="market-photo relative h-[196px]">
                      <img src={trainer.profileImage} alt={trainer.name} className="h-full w-full object-cover" />
                      <div className={`absolute left-3 top-3 z-10 flex items-center gap-2 rounded-full border bg-brand-canvas/80 px-2.5 py-1.5 font-brand-mono text-[9px] font-bold ${today ? 'border-brand-result/60 text-brand-result' : 'border-brand-highlight/60 text-brand-highlight'}`}>
                        <span className={`h-[5px] w-[5px] rounded-full ${today ? 'bg-brand-result' : 'bg-brand-highlight'}`} />{t(`cred.${availabilityKey}`)}
                      </div>
                      <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-brand-highlight px-2.5 py-1.5 font-brand-mono text-[11px] font-bold text-brand-canvas"><Star className="h-3 w-3 fill-current" />{trainer.rating.toFixed(1)}</div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="text-[17px] font-bold">{trainer.name}</h2>
                      <p className="market-muted mt-1 text-[13px]">{trainer.title}</p>
                      <div className="market-muted mt-3 flex flex-wrap items-center gap-1.5 text-[11px]">
                        <MapPin className="h-3.5 w-3.5" /><span>{trainer.location}</span><span aria-hidden="true">·</span>
                        <span className="flex text-brand-highlight" aria-label={`${trainer.rating} / 5`}>{Array.from({ length: 5 }, (_, index) => <Star key={index} className="h-3 w-3 fill-current" />)}</span>
                        <span>{trainer.reviews} {t('market.reviews')}</span>
                      </div>
                      <div className="mb-5 mt-4 flex flex-wrap gap-1.5">{trainer.credentials.map(credential => <span key={credential} className={`market-credential credential-${credential} font-brand-mono`}>{t(`cred.${credential}`)}</span>)}</div>
                      <div className="market-divider mt-auto flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                        <p className="font-brand-mono text-[17px] font-extrabold">{language === 'in' ? `₹${(trainer.hourlyRate * 25).toLocaleString('en-IN')}` : `€${trainer.hourlyRate}`} <span className="market-muted text-[9px] font-bold">{t('market.perHour')}</span></p>
                        {consumer ? (
                          <div className="flex w-full flex-wrap gap-2">
                            <Button variant="outline" onClick={() => setShowDemoDialog(true)} className="h-9 rounded-full border-brand-canvas/20 bg-transparent px-4 text-xs font-bold text-brand-canvas hover:bg-brand-canvas/5 hover:text-brand-canvas">{t('market.viewProfile')}</Button>
                            <Button onClick={() => setShowDemoDialog(true)} className="h-9 rounded-full bg-brand-highlight px-4 text-xs font-bold text-brand-canvas hover:bg-brand-highlight/90">{t('consumerMarket.contact')}</Button>
                          </div>
                        ) : <Button asChild className="h-9 rounded-full bg-brand-canvas px-4 text-xs font-bold text-brand-highlight hover:bg-brand-canvas/90"><Link to={`/trainer/${trainer.slug}`}>{t('market.viewProfile')}</Link></Button>}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-brand-canvas px-5 py-16 text-center">
          <h2 className="trainer-headline text-[27px] leading-[1.12] md:text-[36px]"><span className="block">{t(consumer ? 'consumerMarket.ctaA' : 'market.ctaA')}</span><span className="block text-brand-highlight">{t(consumer ? 'consumerMarket.ctaB' : 'market.ctaB')}</span></h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-brand-text/70">{t(consumer ? 'consumerMarket.ctaSub' : 'market.ctaSub')}</p>
          <Button asChild className="mt-7 h-12 rounded-full bg-brand-highlight px-8 font-bold text-brand-canvas hover:bg-brand-highlight/90"><Link to={consumer ? '/user-register' : '/register'}>{t('market.ctaBtn')}</Link></Button>
        </section>
      </main>
      {consumer ? <UserFooter /> : <Footer />}
      {consumer && <Dialog open={showDemoDialog} onOpenChange={setShowDemoDialog}>
        <DialogContent className="trainer-brand max-w-[calc(100%-2rem)] rounded-xl border-brand-border bg-brand-canvas text-brand-text sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="trainer-headline pr-5 leading-tight">{t('consumerMarket.dialogTitle')}</DialogTitle>
            <DialogDescription className="pt-3 text-brand-text/70 leading-relaxed">{t('consumerMarket.dialogBody')}</DialogDescription>
          </DialogHeader>
          <Button asChild className="rounded-full bg-brand-highlight text-brand-canvas hover:bg-brand-highlight/90"><Link to="/user-register">{t('consumerMarket.signup')}</Link></Button>
          <Button variant="link" onClick={() => setShowDemoDialog(false)} className="text-brand-text/70">{t('consumerMarket.back')}</Button>
        </DialogContent>
      </Dialog>}
    </div>
  );
};

const FindTrainer = () => <MarketplacePage />;
export default FindTrainer;
