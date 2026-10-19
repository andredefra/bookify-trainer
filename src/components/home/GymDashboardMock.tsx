import { useLanguage } from '@/context/LanguageContext';

const MONO = "'JetBrains Mono', ui-monospace, monospace";
const DISPLAY = "'Archivo', sans-serif";
const label = { fontFamily: MONO, fontWeight: 700, fontSize: 8.5, letterSpacing: '.08em', color: '#938C7C' } as const;
const tile = 'rounded-[9px] border border-[#E0DACB] bg-[#FFFFFF] p-[10px] min-w-0';

const bars = [
  { n: 'M. Rossi', stay: 92, fresh: 34 },
  { n: 'L. Bianchi', stay: 88, fresh: 26 },
  { n: 'G. Verdi', stay: 82, fresh: 20 },
];
const lines = [
  { n: 'M. Rossi', c: '#F6C124', w: 2.4, d: undefined, v: [42, 48, 55, 60, 68, 76] },
  { n: 'L. Bianchi', c: '#0A0A0A', w: 1.8, d: undefined, v: [38, 40, 46, 44, 52, 56] },
  { n: 'G. Verdi', c: '#938C7C', w: 1.6, d: '4 3', v: [30, 34, 32, 38, 40, 44] },
];

const Legend = ({ items }: { items: { c: string; n: string; dashed?: boolean }[] }) => (
  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
    {items.map((i) => (
      <span key={i.n} className="inline-flex items-center gap-1" style={{ ...label, letterSpacing: '.04em' }}>
        <i className="inline-block h-[6px] w-[10px] rounded-[2px]" style={{ background: i.dashed ? 'transparent' : i.c, border: i.dashed ? `1px dashed ${i.c}` : 'none' }} />
        {i.n}
      </span>
    ))}
  </div>
);

const GymDashboardMock = () => {
  const { t } = useLanguage();
  const months = t('gymMock.months').split(',');
  const kpis = [
    { l: t('gymMock.rating'), v: '4,7/5', s: t('gymMock.ratingSub'), vc: '#0A0A0A', sc: '#938C7C' },
    { l: t('gymMock.retention'), v: '87%', s: t('gymMock.retentionSub'), vc: '#0A0A0A', sc: '#5a8a00' },
    { l: t('gymMock.goals'), v: '92%', s: t('gymMock.goalsSub'), vc: '#B98A00', sc: '#938C7C' },
  ];
  const tabs = [t('gymMock.tabTrainer'), t('gymMock.tabAvail'), t('gymMock.tabPerf')];
  const x = (i: number) => 8 + i * 29;
  const y = (v: number) => 70 - (v - 20) * 1.05;

  return (
    <div aria-hidden="true" className="overflow-hidden rounded-[9px]">
      <div className="flex items-center gap-3 bg-[#E5DFD1] px-3 py-2">
        <div className="flex gap-[5px]">
          {['#FB3B2E', '#F6C124', '#C6F24E'].map((c) => <i key={c} className="block h-[8px] w-[8px] rounded-full" style={{ background: c }} />)}
        </div>
        <span className="truncate rounded-full bg-[#FFFFFF] px-3 py-[3px]" style={{ fontFamily: MONO, fontWeight: 700, fontSize: 9.5, color: '#5a5346' }}>app.mypersonal.fit/trainer</span>
      </div>
      <div className="bg-[#F4F2ED] p-[14px]">
        <p className="uppercase leading-none" style={{ fontFamily: DISPLAY, fontVariationSettings: "'wdth' 112, 'wght' 900", fontSize: 17, color: '#0A0A0A' }}>{t('gymMock.title')}</p>
        <div className="mt-3 flex flex-wrap gap-[6px]">
          {tabs.map((tb, i) => (
            <span key={tb} className="rounded-full border px-[10px] py-[4px] uppercase"
              style={{ fontFamily: MONO, fontWeight: 700, fontSize: 9, letterSpacing: '.08em', ...(i === 2 ? { background: '#0A0A0A', color: '#F6C124', borderColor: '#0A0A0A' } : { background: '#FFFFFF', color: '#8a8478', borderColor: '#E0DACB' }) }}>{tb}</span>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {kpis.map((k) => (
            <div key={k.l} className={tile}>
              <p className="uppercase" style={label}>{k.l}</p>
              <p className="mt-1 leading-none" style={{ fontFamily: MONO, fontWeight: 700, fontSize: 20, color: k.vc }}>{k.v}</p>
              <p className="mt-1" style={{ fontSize: 10, color: k.sc }}>{k.s}</p>
            </div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className={tile}>
            <p className="uppercase" style={label}>{t('gymMock.chart1')}</p>
            <svg viewBox="0 0 160 84" className="mt-1 block h-auto w-full">
              {[10, 30, 50, 70].map((g) => <line key={g} x1="0" x2="160" y1={g} y2={g} stroke="#ECE7DB" strokeWidth="1" />)}
              {bars.map((b, i) => {
                const bx = 18 + i * 50;
                return (
                  <g key={b.n}>
                    <rect x={bx} y={70 - b.stay * 0.62} width="12" height={b.stay * 0.62} rx="2" fill="#F6C124" />
                    <rect x={bx + 14} y={70 - b.fresh * 0.62} width="8" height={b.fresh * 0.62} rx="2" fill="#0A0A0A" />
                    <text x={bx + 11} y="81" textAnchor="middle" fontFamily={MONO} fontSize="6.5" fontWeight="700" fill="#938C7C">{b.n}</text>
                  </g>
                );
              })}
            </svg>
            <Legend items={[{ c: '#F6C124', n: t('gymMock.stay') }, { c: '#0A0A0A', n: t('gymMock.new') }]} />
          </div>
          <div className={tile}>
            <p className="uppercase" style={label}>{t('gymMock.chart2')}</p>
            <svg viewBox="0 0 160 84" className="mt-1 block h-auto w-full">
              {[10, 30, 50, 70].map((g) => <line key={g} x1="0" x2="160" y1={g} y2={g} stroke="#ECE7DB" strokeWidth="1" />)}
              {lines.map((l) => (
                <polyline key={l.n} fill="none" stroke={l.c} strokeWidth={l.w} strokeDasharray={l.d} strokeLinecap="round" strokeLinejoin="round"
                  points={l.v.map((v, i) => `${x(i) + 5},${y(v)}`).join(' ')} />
              ))}
              {months.map((m, i) => <text key={m} x={x(i) + 5} y="81" textAnchor="middle" fontFamily={MONO} fontSize="6.5" fontWeight="700" fill="#938C7C">{m}</text>)}
            </svg>
            <Legend items={lines.map((l) => ({ c: l.c, n: l.n, dashed: !!l.d }))} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymDashboardMock;
