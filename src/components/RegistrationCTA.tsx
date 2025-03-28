
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const RegistrationCTA = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-12 bg-primary/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-4 reveal">
          {t('cta.title')}
        </h2>
        <p className="text-lg text-muted-foreground mb-8 reveal reveal-delay-1">
          {t('cta.description')}
        </p>
        <a
          href="https://forms.gle/23JCufSRADPg7HRRA"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-primary text-white rounded-full text-lg font-medium button-hover reveal reveal-delay-2"
        >
          {t('cta.button')}
        </a>
      </div>
    </section>
  );
};

export default RegistrationCTA;
