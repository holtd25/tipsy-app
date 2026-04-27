import { T, Rabbit, Flower, CurrencyBar } from '../shared';

const FLOWER_COLORS = ['#FF8070','#FFD050','#C058D0','#50ACDC','#FF9050','#70C870','#FF6090'];
const flowerXs = [32, 72, 120, 172, 222, 270, 318, 358];

export function HomeScreen({ navigate, leaves, carrots }) {
  return (
    <div style={{ width: 393, height: 764, position: 'relative', overflow: 'hidden', fontFamily: T.body }}>

      {/* ── HEADER ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: T.display, fontSize: 26, fontWeight: 700,
          color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.35)',
          letterSpacing: '-0.3px',
        }}>Tipsy</span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <CurrencyBar leaves={leaves} carrots={carrots} compact/>
          <button onClick={() => navigate('parent-pin')} style={{
            background: 'rgba(255,255,255,0.25)', border: 'none',
            borderRadius: '50%', width: 36, height: 36, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(6px)', boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="11" width="14" height="10" rx="2" stroke="white" strokeWidth="2.2"/>
              <path d="M8 11V7a4 4 0 018 0v4" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ════════════════════════ ABOVE GROUND ════════════════════════ */}
      {/* Sky */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 340, background: T.sky }}/>

      {/* Cloud 1 */}
      <div style={{ position: 'absolute', top: 52, left: 18, animation: 'cloudDrift 20s ease-in-out infinite', zIndex: 1 }}>
        <div style={{ background: 'rgba(255,255,255,0.88)', borderRadius: 50, width: 96, height: 28, filter: 'blur(4px)' }}/>
        <div style={{ background: 'rgba(255,255,255,0.72)', borderRadius: 50, width: 64, height: 22, filter: 'blur(3px)', marginTop: -14, marginLeft: 18 }}/>
      </div>
      {/* Cloud 2 */}
      <div style={{ position: 'absolute', top: 72, right: 40, animation: 'cloudDrift 28s ease-in-out infinite reverse', zIndex: 1 }}>
        <div style={{ background: 'rgba(255,255,255,0.76)', borderRadius: 50, width: 72, height: 24, filter: 'blur(4px)' }}/>
      </div>
      {/* Cloud 3 */}
      <div style={{ position: 'absolute', top: 88, left: '40%', animation: 'cloudDrift 24s ease-in-out infinite 4s', zIndex: 1 }}>
        <div style={{ background: 'rgba(255,255,255,0.6)', borderRadius: 50, width: 54, height: 18, filter: 'blur(3px)' }}/>
      </div>

      {/* Trees — left */}
      <svg style={{ position: 'absolute', bottom: 424, left: -6, zIndex: 2 }} width="110" height="170" viewBox="0 0 110 170">
        <rect x="22" y="110" width="12" height="58" fill="#5A3210"/>
        <ellipse cx="28" cy="76" rx="30" ry="48" fill={T.grassDark}/>
        <ellipse cx="28" cy="60" rx="24" ry="36" fill={T.grass}/>
        <rect x="72" y="124" width="10" height="44" fill="#5A3210"/>
        <ellipse cx="77" cy="98" rx="22" ry="34" fill={T.grassDark} opacity="0.85"/>
        <ellipse cx="77" cy="84" rx="18" ry="26" fill={T.grass} opacity="0.9"/>
      </svg>

      {/* Trees — right */}
      <svg style={{ position: 'absolute', bottom: 424, right: -4, zIndex: 2 }} width="96" height="160" viewBox="0 0 96 160">
        <rect x="50" y="108" width="11" height="50" fill="#5A3210"/>
        <ellipse cx="56" cy="72" rx="30" ry="48" fill={T.grassDark}/>
        <ellipse cx="56" cy="56" rx="24" ry="36" fill={T.grass}/>
      </svg>

      {/* Chimney (above ground) */}
      <svg style={{ position: 'absolute', bottom: 420, left: '57%', zIndex: 2 }} width="30" height="72" viewBox="0 0 30 72">
        <rect x="6" y="18" width="18" height="54" fill="#7A4818" rx="2"/>
        <rect x="2" y="12" width="26" height="10" fill="#6A3810" rx="2"/>
        <ellipse cx="15" cy="8" rx="7" ry="9" fill="rgba(255,255,255,0.22)" style={{animation:'smokeDrift 3.5s ease-in-out infinite'}}/>
        <ellipse cx="18" cy="-4" rx="5" ry="7" fill="rgba(255,255,255,0.14)" style={{animation:'smokeDrift 3.5s ease-in-out infinite', animationDelay:'0.8s'}}/>
      </svg>

      {/* Shop signpost in garden */}
      <button onClick={() => navigate('shop')} style={{
        position: 'absolute', bottom: 434, left: 20, zIndex: 3,
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
      }}>
        <svg width="52" height="68" viewBox="0 0 52 68">
          <rect x="23" y="28" width="5" height="40" fill="#8B5E2C" rx="2"/>
          <rect x="2" y="4" width="48" height="28" rx="5" fill="#FFD020" stroke="#B86020" strokeWidth="2.5"/>
          <text x="26" y="15" textAnchor="middle" fill="#2A1208" fontSize="8" fontFamily="Georgia,serif" fontWeight="bold">Mrs T-W</text>
          <text x="26" y="26" textAnchor="middle" fill="#2A1208" fontSize="7.5" fontFamily="Georgia,serif">🛍️ Shop</text>
        </svg>
      </button>

      {/* Flowers row */}
      <svg style={{ position: 'absolute', bottom: 436, left: 0, width: '100%', zIndex: 2 }} height="72" viewBox="0 0 393 72">
        {flowerXs.map((x, i) => (
          <Flower key={i} x={x} y={54} color={FLOWER_COLORS[i % FLOWER_COLORS.length]} size={22}/>
        ))}
      </svg>

      {/* Grass strip (surface) */}
      <svg style={{ position: 'absolute', bottom: 398, left: 0, width: '100%', zIndex: 2 }} height="56" viewBox="0 0 393 56" preserveAspectRatio="none">
        <path d="M0 20 Q22 6 46 18 Q70 30 96 10 Q120 0 146 14 Q172 28 198 8 Q222 0 248 12 Q274 26 300 6 Q326 0 352 12 Q374 0 393 12 L393 56 L0 56 Z" fill={T.grass}/>
        <path d="M0 36 Q30 24 62 34 Q96 44 130 26 Q162 12 194 28 Q226 44 260 24 Q292 8 326 26 Q356 42 393 26 L393 56 L0 56 Z" fill={T.grassDark} opacity="0.45"/>
      </svg>

      {/* Grass tufts at edge */}
      <svg style={{ position: 'absolute', bottom: 396, left: 0, width: '100%', zIndex: 3 }} height="24" viewBox="0 0 393 24">
        {[18,60,110,160,210,255,305,350].map((x,i) => (
          <g key={i} transform={`translate(${x},20)`}>
            <path d="M0 0 Q-3 -8 -1 -14 M0 0 Q1 -10 3 -16 M0 0 Q4 -7 6 -12" stroke={T.grass} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
          </g>
        ))}
      </svg>

      {/* ════════════════════ SOIL CROSS-SECTION BAND ═══════════════════ */}
      <div style={{
        position: 'absolute', bottom: 348, left: 0, right: 0, height: 60,
        background: 'linear-gradient(180deg, #A0682C 0%, #7A4818 55%, #52280A 100%)',
        zIndex: 2,
      }}>
        {/* Root texture */}
        <svg width="393" height="60" viewBox="0 0 393 60" style={{ position: 'absolute', top: 0, left: 0 }}>
          {[[30,0,18,48],[90,0,75,52],[155,0,142,58],[220,0,236,50],[295,0,278,54],[360,0,348,46]].map(([x1,y1,x2,y2],i)=>(
            <path key={i} d={`M${x1} ${y1} Q${(x1+x2)/2+6} ${(y1+y2)/2+10} ${x2} ${y2}`} stroke="rgba(255,255,255,0.12)" strokeWidth="2" fill="none"/>
          ))}
          {/* Pebbles */}
          {[[50,28],[120,18],[200,34],[280,22],[340,30]].map(([cx,cy],i)=>(
            <ellipse key={i} cx={cx} cy={cy} rx="5" ry="3.5" fill="rgba(0,0,0,0.15)" opacity="0.6"/>
          ))}
        </svg>
      </div>

      {/* ══════════════════════ UNDERGROUND BURROW ══════════════════════ */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 350,
        background: T.burrowBg, zIndex: 1,
      }}>
        {/* Root veins from ceiling */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', pointerEvents: 'none' }} height="80" viewBox="0 0 393 80">
          {[[30,0,18,65],[88,0,100,55],[155,0,140,70],[225,0,238,60],[300,0,288,68],[368,0,358,50]].map(([x1,y1,x2,y2],i)=>(
            <path key={i} d={`M${x1} ${y1} Q${(x1+x2)/2+8} ${(y1+y2)/2+12} ${x2} ${y2}`} stroke="rgba(255,255,255,0.05)" strokeWidth="2.2" fill="none"/>
          ))}
        </svg>

        {/* Arch interior glow */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', pointerEvents: 'none' }} height="350" viewBox="0 0 393 350">
          <path d="M20 350 Q20 30 196 16 Q372 30 372 350 Z" fill="rgba(255,255,255,0.018)"/>
          <path d="M40 350 Q40 54 196 40 Q352 54 352 350 Z" fill="rgba(0,0,0,0.12)"/>
        </svg>

        {/* Floor */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 24, background: 'rgba(0,0,0,0.28)' }}/>

        {/* Rug */}
        <svg style={{ position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)' }} width="180" height="28" viewBox="0 0 180 28">
          <ellipse cx="90" cy="16" rx="88" ry="12" fill="#FF3385" opacity="0.38"/>
          <ellipse cx="90" cy="16" rx="72" ry="8" fill="#FF5599" opacity="0.26"/>
          <ellipse cx="90" cy="14" rx="50" ry="5" fill="#FF3385" opacity="0.18"/>
        </svg>

        {/* Left furniture — small wooden stool */}
        <svg style={{ position: 'absolute', bottom: 24, left: 20 }} width="52" height="48" viewBox="0 0 52 48">
          <rect x="4" y="4" width="44" height="8" rx="4" fill={T.furniture}/>
          <rect x="10" y="12" width="5" height="22" fill={T.furniture} opacity="0.8"/>
          <rect x="37" y="12" width="5" height="22" fill={T.furniture} opacity="0.8"/>
          <ellipse cx="26" cy="8" rx="22" ry="5" fill={T.furniture} opacity="0.4"/>
        </svg>

        {/* Right — plant pot */}
        <svg style={{ position: 'absolute', bottom: 24, right: 18 }} width="40" height="52" viewBox="0 0 40 52">
          <rect x="5" y="26" width="30" height="22" rx="4" fill="#C86020"/>
          <ellipse cx="20" cy="24" rx="16" ry="9" fill={T.grass}/>
          <ellipse cx="12" cy="18" rx="9" ry="12" fill={T.grassDark}/>
          <ellipse cx="26" cy="16" rx="8" ry="11" fill={T.grass}/>
        </svg>

        {/* Candle / lamp on left wall */}
        <svg style={{ position: 'absolute', top: 60, left: 28 }} width="24" height="44" viewBox="0 0 24 44">
          <rect x="8" y="18" width="8" height="22" rx="2" fill="#F0D090"/>
          <ellipse cx="12" cy="18" rx="5" ry="3" fill="#D4B060"/>
          <ellipse cx="12" cy="8" rx="4" ry="6" fill="#FFE060" opacity="0.7" style={{animation:'portalPulse 2s ease-in-out infinite'}}/>
          <ellipse cx="12" cy="5" rx="2" ry="3.5" fill="#FFC020" opacity="0.6"/>
        </svg>

        {/* ── BOOKSHELF — clickable, navigate to Books ── */}
        <button
          onClick={() => navigate('books')}
          title="Your books"
          style={{
            position: 'absolute', top: 40, right: 22,
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}
        >
          <svg width="118" height="126" viewBox="0 0 118 126">
            {/* Shelf surround / wall alcove */}
            <rect x="2" y="2" width="114" height="122" rx="8" fill="rgba(0,0,0,0.35)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5"/>

            {/* Shelf planks */}
            <rect x="6" y="46" width="106" height="7" rx="2" fill={T.furniture}/>
            <rect x="6" y="88" width="106" height="7" rx="2" fill={T.furniture}/>

            {/* Top shelf — books */}
            {/* Book 1 — green */}
            <rect x="12" y="16" width="14" height="32" rx="2" fill="#2E7D32"/>
            <rect x="13" y="17" width="12" height="30" rx="1" fill="#388E3C"/>
            <line x1="19" y1="20" x2="19" y2="44" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
            {/* Book 2 — orange */}
            <rect x="27" y="20" width="16" height="28" rx="2" fill="#E65100"/>
            <rect x="28" y="21" width="14" height="26" rx="1" fill="#EF6C00"/>
            {/* Book 3 — purple */}
            <rect x="44" y="14" width="14" height="34" rx="2" fill="#4A148C"/>
            <rect x="45" y="15" width="12" height="32" rx="1" fill="#6A1B9A"/>
            {/* Book 4 — teal (small) */}
            <rect x="59" y="24" width="12" height="24" rx="2" fill="#00695C"/>
            <rect x="60" y="25" width="10" height="22" rx="1" fill="#00897B"/>
            {/* Book 5 — red */}
            <rect x="72" y="18" width="15" height="30" rx="2" fill="#B71C1C"/>
            <rect x="73" y="19" width="13" height="28" rx="1" fill="#C62828"/>
            {/* Tiny ornament — acorn */}
            <ellipse cx="97" cy="36" rx="6" ry="7" fill="#8B6020"/>
            <ellipse cx="97" cy="30" rx="7" ry="4" fill="#5A3C10"/>

            {/* Middle shelf — books */}
            {/* Book A */}
            <rect x="10" y="58" width="18" height="32" rx="2" fill="#1565C0"/>
            <rect x="11" y="59" width="16" height="30" rx="1" fill="#1976D2"/>
            {/* Book B */}
            <rect x="29" y="62" width="14" height="28" rx="2" fill="#AD1457"/>
            <rect x="30" y="63" width="12" height="26" rx="1" fill="#C2185B"/>
            {/* Book C — leaning */}
            <rect x="44" y="57" width="13" height="33" rx="2" fill="#F57F17" transform="rotate(-4,44,90)"/>
            {/* Book D */}
            <rect x="59" y="60" width="15" height="30" rx="2" fill="#2E7D32"/>
            {/* Small decorative pot */}
            <rect x="78" y="70" width="20" height="16" rx="3" fill="#A04010"/>
            <ellipse cx="88" cy="68" rx="10" ry="7" fill={T.grass}/>
            <ellipse cx="83" cy="63" rx="6" ry="8" fill={T.grassDark}/>

            {/* Bottom row — tap hint */}
            <rect x="6" y="96" width="106" height="24" rx="4" fill="rgba(255,208,32,0.12)" stroke="rgba(255,208,32,0.35)" strokeWidth="1.2"/>
            <text x="59" y="104" textAnchor="middle" fill="rgba(255,220,80,0.85)" fontSize="8" fontFamily="Georgia,serif" fontWeight="bold">📚 Tap to choose a book</text>
            <text x="59" y="115" textAnchor="middle" fill="rgba(255,220,80,0.55)" fontSize="7" fontFamily="Georgia,serif">swipe to browse</text>

            {/* Glow pulse on shelf */}
            <rect x="2" y="2" width="114" height="122" rx="8" fill="none" stroke="rgba(255,208,32,0.25)" strokeWidth="2" style={{animation:'portalPulse 2.8s ease-in-out infinite'}}/>
          </svg>

          {/* "tap" tooltip hint */}
          <div style={{
            position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)',
            fontSize: 9, color: 'rgba(255,220,80,0.55)', fontFamily: T.body, whiteSpace: 'nowrap',
          }}>
          </div>
        </button>

        {/* ── TIPSY standing in center ── */}
        <div style={{
          position: 'absolute', bottom: 20,
          left: '50%', transform: 'translateX(-60%)',
          zIndex: 4,
          filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.4))',
        }}>
          <Rabbit size={118} pose="stand" mood="calm"/>
        </div>

        {/* Speech bubble */}
        <div style={{
          position: 'absolute', bottom: 118, left: 16,
          background: 'rgba(255,255,255,0.1)', borderRadius: 14, padding: '8px 12px',
          backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.14)',
          fontFamily: T.body, fontSize: 12, color: 'rgba(255,255,255,0.88)', lineHeight: 1.5,
          maxWidth: 140,
        }}>
          Tap the bookshelf to choose a story! 📖
          <div style={{
            position: 'absolute', right: -8, bottom: 14,
            width: 0, height: 0,
            borderTop: '6px solid transparent', borderBottom: '6px solid transparent',
            borderLeft: '9px solid rgba(255,255,255,0.14)',
          }}/>
        </div>

        {/* Tiny window light top-left underground */}
        <svg style={{ position: 'absolute', top: 12, left: 12 }} width="52" height="48" viewBox="0 0 52 48">
          <ellipse cx="26" cy="26" rx="22" ry="20" fill="#7EC8F4" stroke="#7A4818" strokeWidth="3" opacity="0.7"/>
          <ellipse cx="26" cy="26" rx="14" ry="10" fill="#B0E8FF" opacity="0.4" style={{animation:'portalPulse 3s ease-in-out infinite'}}/>
          <line x1="26" y1="6" x2="26" y2="46" stroke="#7A4818" strokeWidth="2" opacity="0.4"/>
          <line x1="4" y1="26" x2="48" y2="26" stroke="#7A4818" strokeWidth="2" opacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}
