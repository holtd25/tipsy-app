import { useState } from 'react';
import { T, Flower, BackBtn } from '../shared';

const PHONEMES_EN = [
  { ph: 's', state: 'full' }, { ph: 'a', state: 'full' }, { ph: 't', state: 'full' }, { ph: 'p', state: 'full' },
  { ph: 'i', state: 'full' }, { ph: 'n', state: 'full' }, { ph: 'm', state: 'full' }, { ph: 'd', state: 'full' },
  { ph: 'g', state: 'full' }, { ph: 'o', state: 'full' }, { ph: 'c', state: 'full' }, { ph: 'k', state: 'full' },
  { ph: 'ck', state: 'full' }, { ph: 'e', state: 'full' }, { ph: 'u', state: 'full' }, { ph: 'r', state: 'full' },
  { ph: 'h', state: 'full' }, { ph: 'b', state: 'full' }, { ph: 'f', state: 'full' }, { ph: 'ff', state: 'full' },
  { ph: 'l', state: 'full' }, { ph: 'll', state: 'bud' }, { ph: 'ss', state: 'bud' }, { ph: 'j', state: 'bud' },
  { ph: 'v', state: 'bud' }, { ph: 'w', state: 'bud' }, { ph: 'x', state: 'bud' }, { ph: 'y', state: 'none' },
  { ph: 'z', state: 'none' }, { ph: 'zz', state: 'none' }, { ph: 'qu', state: 'none' }, { ph: 'ch', state: 'none' },
  { ph: 'sh', state: 'none' }, { ph: 'th', state: 'none' }, { ph: 'ng', state: 'none' }, { ph: 'ai', state: 'none' },
  { ph: 'ee', state: 'none' }, { ph: 'igh', state: 'none' }, { ph: 'oa', state: 'none' }, { ph: 'oo', state: 'none' },
  { ph: 'ar', state: 'none' }, { ph: 'or', state: 'none' }, { ph: 'ur', state: 'none' }, { ph: 'ow', state: 'none' },
];

const flColors = ['#FF8070','#FFD050','#C058D0','#50ACDC','#FF9050','#70C870','#FF6090','#A0DC50'];

function MiniFlower({ state, color, size = 22 }) {
  if (state === 'none') return (
    <svg width={size} height={size} viewBox="0 0 22 22">
      <line x1="11" y1="11" x2="11" y2="20" stroke="#5A6840" strokeWidth="1.3" opacity="0.3" strokeLinecap="round"/>
      <circle cx="11" cy="9" r="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
    </svg>
  );
  if (state === 'bud') return (
    <svg width={size} height={size} viewBox="0 0 22 22">
      <line x1="11" y1="11" x2="11" y2="20" stroke="#4A7818" strokeWidth="1.4" strokeLinecap="round"/>
      <ellipse cx="11" cy="7" rx="3.5" ry="5" fill={color} opacity="0.65"/>
    </svg>
  );
  return (
    <svg width={size} height={size} viewBox="0 0 22 22">
      <line x1="11" y1="13" x2="11" y2="21" stroke="#4A7818" strokeWidth="1.3" strokeLinecap="round"/>
      {[0,60,120,180,240,300].map((d,i)=>{
        const rad = d*Math.PI/180;
        return <ellipse key={i} cx={11+Math.cos(rad)*5} cy={8+Math.sin(rad)*3.5} rx={4.5} ry={2.5} fill={color} opacity="0.8" transform={`rotate(${d},${11+Math.cos(rad)*5},${8+Math.sin(rad)*3.5})`}/>;
      })}
      <circle cx="11" cy="8" r="3" fill="white" opacity="0.85"/>
    </svg>
  );
}

function SparkLine({ data, color, w = 200, h = 48 }) {
  const max = Math.max(...data, 1);
  const pts = data.map((v,i) => `${(i/(data.length-1))*w},${h - (v/max)*h*0.85 - 4}`).join(' ');
  const area = `M0,${h} ` + data.map((v,i) => `L${(i/(data.length-1))*w},${h - (v/max)*h*0.85 - 4}`).join(' ') + ` L${w},${h} Z`;
  const id = `grad_${color.replace('#','')}`;
  return (
    <svg width={w} height={h} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.02"/>
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`}/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      {data.map((v,i) => (
        <circle key={i} cx={(i/(data.length-1))*w} cy={h - (v/max)*h*0.85 - 4} r="3.5" fill={color} stroke="white" strokeWidth="1.5"/>
      ))}
    </svg>
  );
}

// ─── PARENT PIN ───
export function ParentPINScreen({ navigate }) {
  const [entered, setEntered] = useState('');
  const [shake, setShake] = useState(false);
  const CORRECT = '1234';

  const tap = (d) => {
    if (entered.length >= 4) return;
    const next = entered + d;
    setEntered(next);
    if (next.length === 4) {
      if (next === CORRECT) {
        setTimeout(() => navigate('parent-dashboard'), 350);
      } else {
        setShake(true);
        setTimeout(() => { setShake(false); setEntered(''); }, 900);
      }
    }
  };

  const del = () => setEntered(e => e.slice(0, -1));

  return (
    <div style={{
      width: 393, height: 764, background: T.burrowBg, fontFamily: T.body,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', gap: 32, padding: '0 40px',
    }}>
      <div style={{ alignSelf: 'flex-start' }}>
        <BackBtn onBack={() => navigate('home')}/>
      </div>
      <div style={{ alignSelf: 'flex-start', marginTop: -20 }}>
        <div style={{ fontFamily: T.display, fontSize: 26, fontWeight: 700, color: 'rgba(255,255,255,0.92)', marginBottom: 6 }}>
          Parents' area
        </div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
          Enter your PIN to see Aoife's progress
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>
          (Demo PIN: 1 2 3 4)
        </div>
      </div>

      <div style={{
        display: 'flex', gap: 18,
        animation: shake ? 'shake 0.5s ease' : 'none',
      }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{
            width: 18, height: 18, borderRadius: '50%',
            background: i < entered.length ? T.accentBLight : 'rgba(255,255,255,0.2)',
            border: `2px solid ${i < entered.length ? T.accentBLight : 'rgba(255,255,255,0.35)'}`,
            transition: 'all 0.2s',
          }}/>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, width: '100%' }}>
        {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((d, i) => (
          <button key={i} onClick={() => d === '⌫' ? del() : d !== '' && tap(String(d))} style={{
            height: 68, borderRadius: 16, border: 'none', cursor: d !== '' ? 'pointer' : 'default',
            background: d === '⌫' ? 'rgba(255,255,255,0.08)' : d === '' ? 'transparent' : 'rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.88)', fontFamily: T.display,
            fontSize: d === '⌫' ? 22 : 26, fontWeight: 600,
            backdropFilter: d !== '' ? 'blur(6px)' : 'none',
            transition: 'background 0.15s',
          }}>{d}</button>
        ))}
      </div>
    </div>
  );
}

// ─── PARENT DASHBOARD ───
export function ParentDashboard({ navigate }) {
  const [tab, setTab] = useState('progress');
  const wpm = [42, 48, 44, 55, 60, 58, 65];
  const acc = [82, 85, 80, 88, 90, 87, 93];
  const fullCount = PHONEMES_EN.filter(p => p.state === 'full').length;
  const budCount = PHONEMES_EN.filter(p => p.state === 'bud').length;

  return (
    <div style={{ width: 393, height: 764, background: T.pageBg, fontFamily: T.body, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ background: T.text, padding: '14px 18px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <BackBtn onBack={() => navigate('home')}/>
          <div>
            <div style={{ fontFamily: T.display, fontSize: 19, fontWeight: 700, color: 'white' }}>Aoife's Progress</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Week of 21 April · Year 1</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
          {['progress','phonemes','sessions'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', background: 'none',
              fontFamily: T.body, fontSize: 13, fontWeight: 600,
              color: tab === t ? T.accentBLight : 'rgba(255,255,255,0.4)',
              borderBottom: `2.5px solid ${tab === t ? T.accentBLight : 'transparent'}`,
              textTransform: 'capitalize',
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {tab === 'progress' && (
          <div style={{ padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: 'Words / min', value: '65', delta: '+23', color: T.btnA },
                { label: 'Accuracy', value: '93%', delta: '+11%', color: T.leaf },
                { label: 'Books finished', value: '8', delta: 'this term', color: T.accentA },
                { label: 'SpellCast words', value: '47', delta: 'mastered', color: T.accentB },
              ].map((s,i) => (
                <div key={i} style={{ background: T.cardBg, borderRadius: 14, padding: '14px 16px', border: `1px solid ${T.textLight}18` }}>
                  <div style={{ fontSize: 11, color: T.textLight, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
                  <div style={{ fontFamily: T.display, fontSize: 28, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: T.textMid, marginTop: 4 }}>{s.delta} since Sept</div>
                </div>
              ))}
            </div>

            <div style={{ background: T.cardBg, borderRadius: 14, padding: '16px', border: `1px solid ${T.textLight}18` }}>
              <div style={{ fontFamily: T.display, fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 4 }}>Reading fluency</div>
              <div style={{ fontSize: 11, color: T.textLight, marginBottom: 12 }}>Words correct per minute · last 7 sessions</div>
              <SparkLine data={wpm} color={T.btnA} w={321} h={56}/>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                {['Mon','Tue','Wed','Thu','Fri','Mon','Tue'].map((d,i)=>(
                  <span key={i} style={{ fontSize: 10, color: T.textLight }}>{d}</span>
                ))}
              </div>
            </div>

            <div style={{ background: T.cardBg, borderRadius: 14, padding: '16px', border: `1px solid ${T.textLight}18` }}>
              <div style={{ fontFamily: T.display, fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 4 }}>Reading accuracy</div>
              <div style={{ fontSize: 11, color: T.textLight, marginBottom: 12 }}>% words correct · last 7 sessions</div>
              <SparkLine data={acc} color={T.leaf} w={321} h={56}/>
            </div>

            <div style={{ background: T.cardBg, borderRadius: 14, padding: '16px', border: `1px solid ${T.textLight}18` }}>
              <div style={{ fontFamily: T.display, fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 10 }}>Tricky words this week</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['crept','through','although','knight','squirrel'].map((w,i) => (
                  <span key={i} style={{
                    background: `${T.accentA}18`, border: `1.5px solid ${T.accentA}44`,
                    borderRadius: 8, padding: '5px 10px',
                    fontFamily: T.display, fontSize: 14, color: T.text,
                  }}>{w}</span>
                ))}
              </div>
              <div style={{ fontSize: 11, color: T.textMid, marginTop: 10, lineHeight: 1.5 }}>
                Aligned with UK Letters and Sounds Phase 5 tricky words.
              </div>
            </div>
          </div>
        )}

        {tab === 'phonemes' && (
          <div style={{ padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: T.cardBg, borderRadius: 14, padding: '14px 16px', border: `1px solid ${T.textLight}18` }}>
              <div style={{ fontFamily: T.display, fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 10 }}>Phoneme mastery map</div>
              <div style={{ display: 'flex', gap: 20 }}>
                {[
                  { label: 'Mastered', count: fullCount, color: T.btnA },
                  { label: 'Emerging', count: budCount, color: T.accentB },
                  { label: 'Not yet', count: 44 - fullCount - budCount, color: T.textLight },
                ].map((s,i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: T.display, fontSize: 22, fontWeight: 700, color: s.color }}>{s.count}</div>
                    <div style={{ fontSize: 11, color: T.textLight }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ height: 6, background: `${T.textLight}20`, borderRadius: 3, overflow: 'hidden', marginTop: 12 }}>
                <div style={{ display: 'flex', height: '100%' }}>
                  <div style={{ width: `${(fullCount/44)*100}%`, background: T.btnA, transition: 'width 0.6s' }}/>
                  <div style={{ width: `${(budCount/44)*100}%`, background: T.accentB, transition: 'width 0.6s' }}/>
                </div>
              </div>
            </div>

            <div style={{ background: T.cardBg, borderRadius: 14, padding: '16px', border: `1px solid ${T.textLight}18` }}>
              <div style={{ fontFamily: T.display, fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 12 }}>
                Same flowers as the garden — same progress, different view
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
                {PHONEMES_EN.map((p, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <MiniFlower state={p.state} color={flColors[i % flColors.length]} size={24}/>
                    <span style={{ fontSize: 9, color: p.state === 'none' ? `${T.textLight}55` : T.textMid, fontFamily: T.body, fontWeight: p.state === 'full' ? 700 : 400 }}>{p.ph}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, display: 'flex', gap: 16, justifyContent: 'center' }}>
                {[['full','Mastered',T.btnA],['bud','Emerging',T.accentB],['none','Not yet',T.textLight]].map(([s,l,c])=>(
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <MiniFlower state={s} color={c} size={16}/>
                    <span style={{ fontSize: 10, color: T.textMid }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: `${T.leaf}10`, borderRadius: 14, padding: '14px 16px', border: `1px solid ${T.leaf}30`, fontSize: 13, color: T.textMid, lineHeight: 1.65 }}>
              <strong style={{ fontFamily: T.display, color: T.btnA }}>Aligned with UK Letters and Sounds. </strong>
              Tipsy tracks 44 English phonemes across 7 phases. Aoife is in Phase 3–4.
            </div>
          </div>
        )}

        {tab === 'sessions' && (
          <div style={{ padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { date: 'Today', type: 'Reading', book: 'The Old Oak Tree', mins: 12, leaves: 8, stars: 3 },
              { date: 'Today', type: 'SpellCast', book: '3 words · a_e digraph', mins: 7, leaves: 12, stars: 3 },
              { date: 'Yesterday', type: 'Reading', book: "Mole's Deep House", mins: 14, leaves: 9, stars: 2 },
              { date: 'Mon 21 Apr', type: 'SpellCast', book: '5 words · cr blend', mins: 8, leaves: 10, stars: 3 },
              { date: 'Mon 21 Apr', type: 'Reading', book: 'The Foxes of Fernwood', mins: 11, leaves: 7, stars: 2 },
            ].map((s,i) => (
              <div key={i} style={{ background: T.cardBg, borderRadius: 14, padding: '14px 16px', border: `1px solid ${T.textLight}18`, display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  background: s.type === 'Reading' ? `${T.btnA}20` : `${T.btnB}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                }}>{s.type === 'Reading' ? '📖' : '✨'}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: T.display, fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 2 }}>{s.book}</div>
                  <div style={{ fontSize: 11, color: T.textLight }}>{s.date} · {s.mins} min · +{s.leaves} leaves</div>
                </div>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[1,2,3].map(star => (
                    <div key={star} style={{ fontSize: 14, opacity: star <= s.stars ? 1 : 0.2 }}>⭐</div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ fontSize: 12, color: T.textLight, textAlign: 'center', padding: '8px 0', fontStyle: 'italic' }}>
              22 sessions this term · avg 10 min each
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
