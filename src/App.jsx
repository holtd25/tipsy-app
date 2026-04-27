import { useState, useEffect } from 'react';
import { T, CurrencyBar } from './shared';
import { HomeScreen } from './screens/Home';
import { BooksScreen } from './screens/Books';
import { ReadingScreen } from './screens/Reading';
import { SpellCastScreen } from './screens/SpellCast';
import { CelebrationScreen } from './screens/Celebration';
import { ShopScreen } from './screens/Shop';
import { ParentPINScreen, ParentDashboard } from './screens/Parents';

function AndroidFrame({ children, dark }) {
  const c = dark ? 'rgba(255,255,255,0.9)' : 'rgba(20,20,20,0.9)';
  return (
    <div style={{
      width: 412, borderRadius: 40, overflow: 'hidden',
      border: '10px solid rgba(30,30,30,0.85)',
      boxShadow: '0 32px 80px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.08)',
      display: 'flex', flexDirection: 'column',
      background: dark ? '#1d1b20' : '#f4fbf8',
    }}>
      {/* Status bar */}
      <div style={{
        height: 36, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 20px',
        position: 'relative', fontFamily: 'system-ui, sans-serif',
      }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: c }}>9:30</span>
        <div style={{
          position: 'absolute', left: '50%', top: 8, transform: 'translateX(-50%)',
          width: 20, height: 20, borderRadius: '50%', background: '#111',
        }}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" stroke={c} strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill={c}>
            <rect x="2" y="7" width="16" height="11" rx="1.5"/>
            <path d="M20 10.5v3a2 2 0 000-3z"/>
          </svg>
        </div>
      </div>

      <div style={{ width: 393, alignSelf: 'center' }}>
        {children}
      </div>

      {/* Gesture bar */}
      <div style={{ height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 100, height: 4, borderRadius: 2, background: dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.25)' }}/>
      </div>
    </div>
  );
}

const NAV_ITEMS = [
  { label: 'Home', screen: 'home' },
  { label: 'Books', screen: 'books' },
  { label: 'Reading', screen: 'reading' },
  { label: 'SpellCast', screen: 'spellcast' },
  { label: 'Shop', screen: 'shop' },
  { label: 'Parents', screen: 'parent-pin' },
  { label: 'Dashboard', screen: 'parent-dashboard' },
  { label: 'Celebrate', screen: 'celebration' },
];

export default function App() {
  const [screen, setScreen] = useState('home');
  const [sessionType, setSessionType] = useState(null);
  const [leaves, setLeaves] = useState(24);
  const [carrots, setCarrots] = useState(3);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('tipsy_state') || '{}');
      if (saved.leaves != null) setLeaves(saved.leaves);
      if (saved.carrots != null) setCarrots(saved.carrots);
    } catch(e) {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem('tipsy_state', JSON.stringify({ leaves, carrots })); } catch(e) {}
  }, [leaves, carrots]);

  const navigate = (to) => setScreen(to);

  const handleSessionEnd = (type) => {
    setSessionType(type);
    navigate('celebration');
  };

  const addLeaves = (n) => {
    setLeaves(l => {
      const next = l + n;
      setCarrots(Math.floor(next / 10));
      return next;
    });
  };

  const handlePurchase = (price) => setLeaves(l => Math.max(0, l - price));

  const darkScreens = new Set(['spellcast', 'parent-pin', 'books']);
  const isDark = darkScreens.has(screen);
  const sharedProps = { navigate, leaves, carrots };

  const screens = {
    home:               <HomeScreen {...sharedProps}/>,
    books:              <BooksScreen {...sharedProps}/>,
    reading:            <ReadingScreen navigate={navigate} onSessionEnd={handleSessionEnd}/>,
    spellcast:          <SpellCastScreen navigate={navigate} onSessionEnd={handleSessionEnd}/>,
    celebration:        <CelebrationScreen sessionType={sessionType} navigate={navigate} addLeaves={addLeaves}/>,
    shop:               <ShopScreen navigate={navigate} leaves={leaves} onPurchase={handlePurchase}/>,
    'parent-pin':       <ParentPINScreen navigate={navigate}/>,
    'parent-dashboard': <ParentDashboard navigate={navigate}/>,
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'flex-start',
      background: '#1A0C04', padding: '24px 0 32px', gap: 20,
    }}>
      <AndroidFrame dark={isDark}>
        <div key={screen} style={{
          animation: 'fadeSlideUp 0.25s ease both',
          width: 393, height: 764, overflow: 'hidden',
        }}>
          {screens[screen] || screens.home}
        </div>
      </AndroidFrame>

      {/* Nav pills */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 480, padding: '0 16px' }}>
        {NAV_ITEMS.map(n => (
          <button key={n.screen} onClick={() => navigate(n.screen)} style={{
            padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
            background: screen === n.screen ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.07)',
            color: screen === n.screen ? 'white' : 'rgba(255,255,255,0.45)',
            fontFamily: T.body, fontSize: 12, fontWeight: screen === n.screen ? 700 : 400,
            outline: screen === n.screen ? '1.5px solid rgba(255,255,255,0.3)' : 'none',
            transition: 'all 0.2s',
          }}>
            {n.label}
          </button>
        ))}
      </div>

      {/* Currency */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', fontFamily: T.body }}>Hoard:</span>
        <CurrencyBar leaves={leaves} carrots={carrots} compact/>
        <button onClick={() => { setLeaves(24); setCarrots(3); }} style={{
          background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 10,
          padding: '4px 9px', color: 'rgba(255,255,255,0.22)', fontSize: 11,
          cursor: 'pointer', fontFamily: T.body,
        }}>reset</button>
      </div>
    </div>
  );
}
