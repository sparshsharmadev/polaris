import React, { useState } from 'react';
import { 
  Ship, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Barcode, 
  Layers, 
  Compass, 
  Wind,
  Plus
} from 'lucide-react';
import { VOYAGE_MILESTONES, FAST_ICE_MANIFEST } from '../data/mockData';

export default function ExpeditionPlanner({ onMutation, isOffline }) {
  const [milestones] = useState(VOYAGE_MILESTONES);
  const [selectedMilestone, setSelectedMilestone] = useState(milestones[2]); // Southern Ocean default
  const [manifest, setManifest] = useState(FAST_ICE_MANIFEST);
  const [manifestFilter, setManifestFilter] = useState('All');
  const [manualBarcode, setManualBarcode] = useState('');
  const [reconcileFeedback, setReconcileFeedback] = useState(null);

  // Calculate offload stats
  const reconciledCount = manifest.filter(m => m.status === 'Reconciled').length;
  const inTransitCount = manifest.filter(m => m.status === 'In Transit').length;
  const totalWeightMt = manifest.reduce((acc, curr) => acc + curr.weightMt, 0);
  const reconciliationPercent = Math.round((reconciledCount / manifest.length) * 100);

  // Fast-Ice Reconcile Action
  const handleReconcileItem = (id) => {
    setManifest(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: 'Reconciled',
          unloadedTime: new Date().toISOString().slice(11, 16) + ' UTC'
        };
      }
      return item;
    }));

    setReconcileFeedback(`Reconciled: ${id} verified on fast-ice sled.`);
    setTimeout(() => setReconcileFeedback(null), 3000);

    if (onMutation) {
      onMutation('RECONCILIATION', `Fast-ice manifest item ${id} reconciled`, { id, status: 'Reconciled' });
    }
  };

  const handleBarcodeSubmit = (e) => {
    e.preventDefault();
    if (!manualBarcode.trim()) return;

    const term = manualBarcode.trim().toUpperCase();
    const found = manifest.find(m => m.barcode.includes(term) || m.id.includes(term));

    if (found) {
      handleReconcileItem(found.id);
      setManualBarcode('');
    } else {
      setReconcileFeedback(`Container code not found in 44-ISEA manifest.`);
      setTimeout(() => setReconcileFeedback(null), 3000);
    }
  };

  const filteredManifest = manifestFilter === 'All'
    ? manifest
    : manifest.filter(m => m.status === manifestFilter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Expedition Master Overview Strip */}
      <div className="metrics-strip">
        <div className="metric-cell">
          <span className="metric-label">EXPEDITION VESSEL</span>
          <span className="metric-value">MV VASILY GOLOVNIN</span>
          <span className="metric-note">Ice-class chartered research & cargo carrier (NCPOR)</span>
        </div>
        <div className="metric-cell">
          <span className="metric-label">TOTAL EXPEDITION PAYLOAD</span>
          <span className="metric-value">{totalWeightMt.toFixed(1)} MT MANIFEST</span>
          <span className="metric-note">Fuel ISO tanks, tracked snowcat spares & reefer stores</span>
        </div>
        <div className="metric-cell">
          <span className="metric-label">ICE-EDGE RECONCILIATION</span>
          <span className="metric-value">{reconciliationPercent}% RECONCILED</span>
          <span className="metric-note">{reconciledCount} of {manifest.length} heavy TEUs signed off</span>
        </div>
        <div className="metric-cell">
          <span className="metric-label">FAST-ICE OFFICER BENCHMARK</span>
          <span className="metric-value">&lt; 6.0 HOURS</span>
          <span className="metric-note">Target turnaround reduced from 72h manual baseline</span>
        </div>
      </div>

      {/* Main Grid: Voyage Schedule (Left) + Fast-Ice Reconciliation Tool (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>
        
        {/* LEFT: 44-ISEA Multi-Leg Voyage Gantt Timeline */}
        <div className="solid-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="section-bar">
            <div className="section-bar-title">
              <Calendar size={14} style={{ color: 'var(--accent)' }} />
              <h2>44th Indian Scientific Expedition (44-ISEA) Schedule</h2>
            </div>
            <span className="tag-badge">NCPOR CHARTER #2026-44</span>
          </div>

          <div className="table-wrapper" style={{ border: 'none', borderRadius: 0, flex: 1 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>OPERATIONAL PHASE</th>
                  <th>STAGING SECTOR</th>
                  <th>SCHEDULE</th>
                  <th>STATUS</th>
                  <th>INSPECT</th>
                </tr>
              </thead>
              <tbody>
                {milestones.map((m, idx) => {
                  const isDone = m.status === 'Completed';
                  const isInProgress = m.status === 'In Progress';
                  const isSelected = selectedMilestone?.id === m.id;

                  return (
                    <tr 
                      key={m.id}
                      onClick={() => setSelectedMilestone(m)}
                      style={{ 
                        cursor: 'pointer',
                        backgroundColor: isSelected ? 'var(--bg-surface-active)' : undefined 
                      }}
                    >
                      <td className="mono" style={{ color: 'var(--text-muted)' }}>0{idx + 1}</td>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{m.title}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          {m.notes}
                        </div>
                      </td>
                      <td style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>{m.location}</td>
                      <td className="mono" style={{ fontSize: '0.725rem', color: 'var(--accent-text)', whiteSpace: 'nowrap' }}>
                        {m.date}
                      </td>
                      <td>
                        <span className={`status-tag ${
                          isDone ? 'status-tag-nominal' : isInProgress ? 'status-tag-warning' : 'status-tag-neutral'
                        }`}>
                          {m.status}
                        </span>
                      </td>
                      <td>
                        {isSelected ? (
                          <span className="tag-badge" style={{ color: 'var(--accent-text)', borderColor: 'var(--accent)', fontWeight: 600 }}>
                            VIEWING
                          </span>
                        ) : (
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMilestone(m);
                            }}
                          >
                            Details
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Selected Stage Flight & Weather Directives */}
          {selectedMilestone && (
            <div style={{
              padding: '12px 16px',
              borderTop: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-surface-elevated)',
              fontSize: '0.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Ship size={13} style={{ color: 'var(--accent)' }} />
                <span><strong>Phase Detail:</strong> {selectedMilestone.title} ({selectedMilestone.location})</span>
              </div>
              <div className="mono" style={{ color: 'var(--text-muted)' }}>
                SCHEDULED: {selectedMilestone.date} • PROGRESS: {selectedMilestone.progress}%
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Fast-Ice Offload Reconciliation Tool (<6h Target) */}
        <div className="solid-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="section-bar">
            <div className="section-bar-title">
              <Barcode size={14} style={{ color: 'var(--accent)' }} />
              <h2>Fast-Ice Offload Reconciliation Tool</h2>
            </div>
            <span className="mono" style={{ fontSize: '0.675rem', color: 'var(--color-warning)' }}>
              FAST-ICE WINDOW: 05h 42m LEFT
            </span>
          </div>

          <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            
            {/* Progress & Target Benchmark Indicator */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Offload Reconciliation Completion</span>
                <span className="mono" style={{ fontWeight: 700 }}>
                  {reconciledCount} / {manifest.length} Containers ({reconciliationPercent}%)
                </span>
              </div>
              <div className="meter-container">
                <div 
                  className="meter-fill"
                  style={{ width: `${reconciliationPercent}%` }}
                ></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.675rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>Reconciled: {reconciledCount} | In Transit: {inTransitCount}</span>
                <span>Tidal Stability Limit: 18:00 UTC</span>
              </div>
            </div>

            {/* Barcode / RFID Quick Reconcile Input */}
            <form onSubmit={handleBarcodeSubmit} style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                placeholder="Scan or enter container code (e.g. TEU-4403, NCPOR-44-FOOD)..."
                value={manualBarcode}
                onChange={(e) => setManualBarcode(e.target.value)}
                className="search-input mono"
                style={{ flex: 1 }}
              />
              <button type="submit" className="btn btn-primary btn-sm">
                <CheckCircle2 size={12} />
                <span>Verify Scan</span>
              </button>
            </form>

            {/* Reconciliation Feedback Alert */}
            {reconcileFeedback && (
              <div style={{
                padding: '6px 10px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.725rem',
                color: 'var(--accent-text)',
                backgroundColor: 'var(--bg-surface-elevated)'
              }}>
                {reconcileFeedback}
              </div>
            )}

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['All', 'Reconciled', 'In Transit', 'Crane Hoist', 'Staged on Deck'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setManifestFilter(tab)}
                  className={`chip-filter ${manifestFilter === tab ? 'active' : ''}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Fast-Ice Manifest Item List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '280px' }}>
              {filteredManifest.map((item) => (
                <div 
                  key={item.id}
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
                      <span className="mono" style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--text-primary)' }}>
                        {item.id}
                      </span>
                      <span className="tag-badge">{item.category}</span>
                      <span className="mono" style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
                        {item.weightMt} MT
                      </span>
                    </div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {item.description}
                    </div>
                    <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      DEST: {item.destination} • SLED: {item.sledAssigned}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ marginBottom: '4px' }}>
                      <span className={`status-tag ${
                        item.status === 'Reconciled' ? 'status-tag-nominal' :
                        item.status === 'In Transit' ? 'status-tag-warning' :
                        'status-tag-neutral'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    {item.status !== 'Reconciled' && (
                      <button 
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '2px 6px', fontSize: '0.675rem' }}
                        onClick={() => handleReconcileItem(item.id)}
                      >
                        Sign Off
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Kamov-32 Sea-Ice Reconnaissance Note */}
            <div style={{
              marginTop: 'auto',
              padding: '8px 10px',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.7rem',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Wind size={12} style={{ color: 'var(--accent)' }} />
              <span><strong>Kamov-32 Recon:</strong> Fast-ice thickness 1.8m. Sled convoy travel route locked.</span>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
