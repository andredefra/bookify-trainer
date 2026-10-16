import { Users, BarChart4, Star, PieChart, GraduationCap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

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
  const { t } = useLanguage();

  return (
    <section id="gym-solution" className="bg-[#0A0A0A] py-16 md:py-20 px-5 md:px-10">
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
    </section>
  );
};

export default GymStudioSection;
