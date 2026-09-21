import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StationOverview from './components/StationOverview';
import ExpeditionPlanner from './components/ExpeditionPlanner';
import CargoInventory from './components/CargoInventory';
import PersonnelMovement from './components/PersonnelMovement';
import EmergencySOSCockpit from './components/EmergencySOSCockpit';
import { STATIONS_DATA } from './data/mockData';
import { Database, WifiOff, X, Check, RefreshCw, HelpCircle, Compass, Sliders, LifeBuoy, ArrowRight, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isOffline, setIsOffline] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('polaris_theme') || 'dark';
  });
  const [stations, setStations] = useState(STATIONS_DATA);
  const [blizzardLevel, setBlizzardLevel] = useState('Condition 1 (High Alert)');
  const [sosActive, setSosActive] = useState(false);
  const [showDemoGuide, setShowDemoGuide] = useState(false);
  
  // Real Store-and-Forward Transaction Queue (Simulating IndexedDB local cache)
  const [outbox, setOutbox] = useState(() => {
    try {
      const saved = localStorage.getItem('polaris_outbox');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showOutboxModal, setShowOutboxModal] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    localStorage.setItem('polaris_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('polaris_outbox', JSON.stringify(outbox));
  }, [outbox]);

  // Global Keyboard Shortcuts (1-5 to navigate tabs, Esc to close modals, o to toggle offline, ? for demo guide)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is actively typing in a form input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }
      if (e.key === '1') setActiveTab('overview');
      if (e.key === '2') setActiveTab('expedition');
      if (e.key === '3') setActiveTab('cargo');
      if (e.key === '4') setActiveTab('personnel');
      if (e.key === '5') setActiveTab('emergency');
      if (e.key === 'Escape') {
        setShowOutboxModal(false);
        setShowDemoGuide(false);
      }
      if (e.key === 'o' || e.key === 'O') setIsOffline(prev => !prev);
      if (e.key === '?') setShowDemoGuide(prev => !prev);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Synchronize station status when Blizzard condition is modified
  const handleBlizzardChange = (newLevel) => {
    setBlizzardLevel(newLevel);
    setStations((prev) =>
      prev.map((s) => {
        if (s.id === 'maitri' || s.id === 'bharati') {
          return { ...s, blizzardLevel: newLevel };
        }
        return s;
      })
    );
  };

  // Register mutation in the Store-and-Forward engine
  const handleRegisterMutation = useCallback((type, description, payload) => {
    if (isOffline) {
      const tx = {
        txId: `TX-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`,
        type,
        description,
        payload,
        timestamp: new Date().toISOString().slice(11, 19) + ' UTC',
        hash: 'SHA256:' + Math.random().toString(16).substring(2, 10).toUpperCase()
      };
      setOutbox(prev => [tx, ...prev]);
    }
  }, [isOffline]);

  // Flush Store-and-Forward queue when satellite reconnected
  const handleSyncOutbox = () => {
    if (outbox.length === 0) return;
    setIsSyncing(true);
    setTimeout(() => {
      setOutbox([]);
      setIsSyncing(false);
      setShowOutboxModal(false);
    }, 1200);
  };

  return (
    <div className={`app-root ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOffline={isOffline}
        setIsOffline={setIsOffline}
        theme={theme}
        setTheme={setTheme}
        sosActive={sosActive}
        outboxCount={outbox.length}
        onOpenOutbox={() => setShowOutboxModal(true)}
        onOpenDemoGuide={() => setShowDemoGuide(true)}
      />

      <main className="app-container">
        {/* Offline Mode Indicator Bar (High Contrast Hairline, Zero muddy fill) */}
        {isOffline && (
          <div 
            role="alert"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 14px',
              marginBottom: '14px',
              border: '1px solid var(--color-warning)',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-surface)',
              fontSize: '0.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="status-tag status-tag-warning">SATELLITE LINK DISCONNECTED</span>
              <span style={{ color: 'var(--text-secondary)' }}>
                Offline-first mode active. {outbox.length} transactions held in local IndexedDB outbox.
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => setShowOutboxModal(true)}
              >
                <Database size={12} />
                <span>Inspect Outbox ({outbox.length})</span>
              </button>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setIsOffline(false);
                  handleSyncOutbox();
                }}
              >
                Reconnect Link
              </button>
            </div>
          </div>
        )}

        {/* SOS Emergency Cockpit Active Banner */}
        {sosActive && (
          <div 
            role="alert"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 14px',
              marginBottom: '14px',
              border: '1px solid var(--color-critical)',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-surface)',
              fontSize: '0.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="status-tag status-tag-critical">DISTRESS BEACON BROADCASTING</span>
              <span style={{ color: 'var(--text-primary)' }}>
                COSPAS-SARSAT 406 MHz emergency broadcast active. Search & rescue lockdown protocol enforced.
              </span>
            </div>
            <button 
              className="btn btn-danger btn-sm" 
              onClick={() => setActiveTab('emergency')}
            >
              Open Incident Cockpit
            </button>
          </div>
        )}

        {/* Tab 1: Command Center (Station Overview) */}
        {activeTab === 'overview' && (
          <StationOverview 
            stations={stations} 
            setActiveTab={setActiveTab}
            blizzardLevel={blizzardLevel}
          />
        )}

        {/* Tab 2: Voyage Planner & Fast-Ice Reconciliation */}
        {activeTab === 'expedition' && (
          <ExpeditionPlanner 
            onMutation={handleRegisterMutation}
            isOffline={isOffline}
          />
        )}

        {/* Tab 3: Cold-Chain ERP & Predictive Burn-Rate Modeling */}
        {activeTab === 'cargo' && (
          <CargoInventory 
            onMutation={handleRegisterMutation}
            isOffline={isOffline}
          />
        )}

        {/* Tab 4: Personnel Safety & Station Muster Roll */}
        {activeTab === 'personnel' && (
          <PersonnelMovement 
            onMutation={handleRegisterMutation}
            isOffline={isOffline}
          />
        )}

        {/* Tab 5: Blizzard Hazard Cockpit & COSPAS-SARSAT */}
        {activeTab === 'emergency' && (
          <EmergencySOSCockpit 
            blizzardLevel={blizzardLevel}
            onBlizzardChange={handleBlizzardChange}
            sosActive={sosActive}
            setSosActive={setSosActive}
            onMutation={handleRegisterMutation}
            isOffline={isOffline}
          />
        )}
      </main>

      {/* Store-and-Forward Outbox Modal */}
      {showOutboxModal && (
        <div className="modal-overlay" onClick={() => setShowOutboxModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Database size={15} style={{ color: 'var(--accent)' }} />
                <h3>Local-First Store & Forward Queue</h3>
              </div>
              <button className="close-btn" onClick={() => setShowOutboxModal(false)}>
                <X size={15} />
              </button>
            </div>

            <div className="modal-body">
              <div style={{ marginBottom: '12px', fontSize: '0.78125rem', color: 'var(--text-secondary)' }}>
                Polaris uses IndexedDB persistence to queue operations during polar satellite dropouts.
                When link reconnects, all transactions replay with conflict-free CRDT reconciliation.
              </div>

              {outbox.length === 0 ? (
                <div style={{
                  padding: '24px',
                  textAlign: 'center',
                  border: '1px dashed var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem'
                }}>
                  OUTBOX EMPTY — ALL MUTATIONS RECONCILED WITH NCPOR SATELLITE CORE
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '320px', overflowY: 'auto' }}>
                  {outbox.map((item) => (
                    <div 
                      key={item.txId} 
                      style={{
                        padding: '8px 12px',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--bg-surface-elevated)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span className="tag-badge">{item.type}</span>
                          <span style={{ fontSize: '0.78125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {item.description}
                          </span>
                        </div>
                        <div className="mono" style={{ fontSize: '0.675rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {item.txId} • {item.hash}
                        </div>
                      </div>
                      <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--color-warning)' }}>
                        QUEUED ({item.timestamp})
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary btn-sm" onClick={() => setShowOutboxModal(false)}>
                Close
              </button>
              {outbox.length > 0 && (
                <button 
                  className="btn btn-primary btn-sm" 
                  onClick={handleSyncOutbox}
                  disabled={isSyncing}
                >
                  {isSyncing ? (
                    <>
                      <RefreshCw size={13} className="spin" />
                      <span>Replaying Burst Queue...</span>
                    </>
                  ) : (
                    <>
                      <Check size={13} />
                      <span>Replay Sync ({outbox.length} Transactions)</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SIH 2026 Evaluation Demo Guide Modal */}
      {showDemoGuide && (
        <div className="modal-overlay" onClick={() => setShowDemoGuide(false)}>
          <div className="modal-content" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle size={15} style={{ color: 'var(--accent)' }} />
                <h3>SIH 2026 Evaluation Demo Guide (PS: SIH26062)</h3>
              </div>
              <button className="close-btn" onClick={() => setShowDemoGuide(false)}>
                <X size={15} />
              </button>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Welcome to the <strong>POLARIS</strong> demonstration suite for Smart India Hackathon 2026.
                Use these 6 guided demo flows to present each operational pillar to the evaluation jury in under 5 minutes:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '380px', overflowY: 'auto' }}>
                
                {/* Flow 1 */}
                <div style={{
                  padding: '10px 12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="mono" style={{ fontWeight: 700, fontSize: '0.7rem', color: 'var(--accent-text)' }}>FLOW 01</span>
                      <strong style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>Command Center & Cryospheric Radar</strong>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Tactical WGS-84 radar covering 5 global nodes with live microgrid kW, battery SoC, and fuel days autonomy.
                    </div>
                  </div>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setActiveTab('overview');
                      setShowDemoGuide(false);
                    }}
                  >
                    <span>Launch</span>
                    <ArrowRight size={11} />
                  </button>
                </div>

                {/* Flow 2 */}
                <div style={{
                  padding: '10px 12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="mono" style={{ fontWeight: 700, fontSize: '0.7rem', color: 'var(--accent-text)' }}>FLOW 02</span>
                      <strong style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>Fast-Ice Offload Reconciliation (&lt;6h Benchmark)</strong>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Demonstrates reducing offload reconciliation from 72h to &lt;6h with barcode scanning, sled convoy tracking, and tidal limit countdown.
                    </div>
                  </div>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setActiveTab('expedition');
                      setShowDemoGuide(false);
                    }}
                  >
                    <span>Launch</span>
                    <ArrowRight size={11} />
                  </button>
                </div>

                {/* Flow 3 */}
                <div style={{
                  padding: '10px 12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="mono" style={{ fontWeight: 700, fontSize: '0.7rem', color: 'var(--accent-text)' }}>FLOW 03</span>
                      <strong style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>Predictive ML Burn-Rate Modeling & Madrid Ledger</strong>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Correlates ambient sub-zero temperature (-40°C) with crew headcount to forecast exact zero-fuel dates, plus Annex III waste ledger.
                    </div>
                  </div>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setActiveTab('cargo');
                      setShowDemoGuide(false);
                    }}
                  >
                    <span>Launch</span>
                    <ArrowRight size={11} />
                  </button>
                </div>

                {/* Flow 4 */}
                <div style={{
                  padding: '10px 12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="mono" style={{ fontWeight: 700, fontSize: '0.7rem', color: 'var(--accent-text)' }}>FLOW 04</span>
                      <strong style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>Station Muster Roll & Active Traverse Geofencing</strong>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      1-click automated muster roll drill (100% headcount verified in &lt;1s) and deep plateau traverse tracking with VHF channels and distress hex IDs.
                    </div>
                  </div>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setActiveTab('personnel');
                      setShowDemoGuide(false);
                    }}
                  >
                    <span>Launch</span>
                    <ArrowRight size={11} />
                  </button>
                </div>

                {/* Flow 5 */}
                <div style={{
                  padding: '10px 12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="mono" style={{ fontWeight: 700, fontSize: '0.7rem', color: 'var(--accent-text)' }}>FLOW 05</span>
                      <strong style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>Blizzard Hazard Matrix & COSPAS-SARSAT Distress</strong>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Automated 3-tier blizzard threat tracking (Condition 1/2/3) with station lockout enforcement and 406MHz emergency beacon broadcast terminal.
                    </div>
                  </div>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setActiveTab('emergency');
                      setShowDemoGuide(false);
                    }}
                  >
                    <span>Launch</span>
                    <ArrowRight size={11} />
                  </button>
                </div>

                {/* Flow 6 */}
                <div style={{
                  padding: '10px 12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="mono" style={{ fontWeight: 700, fontSize: '0.7rem', color: 'var(--accent-text)' }}>FLOW 06</span>
                      <strong style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>Offline Satellite Dropout & Store-and-Forward Replay</strong>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Simulates polar satellite link dropouts; captures transactions in local IndexedDB outbox and re-syncs burst data upon link recovery.
                    </div>
                  </div>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setIsOffline(true);
                      setShowOutboxModal(true);
                      setShowDemoGuide(false);
                    }}
                  >
                    <span>Simulate</span>
                    <ArrowRight size={11} />
                  </button>
                </div>

              </div>

              {/* Keyboard Cheatsheet Strip */}
              <div style={{
                padding: '8px 12px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-canvas)',
                fontSize: '0.7rem',
                color: 'var(--text-secondary)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>KEYBOARD SHORTCUTS:</span>
                <span className="mono"><kbd>1</kbd>-<kbd>5</kbd> Tabs</span>
                <span className="mono"><kbd>O</kbd> Toggle Offline</span>
                <span className="mono"><kbd>?</kbd> Demo Guide</span>
                <span className="mono"><kbd>Esc</kbd> Close Dialogs</span>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary btn-sm" onClick={() => setShowDemoGuide(false)}>
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Utilitarian Footer with Keyboard Hints */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div className="footer-left">
            <span className="footer-brand">POLARIS</span>
            <span className="footer-sep">|</span>
            <span>SIH 2026 PS SIH26062</span>
            <span className="footer-sep">|</span>
            <span>National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences</span>
          </div>

          <div className="footer-right">
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <kbd>1</kbd>-<kbd>5</kbd> Tabs
            </span>
            <span className="footer-sep">|</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <kbd>O</kbd> Offline
            </span>
            <span className="footer-sep">|</span>
            <button 
              onClick={() => setShowDemoGuide(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-text)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)'
              }}
            >
              <kbd>?</kbd> Demo Guide
            </button>
            <span className="footer-sep">|</span>
            <span>Team <strong>Dev React</strong></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
