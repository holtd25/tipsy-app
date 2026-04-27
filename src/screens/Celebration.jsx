import { useState, useEffect } from 'react';
import { T, Rabbit, Flower, LeafCoin, CarrotCoin, TBtn } from '../shared';

export function CelebrationScreen({ sessionType, navigate, addLeaves }) {
  const earned = sessionType === 'reading'
    ? { leaves: 8, carrots: 0, newPhoneme: true }
    : { leaves: 12, carrots: 1, newPhoneme: true };
  const [step, setStep] = useState(0);

  useEffect(() => {
    addLeaves(earned.leaves);
    const t1 = setTimeout(() => setStep(1), 600);
    const t2 = setTimeout(() => setStep(2), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{
      width: 393, height: 764, fontFamily: T.body,
      background: `linear-gradient(160deg, ${T.cardBg} 0%, #F0EAD6 100%)`,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '32px 28px', gap: 28, textAlign: 'center',
    }}>
      <div style={{ animation: step >= 1 ? 'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)' : 'none' }}>
        <Rabbit size={100} pose="celebrate" mood="happy"/>
      </div>

      <div>
        <div style={{ fontFamily: T.display, fontSize: 28, fontWeight: 700, color: T.text, lineHeight: 1.2, marginBottom: 8 }}>
          {sessionType === 'reading' ? 'Wonderful reading!' : 'Brilliant spelling!'}
        </div>
        <div style={{ fontSize: 15, color: T.textMid, lineHeight: 1.6 }}>
          You earned some leaves for your hoard.
        </div>
      </div>

      {step >= 1 && (
        <div style={{
          display: 'flex', gap: 18, alignItems: 'center', justifyContent: 'center',
          animation: 'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, lineHeight: 1 }}>
              {Array.from({ length: Math.min(earned.leaves, 8) }, (_, i) => (
                <span key={i} style={{ display: 'inline-block', animation: `popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i*0.07}s both` }}>
                  <LeafCoin size={28}/>
                </span>
              ))}
            </div>
            <div style={{ fontFamily: T.display, fontWeight: 700, fontSize: 22, color: T.btnA, marginTop: 6 }}>
              +{earned.leaves} leaves
            </div>
          </div>
          {earned.carrots > 0 && (
            <>
              <div style={{ fontSize: 24, color: T.textLight }}>+</div>
              <div style={{ textAlign: 'center' }}>
                <CarrotCoin size={40}/>
                <div style={{ fontFamily: T.display, fontWeight: 700, fontSize: 22, color: T.btnB, marginTop: 6 }}>
                  +{earned.carrots} carrot
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {step >= 2 && earned.newPhoneme && (
        <div style={{
          background: `${T.leaf}15`,
          border: `1.5px solid ${T.leaf}50`,
          borderRadius: 18, padding: '16px 24px',
          animation: 'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)',
          width: '100%',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <svg width="60" height="68" viewBox="0 0 60 68">
              <Flower x={30} y={56} color="#C058D0" size={26}/>
            </svg>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: T.display, fontSize: 15, fontWeight: 700, color: T.btnA, marginBottom: 3 }}>
                New phoneme mastered!
              </div>
              <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.5 }}>
                The <strong style={{ fontFamily: T.display }}>{sessionType === 'reading' ? '"ept" blend' : '"a_e" digraph'}</strong> has bloomed in your garden.
              </div>
            </div>
          </div>
        </div>
      )}

      {step >= 1 && (
        <TBtn variant="primary" onClick={() => navigate('home')} style={{ maxWidth: 260 }}>
          Back to the Burrow
        </TBtn>
      )}
    </div>
  );
}
