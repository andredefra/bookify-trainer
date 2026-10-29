import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

interface ClientDemoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** 'client' (marketplace, from=user) keeps the client form and "Torna ai profili";
   *  'trainer' (example page from the trainer home) points to the trainer form. */
  context?: 'client' | 'trainer';
}

export default function ClientDemoDialog({ open, onOpenChange, context = 'client' }: ClientDemoDialogProps) {
  const { t } = useLanguage();
  const trainer = context === 'trainer';
  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="trainer-brand max-w-[calc(100%-2rem)] rounded-xl border-brand-border bg-brand-canvas text-brand-text sm:max-w-lg">
      <DialogHeader>
        <DialogTitle className="trainer-headline pr-5 leading-tight">{t(trainer ? 'demoDialog.title' : 'consumerMarket.dialogTitle')}</DialogTitle>
        <DialogDescription className="pt-3 text-brand-text/70 leading-relaxed">{t(trainer ? 'demoDialog.body' : 'consumerMarket.dialogBody')}</DialogDescription>
      </DialogHeader>
      <Button asChild className="rounded-full bg-brand-highlight text-brand-canvas hover:bg-brand-highlight/90"><a href={t(trainer ? 'pricing.standard.ctaHref' : 'userPricing.formUrl')} target="_blank" rel="noopener noreferrer">{t('consumerMarket.interest')}</a></Button>
      {trainer
        ? <Button variant="link" onClick={() => onOpenChange(false)} className="text-brand-text/70">{t('demoDialog.close')}</Button>
        : <Button variant="link" onClick={() => onOpenChange(false)} className="text-brand-text/70">{t('consumerMarket.back')}</Button>}
    </DialogContent>
  </Dialog>;
}
