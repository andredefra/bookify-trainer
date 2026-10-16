import {
  UserPlus,
  Users,
  Calendar,
  Dumbbell,
  Clock,
  ClipboardList,
  ListChecks,
  CircleCheck,
  LineChart,
  MessageSquare,
  Zap,
  CreditCard,
  FileText,
  Copy,
  LayoutDashboard,
  Sparkles,
  Globe,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const MONO = "'JetBrains Mono', ui-monospace, monospace";
const DISPLAY = "'Archivo', sans-serif";

const cards: { k: string; icon: LucideIcon }[] = [
  { k: 'feat2.c1', icon: UserPlus },
  { k: 'feat2.c2', icon: Users },
  { k: 'feat2.c3', icon: Calendar },
  { k: 'feat2.c4', icon: Dumbbell },
  { k: 'feat2.c5', icon: Clock },
  { k: 'feat2.c6', icon: ClipboardList },
  { k: 'feat2.c7', icon: ListChecks },
  { k: 'feat2.c9', icon: LineChart },
  { k: 'feat2.c10', icon: MessageSquare },
  { k: 'feat2.c11', icon: Zap },
  { k: 'feat2.c12', icon: CreditCard },
  { k: 'feat2.c13', icon: FileText },
  { k: 'feat2.c14', icon: Copy },
  { k: 'feat2.c15', icon: LayoutDashboard },
  { k: 'feat2.c16', icon: Sparkles },
  { k: 'feat2.c17', icon: Globe },
];

const FeaturesGrid = () => {
  const { t } = useLanguage();

  return (
    <section id="features" className="bg-[#ECE7DB] py-16 md:py-20 px-5 md:px-10">
      <div className="mx-auto max-w-[1080px]">
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
            {t('feat2.kicker')}
          </p>

          <h2
            className="mx-auto mt-5 uppercase text-[29px] leading-[1.05] md:text-[41px]"
            style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 118, 'wght' 900", color: '#0A0A0A' }}
          >
            {t('feat2.titleA')}
            <br />
            <span style={{ color: '#B98A00' }}>{t('feat2.titleB')}</span>
          </h2>

          <p
            className="mx-auto mt-4 max-w-[600px] leading-relaxed text-[15px] md:text-[15.5px]"
            style={{ color: '#58524a' }}
          >
            {t('feat2.sub')}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:mt-11">
          {cards.map(({ k, icon: Icon }) => (
            <div
              key={k}
              className="flex flex-col rounded-[14px] border border-[#E0DACB] bg-white p-[18px] pb-[19px]"
            >
              <div
                aria-hidden="true"
                className="mb-[13px] flex items-center justify-center rounded-[9px]"
                style={{ width: 34, height: 34, background: '#0A0A0A' }}
              >
                <Icon size={17} color="#F6C124" strokeWidth={1.8} />
              </div>

              <h3
                className="mb-2 uppercase text-[14.5px] leading-[1.14] lg:text-[14px]"
                style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 112, 'wght' 900", color: '#0A0A0A' }}
              >
                {t(`${k}.t`)}
              </h3>

              <p
                className="leading-[1.52] text-[13px] md:text-[12.4px]"
                style={{ color: '#5d574d' }}
              >
                {t(`${k}.d`)}
              </p>

              <p
                className="mt-auto pt-[13px] uppercase"
                style={{
                  fontFamily: MONO,
                  fontWeight: 700,
                  fontSize: 9,
                  letterSpacing: '.08em',
                  color: '#938C7C',
                }}
              >
                {t(`${k}.g`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-3 overflow-hidden rounded-[14px] border border-[#E0DACB] bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center p-[28px] md:p-[36px]">
              <p className="inline-flex items-center gap-2 uppercase" style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10, letterSpacing: '.18em', color: '#938C7C' }}>
                <span aria-hidden="true" className="inline-block shrink-0 rounded-full" style={{ width: 6, height: 6, background: '#F6C124' }} />
                {t('feat2.vid.kicker')}
              </p>
              <h3 className="mt-4 uppercase text-[24px] leading-[1.1] md:text-[28px]" style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 112, 'wght' 900", color: '#0A0A0A' }}>
                {t('feat2.vid.titleA')}
                <br />
                <span style={{ color: '#B98A00' }}>{t('feat2.vid.titleB')}</span>
              </h3>
              <p className="mt-3 text-[14px] leading-[1.6]" style={{ color: '#5d574d' }}>{t('feat2.vid.d')}</p>
              <ul className="mt-5 flex flex-col gap-[10px]">
                {['b1', 'b2', 'b3'].map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <CircleCheck size={16} color="#B98A00" strokeWidth={2} className="mt-[1px] shrink-0" aria-hidden="true" />
                    <span className="text-[13px] leading-[1.5]" style={{ color: '#3f3a33' }}>{t(`feat2.vid.${b}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-center bg-[#ECE7DB] p-[28px] md:p-[36px]">
              <div className="w-full max-w-[380px] rounded-[12px] border border-[#E0DACB] bg-white p-[14px]">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="uppercase text-[14px]" style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 112, 'wght' 900", color: '#0A0A0A' }}>{t('feat2.vid.ex')}</p>
                    <p className="text-[11.5px]" style={{ color: '#8a8478' }}>{t('feat2.vid.exs')}</p>
                  </div>
                  <span className="shrink-0 rounded-[5px] px-2 py-1 uppercase" style={{ background: 'rgba(246,193,36,.3)', color: '#8a6a00', fontFamily: MONO, fontWeight: 700, fontSize: 8.5, letterSpacing: '.06em' }}>{t('feat2.vid.tag')}</span>
                </div>
                <p className="mt-[10px] rounded-[7px] bg-[#F4F2ED] px-[10px] py-2 text-[11.5px]" style={{ color: '#5d574d' }}>{t('feat2.vid.note')}</p>
                <div aria-hidden="true" className="mt-[10px] flex h-[150px] items-center justify-center rounded-[9px]" style={{ background: 'linear-gradient(135deg,#2a2a2a,#111)' }}>
                  <div className="flex items-center justify-center rounded-full" style={{ width: 46, height: 46, background: '#F6C124' }}>
                    <span style={{ width: 0, height: 0, marginLeft: 4, borderTop: '9px solid transparent', borderBottom: '9px solid transparent', borderLeft: '14px solid #0A0A0A' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
