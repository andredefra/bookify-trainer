import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { CheckCircle2, Info } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/context/LanguageContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type Props = { open: boolean; onOpenChange: (open: boolean) => void };
type Status = 'form' | 'success' | 'duplicate';

const sb = supabase as any; // waitlist not yet in generated types

const WaitlistDialog = ({ open, onOpenChange }: Props) => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [trains, setTrains] = useState<'' | 'alone' | 'with_pt'>('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>('form');

  useEffect(() => {
    if (open) { setStatus('form'); setErrors({}); }
  }, [open]);

  const schema = z.object({
    fullName: z.string().trim().min(1, t('waitlist.errors.name')).max(100),
    email: z.string().trim().email(t('waitlist.errors.email')).max(255),
    city: z.string().trim().max(100),
    phone: z.string().trim().max(30),
    trains: z.enum(['alone', 'with_pt'], { errorMap: () => ({ message: t('waitlist.errors.train') }) }),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ fullName, email, city, phone, trains });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as string] ??= i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const params = new URLSearchParams(location.search);
    const v = parsed.data;
    const { error } = await sb.from('waitlist').insert({
      full_name: v.fullName,
      email: v.email.toLowerCase(),
      city: v.city || null,
      phone: v.phone || null,
      trains_with_pt: v.trains,
      audience: 'user',
      language,
      source_page: location.pathname,
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
      marketing_consent: consent,
      consent_at: consent ? new Date().toISOString() : null,
    });
    setSubmitting(false);
    if (!error) { setStatus('success'); return; }
    if (error.code === '23505') { setStatus('duplicate'); return; }
    setErrors({ form: t('waitlist.errors.generic') });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        {status !== 'form' ? (
          <div className="text-center py-6 space-y-4">
            {status === 'success'
              ? <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
              : <Info className="h-12 w-12 text-primary mx-auto" />}
            <DialogTitle className="text-2xl">{t(`waitlist.${status}.title`)}</DialogTitle>
            <DialogDescription>{t(`waitlist.${status}.body`)}</DialogDescription>
            <Button onClick={() => onOpenChange(false)}>{t('waitlist.close')}</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{t('waitlist.title')}</DialogTitle>
              <DialogDescription>{t('waitlist.subtitle')}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="space-y-1">
                <Label htmlFor="wl-name">{t('waitlist.fullName')} *</Label>
                <Input id="wl-name" value={fullName} onChange={(e) => setFullName(e.target.value)} maxLength={100} autoComplete="name" />
                {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="wl-email">{t('waitlist.email')} *</Label>
                <Input id="wl-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} autoComplete="email" />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="wl-city">{t('waitlist.city')}</Label>
                  <Input id="wl-city" value={city} onChange={(e) => setCity(e.target.value)} maxLength={100} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="wl-phone">{t('waitlist.phone')}</Label>
                  <Input id="wl-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={30} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t('waitlist.trainQuestion')} *</Label>
                <RadioGroup value={trains} onValueChange={(v) => setTrains(v as any)}>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="alone" id="wl-alone" />
                    <Label htmlFor="wl-alone" className="font-normal">{t('waitlist.alone')}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="with_pt" id="wl-pt" />
                    <Label htmlFor="wl-pt" className="font-normal">{t('waitlist.withPt')}</Label>
                  </div>
                </RadioGroup>
                {errors.trains && <p className="text-sm text-destructive">{errors.trains}</p>}
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="wl-consent" checked={consent} onCheckedChange={(c) => setConsent(c === true)} className="mt-0.5" />
                <Label htmlFor="wl-consent" className="font-normal text-sm leading-snug">
                  {t('waitlist.consent')}{' '}
                  <Link to="/privacy" target="_blank" className="underline text-primary">{t('waitlist.privacyLink')}</Link>
                </Label>
              </div>
              {errors.form && <p className="text-sm text-destructive">{errors.form}</p>}
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? t('waitlist.submitting') : t('waitlist.submit')}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistDialog;
