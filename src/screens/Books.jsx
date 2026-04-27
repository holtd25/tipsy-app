import { useState, useRef } from 'react';
import { T, Rabbit, CurrencyBar, BackBtn } from '../shared';

const BOOKS = [
  {
    id: 1, title: 'The Old Oak Tree', lang: 'EN',
    progress: 0.42, totalPages: 12, currentPage: 5,
    cover: (
      <svg viewBox="0 0 90 110" width="90" height="110">
        <rect width="90" height="110" rx="6" fill="#2E7D32"/>
        <rect x="5" y="5" width="80" height="100" rx="4" fill="#388E3C"/>
        <rect x="40" y="65" width="10" height="35" fill="#5D4037"/>
        <ellipse cx="45" cy="52" rx="28" ry="32" fill="#1B5E20"/>
        <ellipse cx="32" cy="42" rx="20" ry="24" fill="#2E7D32"/>
        <ellipse cx="58" cy="40" rx="18" ry="22" fill="#2E7D32"/>
        <ellipse cx="45" cy="98" rx="30" ry="7" fill="#1B5E20"/>
        <rect x="5" y="84" width="80" height="20" rx="0" fill="rgba(0,0,0,0.35)"/>
        <text x="45" y="98" textAnchor="middle" fill="white" fontSize="8" fontFamily="Georgia,serif" fontWeight="bold">The Old Oak Tree</text>
      </svg>
    ),
  },
  {
    id: 2, title: 'Fox Family Farm', lang: 'EN',
    progress: 0.15, totalPages: 10, currentPage: 2,
    cover: (
      <svg viewBox="0 0 90 110" width="90" height="110">
        <rect width="90" height="110" rx="6" fill="#E65100"/>
        <rect x="5" y="5" width="80" height="100" rx="4" fill="#EF6C00"/>
        <ellipse cx="45" cy="78" rx="22" ry="20" fill="#FF8A65"/>
        <ellipse cx="45" cy="80" rx="12" ry="13" fill="#FFCCBC"/>
        <ellipse cx="45" cy="50" rx="18" ry="17" fill="#FF8A65"/>
        <polygon points="33,36 28,18 40,34" fill="#FF8A65"/>
        <polygon points="57,36 62,18 50,34" fill="#FF8A65"/>
        <polygon points="34,35 30,22 40,33" fill="#FFCCBC"/>
        <polygon points="56,35 60,22 50,33" fill="#FFCCBC"/>
        <circle cx="39" cy="48" r="4" fill="white"/>
        <circle cx="51" cy="48" r="4" fill="white"/>
        <circle cx="39" cy="48" r="2.5" fill="#1A0C06"/>
        <circle cx="51" cy="48" r="2.5" fill="#1A0C06"/>
        <ellipse cx="45" cy="56" rx="4" ry="3" fill="#2A1208"/>
        <rect x="5" y="84" width="80" height="20" rx="0" fill="rgba(0,0,0,0.35)"/>
        <text x="45" y="98" textAnchor="middle" fill="white" fontSize="8" fontFamily="Georgia,serif" fontWeight="bold">Fox Family Farm</text>
      </svg>
    ),
  },
  {
    id: 3, title: 'New Adventure', lang: 'EN',
    progress: 0, totalPages: 0, currentPage: 0,
    isNew: true,
    cover: (
      <svg viewBox="0 0 90 110" width="90" height="110">
        <rect width="90" height="110" rx="6" fill="#4A148C"/>
        <rect x="5" y="5" width="80" height="100" rx="4" fill="#6A1B9A"/>
        {[[22,28],[68,20],[45,35],[15,55],[75,48],[35,65],[60,70]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r={2+i%2} fill="#FFD700" opacity={0.7+i*0.04}/>
        ))}
        <line x1="25" y1="80" x2="65" y2="40" stroke="#FFD700" strokeWidth="3" strokeLinecap="round"/>
        <polygon points="65,32 68,42 58,39" fill="#FFD700"/>
        <text x="20" y="50" fontSize="12" fill="#FFD700">✦</text>
        <text x="55" y="78" fontSize="10" fill="#CE93D8">✦</text>
        <rect x="5" y="80" width="80" height="24" rx="0" fill="rgba(0,0,0,0.45)"/>
        <text x="45" y="91" textAnchor="middle" fill="white" fontSize="7.5" fontFamily="Georgia,serif">✨ New Story</text>
        <text x="45" y="101" textAnchor="middle" fill="#CE93D8" fontSize="6.5" fontFamily="Georgia,serif">made just for you</text>
      </svg>
    ),
  },
];

function ProgressRing({ pct, size = 104, color, children }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * pct;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="5"/>
        {pct > 0 && (
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="5"
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"/>
        )}
      </svg>
      <div style={{ position: 'absolute', inset: 5, borderRadius: '50%', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  );
}

export function BooksScreen({ navigate, leaves, carrots }) {
  const [activeBook, setActiveBook] = useState(0);
  const startX = useRef(null);

  const onTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx < -40 && activeBook < BOOKS.length - 1) setActiveBook(a => a + 1);
    if (dx > 40 && activeBook > 0) setActiveBook(a => a - 1);
    startX.current = null;
  };

  const book = BOOKS[activeBook];

  return (
    <div style={{
      width: 393, height: 764, background: T.burrowBg,
      fontFamily: T.body, display: 'flex', flexDirection: 'column',
      overflow: 'hidden', position: 'relative',
    }}>
      {/* Root veins */}
      <svg style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%' }} height="80" viewBox="0 0 393 80">
        {[[38,0,22,65],[90,0,110,55],[160,0,140,72],[245,0,262,60],[318,0,302,70],[375,0,360,50]].map(([x1,y1,x2,y2],i)=>(
          <path key={i} d={`M${x1} 0 Q${(x1+x2)/2+8} ${(y1+y2)/2+14} ${x2} ${y2}`} stroke="rgba(255,255,255,0.04)" strokeWidth="2.2" fill="none"/>
        ))}
      </svg>

      {/* Arch glow */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', pointerEvents: 'none' }} height="500" viewBox="0 0 393 500">
        <path d="M18 498 Q18 24 196 10 Q374 24 374 498 Z" fill="rgba(255,255,255,0.025)"/>
        <path d="M36 498 Q36 46 196 32 Q356 46 356 498 Z" fill="rgba(0,0,0,0.18)"/>
      </svg>

      {/* Header */}
      <div style={{ padding: '14px 18px 10px', display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 2 }}>
        <BackBtn onBack={() => navigate('home')}/>
        <div style={{ fontFamily: T.display, fontSize: 20, fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>
          Your Books
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <CurrencyBar leaves={leaves} carrots={carrots} compact/>
        </div>
      </div>

      {/* Tipsy greeting */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, padding: '0 20px 0 16px', flexShrink: 0, position: 'relative', zIndex: 2 }}>
        <Rabbit size={78} pose="stand" mood="happy"/>
        <div style={{
          flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 16,
          padding: '10px 14px', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.14)',
          fontFamily: T.body, fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.55,
          marginBottom: 8,
        }}>
          Which book shall we read today? 🐾
        </div>
      </div>

      {/* Bookshelf header */}
      <div style={{ padding: '16px 20px 10px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
          <div style={{ fontFamily: T.display, fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '-0.1px', whiteSpace: 'nowrap' }}>
            📚 Choose a book
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {BOOKS.map((_, i) => (
              <div key={i} onClick={() => setActiveBook(i)} style={{
                width: activeBook === i ? 20 : 8, height: 8,
                borderRadius: 4, cursor: 'pointer',
                background: activeBook === i ? T.accentB : 'rgba(255,255,255,0.3)',
                transition: 'all 0.25s',
              }}/>
            ))}
          </div>
        </div>
      </div>

      {/* Book carousel */}
      <div
        style={{ position: 'relative', zIndex: 2, padding: '0 20px', flexShrink: 0 }}
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
      >
        {/* Shelf plank */}
        <div style={{ height: 12, background: T.furniture, borderRadius: '6px 6px 0 0', boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.3)' }}/>
        <div style={{ height: 8, background: '#8B4818', borderRadius: '0 0 4px 4px', boxShadow: '0 4px 10px rgba(0,0,0,0.35)' }}/>

        <div style={{ marginTop: 16, display: 'flex', gap: 14, justifyContent: 'center', alignItems: 'flex-end' }}>
          {BOOKS.map((b, i) => {
            const isActive = i === activeBook;
            return (
              <div key={b.id} onClick={() => setActiveBook(i)}
                style={{
                  cursor: 'pointer',
                  transform: `scale(${isActive ? 1 : 0.78}) translateY(${isActive ? 0 : 14}px)`,
                  opacity: isActive ? 1 : 0.55,
                  transition: 'all 0.28s cubic-bezier(0.34,1.2,0.64,1)',
                  flexShrink: 0,
                }}
              >
                <ProgressRing pct={b.progress} size={isActive ? 118 : 98} color={T.accentB}>
                  {b.cover}
                </ProgressRing>
                {isActive && b.progress > 0 && (
                  <div style={{
                    textAlign: 'center', marginTop: 8,
                    fontFamily: T.body, fontSize: 12, color: T.accentB, fontWeight: 700,
                  }}>
                    Page {b.currentPage} of {b.totalPages}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: 10, fontSize: 12, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
          swipe to browse · tap to select
        </div>
      </div>

      {/* Active book info + CTA */}
      <div style={{
        padding: '16px 20px', position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4,
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: T.display, fontSize: 20, fontWeight: 700, color: 'white', marginBottom: 3 }}>
            {book.title}
          </div>
          {book.progress > 0 && (
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
              {Math.round(book.progress * 100)}% read
            </div>
          )}
          {book.isNew && (
            <div style={{ fontSize: 13, color: T.accentB }}>
              ✨ A brand new story, just for you!
            </div>
          )}
        </div>

        {/* Read button */}
        <button onClick={() => navigate('reading')} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          background: T.btnA, color: 'white', border: 'none', borderRadius: 28,
          padding: '18px 0', width: '100%', cursor: 'pointer',
          fontFamily: T.display, fontSize: 20, fontWeight: 700,
          boxShadow: `0 4px 18px ${T.btnA}55`,
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M12 6.5C12 6.5 7 4 3 5v15c4-1 9 1.5 9 1.5s5-2.5 9-1.5V5c-4-1-9 1.5-9 1.5Z" fill="white" opacity="0.9"/>
            <line x1="12" y1="6.5" x2="12" y2="22" stroke="white" strokeWidth="1.5"/>
          </svg>
          {book.progress > 0 ? 'Continue Reading' : 'Start Reading'}
        </button>
      </div>

      {/* SpellCast button */}
      <div style={{ padding: '0 20px', position: 'relative', zIndex: 2 }}>
        <button onClick={() => navigate('spellcast')} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.9)',
          border: '2px solid rgba(255,255,255,0.2)', borderRadius: 28,
          padding: '15px 0', width: '100%', cursor: 'pointer',
          fontFamily: T.display, fontSize: 19, fontWeight: 700,
          backdropFilter: 'blur(8px)',
        }}>
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="5" fill="#FFD020"/>
            {[0,45,90,135,180,225,270,315].map((deg,i)=>{
              const rad=deg*Math.PI/180;
              const x1=14+Math.cos(rad)*7, y1=14+Math.sin(rad)*7;
              const x2=14+Math.cos(rad)*11, y2=14+Math.sin(rad)*11;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFD020" strokeWidth={i%2===0?2.5:1.5} strokeLinecap="round"/>;
            })}
          </svg>
          ✨ SpellCast Magic
        </button>
      </div>

      {/* Bottom furniture strip */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, pointerEvents: 'none' }}>
        <svg width="393" height="70" viewBox="0 0 393 70">
          <rect x="0" y="40" width="393" height="30" fill="rgba(0,0,0,0.25)"/>
          <rect x="24" y="28" width="46" height="6" rx="3" fill={T.furniture}/>
          <rect x="32" y="34" width="5" height="16" fill={T.furniture} opacity="0.8"/>
          <rect x="57" y="34" width="5" height="16" fill={T.furniture} opacity="0.8"/>
          <ellipse cx="196" cy="52" rx="90" ry="12" fill="#FF3385" opacity="0.35"/>
          <ellipse cx="196" cy="52" rx="74" ry="8" fill="#FF5599" opacity="0.25"/>
          <rect x="340" y="24" width="34" height="22" rx="4" fill="#C86020"/>
          <ellipse cx="357" cy="22" rx="16" ry="10" fill={T.grass}/>
          <ellipse cx="349" cy="16" rx="9" ry="12" fill={T.grassDark}/>
          <ellipse cx="365" cy="14" rx="8" ry="11" fill={T.grass}/>
        </svg>
      </div>
    </div>
  );
}
