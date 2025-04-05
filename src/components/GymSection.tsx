import React from 'react';
import { useTranslation } from 'react-i18next';

export function GymSection() {
  const { t } = useTranslation();
  return (
    <section id="gyms" className="py-24 bg-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-6">{t('gym.title')}</h2>
          <p className="text-gray-600">{t('gym.clientConnection')}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">{t('gym.subtitle')}</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary grid place-items-center text-white mt-1">
                    <CheckIcon className="h-4 w-4" />
                  </div>
                  <p className="ml-3">{t(`gym.benefit${i}`)}</p>
                </div>
              ))}
            </div>
            
            <div className="pt-4">
              <a href="#gym-pricing" className="reveal inline-flex px-6 py-3 bg-gray-800 text-white rounded-full text-base font-medium button-hover">
                {t('gym.cta')}
              </a>
            </div>
          </div>
          
          <div>
            <img 
              src="/lovable-uploads/74599ec0-408c-4279-bc3d-ed4b7d787969.png" 
              alt="Gym Dashboard" 
              className="h-64 md:h-auto rounded-lg shadow-lg" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
