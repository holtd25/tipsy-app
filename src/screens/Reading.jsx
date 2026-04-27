import { useState, useEffect } from 'react';
import { T, Rabbit, BackBtn, MicBtn, SpeechBubble } from '../shared';

const BOOK_WORDS = [
  'The','little','rabbit','crept','under','the','old',
  'oak','tree,','where','the','soft','moss','grew.',
  'She','curled','up','very','small','and','waited.'
];
const STUMBLE_IDX = 3;

export function ReadingScreen({ navigate, onSessionEnd }) {
  const [readCount, setReadCount] = useState(0);
  const [stumble, setStumble] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const pct = Math.round((readCount / BOOK_WORDS.length) * 100);
  const mood = stumble ? 'thinking' : readCount > 10 ? 'happy' : 'calm';
  const allRead = readCount >= BOOK_WORDS.length;

  useEffect(() => {
    if (allRead) {
      const t = setTimeout(() => onSessionEnd('reading'), 1400);
      return () => clearTimeout(t);
    }
  }, [allRead]);

  const tapWord = (i) => {
    if (i !== readCount) return;
    if (i === STUMBLE_IDX && !showHelp) {
      setStumble(true);
      setShowHelp(true);
      return;
    }
    setStumble(false);
    setShowHelp(false);
    setReadCount(i + 1);
  };

  const wordStyle = (i) => {
    const isRead = i < readCount;
    const isStumble = stumble && i === STUMBLE_IDX;
    const isCurrent = i === readCount && !stumble;
    return {
      fontFamily: T.display,
      fontSize: 26,
      lineHeight: '1.6',
      cursor: i === readCount ? 'pointer' : 'default',
      color: isStumble ? '#C82818' : isRead ? T.text : `${T.textLight}60`,
      background: isStumble ? '#FFE8E0' : isCurrent ? `${T.leaf}22` : 'transparent',
      borderRadius: 5,
      padding: '1px 4px',
      borderBottom: isStumble
        ? '2.5px solid #C82818'
        : isRead
          ? `2.5px solid ${T.leaf}65`
          : isCurrent
            ? `2.5px dashed ${T.leaf}55`
            : 'none',
      transition: 'color 0.25s, background 0.25s',
      userSelect: 'none',
    };
  };

  return (
    <div style={{ width: 393, height: 764, background: T.cardBg, fontFamily: T.body, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '12px 18px 10px', borderBottom: `1px solid ${T.textLight}18`, flexShrink: 0, background: T.pageBg }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <BackBtn onBack={() => navigate('books')} dark/>
          <div style={{ fontFamily: T.display, fontSize: 19, fontWeight: 700, color: T.text, lineHeight: 1.2 }}>
            The Old Oak Tree
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: T.textMid }}>Page 3 of 12</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 100, height: 6, background: `${T.textLight}28`, borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${pct}%`, height: '100%', background: T.leaf, borderRadius: 3, transition: 'width 0.4s ease' }}/>
            </div>
            <span style={{ fontSize: 11, color: T.textLight, minWidth: 28 }}>{pct}%</span>
          </div>
        </div>
      </div>

      {/* Illustration */}
      <div style={{ height: 178, flexShrink: 0, position: 'relative', overflow: 'hidden', background: T.sky }}>
        <svg width="393" height="178" viewBox="0 0 393 178" preserveAspectRatio="xMidYMid slice">
          <rect x="0" y="130" width="393" height="48" fill={T.grass} opacity="0.5"/>
          <rect x="0" y="144" width="393" height="34" fill={T.grassDark} opacity="0.38"/>
          <rect x="268" y="80" width="16" height="78" fill="#7A4818"/>
          <ellipse cx="275" cy="65" rx="55" ry="66" fill={T.grassDark}/>
          <ellipse cx="256" cy="48" rx="40" ry="50" fill={T.grass}/>
          <ellipse cx="292" cy="46" rx="36" ry="44" fill={T.grass} opacity="0.82"/>
          <ellipse cx="175" cy="148" rx="30" ry="8" fill={T.grass} opacity="0.38"/>
          <ellipse cx="220" cy="146" rx="20" ry="6" fill={T.grassDark} opacity="0.28"/>
          <ellipse cx="86" cy="142" rx="26" ry="16" fill={T.rBody} opacity="0.82"/>
          <ellipse cx="86" cy="124" rx="15" ry="17" fill={T.rBody} opacity="0.82"/>
          <ellipse cx="79" cy="108" rx="7" ry="14" fill={T.rEar}/>
          <ellipse cx="94" cy="108" rx="7" ry="14" fill={T.rEar}/>
          <circle cx="82.5" cy="121" r="3.2" fill="#1E1008"/>
          <circle cx="91.5" cy="121" r="3.2" fill="#1E1008"/>
          <circle cx="83.8" cy="119.8" r="1.1" fill="rgba(255,255,255,0.82)"/>
          <circle cx="92.8" cy="119.8" r="1.1" fill="rgba(255,255,255,0.82)"/>
          <text x="376" y="170" fontFamily="Georgia, serif" fontSize="11" fill="rgba(255,255,255,0.55)" textAnchor="end">3</text>
        </svg>
        {allRead && (
          <div style={{
            position: 'absolute', inset: 0, background: `${T.leaf}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(2px)',
          }}>
            <div style={{ fontFamily: T.display, fontSize: 22, color: T.btnA, textShadow: '0 2px 8px rgba(255,255,255,0.8)' }}>
              Well read! ✓
            </div>
          </div>
        )}
      </div>

      {/* Reading text */}
      <div style={{ flex: 1, padding: '18px 20px 10px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px 8px', alignContent: 'flex-start' }}>
          {BOOK_WORDS.map((w, i) => (
            <span key={i} style={wordStyle(i)} onClick={() => tapWord(i)}>{w}</span>
          ))}
        </div>
        <div style={{ marginTop: 8, fontFamily: T.body, fontSize: 12, color: T.textLight, fontStyle: 'italic' }}>
          Tap the next word to read it aloud
        </div>
      </div>

      {/* Rabbit tray */}
      <div style={{
        padding: '10px 16px 14px',
        borderTop: `1px solid ${T.textLight}15`,
        background: stumble
          ? `linear-gradient(0deg, ${T.accentA}10, transparent)`
          : readCount > 8
            ? `linear-gradient(0deg, ${T.leaf}12, transparent)`
            : 'transparent',
        display: 'flex', alignItems: 'flex-end', gap: 10, flexShrink: 0,
      }}>
        <Rabbit size={70} pose="read" mood={mood}/>
        <div style={{ flex: 1, marginBottom: 6 }}>
          {showHelp && stumble ? (
            <SpeechBubble color={T.accentA}>
              Sound it out slowly: <strong style={{ fontFamily: T.display, letterSpacing: 3 }}>cr · ept</strong>. What do you hear first?
            </SpeechBubble>
          ) : readCount > 10 && !stumble ? (
            <SpeechBubble color={T.leaf}>
              <strong style={{ color: T.btnA }}>"crept"</strong> — brilliant. That's a tricky one. Keep going!
            </SpeechBubble>
          ) : readCount === 0 ? (
            <SpeechBubble>
              Ready when you are. Tap the first word to begin.
            </SpeechBubble>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: 44 }}>
              <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 22 }}>
                {[12,18,22,18,12].map((h,i) => (
                  <div key={i} style={{
                    width: 4, height: h, borderRadius: 2,
                    background: T.leaf, opacity: 0.5,
                    animation: `wavePulse 1.3s ease-in-out infinite`,
                    animationDelay: `${i * 0.12}s`,
                  }}/>
                ))}
              </div>
            </div>
          )}
        </div>
        <MicBtn active={!stumble && readCount > 0 && !allRead}/>
      </div>
    </div>
  );
}
