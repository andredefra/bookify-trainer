
import { GraduationCap, Users, PieChart, BarChart4, Star } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect } from 'react';

const GymSection = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="gym-solution" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="reveal text-3xl md:text-4xl font-display font-bold tracking-tight text-gray-800 mb-6">
            {t('gym.title')}
          </h2>
          <p className="reveal reveal-delay-1 text-muted-foreground">
            {t('gym.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-16">
          <div className="reveal">
            <div className="h-64 md:h-auto rounded-lg bg-contain bg-no-repeat bg-center shadow-lg" 
                style={{
                  backgroundImage: `url("/lovable-uploads/90229e7e-b20c-4027-aec2-64f8dbf1d36c.png")`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  height: "100%",
                  minHeight: "320px"
                }}>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="reveal text-2xl font-semibold text-gray-800 mb-4">{t('gym.mainFeature')}</h3>
            <p className="reveal reveal-delay-1 text-muted-foreground mb-6">{t('gym.clientConnection')}</p>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`reveal reveal-delay-${i} flex items-start`}>
                  <div className="mr-4 bg-gray-100 p-2 rounded-full">
                    {i === 1 ? <Users className="h-5 w-5 text-gray-700" /> : 
                     i === 2 ? <BarChart4 className="h-5 w-5 text-gray-700" /> : 
                     <Star className="h-5 w-5 text-gray-700" />}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{t(`gym.feature${i}.title`)}</h4>
                    <p className="text-sm text-muted-foreground">{t(`gym.feature${i}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i + 3} className={`reveal reveal-delay-${i} bg-white p-8 rounded-2xl shadow-sm border border-gray-200`}>
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                {i === 1 ? <PieChart className="h-6 w-6 text-gray-700" /> : 
                 i === 2 ? <GraduationCap className="h-6 w-6 text-gray-700" /> : 
                 <Users className="h-6 w-6 text-gray-700" />}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{t(`gym.benefit${i}.title`)}</h3>
              <p className="text-muted-foreground">{t(`gym.benefit${i}.description`)}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#gym-pricing" className="reveal inline-flex px-6 py-3 bg-gray-800 text-white rounded-full text-base font-medium button-hover">
            {t('gym.cta')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default GymSection;
