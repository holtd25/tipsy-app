import { useState } from 'react';
import { T, Hedgehog, LeafCoin, CurrencyBar, BackBtn, TBtn } from '../shared';

const SHOP_ITEMS = [
  { id: 1, name: 'Tiny Mushroom', emoji: '🍄', price: 4, tier: 1, desc: 'A spotted red mushroom for the garden' },
  { id: 2, name: 'Acorn Lamp', emoji: '🔆', price: 5, tier: 1, desc: 'Warm glow for the burrow shelf' },
  { id: 3, name: 'Pebble Path', emoji: '⬜', price: 3, tier: 1, desc: 'A neat little pathway tile' },
  { id: 4, name: 'Daisy Patch', emoji: '🌼', price: 6, tier: 1, desc: 'A cluster of white daisies' },
  { id: 5, name: 'Striped Scarf', emoji: '🧣', price: 18, tier: 2, desc: "A cosy scarf for Tipsy's wardrobe" },
  { id: 6, name: 'Watering Can', emoji: '🪣', price: 22, tier: 2, desc: 'Decorative tin watering can' },
  { id: 7, name: 'Garden Bench', emoji: '🪑', price: 28, tier: 2, desc: 'A little wooden bench for the garden' },
  { id: 8, name: 'Telescope', emoji: '🔭', price: 50, tier: 3, desc: 'A brass telescope for the burrow window' },
  { id: 9, name: 'Knit Hat', emoji: '🎩', price: 55, tier: 3, desc: "A cosy knit hat for Tipsy" },
];

export function ShopScreen({ navigate, leaves, onPurchase }) {
  const [selected, setSelected] = useState(null);
  const [mathsAnswer, setMathsAnswer] = useState('');
  const [mathsError, setMathsError] = useState(false);
  const [purchased, setPurchased] = useState(null);
  const [mathsTier, setMathsTier] = useState(1);

  const remaining = selected ? leaves - selected.price : leaves;
  const canAfford = selected ? leaves >= selected.price : false;
  const mathsCorrect = selected ? (leaves - selected.price).toString() === mathsAnswer : false;

  const handleBuy = () => {
    if (mathsTier === 2 && !mathsCorrect) {
      setMathsError(true);
      setTimeout(() => setMathsError(false), 1200);
      return;
    }
    onPurchase(selected.price);
    setPurchased(selected.name);
    setSelected(null);
    setMathsAnswer('');
  };

  const tierLabel = { 1: 'Small treats', 2: 'A few sessions', 3: 'Worth saving for' };

  return (
    <div style={{ width: 393, height: 764, background: T.cardBg, fontFamily: T.body, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, #1E3A6A, ${T.burrowBg})`,
        padding: '14px 18px 44px', position: 'relative', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <BackBtn onBack={() => navigate('home')}/>
          <div>
            <div style={{ fontFamily: T.display, fontSize: 20, fontWeight: 700, color: 'white' }}>
              Mrs. Tiggy-Winkle's
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>Come in, come in…</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <CurrencyBar leaves={leaves} carrots={Math.floor(leaves / 10)} compact/>
          </div>
        </div>
        <div style={{ position: 'absolute', right: 22, bottom: -28, zIndex: 10 }}>
          <Hedgehog size={62}/>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '36px 16px 24px' }}>
        {[1, 2, 3].map(tier => (
          <div key={tier} style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: T.display, fontSize: 14, fontStyle: 'italic', color: T.textMid, marginBottom: 10, paddingLeft: 2, borderBottom: `1px solid ${T.textLight}28`, paddingBottom: 6 }}>
              {tierLabel[tier]}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {SHOP_ITEMS.filter(it => it.tier === tier).map(item => {
                const afford = leaves >= item.price;
                return (
                  <button key={item.id} onClick={() => afford && setSelected(item)} style={{
                    width: 'calc(50% - 5px)', background: T.pageBg,
                    border: `2px solid ${selected?.id === item.id ? T.btnA : afford ? `${T.textLight}28` : `${T.textLight}18`}`,
                    borderRadius: 14, padding: '12px', cursor: afford ? 'pointer' : 'default',
                    opacity: afford ? 1 : 0.45, textAlign: 'left',
                    boxShadow: selected?.id === item.id ? `0 0 0 3px ${T.btnA}30` : '0 1px 4px rgba(0,0,0,0.07)',
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 4 }}>{item.emoji}</div>
                    <div style={{ fontFamily: T.display, fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 3 }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: T.textLight, lineHeight: 1.4, marginBottom: 6 }}>{item.desc}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <LeafCoin size={13}/><span style={{ fontWeight: 700, fontSize: 13, color: afford ? T.btnA : T.textLight }}>{item.price}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        {purchased && (
          <div style={{ background: `${T.leaf}18`, border: `1.5px solid ${T.leaf}60`, borderRadius: 14, padding: '14px 18px', textAlign: 'center', fontFamily: T.display, fontSize: 15, color: T.btnA }}>
            ✓ {purchased} added to your burrow!
          </div>
        )}
      </div>

      {selected && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: T.cardBg, borderTop: `2px solid ${T.textLight}20`,
          borderRadius: '18px 18px 0 0', padding: '18px 20px 28px',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: T.display, fontSize: 18, fontWeight: 700, color: T.text }}>{selected.name}</div>
              <div style={{ fontSize: 13, color: T.textMid, marginTop: 2 }}>{selected.desc}</div>
            </div>
            <button onClick={() => { setSelected(null); setMathsAnswer(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: T.textLight, padding: 4 }}>✕</button>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            {[1, 2].map(t => (
              <button key={t} onClick={() => setMathsTier(t)} style={{
                flex: 1, padding: '7px', borderRadius: 10, border: 'none', cursor: 'pointer',
                background: mathsTier === t ? T.btnA : `${T.textLight}20`,
                color: mathsTier === t ? 'white' : T.textMid,
                fontFamily: T.body, fontSize: 12, fontWeight: 600,
              }}>
                {t === 1 ? 'Tier 1 — Show maths' : 'Tier 2 — Answer first'}
              </button>
            ))}
          </div>
          <div style={{ background: `${T.accentBLight}22`, border: `1.5px solid ${T.accentB}44`, borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
            {mathsTier === 1 ? (
              <div style={{ fontFamily: T.body, fontSize: 14, color: T.text, lineHeight: 1.6 }}>
                You have <strong style={{ color: T.btnA }}>{leaves} leaves</strong>. This costs <strong style={{ color: T.btnB }}>{selected.price}</strong>. You'll have <strong style={{ color: T.leaf }}>{remaining} leaves</strong> left.
              </div>
            ) : (
              <div>
                <div style={{ fontFamily: T.body, fontSize: 14, color: T.text, lineHeight: 1.6, marginBottom: 10 }}>
                  You have <strong style={{ color: T.btnA }}>{leaves}</strong> leaves. This costs <strong style={{ color: T.btnB }}>{selected.price}</strong>. How many left?
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[remaining-2,remaining-1,remaining,remaining+1,remaining+2].filter(n=>n>=0).map(n=>(
                    <button key={n} onClick={() => { setMathsAnswer(n.toString()); setMathsError(false); }} style={{
                      flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
                      background: mathsAnswer===n.toString() ? (n===remaining?T.leaf:T.accentA) : (mathsError&&n===remaining?`${T.leaf}30`:`${T.textLight}20`),
                      color: mathsAnswer===n.toString()?'white':T.text,
                      fontFamily: T.display, fontSize: 16, fontWeight: 700, transition: 'all 0.2s',
                    }}>{n}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <TBtn variant={canAfford?'primary':'ghost'} onClick={handleBuy} disabled={!canAfford||(mathsTier===2&&!mathsAnswer)}>
            {canAfford?`Buy for ${selected.price} leaves`:'Not enough leaves'}
          </TBtn>
        </div>
      )}
    </div>
  );
}
