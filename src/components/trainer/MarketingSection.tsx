
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarCheck, CreditCard, MessageSquare } from "lucide-react";
import { useLanguage } from '@/context/LanguageContext';

interface MarketingSectionProps {
  trainerName: string;
}

export const MarketingSection = ({ trainerName }: MarketingSectionProps) => {
  const { t } = useLanguage();
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-display font-semibold text-center mb-8">
        {t('profileMarketing.title').replace('{name}', trainerName)}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
              <CalendarCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t('profileMarketing.calendarTitle')}</h3>
            <p className="text-muted-foreground">
              {t('profileMarketing.calendarText')}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t('profileMarketing.paymentsTitle')}</h3>
            <p className="text-muted-foreground">
              {t('profileMarketing.paymentsText')}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t('profileMarketing.chatTitle')}</h3>
            <p className="text-muted-foreground">
              {t('profileMarketing.chatText')}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center mt-10">
        <Link to="/login">
          <Button size="lg" className="px-8">
            {t('profileMarketing.button')}
          </Button>
        </Link>
      </div>
    </div>
  );
};
