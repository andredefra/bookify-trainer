import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from '@/context/LanguageContext';

interface MarketingSectionProps {
  trainerName: string;
}

export const MarketingSection = ({ trainerName }: MarketingSectionProps) => {
  const { t } = useLanguage();
  return (
    <div className="trainer-brand mt-12 bg-brand-canvas p-7 text-brand-text md:p-9">
      <h2 className="trainer-headline text-2xl leading-tight md:text-[28px]">
        {t('profileMarketing.stripTitle')}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-text/70">
        {t('profileMarketing.stripText')}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild className="h-auto min-h-10 max-w-full whitespace-normal rounded-full bg-brand-highlight px-5 font-bold text-brand-canvas hover:bg-brand-highlight/90">
          <a href={t('pricing.standard.ctaHref')} target="_blank" rel="noopener noreferrer">
            {t('profileMarketing.stripPrimary')}<ArrowUpRight className="shrink-0" />
          </a>
        </Button>
        <Button asChild variant="outline" className="h-auto min-h-10 max-w-full whitespace-normal rounded-full border-brand-border px-5 font-bold text-brand-text hover:bg-brand-surface hover:text-brand-text">
          <Link to="/login">{t('profileMarketing.stripSecondary')}</Link>
        </Button>
      </div>
    </div>
  );
};
