import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  WifiOff, 
  Clock, 
  Sun, 
  Moon, 
  ShieldAlert, 
  Anchor, 
  Box, 
  Users, 
  LayoutDashboard,
  Database,
  HelpCircle
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  isOffline, 
  setIsOffline,
  theme,
  setTheme,
  sosActive,
  outboxCount,
  onOpenOutbox,
  onOpenDemoGuide
}) {
  const [timeUtc, setTimeUtc] = useState('');
  const [timePolar, setTimePolar] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeUtc(now.toUTCString().slice(17, 25) + ' UTC');
      const antarcticaTime = new Date(now.getTime() + (5 * 60 * 60 * 1000));
      setTimePolar(antarcticaTime.toISOString().slice(11, 19) + ' POLAR');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Command Center', icon: LayoutDashboard, shortcut: '1' },
    { id: 'expedition', label: 'Voyage Planner', icon: Anchor, shortcut: '2' },
    { id: 'cargo', label: 'Cargo & Cold-Chain', icon: Box, shortcut: '3' },
    { id: 'personnel', label: 'Personnel & Muster', icon: Users, shortcut: '4' },
    { id: 'emergency', label: 'Emergency SOS', icon: ShieldAlert, alert: sosActive, shortcut: '5' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'var(--bg-canvas)',
      borderBottom: '1px solid var(--border-color)',
      marginBottom: '16px'
    }}>
      {/* Top Technical Metadata Strip */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-color)',
        padding: '4px 24px',
        fontSize: '0.7rem'
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          {/* Left Metadata */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--text-primary)', fontWeight: 700, letterSpacing: '0.04em' }}>
              GOVT OF INDIA • MoES / NCPOR
            </span>
            <span style={{ color: 'var(--border-strong)' }}>|</span>
            <span style={{ color: 'var(--text-secondary)' }}>SIH 2026 PS SIH26062</span>
            <span style={{ color: 'var(--border-strong)' }}>|</span>
            <span style={{ color: 'var(--text-muted)' }}>Team Dev React</span>
          </div>

          {/* Right Metadata */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Synchronized Polar Clocks */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)'
            }}>
              <Clock size={11} style={{ color: 'var(--text-muted)' }} />
              <span style={{ color: 'var(--text-primary)' }}>{timeUtc}</span>
              <span style={{ color: 'var(--border-strong)' }}>|</span>
              <span style={{ color: 'var(--accent-text)' }}>{timePolar}</span>
            </div>

            {/* Offline Store-and-Forward Toggle */}
            <button
              id="offline-sync-toggle"
              onClick={() => setIsOffline(!isOffline)}
              title="Toggle satellite link simulation (Keyboard shortcut: O)"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '2px 7px',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.675rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: '1px solid var(--border-color)',
                backgroundColor: 'transparent',
                color: isOffline ? 'var(--color-warning)' : 'var(--color-nominal)'
              }}
            >
              {isOffline ? (
                <>
                  <WifiOff size={11} />
                  <span>OFFLINE</span>
                </>
              ) : (
                <>
                  <Wifi size={11} />
                  <span>SATELLITE LINKED</span>
                </>
              )}
            </button>

            {/* Outbox Badge button (if queued items exist) */}
            {isOffline && outboxCount > 0 && (
              <button
                onClick={onOpenOutbox}
                title="View local-first queued transactions"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.675rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: '1px solid var(--color-warning)',
                  backgroundColor: 'transparent',
                  color: 'var(--color-warning)'
                }}
              >
                <Database size={11} />
                <span>OUTBOX ({outboxCount})</span>
              </button>
            )}

            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '2px 6px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.675rem',
                fontWeight: 600
              }}
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={11} style={{ color: 'var(--text-muted)' }} />
                  <span>LIGHT</span>
                </>
              ) : (
                <>
                  <Moon size={11} style={{ color: 'var(--text-muted)' }} />
                  <span>DARK</span>
                </>
              )}
            </button>

            {/* Demo Guide & Pitch Shortcuts Trigger */}
            <button
              onClick={onOpenDemoGuide}
              title="Open SIH 2026 Evaluation Demo Guide (Keyboard: ?)"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 6px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-color)',
                color: 'var(--accent-text)',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.675rem',
                fontWeight: 700
              }}
            >
              <HelpCircle size={11} />
              <span>DEMO GUIDE</span>
              <kbd>?</kbd>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '52px'
      }}>
        {/* Brand with Official Emblem */}
        <div 
          onClick={() => setActiveTab('overview')}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveTab('overview'); }}
          role="button"
          tabIndex={0}
          title="Return to Command Center"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div className="brand-logo-wrap">
            <img 
              src="/polaris.png" 
              alt="POLARIS Official Emblem" 
              className="brand-logo-img" 
            />
          </div>
          <div>
            <div style={{
              fontSize: '1rem',
              fontWeight: 800,
              letterSpacing: '0.06em',
              color: 'var(--text-primary)',
              lineHeight: 1
            }}>
              POLARIS
            </div>
            <div style={{
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.02em',
              marginTop: '3px'
            }}>
              Integrated Polar Expedition Logistics & Asset Management System
            </div>
          </div>
        </div>

        {/* Tab Navigation Items */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '100%' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  height: '100%',
                  padding: '0 12px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.78125rem',
                  cursor: 'pointer',
                  transition: 'color 0.15s ease, border-color 0.15s ease'
                }}
              >
                <Icon size={14} style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)' }} />
                <span>{item.label}</span>
                <kbd>{item.shortcut}</kbd>
                {item.alert && (
                  <span style={{ color: 'var(--color-critical)', fontWeight: 700, fontSize: '0.65rem' }}>
                    [ALERT]
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
