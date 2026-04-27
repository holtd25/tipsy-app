// Design tokens — Toca Boca palette (warm storybook updated)
export const T = {
  sky: 'linear-gradient(175deg, #5EC8F8 0%, #8ADCFF 50%, #C0EEFF 100%)',
  skyFlat: '#6ECFF6',
  grass: '#28CC38', grassDark: '#18A828',
  soilBand: 'linear-gradient(180deg, #A0682C 0%, #7A4818 60%, #52280A 100%)',
  burrowBg: '#16284A',
  archFill: '#0E1C36',
  wallTint: 'rgba(14,28,54,0.55)',
  accentA: '#FF5533', accentALight: '#FF9070',
  accentB: '#FFD020', accentBLight: '#FFE870',
  leaf: '#28CC38', leafLight: '#5AE060',
  cardBg: '#FFFFFF', pageBg: '#FFF8F2',
  text: '#1A1428', textMid: '#4A4060', textLight: '#8880A0',
  btnA: '#00B87A', btnB: '#FF5533',
  furniture: '#B86020', rug: '#FF3385',
  rBody: '#F0C078', rEar: '#F8D8B0', rInner: '#E09040', rBelly: '#FEF0D0',
  display: "'Playfair Display', Georgia, serif",
  body: "'Lato', system-ui, sans-serif",
};

// Rabbit — the designed Tipsy character (transparent PNGs)
export function Rabbit({ size = 90, pose = 'stand', mood = 'calm' }) {
  // Pick the right image based on pose/mood priority
  const src =
    pose === 'read'                          ? '/uploads/tipsy_reading.png'     :
    pose === 'celebrate' || mood === 'happy' ? '/uploads/tipsy_celebrating.png' :
                                               '/uploads/tipsy.png';

  // CSS tweaks for moods that don't have their own image yet
  const extra =
    mood === 'thinking'  ? { filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.22)) saturate(0.75)', transform: 'rotate(4deg)', transformOrigin: 'bottom center' } :
    pose === 'spell'     ? { filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.22)) drop-shadow(0 0 10px rgba(255,208,32,0.55))' } :
                           { filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.22))' };

  return (
    <img
      src={src}
      width={size}
      height={size}
      style={{
        objectFit: 'contain',
        display: 'block',
        transition: 'filter 0.3s, transform 0.3s',
        ...extra,
      }}
      alt="Tipsy"
    />
  );
}

// Hedgehog (shop keeper)
export function Hedgehog({ size = 70 }) {
  const h = size * 1.1;
  return (
    <svg width={size} height={h} viewBox="0 0 70 77" fill="none">
      {[[-12,-10,8],[0,-16,4],[12,-10,8],[22,-6,10],[28,4,12],[-18,4,14],[-8,-14,6],[20,-14,6]].map(([dx,dy,len],i)=>(
        <line key={i} x1={35+dx} y1={42+dy} x2={35+dx*1.6} y2={42+dy-len} stroke="#5A3C10" strokeWidth="2.2" strokeLinecap="round" opacity="0.85"/>
      ))}
      <ellipse cx="35" cy="52" rx="24" ry="18" fill="#8C6030"/>
      <ellipse cx="29" cy="54" rx="14" ry="12" fill="#D4A870"/>
      <ellipse cx="18" cy="48" rx="16" ry="14" fill="#C49058"/>
      <ellipse cx="10" cy="52" rx="8" ry="6.5" fill="#D4A870"/>
      <circle cx="14" cy="46" r="3.5" fill="#1E1008"/>
      <circle cx="15.2" cy="44.9" r="1.3" fill="rgba(255,255,255,0.85)"/>
      <ellipse cx="5" cy="52" rx="2.5" ry="2" fill="#3C1E08"/>
      <path d="M22 56 Q30 62 42 56 L46 72 Q35 76 18 72 Z" fill="#E8D0A0" opacity="0.85"/>
      <line x1="30" y1="58" x2="30" y2="72" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8"/>
      <circle cx="14" cy="46" r="5.5" fill="none" stroke="#8C6030" strokeWidth="1.3" opacity="0.55"/>
      <circle cx="23" cy="45" r="5.5" fill="none" stroke="#8C6030" strokeWidth="1.3" opacity="0.55"/>
      <line x1="19.5" y1="45" x2="17.5" y2="45" stroke="#8C6030" strokeWidth="1.3" opacity="0.55"/>
      <ellipse cx="26" cy="72" rx="8" ry="4.5" fill="#8C6030"/>
      <ellipse cx="44" cy="72" rx="8" ry="4.5" fill="#8C6030"/>
    </svg>
  );
}

// Flower (phoneme tracker)
export function Flower({ x = 0, y = 0, color = '#FF8070', size = 20, state = 'full' }) {
  if (state === 'none') return (
    <g transform={`translate(${x},${y})`}>
      <line x1="0" y1="0" x2="0" y2={size*0.7} stroke="#5A6840" strokeWidth="1.2" opacity="0.35" strokeLinecap="round"/>
    </g>
  );
  if (state === 'bud') return (
    <g transform={`translate(${x},${y})`}>
      <line x1="0" y1="0" x2="0" y2={size*0.85} stroke="#4A7818" strokeWidth="1.4" strokeLinecap="round"/>
      <ellipse cx="0" cy={-size*0.1} rx={size*0.2} ry={size*0.28} fill={color} opacity="0.8"/>
    </g>
  );
  const r = size * 0.34;
  const stemH = size * 0.85;
  return (
    <g transform={`translate(${x},${y})`}>
      <line x1="0" y1="0" x2="0" y2={stemH} stroke="#4A7818" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx={-5.5} cy={stemH*0.48} rx="5" ry="2.5" fill="#4A7818" opacity="0.65" transform={`rotate(-38,-5.5,${stemH*0.48})`}/>
      {[0,60,120,180,240,300].map((deg,i) => {
        const rad = deg*Math.PI/180;
        const top = -size*0.7;
        return (
          <ellipse key={i}
            cx={Math.cos(rad)*r} cy={top+Math.sin(rad)*r*0.65}
            rx={size*0.21} ry={size*0.12}
            fill={color} opacity="0.86"
            transform={`rotate(${deg},${Math.cos(rad)*r},${top+Math.sin(rad)*r*0.65})`}/>
        );
      })}
      <circle cx="0" cy={-size*0.7} r={size*0.17} fill="white" opacity="0.88"/>
      <circle cx="0" cy={-size*0.7} r={size*0.1} fill={color} opacity="0.55"/>
    </g>
  );
}

export function LeafCoin({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <path d="M9 1.8 C12.5 1.8 16 4.5 16 10 C16 13.5 13 15.8 9 15.8 C5 15.8 2 13.2 2.5 9 C3 4.8 5.5 1.8 9 1.8Z" fill={T.leaf}/>
      <path d="M9 15.5 L9 6" stroke="rgba(255,255,255,0.25)" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M9 10 Q11.5 8 14 9" stroke="rgba(255,255,255,0.2)" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export function CarrotCoin({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <path d="M4.5 4 L13.5 4 L15 11 L9 16 L3 11 Z" fill={T.accentA}/>
      <path d="M9 4 L7 0.8 M9 4 L9.8 1.2 M9 4 L11.5 1.2" stroke={T.leaf} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="6" y1="8" x2="12" y2="8" stroke="rgba(255,255,255,0.28)" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  );
}

export function CurrencyBar({ leaves, carrots, compact = false }) {
  const pill = {
    display: 'flex', alignItems: 'center', gap: 5,
    background: 'rgba(255,255,255,0.88)',
    borderRadius: 20, padding: compact ? '3px 9px' : '5px 12px',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
    fontFamily: T.body, fontWeight: 700,
    fontSize: compact ? 12 : 13, color: T.text,
  };
  return (
    <div style={{ display: 'flex', gap: 7 }}>
      <div style={pill}><CarrotCoin size={compact ? 13 : 15}/>{carrots}</div>
      <div style={pill}><LeafCoin size={compact ? 13 : 15}/>{leaves}</div>
    </div>
  );
}

export function TBtn({ children, variant = 'primary', onClick, style: extra = {}, disabled = false }) {
  const base = {
    border: 'none', borderRadius: 22, cursor: disabled ? 'default' : 'pointer',
    fontFamily: T.display, fontSize: 16, fontWeight: 600,
    padding: '14px 0', width: '100%', letterSpacing: '-0.1px',
    opacity: disabled ? 0.5 : 1, transition: 'transform 0.1s, opacity 0.1s',
    ...extra,
  };
  const variants = {
    primary: { background: T.btnA, color: 'white', boxShadow: `0 3px 12px ${T.btnA}55` },
    secondary: { background: T.btnB, color: 'white', boxShadow: `0 3px 12px ${T.btnB}55` },
    ghost: { background: 'rgba(255,255,255,0.7)', color: T.text, boxShadow: '0 1px 5px rgba(0,0,0,0.1)' },
    leaf: { background: T.leaf, color: 'white', boxShadow: `0 3px 12px ${T.leaf}55` },
  };
  return (
    <button style={{ ...base, ...variants[variant] }} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export function BackBtn({ onBack, dark = false }) {
  return (
    <button onClick={onBack} style={{
      background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
      width: 38, height: 38, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(6px)', flexShrink: 0,
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M15 19l-7-7 7-7" stroke={dark ? T.text : 'white'} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

export function MicBtn({ active = false, color }) {
  const bg = color || (active ? T.accentA : T.btnA);
  return (
    <div style={{
      width: 52, height: 52, borderRadius: '50%', background: bg, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: active ? `0 0 0 9px ${bg}28, 0 3px 12px ${bg}55` : `0 3px 10px ${bg}55`,
    }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="9" y="2" width="6" height="12" rx="3" fill="white"/>
        <path d="M5 11a7 7 0 0014 0" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
        <line x1="12" y1="18" x2="12" y2="22" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="9" y1="22" x2="15" y2="22" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

export function SpeechBubble({ children, color, style: extra = {} }) {
  const borderColor = color || T.leaf;
  return (
    <div style={{
      background: T.pageBg, borderRadius: 14, padding: '10px 14px',
      border: `1.5px solid ${borderColor}70`,
      boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
      fontFamily: T.body, fontSize: 14, lineHeight: 1.58, color: T.text,
      position: 'relative', ...extra,
    }}>
      <div style={{
        position: 'absolute', left: -9, bottom: 14,
        width: 0, height: 0,
        borderTop: '7px solid transparent', borderBottom: '7px solid transparent',
        borderRight: `10px solid ${borderColor}70`,
      }}/>
      {children}
    </div>
  );
}
