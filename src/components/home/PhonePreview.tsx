import type { ReactNode } from 'react';
import { CalendarDays, Home, MessageCircle, Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import './how-it-works.css';

type PillTone = 'neutral' | 'green' | 'gold';

const Pill = ({ children, tone = 'neutral' }: { children: ReactNode; tone?: PillTone }) => (
  <span className={`phone-pill phone-pill-${tone}`}>{children}</span>
);
const Card = ({ children }: { children: ReactNode }) => <div className="phone-card">{children}</div>;
const Row = ({ title, subtitle, pill, tone, avatar }: { title: string; subtitle: string; pill: string; tone?: PillTone; avatar?: string }) => (
  <div className="flex items-center gap-2">
    {avatar && <span className="phone-avatar" aria-hidden="true">{avatar}</span>}
    <div className="min-w-0 flex-1"><p className="phone-title">{title}</p><p className="phone-subtitle">{subtitle}</p></div>
    <Pill tone={tone}>{pill}</Pill>
  </div>
);
const Heading = ({ title, tag }: { title: string; tag: string }) => (
  <div className="mb-[11px] flex items-center justify-between gap-2">
    <h3 className="phone-heading text-[12px] uppercase leading-tight">{title}</h3>
    <span className="phone-mono shrink-0 rounded-[5px] bg-brand-canvas px-[7px] py-1 text-[7.5px] font-bold uppercase text-brand-highlight">{tag}</span>
  </div>
);
const weekCells = ['n n v n o v v', 'n v n n n o v', 'v n n v n v v', 'o n v n n v v'].flatMap(row => row.split(' '));

const PhonePreview = ({ step }: { step: number }) => {
  const { t, language } = useLanguage();
  const current = Math.max(0, Math.min(5, step));
  const key = `pv.s${current + 1}`;
  const text = (suffix: string) => t(`${key}.${suffix}`);
  const dataRow = (n: number, tone: PillTone, avatar?: string, pill?: string) => (
    <Card key={n}><Row title={text(`r${n}t`)} subtitle={text(`r${n}s`)} pill={pill ?? text(`r${n}p`)} tone={tone} avatar={avatar} /></Card>
  );

  return (
    <div className="phone-preview" data-step={current}>
      <div aria-hidden="true" className="absolute left-1/2 top-[21px] z-[3] h-[24px] w-[88px] -translate-x-1/2 rounded-full bg-brand-canvas" />
      <div className="flex h-full flex-col overflow-hidden rounded-[36px] bg-[var(--phone-screen)]">
        <div aria-hidden="true" className="phone-mono flex items-center justify-between px-[26px] pb-[4px] pt-[17px] text-[9.5px] font-extrabold">
          <span>9:41</span><div className="h-[7.5px] w-[15px] rounded-[2px] border-[1.2px] border-brand-canvas p-[1px]"><div className="h-full w-4/5 bg-brand-canvas" /></div>
        </div>
        <div className="flex items-center gap-2 px-[15px] pb-[10px] pt-[7px]">
          <div aria-hidden="true" className="grid h-[19px] w-[19px] shrink-0 place-items-center rounded-[5px] bg-brand-canvas"><div className="h-[7px] w-[7px] rounded-[2px] bg-brand-highlight" /></div>
          <p className="phone-mono truncate text-[8.5px] text-[var(--phone-label)]">{text('url')}</p>
        </div>
        <div className="phone-screen-body">
          <div className="phone-scene" key={current}>
            <Heading title={text('title')} tag={text('tag')} />
            {current === 0 && <>
              <div aria-hidden="true" className="relative h-10 rounded-t-[8px] bg-[image:var(--phone-cover)]"><div className="absolute bottom-[-15px] left-[10px] h-9 w-9 rounded-[8px] border-2 border-brand-text bg-[image:var(--phone-photo)]" /></div>
              <p className="phone-heading mt-5 text-[12.5px] uppercase">Giulia Ferrari</p><p className="phone-subtitle">{text('meta')}</p>
              <div className="my-[9px] flex flex-wrap gap-1">{[1, 2, 3, 4].map(n => <span key={n} className="rounded-full bg-[var(--phone-neutral)] px-2 py-[3px] text-[9px] font-semibold text-[var(--phone-chip-text)]">{text(`ch${n}`)}</span>)}</div>
              {dataRow(1, 'gold')}{dataRow(2, 'green')}<div className="phone-fake-button">{text('btn')}</div>
            </>}
            {current === 1 && <>
              {dataRow(1, 'green', 'G')}
              <Card><div className="mb-[5px] grid grid-cols-7 gap-[3px]">{Array.from({ length: 7 }, (_, i) => <span className="phone-mono text-center text-[7px] font-bold text-[var(--phone-label)]" key={i}>{t(`pv.d${i + 1}`)}</span>)}</div><div className="grid grid-cols-7 gap-[3px]">{weekCells.map((cell, i) => <div key={i} className={`h-[10px] rounded-[2px] ${cell === 'n' ? 'bg-brand-canvas' : cell === 'o' ? 'bg-brand-highlight' : 'bg-[var(--phone-empty-cell)]'}`} />)}</div></Card>
              {dataRow(2, 'neutral')}{dataRow(3, 'gold', undefined, '6')}
            </>}
            {current === 2 && <>
              {['Luca Rossi', 'Marta Bianchi', 'Stefano Greco', 'Elena Conti'].map((name, i) => <Card key={name}><Row title={name} subtitle={text(`r${i + 1}s`)} pill={text(i === 2 ? 'pending' : 'active')} tone={i === 2 ? 'gold' : 'green'} avatar={['LR', 'MB', 'SG', 'EC'][i]} /></Card>)}
              {dataRow(5, 'neutral', undefined, 'CSV')}<div className="phone-fake-button">{text('btn')}</div>
            </>}
            {current === 3 && <>
              {[1, 2, 3].map(n => <Card key={n}><Row title={text(`e${n}t`)} subtitle={text(`e${n}s`)} pill={`▶ ${text('video')}`} tone="gold" />{n === 1 && <div aria-hidden="true" className="mt-[7px] grid h-[62px] place-items-center rounded-[7px] bg-[image:var(--phone-video)]"><div className="h-0 w-0 border-y-[8px] border-l-[13px] border-y-transparent border-l-brand-highlight" /></div>}</Card>)}
              <Card><Row title={text('pkt')} subtitle={text('pks')} pill="€540" tone="gold" /></Card>
            </>}
            {current === 4 && <>{dataRow(1, 'green', 'LR')}{dataRow(2, 'gold', 'MB')}{dataRow(3, 'gold', 'EC', '€180')}{dataRow(4, 'green', 'SG')}{dataRow(5, 'gold')}</>}
            {current === 5 && <>
              <div className="mb-[7px] grid grid-cols-3 gap-[5px]">{[{ value: language === 'it' ? '€2.840' : '€2,840', delta: '+€420' }, { value: '31', delta: '+12%' }, { value: '94%', delta: '+3 pt' }].map((kpi, i) => <div key={i} className="rounded-[9px] border border-[var(--phone-border)] bg-brand-text px-[7px] py-2"><p className="phone-mono text-[6.5px] font-bold uppercase text-[var(--phone-label)]">{text(`k${i + 1}`)}</p><p className="phone-mono mt-[3px] text-[14px] font-extrabold">{kpi.value}</p><p className="mt-[1px] text-[8px] font-semibold text-[var(--phone-positive)]">{kpi.delta}</p></div>)}</div>
              <Card><div className="flex items-center gap-2"><p className="phone-title">{text('cht')}</p><Pill>{text('exp')}</Pill></div><div aria-hidden="true" className="mt-[9px] flex h-[52px] items-end gap-[5px]">{[38, 52, 46, 68, 61, 88].map((height, i) => <div key={i} style={{ height: `${height}%` }} className={`flex-1 rounded-t-[3px] ${i === 5 ? 'bg-brand-highlight' : i < 2 ? 'bg-[var(--phone-bar)]' : 'bg-brand-canvas'}`} />)}</div></Card>
              <Card><Row title={text('rkt')} subtitle={text('rks')} pill={text('rkp')} tone="gold" avatar="⚠" /></Card>
              {dataRow(6, 'gold', 'LR')}{dataRow(7, 'green', 'MB')}
            </>}
          </div>
        </div>
        <div className="border-t border-[var(--phone-border)] bg-brand-text px-4 pb-2 pt-[9px]">
          <div className="flex items-start justify-between">
            {[Home, Users, CalendarDays, MessageCircle].map((TabIcon, i) => (
              <div key={i} className="flex flex-col items-center gap-[3px]">
                <span className={`grid h-4 w-4 place-items-center rounded-[5px] ${i === 0 ? 'bg-brand-canvas text-brand-highlight' : 'bg-[#E5DFD1] text-[#8a8478]'}`}><TabIcon className="h-[9px] w-[9px]" strokeWidth={2.4} /></span>
                <span className={`phone-mono text-[7px] font-bold uppercase ${i === 0 ? 'text-brand-canvas' : 'text-[var(--phone-label)]'}`}>{t(`pv.tab${i + 1}`)}</span>
              </div>
            ))}
          </div>
          <div aria-hidden="true" className="mx-auto mt-2 h-1 w-[100px] rounded-full bg-brand-canvas/80" />
        </div>
      </div>
    </div>
  );
};

export default PhonePreview;