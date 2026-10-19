import type { CSSProperties, ReactNode } from 'react';
import UserNavbar from '@/components/UserNavbar';
import UserFooter from '@/components/UserFooter';
import { Check, Bot, Target, BarChart3, Heart, Zap, Smartphone, Clock, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import WaitlistDialog from '@/components/WaitlistDialog';

// Flip to true when the free cohort closes to re-enable the paid plan card.
const PAID_PLAN_ENABLED = false;

export const MONO = "'JetBrains Mono', ui-monospace, monospace";
export const DISPLAY = "'Archivo', sans-serif";
const H12: CSSProperties = { fontFamily: DISPLAY, fontVariationSettings: "'wdth' 118, 'wght' 900", fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.06 };
const H3: CSSProperties = { fontFamily: DISPLAY, fontVariationSettings: "'wdth' 112, 'wght' 900", fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1 };
const MICRO: CSSProperties = { fontFamily: MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.18em' };
const BADGE: CSSProperties = { fontFamily: MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em' };
const GOLD_BTN = 'inline-flex items-center justify-center rounded-full bg-[#F6C124] text-[#0A0A0A] font-semibold transition-transform hover:-translate-y-px';

const Eyebrow = ({ children, dark }: { children: ReactNode; dark?: boolean }) => (
  <span
    className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px]"
    style={{
      ...MICRO,
      borderColor: dark ? 'rgba(246,193,36,.45)' : 'rgba(10,10,10,.14)',
      background: dark ? 'rgba(246,193,36,.09)' : 'rgba(10,10,10,.04)',
      color: dark ? '#F6C124' : '#5a5346',
    }}
  >
    <span className="inline-block h-[7px] w-[7px] rounded-full" style={{ background: '#F6C124', boxShadow: '0 0 0 4px rgba(246,193,36,.3)' }} />
    {children}
  </span>
);

type Icon = typeof Bot;
export type ConsumerCopy = {
  hero: { a: string; gold: string; b: string; sub1: string; sub2: string; ctaLong: string; ctaShort: string; micro: string };
  journey: { eyebrow: string; title: string; subtitle: string; p1: ReactNode; p2: ReactNode; chips: string[]; closing: string; cta: string;
    chatOnline: string; chat: string[]; chatCta: string; today: string; todayNote: string };
  what: { eyebrow: string; titleA: string; titleB: string; lead: string };
  market: { titleA: string; titleB: string; lead: string; cta: string; href: string };
  control: { eyebrow: string; titleA: string; titleB: string; intro: string; listTitle: string; items: string[]; outro: string };
  ai: { eyebrow: string; titleA: string; titleB: string; lead: string; cards: { title: string; description: string }[];
    qTitle: string; questions: string[]; answerStrong: string; answerRest: string; answerNote: string };
  together: { eyebrow: string; titleA: string; titleB: string; lead: string;
    coachLabel: string; coachTitle: string; coachItems: string[];
    trainerLabel: string; trainerTitle: string; trainerItems: string[]; note: ReactNode };
  about: { title: string; lead: ReactNode; p: string; box1: string; box2: string };
  pricing: { eyebrow: string; title: string; intro: string; features: string[];
    freeBadge: string; freeTitle: string; freePeriod: string; freeDesc: string; counter: string; freeCta: string; freeNotes: string[];
    paidBadgeOn: string; paidBadgeOff: string; paidTitle: string; paidPrice: string; paidPeriod: string; paidThen: string; paidDesc: string; paidTip: string; paidCta: string; paidFoot: string; paidCancel: string;
    boxTitle: string; boxText: string; boxText2: string };
  cta: { eyebrow: string; titleA: string; titleB: string; offer1: string; offer2: string; ctaLong: string; ctaShort: string; checks: string[] };
};

const FEATURE_ICONS: Icon[] = [Bot, Target, Clock, Zap, BarChart3, Check, Shield, Smartphone];
const CHIP_ICONS: Icon[] = [Bot, Target, BarChart3, Heart];
const CONTROL_ICONS: Icon[] = [BarChart3, Target, Heart, Zap];
const AI_ICONS: Icon[] = [Target, Bot, Clock];

const CheckList = ({ items, check, text }: { items: string[]; check: string; text: string }) => (
  <ul className="mt-5 flex flex-col gap-3">
    {items.map((it) => (
      <li key={it} className="flex items-start gap-3 text-[15px] leading-snug" style={{ color: text }}>
        <Check className="mt-0.5 h-4 w-4 flex-shrink-0" color={check} strokeWidth={2.6} />
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

export const ConsumerLanding = ({ c }: { c: ConsumerCopy }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);

  useEffect(() => {
    if (searchParams.get('waitlist') === '1') {
      setWaitlistOpen(true);
      const next = new URLSearchParams(searchParams);
      next.delete('waitlist');
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const P = c.pricing;
  return (
    <div className="trainer-brand min-h-screen flex flex-col bg-[#0A0A0A] text-left">
      <UserNavbar onJoinWaitlist={openWaitlist} />
      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />

      <main className="flex-grow overflow-x-hidden">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#0A0A0A] pt-28 pb-20 md:pt-40 md:pb-28">
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'var(--hero-grid)', backgroundSize: '56px 56px', WebkitMaskImage: 'var(--hero-grid-mask)', maskImage: 'var(--hero-grid-mask)' }} />
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-10 h-[520px] w-[900px] max-w-[160vw] -translate-x-1/2" style={{ background: 'var(--hero-glow)' }} />
          <div className="relative mx-auto max-w-6xl px-5 text-center">
            <h1 className="mx-auto max-w-5xl text-[34px] text-white sm:text-5xl lg:text-[68px]" style={{ ...H12, whiteSpace: 'pre-line' }}>
              {c.hero.a}<span className="text-[#F6C124]">{c.hero.gold}</span>{c.hero.b}
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-[#bdb7aa] md:text-lg">
              {c.hero.sub1}<br />{c.hero.sub2}
            </p>
            <div className="mt-9 flex justify-center">
              <button type="button" onClick={openWaitlist} className={`${GOLD_BTN} px-6 py-3.5 text-base sm:px-8`} style={{ boxShadow: 'var(--hero-cta-shadow)' }}>
                <span className="hidden sm:inline">{c.hero.ctaLong}</span>
                <span className="sm:hidden">{c.hero.ctaShort}</span>
              </button>
            </div>
            <p className="mt-5 text-[10px] text-[#8c8678] sm:text-[11px]" style={MICRO}>{c.hero.micro}</p>
          </div>
        </section>

        {/* What you can do */}
        <section id="features" className="bg-[#ECE7DB] py-16 md:py-24 text-[#3f3a33]">
          <div className="mx-auto max-w-6xl px-5">
            <div className="mb-10 text-center">
              <Eyebrow>{c.what.eyebrow}</Eyebrow>
              <h2 className="mt-5 text-3xl text-[#0A0A0A] md:text-5xl" style={H12}>
                {c.what.titleA}<br /><span className="text-[#B98A00]">{c.what.titleB}</span>
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[#5a5346]">{c.what.lead}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {c.journey.chips.map((text, i) => {
                const I = CHIP_ICONS[i];
                return (
                  <div key={text} className="flex items-center gap-3 rounded-xl border border-[#E0DACB] bg-[#FFFFFF] p-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#F6C124]"><I className="h-4 w-4" color="#0A0A0A" /></div>
                    <span className="text-sm font-semibold text-[#0A0A0A]">{text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Marketplace strip */}
        <section className="bg-[#0A0A0A] py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-5 text-center">
            <Eyebrow dark>Marketplace</Eyebrow>
            <h2 className="mt-5 text-3xl text-white md:text-5xl" style={H12}>
              {c.market.titleA}<br /><span className="text-[#F6C124]">{c.market.titleB}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[#a09a8d]">{c.market.lead}</p>
            <div className="mt-9 flex justify-center">
              <Link to={c.market.href} className={`${GOLD_BTN} px-7 py-3.5 text-base`}>{c.market.cta}</Link>
            </div>
          </div>
        </section>

        {/* Coach AI + trainer */}
        <section className="bg-[#ECE7DB] py-16 md:py-24 text-[#3f3a33]">
          <div className="mx-auto max-w-6xl px-5">
            <div className="mb-10 text-center">
              <Eyebrow>{c.together.eyebrow}</Eyebrow>
              <h2 className="mt-5 text-3xl text-[#0A0A0A] md:text-5xl" style={H12}>
                {c.together.titleA}<br /><span className="text-[#B98A00]">{c.together.titleB}</span>
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[#5a5346]">{c.together.lead}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-[#242424] bg-[#0A0A0A] p-6">
                <span className="text-[11px] text-[#F6C124]" style={MICRO}>{c.together.coachLabel}</span>
                <h3 className="mt-2 text-xl text-white" style={H3}>{c.together.coachTitle}</h3>
                <CheckList items={c.together.coachItems} check="#F6C124" text="#a9a396" />
              </div>
              <div className="rounded-2xl border border-[#E0DACB] bg-[#FFFFFF] p-6">
                <span className="text-[11px] text-[#B98A00]" style={MICRO}>{c.together.trainerLabel}</span>
                <h3 className="mt-2 text-xl text-[#0A0A0A]" style={H3}>{c.together.trainerTitle}</h3>
                <CheckList items={c.together.trainerItems} check="#B98A00" text="#3f3a33" />
              </div>
            </div>
            <div className="mt-5 rounded-2xl border border-[#E0DACB] bg-[#F4F2ED] p-5 text-[15px] leading-relaxed text-[#3f3a33] [&_b]:text-[#0A0A0A]">
              {c.together.note}
            </div>
          </div>
        </section>

        {/* AI */}
        <section className="bg-[#0A0A0A] py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <div className="mb-12 text-center">
              <Eyebrow dark>{c.ai.eyebrow}</Eyebrow>
              <h2 className="mt-5 text-3xl text-white md:text-5xl" style={H12}>
                {c.ai.titleA}<br /><span className="text-[#F6C124]">{c.ai.titleB}</span>
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[#a09a8d]">{c.ai.lead}</p>
            </div>
            <div className="mb-12 grid gap-5 lg:grid-cols-3">
              {c.ai.cards.map((card, i) => {
                const I = AI_ICONS[i];
                return (
                  <div key={card.title} className="rounded-[14px] border border-[#242424] bg-[#131313] p-6">
                    <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#F6C124]"><I className="h-[18px] w-[18px]" color="#0A0A0A" /></div>
                    <h3 className="mb-2 text-lg text-white" style={H3}>{card.title}</h3>
                    <p className="text-sm leading-relaxed text-[#948e81]">{card.description}</p>
                  </div>
                );
              })}
            </div>
            <div className="mx-auto max-w-4xl rounded-2xl border border-[#242424] bg-[#131313] p-6 md:p-8">
              <h3 className="mb-6 text-center text-xl text-white md:text-2xl" style={H3}>{c.ai.qTitle}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {c.ai.questions.map((q) => (
                  <div key={q} className="rounded-r-lg border-l-2 border-[#F6C124] p-4" style={{ background: 'rgba(236,231,219,.045)' }}>
                    <p className="italic text-[#d6d0c3]">{q}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-center text-lg text-[#ECE7DB]">
                <strong className="text-[#F6C124]">{c.ai.answerStrong}</strong> {c.ai.answerRest}<br />
                <span className="text-[#948e81]">{c.ai.answerNote}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Journey + control */}
        <section className="bg-[#ECE7DB] py-16 md:py-24 text-[#3f3a33]">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-7">
                <div>
                  <Eyebrow>{c.journey.eyebrow}</Eyebrow>
                  <h2 className="mt-5 text-3xl text-[#0A0A0A] md:text-[44px]" style={H12}>
                    {c.journey.title}<br />
                    <span className="text-2xl text-[#B98A00] md:text-[32px]">{c.journey.subtitle}</span>
                  </h2>
                </div>
                <div className="space-y-5 text-lg leading-relaxed">
                  <p>{c.journey.p1}</p>
                  <p>{c.journey.p2}</p>
                </div>
                <div>
                  <p className="mb-4 text-lg font-semibold text-[#0A0A0A]">{c.journey.closing}</p>
                  <button type="button" onClick={openWaitlist} className={`${GOLD_BTN} px-7 py-3`}>{c.journey.cta}</button>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-sm">
                <div className="rounded-[2.5rem] border-[8px] border-[#1C1C1C] bg-[#F4F2ED] p-5 shadow-2xl">
                  <div className="space-y-4 rounded-2xl bg-[#FFFFFF] p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A0A0A]"><Bot className="h-5 w-5" color="#F6C124" /></div>
                      <div>
                        <div className="text-sm font-bold text-[#0A0A0A]">Coach AI</div>
                        <div className="text-[10px] text-[#938C7C]" style={BADGE}>{c.journey.chatOnline}</div>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="rounded-lg bg-[#F4F2ED] p-3 text-[#3f3a33]">{c.journey.chat[0]}</div>
                      <div className="ml-6 rounded-lg bg-[#0A0A0A] p-3 text-right text-[#ECE7DB]">{c.journey.chat[1]}</div>
                      <div className="rounded-lg bg-[#F4F2ED] p-3 text-[#3f3a33]">{c.journey.chat[2]}</div>
                    </div>
                    <button type="button" className={`${GOLD_BTN} w-full py-2 text-sm`}><Zap className="mr-2 h-4 w-4" />{c.journey.chatCta}</button>
                  </div>
                </div>
                <div className="absolute -right-3 -top-3 rounded-full bg-[#C6F24E] p-2 shadow-lg"><Check className="h-4 w-4" color="#0A0A0A" /></div>
                <div className="absolute -bottom-4 -left-3 rounded-lg border border-[#E0DACB] bg-[#FFFFFF] p-2 shadow-lg">
                  <div className="text-[10px] text-[#0A0A0A]" style={BADGE}>{c.journey.today}</div>
                  <div className="text-xs text-[#5a5346]">{c.journey.todayNote}</div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Control — lime payoff */}
        <section className="bg-[#0A0A0A] py-16 md:py-24 text-[#9c9689]">
          <div className="mx-auto max-w-4xl px-5 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px]" style={{ ...MICRO, borderColor: 'rgba(198,242,78,.45)', background: 'rgba(198,242,78,.09)', color: '#C6F24E' }}>
            <span className="inline-block h-[7px] w-[7px] rounded-full" style={{ background: '#C6F24E', boxShadow: '0 0 0 4px rgba(198,242,78,.3)' }} />
            {c.control.eyebrow}
          </span>
            <h2 className="mt-5 text-3xl text-white md:text-5xl" style={H12}>
              {c.control.titleA}<br /><span className="text-[#C6F24E]">{c.control.titleB}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed">{c.control.intro}</p>
            <div className="my-8 rounded-2xl border border-[#242424] bg-[#131313] p-6 text-left">
              <h3 className="mb-4 text-lg text-white" style={H3}>{c.control.listTitle}</h3>
              <ul className="grid gap-4 md:grid-cols-2">
                {c.control.items.map((it) => (
                  <li key={it} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0" color="#C6F24E" strokeWidth={2.6} /><span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-lg">{c.control.outro}</p>
          </div>
        </section>


        {/* Pricing */}
        <section id="pricing" className="bg-[#ECE7DB] pb-16 md:pb-24 pt-4 text-[#3f3a33]">
          <div className="mx-auto max-w-6xl px-5">
            <div className="mb-12 text-center">
              <Eyebrow>{P.eyebrow}</Eyebrow>
              <h2 className="mt-5 text-3xl text-[#0A0A0A] md:text-5xl" style={H12}>{P.title}</h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg text-[#5a5346]">{P.intro}</p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
              <div className="relative rounded-2xl border border-[#F6C124] bg-[#FFFFFF] p-7" style={{ boxShadow: '0 0 0 3px rgba(246,193,36,.16)' }}>
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#F6C124] px-3 py-1 text-[10px] text-[#0A0A0A]" style={BADGE}>{P.freeBadge}</span>
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h3 className="text-2xl text-[#0A0A0A]" style={H3}>{P.freeTitle}</h3>
                  <div className="text-right">
                    <div className="text-3xl text-[#0A0A0A]" style={{ fontFamily: MONO, fontWeight: 800 }}>€0</div>
                    <div className="text-[10px] text-[#938C7C]" style={BADGE}>{P.freePeriod}</div>
                  </div>
                </div>
                <p className="text-[#5a5346]">{P.freeDesc}</p>
                <div className="mt-4 rounded-lg border border-[#E0DACB] bg-[#F4F2ED] p-3 text-[11px] text-[#0A0A0A]" style={BADGE}>{P.counter}</div>
                <CheckList items={P.features} check="#B98A00" text="#3f3a33" />
                <button type="button" onClick={openWaitlist} className={`${GOLD_BTN} mt-8 w-full py-3`}>{P.freeCta}</button>
                <div className="mt-4 space-y-1 text-center text-sm text-[#5a5346]">
                  {P.freeNotes.map((n) => <p key={n}>{n}</p>)}
                </div>
              </div>

              <div aria-disabled={!PAID_PLAN_ENABLED} className={`relative rounded-2xl border border-[#E0DACB] bg-[#FFFFFF] p-7 ${PAID_PLAN_ENABLED ? '' : 'opacity-50 grayscale pointer-events-none select-none'}`}>
                <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#E0DACB] bg-[#F4F2ED] px-3 py-1 text-[10px] text-[#8a8478]" style={BADGE}>{PAID_PLAN_ENABLED ? P.paidBadgeOn : P.paidBadgeOff}</span>
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h3 className="text-2xl text-[#0A0A0A]" style={H3}>{P.paidTitle}</h3>
                  <div className="text-right">
                    <div className="text-3xl text-[#0A0A0A]" style={{ fontFamily: MONO, fontWeight: 800 }}>{P.paidPrice}</div>
                    <div className="text-[10px] text-[#938C7C]" style={BADGE}>{P.paidPeriod}</div>
                    <div className="text-xs text-[#938C7C]">{P.paidThen}</div>
                  </div>
                </div>
                <p className="text-[#5a5346]">{P.paidDesc}</p>
                <div className="mt-4 rounded-lg border border-[#E0DACB] bg-[#F4F2ED] p-3 text-sm text-[#3f3a33]">{P.paidTip}</div>
                <CheckList items={P.features} check="#B98A00" text="#3f3a33" />
                <button type="button" disabled={!PAID_PLAN_ENABLED} className="mt-8 w-full rounded-full bg-[#0A0A0A] py-3 font-semibold text-[#ECE7DB]">{P.paidCta}</button>
                <div className="mt-4 text-center">
                  <p className="text-sm text-[#3f3a33]">{P.paidFoot}</p>
                  <p className="mt-2 text-xs text-[#938C7C]">{P.paidCancel}</p>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-[#E0DACB] bg-[#FFFFFF] p-6 text-center">
              <h3 className="mb-2 text-xl text-[#0A0A0A]" style={H3}>{P.boxTitle}</h3>
              <p className="text-[#5a5346]">{P.boxText} {P.boxText2}</p>
            </div>
          </div>
        </section>

        {/* About + final CTA */}
        <section id="about" className="bg-[#0A0A0A] py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-5 text-center">
            <h2 className="text-3xl text-white md:text-4xl" style={H12}>{c.about.title}</h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-[#a09a8d]">
              <p className="text-xl font-semibold text-[#ECE7DB]">{c.about.lead}</p>
              <p>{c.about.p}</p>
              <div className="rounded-2xl border border-[#242424] bg-[#131313] p-7">
                <p className="text-xl text-[#ECE7DB]">{c.about.box1}</p>
                <p className="mt-4">{c.about.box2}</p>
              </div>
            </div>

            <div className="mt-20">
              <Eyebrow dark>{c.cta.eyebrow}</Eyebrow>
              <h2 className="mt-5 text-3xl text-white md:text-5xl" style={H12}>
                {c.cta.titleA}<br /><span className="text-2xl text-[#F6C124] md:text-3xl">{c.cta.titleB}</span>
              </h2>
              <div className="mt-8 rounded-2xl border border-[#242424] bg-[#131313] p-7">
                <p className="mb-6 text-lg text-[#bdb7aa]">
                  🎁 <strong className="text-white">{c.cta.offer1}</strong><br />
                  ⏰ <strong className="text-white">{c.cta.offer2}</strong>
                </p>
                <button type="button" onClick={openWaitlist} className={`${GOLD_BTN} px-6 py-4 text-lg sm:px-12`} style={{ boxShadow: 'var(--hero-cta-shadow)' }}>
                  <span className="hidden sm:inline">{c.cta.ctaLong}</span>
                  <span className="sm:hidden">{c.cta.ctaShort}</span>
                </button>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] text-[#8c8678]" style={MICRO}>
                  {c.cta.checks.map((ch) => (
                    <div key={ch} className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5" color="#F6C124" /><span>{ch}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <UserFooter />
    </div>
  );
};

const S = ({ children }: { children: ReactNode }) => <strong className="text-[#0A0A0A]">{children}</strong>;

const IT: ConsumerCopy = {
  hero: { a: 'Il trainer giusto.\nE un ', gold: 'Coach AI', b: '\nche non dorme mai.',
    sub1: 'Trova il personal trainer che fa per te, qui dentro.',
    sub2: "E quando lui non c'è, il Coach AI ti risponde: la sera, in palestra, fra due serie.",
    ctaLong: '👉 Inizia ora – Gratis 1 anno per i primi 10 clienti', ctaShort: '👉 Inizia ora – Gratis 1 anno!',
    micro: 'Nessuna carta richiesta · Attiva in 2 minuti · I tuoi dati restano tuoi' },
  journey: { eyebrow: 'Il tuo percorso', title: 'Fai partire il tuo percorso.', subtitle: 'Quando vuoi. Dove vuoi.',
    p1: <><S>Quante volte</S> hai pensato di iniziare ad allenarti, ma non sapevi da dove cominciare? O magari hai già esperienza, ma ti manca una <S>guida costante</S>.</>,
    p2: <>Con <S>il Coach AI</S> puoi costruire una routine personalizzata, che tu abbia un trainer o no.</>,
    chips: ['20 messaggi al giorno', '3 programmi al mese', 'Registri in un tocco', 'Integrazione dispositivi'],
    closing: '👉 Tutto questo senza stress, in totale autonomia.', cta: 'Inizia Subito Gratis',
    chatOnline: 'Online ora', chat: ['Ciao! Ho creato il tuo programma da 3 giorni per dimagrire 💪', 'Perfetto! Quante calorie brucio?', 'Circa 300-400 cal per sessione. Vuoi che ti mostri il primo allenamento? 🔥'],
    chatCta: 'Inizia Allenamento', today: 'Today: 245 kcal', todayNote: '🔥 Ottimo lavoro!' },
  control: { title: 'Tieni tutto sotto controllo', intro: 'MyPersonal.fit non è solo allenamento. È anche controllo, costanza e risultati.',
    listTitle: 'Da telefono o da computer:', items: ['Visualizzare i tuoi obiettivi attivi', "Vedere l'andamento del peso, della massa grassa, delle misure corporee", 'Analizzare la tua attività giornaliera (passi, sessioni, progressi)', 'Ricevere suggerimenti mirati per migliorare'],
    outro: 'E se un giorno deciderai di lavorare con un personal trainer vero, il tuo storico sarà lì, pronto per essere condiviso. Nessun dato perso, nessun reset.' },
  ai: { eyebrow: 'Intelligenza artificiale', titleA: 'Il Coach AI: il tuo nuovo', titleB: 'alleato virtuale',
    lead: "Non schede precompilate. Un'AI che ti ascolta, ti capisce, evolve con te.",
    cards: [
      { title: 'Si adatta a te', description: 'Ogni consiglio è basato sui tuoi dati personali' },
      { title: 'Impara con te', description: 'Si evolve in base ai tuoi progressi e preferenze' },
      { title: 'Sempre disponibile', description: "Risponde quando il tuo trainer non c'è: la sera, in palestra, fra due serie" },
    ],
    qTitle: '💬 Domande che puoi fare al Coach AI:',
    questions: ['Ho solo 30 minuti oggi, cosa faccio?', 'Sto ingrassando o aumentando massa?', 'Quanto devo riposare fra le serie?', 'Fammi un programma da 3 giorni per dimagrire'],
    answerStrong: 'Il Coach AI risponde sempre.', answerRest: 'Concreto, semplice, efficace.', answerNote: 'E se hai un trainer, il Coach AI sa cosa ti ha chiesto di fare.' },
  together: { eyebrow: 'Coach AI e trainer', titleA: 'Non devi scegliere.', titleB: 'Lavorano insieme.',
    lead: 'Il Coach AI non sostituisce nessuno, e non ci prova. Fa le cose che una persona non può fare alle undici di sera. Il resto lo fa chi ti guarda negli occhi.',
    coachLabel: 'Il Coach AI', coachTitle: 'Sempre lì, anche alle 23',
    coachItems: ['Ti risponde mentre sei in palestra col telefono in mano', 'Costruisce la sessione di oggi sui tuoi numeri', 'Ti fa i programmi da quattro settimane', 'Ti apre i moduli già compilati: propone lui, salvi tu'],
    trainerLabel: 'Il tuo trainer', trainerTitle: "Quello che un'AI non fa",
    trainerItems: ["Ti guarda mentre ti muovi e ti corregge l'esecuzione", 'Riceve i tuoi video e ti dice cosa non va', 'Ti fa i check-in: peso, misure, foto, sonno e umore', 'Ti conosce, e sa quando spingerti e quando fermarti'],
    note: <>E se un giorno un trainer lo aggiungi, <b>non si sposta niente di tuo</b>: il Coach AI inizia a leggere quello che ti manda lui, e resta dentro quello che ti ha chiesto di fare.</>,
    marketTitle: 'Il trainer giusto è già qui dentro',
    marketText: "Cerchi, guardi chi è, cosa fa, quanto costa e quando è libero. Leggi le recensioni di chi si allena già con lui. E la prima seduta la prenoti da qui.",
    mockLabel: 'Il profilo di un trainer', mockSpec: 'Specialità · Città', mockRow: 'Recensioni · Tariffa · Disponibilità', mockCta: 'Prenota una seduta' },
  about: { title: '💙 Perché lo facciamo', lead: <>Allenarsi dovrebbe essere semplice.<br />E invece spesso è costoso, complicato o poco motivante.</>,
    p: "Noi di MyPersonal.fit crediamo in un nuovo approccio: Un'esperienza smart, accessibile e guidata dall'intelligenza, dove l'utente resta sempre al centro.",
    box1: 'Abbiamo creato MyPersonal proprio per te: per farti entrare nel nostro mondo senza barriere.',
    box2: 'E da qui, se vorrai, potrai evolvere con noi. Fino ad allenarti con i migliori PT quelli veri!' },
  pricing: { eyebrow: 'Prezzi', title: 'Un solo piano. Tutte le funzionalità.',
    intro: "I primi 10 clienti hanno l'accesso gratuito per un anno. Dopo: €0,99 al mese per il primo anno, poi €1,99.",
    features: [
      '20 messaggi al giorno con il Coach AI',
      'La sessione di oggi, costruita sui tuoi obiettivi, sul tuo log e su quello che ti ha chiesto il tuo trainer',
      '3 programmi da quattro settimane al mese',
      'Gli dici cosa hai fatto e ti apre il modulo già compilato — attività e obiettivi',
      "L'analisi di ogni allenamento registrato",
      'Propone lui, salvi tu: non scrive niente nel tuo storico da solo',
      'Privato: non lo legge nessuno, nemmeno il tuo trainer',
      'Tutte le integrazioni dispositivi',
    ],
    freeBadge: '🎉 Primi 10 clienti', freeTitle: 'Accesso Gratuito', freePeriod: 'per 1 anno completo',
    freeDesc: 'Tutte le funzionalità premium, completamente gratis per un anno', counter: '10 posti in tutto',
    freeCta: '🚀 Prendi il Tuo Posto Gratis', freeNotes: ['✅ Accesso completo per 1 anno', '✅ Nessuna carta di credito richiesta', '✅ Tutte le funzionalità incluse'],
    paidBadgeOn: '💼 Piano normale', paidBadgeOff: 'Disponibile dopo i primi 10', paidTitle: 'Accesso Normale',
    paidPrice: '€0,99', paidPeriod: 'al mese per il primo anno', paidThen: 'poi €1,99 al mese',
    paidDesc: 'Le stesse identiche funzionalità. Cambia solo il prezzo.',
    paidTip: '💡 Stesso servizio premium, solo che non hai fatto in tempo per il periodo gratuito!',
    paidCta: 'Inizia con Piano Normale', paidFoot: '💎 Stesse funzionalità, €0,99 al mese il primo anno', paidCancel: 'Puoi cancellare in qualsiasi momento',
    boxTitle: '🎯 Un unico livello di servizio premium',
    boxText: 'Non ci sono funzionalità nascoste. I limiti sono gli stessi per tutti. Tutti i nostri utenti ottengono la migliore esperienza possibile.',
    boxText2: 'I primi 10 clienti la ottengono gratis per un anno, gli altri €0,99 al mese il primo anno e poi €1,99.' },
  cta: { eyebrow: 'Ultimo step', titleA: 'Basta rimandare.', titleB: 'Coach AI è pronto. Tu lo sei?',
    offer1: 'Accesso gratuito di 1 anno', offer2: 'Offerta a tempo limitato - non aspettare troppo!',
    ctaLong: '👉 Accedi Gratis Ora - Affrettati!', ctaShort: '👉 Accedi Gratis!',
    checks: ['Setup in 2 minuti', 'Nessuna carta richiesta', 'Cancellazione facile'] },
};

const UserLanding = () => <ConsumerLanding c={IT} />;
export default UserLanding;
