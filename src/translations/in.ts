import { en } from './en';

/** India: English copy with rupee prices, Mumbai demo data and GST invoicing. */
export const inOverrides: Partial<Record<keyof typeof en, string>> = {
  // Basic card form
  'market.cityPh': 'Mumbai',
  'market.perHour': '/ session',
  'pricing.standard.ctaHref': 'https://andredefra64.typeform.com/to/tWw25WDw',
  'earlyAccess.typeformUrl': 'https://andredefra64.typeform.com/to/cuAL2wU7',

  // Plan prices (1 € = ₹106.64)
  'pricing.standard.price': '₹0',
  'pricing.standard.originalPrice': '₹212',
  'pricing.standard.fee': 'FREE for 6 months, then ₹212/month',
  'pricing.freemium.price': '₹960',
  'pricing.freemium.priceAnnual': '₹533',
  'pricing.pro.price': '₹3,092',
  'pricing.pro.priceAnnual': '₹2,559',
  'pricing.features.reducedProPricing': 'Reduced Pro Pricing for Trainers (₹2,026/mo)',
  'pricing.disclaimer2': 'The app stays free for your clients: they get in through your subscription. Coach AI is separate — the client turns it on and pays for it, ₹106 a month for the first year.',
  'aiPricing.subtitle': 'Enhance your experience with advanced AI capabilities for just ₹212/month',
  'aiPricing.client.price': '₹106',
  'aiPricing.client.then': 'First 10 clients free for a year · then ₹212',
  'aiPricing.trainer.price': '₹212',
  'feat2.c16.g': '₹212 per month',

  // GST invoicing
  'feat2.c13.t': 'GST Invoices',
  'feat2.c13.d': 'GST registered or not, you set it once. Every payment becomes an invoice your client downloads as a PDF — and a credit note if you refund.',
  'feat2.c13.g': 'PDF invoice in one tap',
  'feat2.c14.t': 'Refunds and Credit Notes',
  'feat2.c14.d': 'Refund a client and a credit note is issued against the original invoice, with its own number. The original never changes.',
  'feat2.c14.g': 'Nothing gets rewritten',
  'features.invoiceManagementDesc': 'Every incoming payment becomes a PDF invoice — tax invoice, bill of supply or receipt, depending on your GST status — that you send to your client in chat.',
  'pricing.detailedFeatures.pro.invoicing.description': 'When you sign up we ask whether you are GST registered — regular, composition or unregistered — so the price the client sees is already the final one, and every payment can become a PDF invoice you send in chat.',

  // Hero dashboard preview
  'heroPreview.kpi3Value': '₹71,000',
  'heroPreview.kpi3Delta': '+₹10,500',
  'heroPreview.kpi4Value': '₹9,500',
  'heroPreview.notif1Sub': 'Aarav Shah · ₹3,000',
  'heroPreview.client1': 'Ishaan Mehta',
  'heroPreview.client2': 'Aarav Shah',
  'heroPreview.client3': 'Diya Kapoor',
  'heroPreview.client4': 'Rohan Desai',
  'heroPreview.client5': 'Meera Nair',

  // Phone walkthrough
  'pv.s1.url': 'mypersonal.fit/t/priya-sharma',
  'pv.s1.name': 'Priya Sharma',
  'pv.s1.meta': 'Personal Trainer · Mumbai · 8 years of experience',
  'pv.s1.r1p': '₹1,500 / hour',
  'pv.s3.r1t': 'Aarav Shah', 'pv.s3.r1a': 'AS',
  'pv.s3.r2t': 'Neha Patel', 'pv.s3.r2a': 'NP',
  'pv.s3.r3t': 'Kabir Rao', 'pv.s3.r3a': 'KR',
  'pv.s3.r4t': 'Ananya Iyer', 'pv.s3.r4a': 'AN',
  'pv.s4.pkp': '₹13,500',
  'pv.s5.r1t': 'Aarav Shah · Tue 21, 18:00', 'pv.s5.r1a': 'AS',
  'pv.s5.r1p': '₹1,500 collected',
  'pv.s5.r2t': 'Neha Patel · Wed 22, 9:00', 'pv.s5.r2a': 'NP',
  'pv.s5.r3t': 'Ananya Iyer · Elite package', 'pv.s5.r3a': 'AN',
  'pv.s5.r3p': '₹4,500',
  'pv.s5.r4t': 'Kabir Rao', 'pv.s5.r4a': 'KR',
  'pv.s5.r4p': '₹1,200 collected',
  'pv.s5.r5t': 'Invoice · regular GST',
  'pv.s5.r5s': 'GST 5% included in the price',
  'pv.s5.r5p': 'Generate',
  'pv.s6.k1v': '₹71,000',
  'pv.s6.k1d': '+₹10,500',
  'pv.s6.r6t': 'Aarav Shah', 'pv.s6.r6a': 'AS',
  'pv.s6.r7t': 'Neha Patel', 'pv.s6.r7a': 'NP',
  'pv.s6.r7s': 'Paid today · ₹3,000',

  // Studio mock trainers
  'gymMock.t1': 'R. Mehta',
  'gymMock.t2': 'P. Sharma',
  'gymMock.t3': 'A. Kapoor',
};

export const inLocale = { ...en, ...inOverrides } as typeof en;
