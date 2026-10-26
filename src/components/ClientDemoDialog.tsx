import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

export default function ClientDemoDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { t } = useLanguage();
  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="trainer-brand max-w-[calc(100%-2rem)] rounded-xl border-brand-border bg-brand-canvas text-brand-text sm:max-w-lg">
      <DialogHeader>
        <DialogTitle className="trainer-headline pr-5 leading-tight">{t('consumerMarket.dialogTitle')}</DialogTitle>
        <DialogDescription className="pt-3 text-brand-text/70 leading-relaxed">{t('consumerMarket.dialogBody')}</DialogDescription>
      </DialogHeader>
      <Button asChild className="rounded-full bg-brand-highlight text-brand-canvas hover:bg-brand-highlight/90"><a href={t('userPricing.formUrl')} target="_blank" rel="noopener noreferrer">{t('consumerMarket.interest')}</a></Button>
      <Button variant="link" onClick={() => onOpenChange(false)} className="text-brand-text/70">{t('consumerMarket.back')}</Button>
    </DialogContent>
  </Dialog>;
}