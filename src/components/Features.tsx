import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CreditCard, Users, Clock, ListChecks, MessageSquare, Globe, Bot, UserPlus, Youtube, Video, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Features = () => {
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

  const features = [
    {
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: t('features.aiScheduling'),
      description: t('features.aiSchedulingDesc')
    },
    {
      icon: <Bot className="h-6 w-6 text-primary" />,
      title: t('features.aiAssistant'),
      description: t('features.aiAssistantDesc')
    },
    {
      icon: <CreditCard className="h-6 w-6 text-primary" />,
      title: t('features.stripeIntegration'),
      description: t('features.stripeIntegrationDesc')
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: t('features.groupSessions'),
      description: t('features.groupSessionsDesc')
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: t('features.googleCalendar'),
      description: t('features.googleCalendarDesc')
    },
    {
      icon: <ListChecks className="h-6 w-6 text-primary" />,
      title: t('features.waitlistSystem'),
      description: t('features.waitlistSystemDesc')
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      title: t('features.messaging'),
      description: t('features.messagingDesc')
    },
    {
      icon: <UserPlus className="h-6 w-6 text-primary" />,
      title: t('features.sessionManagement'),
      description: t('features.sessionManagementDesc')
    },
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: t('features.personalTrainerPage'),
      description: t('features.personalTrainerPageDesc')
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="reveal text-2xl md:text-4xl font-display font-bold tracking-tight text-primary mb-4 md:mb-6">
            {t('features.title')}
          </h2>
          <p className="reveal reveal-delay-1 text-base md:text-lg text-muted-foreground">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`reveal reveal-delay-${index % 3} p-4 md:p-6 rounded-lg md:rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-primary/10 mb-3 md:mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{feature.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-20 max-w-4xl mx-auto">
          <div className="reveal rounded-xl overflow-hidden border border-border shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-primary/5 p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center mb-3">
                  <Youtube className="h-5 w-5 mr-2 text-red-500" />
                  <Video className="h-5 w-5 text-blue-500" />
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold tracking-tight text-primary mb-3 md:mb-4">
                  {t('features.videoTitle')}
                </h3>
                <p className="text-base text-muted-foreground mb-4">
                  Gli allenatori possono aggiungere video a qualsiasi esercizio nei loro programmi, garantendo ai clienti perfette dimostrazioni visive della corretta forma e tecnica.
                </p>
                <ul className="space-y-2 text-xs md:text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mr-2 mt-0.5" />
                    <span>{t('features.videoFeature1')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mr-2 mt-0.5" />
                    <span>{t('features.videoFeature2')}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mr-2 mt-0.5" />
                    <span>{t('features.videoFeature3')}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-4 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/66e06f64-e5e8-4ff1-814e-b919c087ddd0.png" 
                  alt="Trainer demonstrating exercise" 
                  className="w-full h-auto object-cover max-h-[350px]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24 max-w-3xl mx-auto text-center">
          <h3 className="reveal text-xl md:text-3xl font-display font-bold tracking-tight text-primary mb-4 md:mb-6">
            {t('features.profileTitle')}
          </h3>
          <p className="reveal reveal-delay-1 text-base md:text-lg text-muted-foreground mb-6 md:mb-8">
            {t('features.profileDesc')}
          </p>
          
          <div className="reveal reveal-delay-2 p-3 md:p-4 bg-secondary/50 rounded-xl md:rounded-2xl border border-border shadow-sm">
            <div className="flex items-center space-x-2 p-1.5 md:p-2 mb-2 rounded bg-white/70 border-b border-black/5">
              <div className="flex items-center space-x-1.5 md:space-x-2">
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-400"></div>
              </div>
              <div className="mx-auto pr-6 md:pr-8 text-xs md:text-sm text-muted-foreground">
                my-personal-fit.it/michael-thompson
              </div>
            </div>
            <div className="h-[200px] md:h-[300px] bg-white rounded-lg p-2 md:p-4 flex items-center justify-center">
              <img 
                src="/lovable-uploads/60d8d824-f090-4fbc-8935-e858e4d59547.png" 
                alt="Personal trainer profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="reveal reveal-delay-3 mt-8 md:mt-10">
            <Link to="/find-trainer" className="inline-block px-6 py-3 md:py-4 bg-primary text-white rounded-full text-base md:text-lg font-medium border border-primary/10 button-hover">
              {t('features.findTrainer')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
