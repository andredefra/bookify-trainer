import type { CSSProperties } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const MONO = "'JetBrains Mono', ui-monospace, monospace";
const DISPLAY = "'Archivo', sans-serif";

const RegistrationCTA = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-[#ECE7DB] px-5 py-16 md:px-10 md:py-20" style={{ color: '#0A0A0A', ['--border' as string]: '43 25% 84%', ['--foreground' as string]: '0 0% 4%', ['--ring' as string]: '45 92% 55%' } as CSSProperties}>
      <div className="mx-auto max-w-[1080px]">
        <div
          className="mx-auto flex flex-col items-center rounded-[18px] border px-6 py-12 text-center md:px-12 md:py-14"
          style={{ borderColor: '#E0DACB', background: '#FFFFFF' }}
        >
          <span
            aria-hidden="true"
            className="inline-block shrink-0 rounded-full"
            style={{ width: 9, height: 9, background: '#F6C124', boxShadow: '0 0 0 5px rgba(246,193,36,.26)' }}
          />

          <h2
            className="mt-6 max-w-[620px] uppercase text-[27px] leading-[1.06] md:text-[38px]"
            style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 118, 'wght' 900", color: '#0A0A0A' }}
          >
            {t('cta.title')}
          </h2>

          <p
            className="mt-4 max-w-[580px] text-[15px] leading-relaxed md:text-[15.5px]"
            style={{ color: '#58524a' }}
          >
            {t('cta.description')}
          </p>

          <a
            href={t('earlyAccess.typeformUrl')}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block w-full rounded-full px-9 py-[15px] text-[15px] font-bold leading-[1.3] transition-colors hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B98A00] focus-visible:ring-offset-2 sm:w-auto md:text-[15.5px]"
            style={{ background: '#F6C124', color: '#0A0A0A' }}
          >
            {t('cta.button')}
          </a>

          <p
            className="mt-5 uppercase"
            style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10, letterSpacing: '.16em', color: '#938C7C' }}
          >
            mypersonal.fit
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegistrationCTA;
