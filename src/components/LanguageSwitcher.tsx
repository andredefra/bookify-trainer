import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type LangCode = 'it' | 'en';

const ItFlag = () => (
  <svg viewBox="0 0 3 2" preserveAspectRatio="none" className="h-full w-full">
    <rect width="1" height="2" x="0" fill="#009246" />
    <rect width="1" height="2" x="1" fill="#ffffff" />
    <rect width="1" height="2" x="2" fill="#ce2b37" />
  </svg>
);

const GbFlag = () => (
  <svg viewBox="0 0 60 30" preserveAspectRatio="none" className="h-full w-full">
    <clipPath id="ls-gb-clip"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" /></clipPath>
    <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6" />
    <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#ls-gb-clip)" stroke="#C8102E" strokeWidth="4" />
    <path d="M30,0 v30 M0,15 h60" stroke="#ffffff" strokeWidth="10" />
    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

/** Add a language by adding one entry here. */
const LANGUAGES: { code: LangCode; label: string; flag: () => JSX.Element; consumerRoute: string; publicRoute: string }[] = [
  { code: 'it', label: 'Italiano', flag: ItFlag, consumerRoute: '/user', publicRoute: '/it' },
  { code: 'en', label: 'English', flag: GbFlag, consumerRoute: '/user-en', publicRoute: '/' },
];

const CONSUMER_ROUTES = LANGUAGES.map((l) => l.consumerRoute);

const FlagFrame = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] border border-border" aria-hidden="true">
    {children}
  </span>
);

interface LanguageSwitcherProps {
  className?: string;
  /** Called after a language is picked (e.g. to close a mobile menu). */
  onChange?: () => void;
  align?: 'start' | 'center' | 'end';
}

const LanguageSwitcher = ({ className, onChange, align = 'end' }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const active = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];
  const ActiveFlag = active.flag;

  const pick = (lang: (typeof LANGUAGES)[number]) => {
    setLanguage(lang.code);
    navigate(CONSUMER_ROUTES.includes(pathname) ? lang.consumerRoute : lang.publicRoute);
    onChange?.();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={`gap-2 ${className || ''}`} aria-label={active.label}>
          <FlagFrame><ActiveFlag /></FlagFrame>
          <span className="text-sm font-medium uppercase">{active.code}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-40 bg-background">
        {LANGUAGES.map((lang) => {
          const Flag = lang.flag;
          const isActive = lang.code === language;
          return (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => pick(lang)}
              className={`flex cursor-pointer items-center gap-2 ${isActive ? 'bg-accent/30' : ''}`}
            >
              <FlagFrame><Flag /></FlagFrame>
              <span className="flex-1 text-sm">{lang.label}</span>
              {isActive && <Check className="h-4 w-4 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
