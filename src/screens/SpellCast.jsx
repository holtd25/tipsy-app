import { useState, useMemo, useRef } from 'react';
import { T, Rabbit, BackBtn } from '../shared';

const SPELL_WORDS = [
  { word: 'SHADE', phoneme: 'a_e split digraph', hint: 'sh · ay · d' },
  { word: 'NIGHT', phoneme: 'igh trigraph', hint: 'n · igh · t' },
  { word: 'CREPT', phoneme: 'cr blend + ept', hint: 'cr · e · pt' },
];

export function SpellCastScreen({ navigate, onSessionEnd }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [typed, setTyped] = useState([]);
  const [wrong, setWrong] = useState(false);
  const [wordsDone, setWordsDone] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const tries = useRef(0);

  const current = SPELL_WORDS[wordIdx];
  const letters = current.word.split('');
  const isComplete = typed.length === letters.length;

  const shuffledKeys = useMemo(() => {
    const extras = ['T','N','R','I','C','O','B','L','G','F'];
    const pool = [...new Set([...letters, ...extras])].slice(0, 12);
    return pool.sort(() => Math.random() - 0.5);
  }, [wordIdx]);

  const tapLetter = (l) => {
    if (isComplete) return;
    const expected = letters[typed.length];
    if (l === expected) {
      setTyped(prev => [...prev, l]);
      setWrong(false);
      setShowHint(false);
      tries.current = 0;
    } else {
      tries.current++;
      setWrong(true);
      if (tries.current >= 2) setShowHint(true);
      setTimeout(() => setWrong(false), 600);
    }
  };

  const nextWord = () => {
    setWordsDone(w => w + 1);
    if (wordIdx < SPELL_WORDS.length - 1) {
      setWordIdx(i => i + 1);
      setTyped([]);
      setWrong(false);
      setShowHint(false);
      tries.current = 0;
    } else {
      onSessionEnd('spellcast');
    }
  };

  const mood = isComplete ? 'happy' : wrong ? 'thinking' : 'calm';

  return (
    <div style={{
      width: 393, height: 764, fontFamily: T.body,
      background: `linear-gradient(175deg, ${T.burrowBg} 0%, #1E3358 40%, #243D6A 100%)`,
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ padding: '14px 18px 10px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <BackBtn onBack={() => navigate('books')}/>
        <div style={{ fontFamily: T.display, fontSize: 20, fontWeight: 700, color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.2px' }}>
          SpellCast
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {SPELL_WORDS.map((_, i) => (
            <div key={i} style={{
              width: 10, height: 10, borderRadius: '50%',
              background: i < wordsDone ? T.leaf : i === wordIdx ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)',
              transition: 'background 0.3s',
            }}/>
          ))}
        </div>
      </div>

      {/* Stage */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '0 24px', gap: 24,
      }}>
        {/* Phoneme badge */}
        <div style={{
          background: 'rgba(255,255,255,0.08)', borderRadius: 20, padding: '6px 14px',
          fontFamily: T.body, fontSize: 12, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.05em',
        }}>
          {current.phoneme}
        </div>

        {/* Rabbit on stage */}
        <div style={{ position: 'relative', width: 120, height: 140 }}>
          <div style={{
            position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
            width: 90, height: 14, background: '#5A3010',
            borderRadius: 7, boxShadow: '0 3px 10px rgba(0,0,0,0.5)',
          }}/>
          <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}>
            <Rabbit size={86} pose="spell" mood={mood}/>
          </div>
          {isComplete && (
            <div style={{
              position: 'absolute', top: -10, right: -10,
              fontSize: 28, animation: 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            }}>✨</div>
          )}
        </div>

        {/* Rabbit speech */}
        <div style={{
          background: 'rgba(255,255,255,0.1)', borderRadius: 14, padding: '12px 16px',
          width: '100%', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}>
          <div style={{ fontFamily: T.body, fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
            {isComplete
              ? <><strong style={{ color: T.accentBLight }}>Brilliant!</strong> "{current.word}" — perfectly spelled.</>
              : showHint
                ? <>Hint: try <strong style={{ color: T.accentBLight, fontFamily: T.display, letterSpacing: 3 }}>{current.hint}</strong></>
                : wrong
                  ? <>Not quite — try again. Take your time.</>
                  : typed.length === 0
                    ? <>Listen carefully… <strong style={{ color: 'white' }}>{current.word.toLowerCase()}</strong>. Now spell it for me.</>
                    : <>Good… keep going. <strong style={{ color: T.accentBLight }}>{typed.length}</strong> of {letters.length} letters.</>
            }
          </div>
        </div>

        {/* Word boxes */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          {letters.map((l, i) => {
            const filled = i < typed.length;
            const isWrong = wrong && i === typed.length;
            return (
              <div key={i} style={{
                width: 48, height: 58, borderRadius: 10,
                background: filled ? `${T.accentBLight}28` : 'rgba(255,255,255,0.08)',
                border: `2.5px solid ${
                  filled ? T.accentBLight
                    : isWrong ? '#FF6060'
                    : i === typed.length ? 'rgba(255,255,255,0.5)'
                    : 'rgba(255,255,255,0.15)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: T.display, fontSize: 24, fontWeight: 700,
                color: filled ? T.accentBLight : 'transparent',
                transition: 'all 0.2s',
                animation: isWrong ? 'shake 0.4s ease' : isComplete && filled ? 'popIn 0.35s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
                animationDelay: isComplete ? `${i * 0.06}s` : '0s',
              }}>
                {filled ? typed[i] : ''}
              </div>
            );
          })}
        </div>

        {isComplete && (
          <button onClick={nextWord} style={{
            background: T.leaf, color: 'white', border: 'none',
            borderRadius: 22, padding: '14px 48px',
            fontFamily: T.display, fontSize: 16, fontWeight: 600,
            cursor: 'pointer', boxShadow: `0 3px 14px ${T.leaf}55`,
            animation: 'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.3s both',
          }}>
            {wordIdx < SPELL_WORDS.length - 1 ? 'Next word →' : 'Finish session'}
          </button>
        )}
      </div>

      {/* Letter keyboard */}
      {!isComplete && (
        <div style={{ padding: '0 16px 24px', flexShrink: 0 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {shuffledKeys.map((l, i) => (
              <button key={i} onClick={() => tapLetter(l)} style={{
                width: 52, height: 52, borderRadius: 12,
                background: 'rgba(255,255,255,0.12)',
                border: '1.5px solid rgba(255,255,255,0.18)',
                color: 'white', fontFamily: T.display, fontSize: 20, fontWeight: 600,
                cursor: 'pointer', backdropFilter: 'blur(6px)',
                transition: 'transform 0.1s, background 0.1s',
                userSelect: 'none',
              }}>{l}</button>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 12, fontSize: 12, color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>
            Tap letters to spell — or say them aloud
          </div>
        </div>
      )}
    </div>
  );
}
