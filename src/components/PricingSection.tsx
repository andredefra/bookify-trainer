import { useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { CircleCheck, Sparkles, Crown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlanDetailsDialog } from './pricing/PlanDetailsDialog';
import AIFeatureDialog from './pricing/AIFeatureDialog';

const MONO = "'JetBrains Mono', ui-monospace, monospace";
const DISPLAY = "'Archivo', sans-serif";

const CARD = 'flex h-full flex-col rounded-[14px] border border-[#E0DACB] bg-white p-[18px]';

const Badge = ({ open }: { open: boolean }) => {
  const { t } = useLanguage();
  return (
    <span
      className="inline-block self-start rounded-full uppercase"
      style={
        open
          ? { fontFamily: MONO, fontWeight: 700, fontSize: 9, letterSpacing: '.08em', background: '#F6C124', color: '#0A0A0A', padding: '4px 10px' }
          : { fontFamily: MONO, fontWeight: 700, fontSize: 9, letterSpacing: '.08em', border: '1px solid #E0DACB', background: '#F4F2ED', color: '#8a8478', padding: '4px 10px' }
      }
    >
      {t(open ? 'pricing.badgeOpen' : 'pricing.badgeSoon')}
    </span>
  );
};

const FeatureList = ({ items, inherited }: { items: string[]; inherited?: string }) => (
  <ul className="mt-4 flex flex-col gap-[9px]">
    {inherited && (
      <li className="flex items-start gap-2">
        <CircleCheck size={15} color="#B98A00" strokeWidth={2} className="mt-[2px] shrink-0" aria-hidden="true" />
        <span className="text-[13px] font-medium leading-[1.5]" style={{ color: '#0A0A0A' }}>{inherited}</span>
      </li>
    )}
    {items.map((f, i) => (
      <li key={i} className="flex items-start gap-2">
        <CircleCheck size={15} color="#B98A00" strokeWidth={2} className="mt-[2px] shrink-0" aria-hidden="true" />
        <span className="text-[13px] leading-[1.5]" style={{ color: '#3f3a33' }}>{f}</span>
      </li>
    ))}
  </ul>
);

const PlanHeading = ({ name, price, originalPrice, period, fee }: { name: string; price: string; originalPrice?: string; period: string; fee?: string }) => (
  <div className="mt-3">
    <h3
      className="uppercase text-[17px] leading-[1.1]"
      style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 112, 'wght' 900", color: '#0A0A0A' }}
    >
      {name}
    </h3>
    <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
      {originalPrice && (
        <span className="line-through" style={{ fontFamily: MONO, fontWeight: 700, fontSize: 12, color: '#938C7C' }}>
          {originalPrice}
        </span>
      )}
      <span
        className="uppercase text-[34px] leading-none"
        style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 112, 'wght' 900", color: '#0A0A0A' }}
      >
        {price}
      </span>
      <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 11, color: '#938C7C' }}>{period}</span>
    </div>
    {fee && <p className="mt-2 text-[12px] leading-[1.5]" style={{ color: '#5d574d' }}>{fee}</p>}
  </div>
);

const PricingSection = () => {
  const [annual, setAnnual] = useState(false);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [clientDialogOpen, setClientDialogOpen] = useState(false);
  const [trainerDialogOpen, setTrainerDialogOpen] = useState(false);
  const { t } = useLanguage();

  const standardFeatures = [
    t('pricing.features.personalTrainerPage'),
    t('pricing.features.clientManagement'),
    t('pricing.features.basicCalendar'),
    t('pricing.features.messaging'),
    t('pricing.features.salesManagement'),
    t('pricing.features.reviewsManagement'),
    t('pricing.features.googleCalendar'),
  ];

  const freemiumFeatures = [
    t('pricing.features.sessions'),
    t('pricing.features.customPrograms'),
    t('pricing.features.waitlistManagement'),
    t('pricing.features.sessionAnalytics'),
    t('pricing.features.programsAnalytics'),
    t('pricing.features.exerciseList'),
    t('pricing.features.exerciseManagement'),
    t('pricing.features.cashPayments'),
    t('pricing.features.paymentInstallments'),
  ];

  const proFeatures = [
    t('pricing.features.packageManagement'),
    t('pricing.features.additionalServices'),
    t('pricing.features.digitalCashPayments'),
    t('pricing.features.paymentInstallments'),
    t('pricing.features.electronicInvoicing'),
    t('pricing.features.businessDashboard'),
    t('pricing.features.prioritySupport'),
    t('pricing.features.advancedAnalytics'),
  ];

  const clientFeatures = [
    t('aiPricing.client.features.aiWorkoutCoach'),
    t('aiPricing.client.features.todaySession'),
    t('aiPricing.client.features.advancedInsights'),
    t('aiPricing.client.features.privateChats'),
  ];

  const trainerFeatures = [
    t('aiPricing.trainer.features.businessInsights'),
    t('aiPricing.trainer.features.chatAssistant'),
    t('aiPricing.trainer.features.clientAnalytics'),
    t('aiPricing.trainer.features.smartRecommendations'),
  ];

  const soonButton =
    'mt-auto w-full rounded-full py-3 text-[13px] font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B98A00] focus-visible:ring-offset-2';

  return (
    <section id="pricing" className="bg-[#ECE7DB] py-16 md:py-20 px-5 md:px-10" style={{ color: '#0A0A0A', ['--border' as string]: '43 25% 84%', ['--foreground' as string]: '0 0% 4%', ['--ring' as string]: '45 92% 55%' } as CSSProperties}>
      <div className="mx-auto max-w-[1080px]">
        {/* Header — same pattern as FeaturesGrid */}
        <div className="text-center">
          <p
            className="inline-flex items-center gap-[9px] rounded-full border px-4 py-2 uppercase"
            style={{
              borderColor: 'rgba(10,10,10,.14)',
              background: 'rgba(10,10,10,.04)',
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: '.2em',
              color: '#5a5346',
            }}
          >
            <span
              aria-hidden="true"
              className="inline-block shrink-0 rounded-full"
              style={{ width: 7, height: 7, background: '#F6C124', boxShadow: '0 0 0 4px rgba(246,193,36,.3)' }}
            />
            {t('pricing.kicker')}
          </p>

          <h2
            className="mx-auto mt-5 uppercase text-[29px] leading-[1.05] md:text-[41px]"
            style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 118, 'wght' 900", color: '#0A0A0A' }}
          >
            {t('pricing.titleA')}
            <br />
            <span style={{ color: '#B98A00' }}>{t('pricing.titleB')}</span>
          </h2>

          <p
            className="mx-auto mt-4 max-w-[600px] leading-relaxed text-[15px] md:text-[15.5px]"
            style={{ color: '#58524a' }}
          >
            {t('pricing.subtitle')}
          </p>

          {/* Monthly / annual toggle */}
          <div className="mt-6 inline-flex items-center gap-1 rounded-full p-1" style={{ background: '#F4F2ED', border: '1px solid #E0DACB' }}>
            {[
              { value: false, label: t('pricing.monthly') },
              { value: true, label: `${t('pricing.annual')} · ${t('pricing.save')}` },
            ].map((opt) => (
              <button
                key={String(opt.value)}
                type="button"
                onClick={() => setAnnual(opt.value)}
                className="rounded-full px-4 py-2 uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B98A00]"
                style={{
                  fontFamily: MONO,
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: '.08em',
                  background: annual === opt.value ? '#0A0A0A' : 'transparent',
                  color: annual === opt.value ? '#ECE7DB' : '#5a5346',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Trainer plans */}
        <p
          className="mt-12 uppercase"
          style={{ fontFamily: MONO, fontWeight: 700, fontSize: 11, letterSpacing: '.18em', color: '#938C7C' }}
        >
          {t('pricing.forTrainers')}
        </p>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {/* Basic — the only open plan */}
          <div className={CARD}>
            <Badge open />
            <PlanHeading
              name={t('pricing.standard.title')}
              price={t('pricing.standard.price')}
              originalPrice={t('pricing.standard.originalPrice')}
              period={t('pricing.standard.period')}
              fee={t('pricing.standard.fee')}
            />
            <FeatureList items={standardFeatures} />
            <div className="mt-auto pt-5">
              <Link
                to="/register?plan=basic"
                className="block w-full rounded-full py-3 text-center text-[13px] font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B98A00] focus-visible:ring-offset-2"
                style={{ background: '#F6C124', color: '#0A0A0A' }}
              >
                {t('pricing.standard.cta')}
              </Link>
              <div className="mt-3 flex justify-center">
                <PlanDetailsDialog planType="basic" triggerText={t('pricing.discoverDetails')}>
                  <button
                    type="button"
                    className="uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B98A00] rounded"
                    style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10, letterSpacing: '.08em', color: '#938C7C' }}
                  >
                    {t('pricing.discoverDetails')}
                  </button>
                </PlanDetailsDialog>
              </div>
            </div>
          </div>

          {/* Essenziale */}
          <div className={CARD}>
            <Badge open={false} />
            <PlanHeading
              name={t('pricing.freemium.title')}
              price={annual ? t('pricing.freemium.priceAnnual') : t('pricing.freemium.price')}
              period={t('pricing.freemium.period')}
              fee={t('pricing.freemium.fee')}
            />
            <FeatureList items={freemiumFeatures} inherited={t('pricing.detailedFeatures.everythingInBasic.name')} />
            <div className="mt-auto pt-5">
              <button
                type="button"
                onClick={() => setComingSoonOpen(true)}
                className={soonButton}
                style={{ background: '#0A0A0A', color: '#ECE7DB' }}
              >
                {t('pricing.freemium.cta')}
              </button>
              <div className="mt-3 flex justify-center">
                <PlanDetailsDialog planType="essential" triggerText={t('pricing.discoverDetails')}>
                  <button
                    type="button"
                    className="uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B98A00] rounded"
                    style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10, letterSpacing: '.08em', color: '#938C7C' }}
                  >
                    {t('pricing.discoverDetails')}
                  </button>
                </PlanDetailsDialog>
              </div>
            </div>
          </div>

          {/* Pro */}
          <div className={CARD}>
            <Badge open={false} />
            <PlanHeading
              name={t('pricing.pro.title')}
              price={annual ? t('pricing.pro.priceAnnual') : t('pricing.pro.price')}
              period={t('pricing.pro.period')}
              fee={t('pricing.pro.fee')}
            />
            <FeatureList items={proFeatures} inherited={t('pricing.detailedFeatures.everythingInEssential.name')} />
            <div className="mt-auto pt-5">
              <button
                type="button"
                onClick={() => setComingSoonOpen(true)}
                className={soonButton}
                style={{ background: '#0A0A0A', color: '#ECE7DB' }}
              >
                {t('pricing.pro.cta')}
              </button>
              <div className="mt-3 flex justify-center">
                <PlanDetailsDialog planType="pro" triggerText={t('pricing.discoverDetails')}>
                  <button
                    type="button"
                    className="uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B98A00] rounded"
                    style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10, letterSpacing: '.08em', color: '#938C7C' }}
                  >
                    {t('pricing.discoverDetails')}
                  </button>
                </PlanDetailsDialog>
              </div>
            </div>
          </div>
        </div>

        {/* AI band */}
        <div className="relative mt-10 overflow-hidden rounded-[18px]" style={{ background: '#0A0A0A' }}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[-10%] right-[-10%] top-[-40%] h-[320px]"
            style={{ background: 'radial-gradient(60% 100% at 50% 0, rgba(246,193,36,.16), transparent 70%)' }}
          />
          <div className="relative z-[1] px-5 py-7 md:px-[34px] md:py-[34px]">
            <p
              className="inline-flex items-center gap-[9px] rounded-full border px-[14px] py-[7px] uppercase"
              style={{ borderColor: 'rgba(246,193,36,.45)', background: 'rgba(246,193,36,.09)', fontFamily: MONO, fontWeight: 700, fontSize: 10.5, letterSpacing: '.2em', color: '#F6C124' }}
            >
              <span aria-hidden="true" className="inline-block shrink-0 rounded-full" style={{ width: 7, height: 7, background: '#F6C124', boxShadow: '0 0 0 4px rgba(246,193,36,.3)' }} />
              {t('aiPricing.title')}
            </p>

            <h3
              className="mt-4 max-w-[760px] uppercase text-[24px] leading-[1.05] md:text-[30px]"
              style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 118, 'wght' 900", color: '#ECE7DB' }}
            >
              {t('aiPricing.band.title')}
            </h3>

            <p className="mt-[10px] max-w-[620px] text-[14.5px] leading-[1.6]" style={{ color: 'rgba(236,231,219,.62)' }}>
              {t('aiPricing.band.subtitle')}
            </p>

            <div className="mt-[22px] grid grid-cols-1 gap-3 md:grid-cols-2">
              {[
                {
                  k: 'client',
                  icon: Crown,
                  title: t('aiPricing.client.title'),
                  who: t('aiPricing.client.who'),
                  price: t('aiPricing.client.price'),
                  period: t('aiPricing.client.period'),
                  desc: t('aiPricing.client.tagline'),
                  features: clientFeatures,
                  cta: t('aiPricing.client.cta'),
                  onOpen: () => setClientDialogOpen(true),
                },
                {
                  k: 'trainer',
                  icon: Sparkles,
                  title: t('aiPricing.trainer.title'),
                  who: t('aiPricing.trainer.who'),
                  price: t('aiPricing.trainer.price'),
                  period: t('aiPricing.trainer.period'),
                  desc: t('aiPricing.trainer.description'),
                  features: trainerFeatures,
                  cta: t('aiPricing.trainer.cta'),
                  onOpen: () => setTrainerDialogOpen(true),
                },
              ].map(({ k, icon: Icon, title, who, price, period, desc, features, cta, onOpen }) => (
                <div
                  key={k}
                  className="flex flex-col rounded-[13px] border p-[18px]"
                  style={{ borderColor: 'rgba(236,231,219,.16)', background: 'rgba(236,231,219,.045)' }}
                >
                  <div className="flex items-center gap-[11px]">
                    <div
                      aria-hidden="true"
                      className="flex shrink-0 items-center justify-center rounded-[9px]"
                      style={{ width: 34, height: 34, background: '#F6C124' }}
                    >
                      <Icon size={17} color="#0A0A0A" strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <h4
                        className="uppercase text-[15px] leading-[1.1]"
                        style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 112, 'wght' 900", color: '#ECE7DB' }}
                      >
                        {title}
                      </h4>
                      <span
                        className="mt-[3px] block uppercase"
                        style={{ fontFamily: MONO, fontWeight: 700, fontSize: 9.5, letterSpacing: '.1em', color: '#F6C124' }}
                      >
                        {who}
                      </span>
                    </div>
                    <span
                      className="ml-auto shrink-0 rounded-full border px-[9px] py-[3px] uppercase"
                      style={{ borderColor: 'rgba(236,231,219,.22)', color: 'rgba(236,231,219,.55)', fontFamily: MONO, fontWeight: 700, fontSize: 9, letterSpacing: '.08em' }}
                    >
                      {t('pricing.badgeSoon')}
                    </span>
                  </div>

                  <div className="mt-[14px] flex flex-wrap items-baseline gap-x-2">
                    <span
                      className="text-[32px] leading-none"
                      style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 112, 'wght' 900", color: '#ECE7DB' }}
                    >
                      {price}
                    </span>
                    <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 11, color: 'rgba(236,231,219,.5)' }}>{period}</span>
                  </div>

                  <p className="mt-2 text-[12.5px] leading-[1.55]" style={{ color: 'rgba(236,231,219,.58)' }}>{desc}</p>

                  <ul className="mt-4 flex flex-col gap-[9px]">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CircleCheck size={15} color="#F6C124" strokeWidth={2} className="mt-[2px] shrink-0" aria-hidden="true" />
                        <span className="text-[13px] leading-[1.5]" style={{ color: 'rgba(236,231,219,.88)' }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={onOpen}
                    className="mt-auto w-full rounded-full border py-[11px] text-[12.5px] font-bold transition-colors hover:bg-[rgba(236,231,219,.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C124] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
                    style={{ borderColor: 'rgba(236,231,219,.3)', color: '#ECE7DB', background: 'transparent', marginTop: 18 }}
                  >
                    {cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimers */}
        <p className="mx-auto mt-10 max-w-[600px] text-center text-[12px] leading-[1.6]" style={{ color: '#8a8478' }}>
          {t('pricing.disclaimer1')}
        </p>
        <p className="mx-auto mt-2 max-w-[600px] text-center text-[12px] leading-[1.6]" style={{ color: '#8a8478' }}>
          {t('pricing.disclaimer2')}
        </p>
      </div>

      {/* One shared coming-soon dialog for Essenziale, Pro, Studio, Palestra */}
      <Dialog open={comingSoonOpen} onOpenChange={setComingSoonOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('pricing.comingSoon.title')}</DialogTitle>
            <DialogDescription className="pt-2">
              {t('pricing.comingSoon.description')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={() => setComingSoonOpen(false)}
              className="w-full font-semibold"
              size="lg"
              style={{ background: '#0A0A0A', color: '#ECE7DB' }}
            >
              {t('pricing.standard.cta')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AIFeatureDialog type="client" open={clientDialogOpen} onOpenChange={setClientDialogOpen} />
      <AIFeatureDialog type="trainer" open={trainerDialogOpen} onOpenChange={setTrainerDialogOpen} />
    </section>
  );
};

export default PricingSection;
