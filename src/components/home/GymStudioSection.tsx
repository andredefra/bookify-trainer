import { useState } from 'react';
import type { CSSProperties } from 'react';
import { Users, BarChart4, Star, PieChart, GraduationCap, CircleCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const MONO = "'JetBrains Mono', ui-monospace, monospace";
const DISPLAY = "'Archivo', sans-serif";

const features: { k: string; icon: LucideIcon }[] = [
  { k: 'gym.feature1', icon: Users },
  { k: 'gym.feature2', icon: BarChart4 },
  { k: 'gym.feature3', icon: Star },
];

const benefits: { k: string; icon: LucideIcon }[] = [
  { k: 'gym.benefit1', icon: PieChart },
  { k: 'gym.benefit2', icon: GraduationCap },
  { k: 'gym.benefit3', icon: Users },
];

const GymStudioSection = () => {
  const [includedOpen, setIncludedOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <section id="gym-solution" className="bg-[#0A0A0A] py-16 md:py-20 px-5 md:px-10" style={{ color: '#ECE7DB', ['--border' as string]: '0 0% 16%', ['--foreground' as string]: '42 24% 89%', ['--ring' as string]: '45 92% 55%' } as CSSProperties}>
      <div className="mx-auto max-w-[1080px]">
        <div className="text-center">
          <p
            className="inline-flex items-center gap-[9px] rounded-full border px-4 py-2 uppercase"
            style={{
              borderColor: 'rgba(246,193,36,.3)',
              background: 'rgba(246,193,36,.08)',
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: '.2em',
              color: '#F6C124',
            }}
          >
            <span
              aria-hidden="true"
              className="inline-block shrink-0 rounded-full"
              style={{ width: 7, height: 7, background: '#F6C124', boxShadow: '0 0 0 4px rgba(246,193,36,.3)' }}
            />
            {t('gym.kicker')}
          </p>

          <h2
            className="mx-auto mt-5 uppercase text-[29px] leading-[1.05] md:text-[41px]"
            style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 118, 'wght' 900", color: '#ECE7DB' }}
          >
            {t('gym.titleA')}
            <br />
            <span style={{ color: '#F6C124' }}>{t('gym.titleB')}</span>
          </h2>

          <p
            className="mx-auto mt-4 max-w-[600px] leading-relaxed text-[15px] md:text-[15.5px]"
            style={{ color: 'rgba(236,231,219,.56)' }}
          >
            {t('gym.subtitle')}
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-[720px] grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { k: 'studio', name: t('pricing.gym.title'), note: t('gym.price.studioNote'), price: t('pricing.gym.price'), period: t('pricing.gym.period') },
            { k: 'gym', name: t('pricing.gymPlan.title'), note: t('gym.price.gymNote'), price: t('pricing.gymPlan.price'), period: t('pricing.gymPlan.period') },
          ].map(({ k, name, note, price, period }) => (
            <div
              key={k}
              className="flex items-center gap-4 rounded-[13px] border px-[18px] py-4 text-left"
              style={{ borderColor: 'rgba(236,231,219,.16)' }}
            >
              <div className="min-w-0">
                <h4
                  className="uppercase text-[15px] leading-[1.1]"
                  style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 112, 'wght' 900", color: '#ECE7DB' }}
                >
                  {name}
                </h4>
                <span
                  className="mt-1 block uppercase"
                  style={{ fontFamily: MONO, fontWeight: 700, fontSize: 9, letterSpacing: '.08em', color: 'rgba(236,231,219,.5)' }}
                >
                  {note}
                </span>
              </div>
              <div className="ml-auto flex shrink-0 items-baseline gap-1">
                <span
                  className="text-[26px] leading-none"
                  style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 112, 'wght' 900", color: '#ECE7DB' }}
                >
                  {price}
                </span>
                <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 11, color: 'rgba(236,231,219,.5)' }}>{period}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[18px] text-center">
          <button
            type="button"
            onClick={() => setIncludedOpen(true)}
            className="rounded uppercase transition-colors hover:text-[#ECE7DB] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C124]"
            style={{ fontFamily: MONO, fontWeight: 700, fontSize: 11, letterSpacing: '.1em', color: '#F6C124', borderBottom: '1px solid rgba(246,193,36,.4)', paddingBottom: 3 }}
          >
            {t('gym.price.seeIncluded')} &#8594;
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
          <div className="rounded-[14px] border border-white/10 bg-[#141414] p-4">
            <img
              src="/lovable-uploads/90229e7e-b20c-4027-aec2-64f8dbf1d36c.png"
              alt=""
              aria-hidden="true"
              className="h-auto w-full rounded-[9px]"
              loading="lazy"
            />
          </div>

          <div>
            <h3
              className="uppercase text-[22px] leading-[1.15] md:text-[26px]"
              style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 112, 'wght' 900", color: '#ECE7DB' }}
            >
              {t('gym.mainFeature')}
            </h3>
            <p className="mt-3 text-[14px] leading-[1.6]" style={{ color: 'rgba(236,231,219,.6)' }}>
              {t('gym.clientConnection')}
            </p>

            <ul className="mt-5 flex flex-col gap-[10px]">
              {features.map(({ k, icon: Icon }) => (
                <li key={k} className="flex items-start gap-3">
                  <div
                    aria-hidden="true"
                    className="flex shrink-0 items-center justify-center rounded-[8px]"
                    style={{ width: 30, height: 30, background: '#F6C124' }}
                  >
                    <Icon size={15} color="#0A0A0A" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="uppercase text-[13.5px] leading-[1.2]"
                      style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 112, 'wght' 900", color: '#ECE7DB' }}
                    >
                      {t(`${k}.title`)}
                    </p>
                    <p className="mt-1 text-[12.5px] leading-[1.5]" style={{ color: 'rgba(236,231,219,.58)' }}>
                      {t(`${k}.description`)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {benefits.map(({ k, icon: Icon }) => (
            <div key={k} className="rounded-[14px] border border-white/10 bg-[#141414] p-[18px]">
              <div
                aria-hidden="true"
                className="mb-[13px] flex items-center justify-center rounded-[9px]"
                style={{ width: 34, height: 34, background: 'rgba(246,193,36,.14)' }}
              >
                <Icon size={17} color="#F6C124" strokeWidth={1.8} />
              </div>
              <h4
                className="mb-2 uppercase text-[14.5px] leading-[1.14]"
                style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 112, 'wght' 900", color: '#ECE7DB' }}
              >
                {t(`${k}.title`)}
              </h4>
              <p className="text-[13px] leading-[1.52]" style={{ color: 'rgba(236,231,219,.58)' }}>
                {t(`${k}.description`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#pricing"
            className="inline-block rounded-full px-9 py-[15px] text-[15.5px] font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C124] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
            style={{ background: '#F6C124', color: '#0A0A0A' }}
          >
            {t('gym.cta')}
          </a>
        </div>
      </div>
      <Dialog open={includedOpen} onOpenChange={setIncludedOpen}>
        <DialogContent
          className="max-h-[85vh] overflow-y-auto sm:max-w-2xl"
          style={{ background: '#FFFFFF', borderColor: '#E0DACB', color: '#0A0A0A', ['--border' as string]: '43 25% 84%', ['--foreground' as string]: '0 0% 4%', ['--ring' as string]: '45 92% 55%' } as CSSProperties}
        >
          <DialogHeader>
            <DialogTitle
              className="uppercase text-[20px] leading-[1.1]"
              style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 112, 'wght' 900", color: '#0A0A0A' }}
            >
              {t('pricing.forGyms')}
            </DialogTitle>
            <DialogDescription className="pt-1 text-[13.5px] leading-[1.6]" style={{ color: '#5d574d' }}>
              {t('pricing.gymPlanDescription')}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              {
                k: 'studio',
                name: t('pricing.gym.title'),
                price: t('pricing.gym.price'),
                period: t('pricing.gym.period'),
                fee: t('pricing.gym.fee'),
                items: [
                  t('pricing.features.unlimitedTrainers'),
                  t('pricing.features.gymUnlimitedClients'),
                  t('pricing.features.directClientChat'),
                  t('pricing.features.clientResults'),
                  t('pricing.features.createProgramsDirectly'),
                  t('pricing.features.dynamicPTAssignment'),
                ],
              },
              {
                k: 'gym',
                name: t('pricing.gymPlan.title'),
                price: t('pricing.gymPlan.price'),
                period: t('pricing.gymPlan.period'),
                fee: t('pricing.gymPlan.fee'),
                items: [
                  t('pricing.features.unlimitedTrainers'),
                  t('pricing.features.gymUnlimitedClients'),
                  t('pricing.features.memberSubscriptionManagement'),
                  t('pricing.features.commissionOnPTServices'),
                  t('pricing.features.serviceRequestsToTrainers'),
                  t('pricing.features.gymIntegration'),
                ],
              },
            ].map(({ k, name, price, period, fee, items }) => (
              <div key={k} className="rounded-[14px] border p-[18px]" style={{ borderColor: '#E0DACB', background: '#F4F2ED' }}>
                <span
                  className="inline-block rounded-full uppercase"
                  style={{ fontFamily: MONO, fontWeight: 700, fontSize: 9, letterSpacing: '.08em', border: '1px solid #E0DACB', background: '#FFFFFF', color: '#8a8478', padding: '4px 10px' }}
                >
                  {t('pricing.badgeSoon')}
                </span>
                <h3
                  className="mt-3 uppercase text-[17px] leading-[1.1]"
                  style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 112, 'wght' 900", color: '#0A0A0A' }}
                >
                  {name}
                </h3>
                <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
                  <span
                    className="text-[30px] leading-none"
                    style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 112, 'wght' 900", color: '#0A0A0A' }}
                  >
                    {price}
                  </span>
                  <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 11, color: '#938C7C' }}>{period}</span>
                </div>
                <p className="mt-2 text-[12px] leading-[1.5]" style={{ color: '#5d574d' }}>{fee}</p>
                <ul className="mt-4 flex flex-col gap-[9px]">
                  {items.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CircleCheck size={15} color="#B98A00" strokeWidth={2} className="mt-[2px] shrink-0" aria-hidden="true" />
                      <span className="text-[13px] leading-[1.5]" style={{ color: '#3f3a33' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GymStudioSection;
