import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Crown, Sparkles, CircleCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface AIFeatureDialogProps {
  type: 'client' | 'trainer';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MONO = "'JetBrains Mono', ui-monospace, monospace";
const DISPLAY = "'Archivo', sans-serif";
const BODY = "'Inter', sans-serif";

const CLIENT_KEYS = ['aiWorkoutCoach', 'todaySession', 'advancedInsights', 'privateChats'];
const TRAINER_KEYS = ['businessInsights', 'chatAssistant', 'clientAnalytics', 'smartRecommendations'];

const AIFeatureDialog = ({ type, open, onOpenChange }: AIFeatureDialogProps) => {
  const { t } = useLanguage();
  const isClient = type === 'client';
  const Icon = isClient ? Crown : Sparkles;
  const features = (isClient ? CLIENT_KEYS : TRAINER_KEYS).map((k) => t(`aiPricing.${type}.features.${k}`));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-lg max-h-[85vh] overflow-y-auto"
        style={{ background: '#FFFFFF', color: '#3f3a33', fontFamily: BODY, borderColor: '#E0DACB' }}
      >
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              aria-hidden="true"
              className="flex shrink-0 items-center justify-center rounded-[9px]"
              style={{ width: 34, height: 34, background: '#F6C124' }}
            >
              <Icon size={17} color="#0A0A0A" strokeWidth={1.8} />
            </div>
            <div className="text-left">
              <DialogTitle
                className="uppercase text-[20px] leading-[1.1]"
                style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 112, 'wght' 900", color: '#0A0A0A' }}
              >
                {t(`aiPricing.${type}.title`)}
              </DialogTitle>
              <DialogDescription className="mt-1 text-[13px]" style={{ color: '#3f3a33' }}>
                {isClient ? t('aiPricing.client.tagline') : t('aiPricing.trainer.description')}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ul className="mt-4 flex flex-col gap-2">
          {features.map((f, i) => (
            <li
              key={i}
              className="flex items-start gap-2 rounded-[12px] border px-4 py-3"
              style={{ background: '#FFFFFF', borderColor: '#E0DACB' }}
            >
              <CircleCheck size={16} color="#B98A00" strokeWidth={2} className="mt-[2px] shrink-0" aria-hidden="true" />
              <span className="text-[14px] leading-[1.5]" style={{ color: '#3f3a33' }}>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 border-t pt-4" style={{ borderColor: '#E0DACB' }}>
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span
              className="text-[28px] leading-none"
              style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 112, 'wght' 900", color: '#0A0A0A' }}
            >
              {t(`aiPricing.${type}.price`)}
            </span>
            <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 11, color: '#938C7C' }}>
              {t(`aiPricing.${type}.period`)}
            </span>
          </div>
          {isClient && (
            <p className="mt-[6px]" style={{ fontFamily: MONO, fontWeight: 700, fontSize: 11, color: '#B98A00' }}>
              {t('aiPricing.client.then')}
            </p>
          )}
          <button
            type="button"
            disabled
            className="mt-4 w-full cursor-not-allowed rounded-full py-[11px] text-[13px] font-bold"
            style={{ background: '#0A0A0A', color: '#ECE7DB' }}
          >
            {t('aiPricing.comingSoon')}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIFeatureDialog;
