
import { en } from './en';
import { it } from './it';
import { inLocale } from './in';

export type Language = 'en' | 'it' | 'in';

/** Number/date locale for each language; India uses lakh grouping. */
export const numberLocale = (language: Language) => language === 'it' ? 'it-IT' : language === 'in' ? 'en-IN' : 'en-US';

export const translations = {
  en,
  it,
  in: inLocale,
};

export type TranslationKey = keyof typeof en | keyof typeof it;
