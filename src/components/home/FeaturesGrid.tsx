import {
  UserPlus,
  Users,
  Calendar,
  Dumbbell,
  Clock,
  ClipboardList,
  ListChecks,
  PlayCircle,
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
  { k: 'feat2.c8', icon: PlayCircle },
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
      </div>
    </section>
  );
};

export default FeaturesGrid;
