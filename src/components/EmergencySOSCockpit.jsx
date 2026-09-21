import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Radio, 
  Wind, 
  CheckSquare, 
  Square, 
  AlertTriangle, 
  Flame, 
  LifeBuoy, 
  X,
  CheckCircle2,
  ArrowDownLeft
} from 'lucide-react';

export default function EmergencySOSCockpit({ 
  blizzardLevel, 
  onBlizzardChange, 
  sosActive, 
  setSosActive,
  onMutation,
  isOffline
}) {
  const [sarChecklist, setSarChecklist] = useState({
    lockout: true,
    beaconBroadcast: false,
    sarTeamAlerted: false,
    novoMedevacStandby: false,
    satellitePingConfirmed: false,
    generatorAuxAutoSwitch: false
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [testBeaconRunning, setTestBeaconRunning] = useState(false);
  const [beaconFeedback, setBeaconFeedback] = useState(null);

  const toggleCheck = (key) => {
    setSarChecklist(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      if (onMutation) {
        onMutation('SAR_CHECKLIST', `SAR Protocol check updated: ${key}`, updated);
      }
      return updated;
    });
  };

  const handleSosToggle = () => {
    if (!sosActive) {
      setShowConfirmModal(true);
    } else {
      setSosActive(false);
      setSarChecklist({
        lockout: false,
        beaconBroadcast: false,
        sarTeamAlerted: false,
        novoMedevacStandby: false,
        satellitePingConfirmed: false,
        generatorAuxAutoSwitch: false
      });
      if (onMutation) {
        onMutation('SOS_DEACTIVATION', `Distress beacon cancelled by command authority`, { status: 'Deactivated' });
      }
    }
  };

  const confirmSosActivation = () => {
    setSosActive(true);
    setShowConfirmModal(false);
    setSarChecklist({
      lockout: true,
      beaconBroadcast: true,
      sarTeamAlerted: true,
      novoMedevacStandby: true,
      satellitePingConfirmed: true,
      generatorAuxAutoSwitch: true
    });
    if (onMutation) {
      onMutation('SOS_ACTIVATION', `COSPAS-SARSAT 406MHz distress beacon broadcast initiated`, { 
        beaconHex: '1D3B829000F4A01',
        freq: '406.025 MHz',
        targetMcc: 'INMCC Bangalore'
      });
    }
  };

  const handleTestCarrier = () => {
    setTestBeaconRunning(true);
    setBeaconFeedback(null);
    setTimeout(() => {
      setTestBeaconRunning(false);
      setBeaconFeedback('Carrier Test Acknowledged: INMCC Bangalore received test transmission burst with 0 BER.');
      setTimeout(() => setBeaconFeedback(null), 5000);
    }, 1200);
  };

  const conditions = [
    {
      id: 'Condition 3 (Normal)',
      shortId: 'Condition 3',
      name: 'Nominal Base Movement',
      wind: '< 30 kts (< 55 km/h)',
      temp: '> -30°C',
      visibility: '> 1,000 meters',
      desc: 'Routine scientific work and traverse movements permitted. Standard station check-in cadence.',
      tag: 'status-tag-nominal',
      borderAccent: 'var(--color-nominal)'
    },
    {
      id: 'Condition 2 (Caution)',
      shortId: 'Condition 2',
      name: 'Elevated Precaution',
      wind: '30 - 55 kts (55 - 100 km/h)',
      temp: '-30°C to -45°C',
      visibility: '100 - 1,000 meters',
      desc: 'Restricted outdoor travel. Mandatory 2-person buddy system, survival pack, and continuous VHF radio watch.',
      tag: 'status-tag-warning',
      borderAccent: 'var(--color-warning)'
    },
    {
      id: 'Condition 1 (High Alert)',
      shortId: 'Condition 1',
      name: 'Whiteout / Full Lockdown',
      wind: '> 55 kts (> 100 km/h)',
      temp: '< -45°C (Wind Chill < -60°C)',
      visibility: '< 100 meters (Zero Visibility)',
      desc: 'Mandatory station lockout. No personnel permitted outdoors without rescue harness tether line. Field camps hold fast.',
      tag: 'status-tag-critical',
      borderAccent: 'var(--color-critical)'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Master Distress Cockpit Banner */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 18px',
          border: sosActive ? '1px solid var(--color-critical)' : '1px solid var(--border-color)',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'var(--bg-surface)',
          gap: '12px',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ShieldAlert size={26} style={{ color: sosActive ? 'var(--color-critical)' : 'var(--text-muted)' }} />
          <div>
            <div className="mono" style={{ fontSize: '0.7rem', fontWeight: 700, color: sosActive ? 'var(--color-critical)' : 'var(--text-muted)' }}>
              {sosActive ? 'COSPAS-SARSAT 406.025 MHz EMERGENCY DISTRESS BEACON ACTIVE' : 'SEARCH & RESCUE (SAR) COMMAND TERMINAL'}
            </div>
            <h2 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginTop: '2px' }}>
              Polar Blizzard Hazard & Emergency Incident Cockpit
            </h2>
            <p style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>
              Direct distress relay: INMCC Bangalore, MRCC Cape Town, and Novo Runway Medevac Channel
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={handleTestCarrier}
            disabled={testBeaconRunning}
          >
            <Radio size={12} />
            <span>{testBeaconRunning ? 'Testing 406MHz...' : 'Test INMCC Link'}</span>
          </button>
          <button 
            id="sos-trigger-btn"
            className={sosActive ? 'btn btn-danger' : 'btn btn-secondary'}
            onClick={handleSosToggle}
            style={{ fontWeight: 700 }}
          >
            <Radio size={13} />
            <span>{sosActive ? 'DEACTIVATE DISTRESS BEACON' : 'TRIGGER EMERGENCY SOS'}</span>
          </button>
        </div>
      </div>

      {/* Test Carrier Feedback */}
      {beaconFeedback && (
        <div style={{
          padding: '8px 14px',
          border: '1px solid var(--color-nominal)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.75rem',
          color: 'var(--color-nominal)',
          backgroundColor: 'var(--bg-surface)'
        }}>
          {beaconFeedback}
        </div>
      )}

      {/* Main Grid: 3-Tier Weather Matrix (Left) + SAR Incident Checklist & Shelter Pods (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>
        
        {/* LEFT: 3-Tier Weather Hazard Classification */}
        <div className="solid-panel">
          <div className="section-bar">
            <div className="section-bar-title">
              <Wind size={14} style={{ color: 'var(--accent)' }} />
              <h2>Antarctic & Himalayan Blizzard Threat Matrix</h2>
            </div>
            <span className="tag-badge">MANDATORY PROTOCOL</span>
          </div>

          <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {conditions.map((cond) => {
              const isCurrent = blizzardLevel.includes(cond.shortId);

              return (
                <div 
                  key={cond.id}
                  onClick={() => onBlizzardChange(cond.id)}
                  style={{
                    padding: '12px 14px',
                    border: '1px solid var(--border-color)',
                    borderLeft: isCurrent ? `4px solid ${cond.borderAccent}` : '4px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isCurrent ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s ease, background-color 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className={`status-tag ${cond.tag}`}>
                          {cond.shortId}
                        </span>
                        <h3 style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{cond.name}</h3>
                      </div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        {cond.desc}
                      </div>
                    </div>

                    {/* Clean Action / Status Controls */}
                    <div style={{ flexShrink: 0 }}>
                      {isCurrent ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span 
                            className="tag-badge" 
                            style={{ 
                              color: cond.borderAccent, 
                              borderColor: cond.borderAccent,
                              fontWeight: 700,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <CheckCircle2 size={11} />
                            <span>ENFORCED</span>
                          </span>

                          {/* Allow user to easily step down / revert if in Condition 1 or 2 */}
                          {cond.shortId !== 'Condition 3' && (
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onBlizzardChange('Condition 3 (Normal)');
                              }}
                              title="Revert station alert level back to normal Condition 3"
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                            >
                              <ArrowDownLeft size={11} />
                              <span>De-escalate</span>
                            </button>
                          )}
                        </div>
                      ) : (
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onBlizzardChange(cond.id);
                          }}
                        >
                          Enforce {cond.shortId}
                        </button>
                      )}
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '6px',
                    padding: '6px 10px',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-canvas)',
                    fontSize: '0.7rem'
                  }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>WIND: </span>
                      <strong className="mono">{cond.wind}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>TEMP: </span>
                      <strong className="mono">{cond.temp}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>VISIBILITY: </span>
                      <strong className="mono">{cond.visibility}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: SAR Response Protocol & Survivability Shelter Pods */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* SAR Protocol Checklist */}
          <div className="solid-panel">
            <div className="section-bar">
              <div className="section-bar-title">
                <LifeBuoy size={14} style={{ color: 'var(--accent)' }} />
                <h2>Search & Rescue (SAR) Protocol Checklist</h2>
              </div>
              <span className="mono" style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
                NCPOR SOP #09
              </span>
            </div>

            <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { key: 'lockout', label: 'Enforce Station External Door Magnetic Interlock' },
                { key: 'beaconBroadcast', label: 'Broadcast COSPAS-SARSAT 406MHz Distress Hex ID' },
                { key: 'sarTeamAlerted', label: 'Put Overwintering SAR Snowcat Team on Hot Standby' },
                { key: 'novoMedevacStandby', label: 'Notify Novo Airbase (DROMLAN) for Fixed-Wing Medevac' },
                { key: 'satellitePingConfirmed', label: 'Lock GPS Coordinates to INMCC Bangalore Operations Cell' },
                { key: 'generatorAuxAutoSwitch', label: 'Verify Priyadarshini Water Heating Loop Freeze Protection' }
              ].map((item) => (
                <div 
                  key={item.key}
                  onClick={() => toggleCheck(item.key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 10px',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'border-color 0.15s ease'
                  }}
                >
                  {sarChecklist[item.key] ? (
                    <CheckSquare size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  ) : (
                    <Square size={15} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  )}
                  <span style={{ 
                    fontSize: '0.75rem', 
                    color: sarChecklist[item.key] ? 'var(--text-primary)' : 'var(--text-secondary)',
                    lineHeight: 1.3
                  }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Survivability Pods Status */}
          <div className="solid-panel">
            <div className="section-bar">
              <div className="section-bar-title">
                <Flame size={14} style={{ color: 'var(--accent)' }} />
                <h2>Emergency Shelter Pod Life-Support Telemetry</h2>
              </div>
            </div>

            <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              <div style={{
                padding: '10px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-surface-elevated)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--text-primary)' }}>POD ALPHA (Larsemann)</span>
                  <span className="status-tag status-tag-nominal">STANDBY</span>
                </div>
                <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  O2: 20.9% • Temp: +16°C
                </div>
                <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  Heater: 30 Days Arctic Diesel
                </div>
              </div>

              <div style={{
                padding: '10px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-surface-elevated)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--text-primary)' }}>POD BRAVO (Schirmacher)</span>
                  <span className="status-tag status-tag-nominal">STANDBY</span>
                </div>
                <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  O2: 20.8% • Temp: +14°C
                </div>
                <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  Heater: 45 Days Arctic Diesel
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Distress Activation Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={15} style={{ color: 'var(--color-critical)' }} />
                <h3>Confirm COSPAS-SARSAT Distress Beacon Activation</h3>
              </div>
              <button className="close-btn" onClick={() => setShowConfirmModal(false)}>
                <X size={15} />
              </button>
            </div>

            <div className="modal-body">
              <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '8px' }}>
                You are about to initiate an official 406.025 MHz emergency distress beacon transmission.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: 1.4, marginBottom: '12px' }}>
                This will trigger an international Search & Rescue alert to the Indian Mission Control Center (INMCC Bangalore), Maritime Rescue Coordination Centre (MRCC), and notify the Antarctic Treaty Search and Rescue Liaison.
              </p>

              <div style={{
                padding: '10px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-surface-elevated)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-primary)'
              }}>
                <div>BEACON HEX ID: 1D3B829000F4A01</div>
                <div>TRANSMIT POWER: 5 Watts EIRP</div>
                <div>PROTOCOL: Standard Location Protocol (WGS-84)</div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary btn-sm" onClick={() => setShowConfirmModal(false)}>
                Abort
              </button>
              <button className="btn btn-danger btn-sm" onClick={confirmSosActivation}>
                Confirm & Broadcast Distress
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
