import React, { useState } from 'react';
import { 
  Users, 
  MapPin, 
  Radio, 
  Plus, 
  X,
  Compass,
  CheckCircle2,
  AlertCircle,
  Activity,
  Heart,
  ShieldCheck
} from 'lucide-react';
import { INITIAL_PERSONNEL, ACTIVE_TRAVERSES } from '../data/mockData';

export default function PersonnelMovement({ onMutation, isOffline }) {
  const [activeSubView, setActiveSubView] = useState('muster'); // 'muster' or 'traverses'
  const [personnel, setPersonnel] = useState(INITIAL_PERSONNEL);
  const [statusFilter, setStatusFilter] = useState('All');
  const [pingSuccess, setPingSuccess] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isDrillRunning, setIsDrillRunning] = useState(false);
  const [drillResult, setDrillResult] = useState(null);
  const [formError, setFormError] = useState('');

  const [newPerson, setNewPerson] = useState({
    name: '',
    role: '',
    institute: 'NCPOR Goa',
    station: 'Bharati Station',
    status: 'On Station',
    location: 'Main Science Complex',
    medicalClearance: 'Class-1 Polar Valid',
    callsign: 'BHARATI-EXP-1'
  });

  const handlePing = (id, name) => {
    const time = new Date().toUTCString().slice(17, 25);
    setPingSuccess(`Satellite telemetry confirmed from ${name} at ${time} UTC. GPS fix locked.`);
    setTimeout(() => setPingSuccess(null), 4000);

    if (onMutation) {
      onMutation('PERSONNEL_PING', `Telemetry ping to ${name}`, { id, time });
    }
  };

  const handleToggleStatus = (id) => {
    setPersonnel(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'On Station' ? 'Field Expedition' : 'On Station';
        const updated = { ...p, status: nextStatus, lastCheckIn: 'Just now (Status Toggle)' };
        if (onMutation) {
          onMutation('PERSONNEL_STATUS', `Status updated for ${p.name} to ${nextStatus}`, updated);
        }
        return updated;
      }
      return p;
    }));
  };

  // 1-Click Automated Station Muster Drill
  const handleInitiateMusterDrill = () => {
    setIsDrillRunning(true);
    setDrillResult(null);

    setTimeout(() => {
      setIsDrillRunning(false);
      setDrillResult({
        timestamp: new Date().toISOString().slice(11, 19) + ' UTC',
        totalAccounted: personnel.length,
        onStation: personnel.filter(p => p.status === 'On Station').length,
        fieldTraverse: personnel.filter(p => p.status !== 'On Station').length,
        missing: 0,
        status: '100% ACCOUNTABILITY VERIFIED'
      });

      if (onMutation) {
        onMutation('MUSTER_DRILL', `Station muster drill executed: 100% accounted`, { total: personnel.length });
      }
    }, 1000);
  };

  const handleAddPerson = (e) => {
    e.preventDefault();
    setFormError('');

    const cleanName = newPerson.name.trim().replace(/[<>"/]/g, '');
    const cleanRole = newPerson.role.trim().replace(/[<>"/]/g, '');
    const cleanCallsign = newPerson.callsign.trim().replace(/[<>"/]/g, '');

    if (!cleanName || cleanName.length < 3) {
      setFormError('Personnel name must be at least 3 characters.');
      return;
    }
    if (!cleanRole) {
      setFormError('Scientific designation or operational role is required.');
      return;
    }

    const added = {
      ...newPerson,
      name: cleanName,
      role: cleanRole,
      callsign: cleanCallsign || `EXP-${personnel.length + 1}`,
      id: `PER-0${personnel.length + 1}`,
      heartRate: '72 bpm',
      spo2: '98%',
      bodyTemp: '36.8°C',
      lastCheckIn: 'Just now (Registered)'
    };

    setPersonnel([added, ...personnel]);
    if (onMutation) {
      onMutation('PERSONNEL_REGISTER', `New expeditioner registered: ${cleanName}`, added);
    }
    setShowAddModal(false);
    setNewPerson({
      name: '',
      role: '',
      institute: 'NCPOR Goa',
      station: 'Bharati Station',
      status: 'On Station',
      location: 'Main Science Complex',
      medicalClearance: 'Class-1 Polar Valid',
      callsign: 'BHARATI-EXP-1'
    });
  };

  const filtered = personnel.filter(p => statusFilter === 'All' || p.status === statusFilter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Telemetry Ping Toast */}
      {pingSuccess && (
        <div 
          role="status"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.75rem',
            color: 'var(--text-primary)',
            backgroundColor: 'var(--bg-surface)'
          }}
        >
          <Radio size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
          <span>{pingSuccess}</span>
        </div>
      )}

      {/* Muster Drill Result Banner */}
      {drillResult && (
        <div 
          role="alert"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 14px',
            border: '1px solid var(--color-nominal)',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--bg-surface)',
            fontSize: '0.75rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={15} style={{ color: 'var(--color-nominal)' }} />
            <span style={{ fontWeight: 700, color: 'var(--color-nominal)' }}>
              {drillResult.status}
            </span>
            <span style={{ color: 'var(--text-secondary)' }}>
              ({drillResult.onStation} on base, {drillResult.fieldTraverse} in field traverse, {drillResult.missing} missing at {drillResult.timestamp})
            </span>
          </div>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setDrillResult(null)}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Sub-Navigation & Actions Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '8px',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            className={`tab-pill ${activeSubView === 'muster' ? 'active' : ''}`}
            onClick={() => setActiveSubView('muster')}
          >
            <Users size={13} />
            <span>Station Muster Roll</span>
          </button>
          <button
            className={`tab-pill ${activeSubView === 'traverses' ? 'active' : ''}`}
            onClick={() => setActiveSubView('traverses')}
          >
            <Compass size={13} />
            <span>Field Traverses & Geofencing</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={handleInitiateMusterDrill}
            disabled={isDrillRunning}
          >
            <ShieldCheck size={13} style={{ color: 'var(--accent)' }} />
            <span>{isDrillRunning ? 'Scanning Biometrics...' : 'Initiate Station Muster Drill'}</span>
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)}>
            <Plus size={13} />
            <span>Register Personnel</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: STATION MUSTER ROLL & BIOMETRIC ROSTER */}
      {activeSubView === 'muster' && (
        <div className="solid-panel">
          <div className="section-bar" style={{ flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {['All', 'On Station', 'Field Expedition', 'Field Convoy'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`chip-filter ${statusFilter === tab ? 'active' : ''}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {filtered.length} OF {personnel.length} EXPEDITIONERS ACCOUNTED
            </span>
          </div>

          <div className="table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>MEMBER ID</th>
                  <th>EXPEDITIONER NAME & DESIGNATION</th>
                  <th>INSTITUTE</th>
                  <th>STATION / SECTOR</th>
                  <th>LOCATION / POST</th>
                  <th>BIOMETRICS</th>
                  <th>MEDICAL FITNESS</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const isOnStation = p.status === 'On Station';

                  return (
                    <tr key={p.id}>
                      <td className="mono" style={{ color: 'var(--accent-text)', fontWeight: 600 }}>
                        {p.id}
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{p.role}</div>
                        <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                          CALLSIGN: {p.callsign}
                        </div>
                      </td>
                      <td style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{p.institute}</td>
                      <td style={{ fontSize: '0.75rem', color: 'var(--text-primary)' }}>{p.station}</td>
                      <td>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{p.location}</div>
                        <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                          {p.lastCheckIn}
                        </div>
                      </td>
                      <td>
                        <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-primary)' }}>
                          HR {p.heartRate || '72 bpm'} • SpO2 {p.spo2 || '98%'}
                        </div>
                        <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                          TEMP {p.bodyTemp || '36.8°C'}
                        </div>
                      </td>
                      <td>
                        <span className="tag-badge" style={{ color: 'var(--color-nominal)' }}>
                          {p.medicalClearance}
                        </span>
                      </td>
                      <td>
                        <span className={`status-tag ${isOnStation ? 'status-tag-nominal' : 'status-tag-warning'}`}>
                          {p.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button 
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '2px 6px', fontSize: '0.675rem' }}
                            onClick={() => handlePing(p.id, p.name)}
                          >
                            Ping
                          </button>
                          <button 
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '2px 6px', fontSize: '0.675rem' }}
                            onClick={() => handleToggleStatus(p.id)}
                          >
                            {isOnStation ? 'To Field' : 'To Base'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: ACTIVE FIELD TRAVERSES & GEOFENCE TRACKER */}
      {activeSubView === 'traverses' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="solid-panel">
            <div className="section-bar">
              <div className="section-bar-title">
                <Compass size={14} style={{ color: 'var(--accent)' }} />
                <h2>Active Field Traverses & Geofence Corridor Status</h2>
              </div>
              <span className="tag-badge">SAFETY PROTOCOL ENFORCED</span>
            </div>

            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {ACTIVE_TRAVERSES.map((trv) => (
                <div 
                  key={trv.id}
                  style={{
                    padding: '14px',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="mono" style={{ fontWeight: 700, color: 'var(--accent-text)' }}>
                          {trv.id}
                        </span>
                        <h3 style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{trv.name}</h3>
                      </div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        Base: <strong>{trv.baseStation}</strong> | Leader: {trv.leader} ({trv.teamSize} expeditioners)
                      </div>
                    </div>

                    <span className="status-tag status-tag-nominal">
                      {trv.safetyStatus}
                    </span>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '8px',
                    padding: '8px 10px',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-surface)'
                  }}>
                    <div>
                      <div className="metric-label">CURRENT COORDINATES</div>
                      <div className="mono" style={{ fontSize: '0.75rem', fontWeight: 600, marginTop: '2px' }}>
                        {trv.currentCoords}
                      </div>
                    </div>
                    <div>
                      <div className="metric-label">DISTANCE FROM BASE</div>
                      <div className="mono" style={{ fontSize: '0.75rem', fontWeight: 600, marginTop: '2px' }}>
                        {trv.distanceKm} km
                      </div>
                    </div>
                    <div>
                      <div className="metric-label">VHF / SATELLITE CHANNEL</div>
                      <div className="mono" style={{ fontSize: '0.75rem', fontWeight: 600, marginTop: '2px' }}>
                        {trv.vhfChannel}
                      </div>
                    </div>
                    <div>
                      <div className="metric-label">DISTRESS BEACON HEX</div>
                      <div className="mono" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-text)', marginTop: '2px' }}>
                        {trv.beaconHex}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.725rem' }}>
                    <div style={{ color: 'var(--text-secondary)' }}>
                      <strong>Vehicles / Equipment:</strong> {trv.vehicles}
                    </div>
                    <div className="mono" style={{ color: 'var(--color-nominal)' }}>
                      GEOFENCE: {trv.geofenceStatus}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Register Personnel Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={14} style={{ color: 'var(--accent)' }} />
                <h3>Register Expeditioner in Station Muster Roll</h3>
              </div>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleAddPerson}>
              <div className="modal-body">
                {formError && (
                  <div style={{
                    padding: '8px 12px',
                    border: '1px solid var(--color-critical)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-critical)',
                    fontSize: '0.75rem',
                    marginBottom: '12px'
                  }}>
                    {formError}
                  </div>
                )}

                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Dr. Ramesh K. Verma"
                    value={newPerson.name}
                    onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Scientific Designation / Role</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Glacial Geophysicist & Radar Specialist"
                    value={newPerson.role}
                    onChange={(e) => setNewPerson({ ...newPerson, role: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Station Allocation</label>
                    <select 
                      value={newPerson.station} 
                      onChange={(e) => setNewPerson({ ...newPerson, station: e.target.value })}
                      className="select-control"
                    >
                      <option value="Bharati Station">Bharati Station (Antarctica)</option>
                      <option value="Maitri Station">Maitri Station (Antarctica)</option>
                      <option value="Himadri Station">Himadri Station (Arctic)</option>
                      <option value="Himansh Station">Himansh Station (Himalayas)</option>
                      <option value="MV Vasily Golovnin">MV Vasily Golovnin (Vessel)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Deploying Institute</label>
                    <input 
                      type="text" 
                      placeholder="e.g. NCPOR Goa / IMD / WIHG"
                      value={newPerson.institute}
                      onChange={(e) => setNewPerson({ ...newPerson, institute: e.target.value })}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Medical Clearance</label>
                    <select 
                      value={newPerson.medicalClearance} 
                      onChange={(e) => setNewPerson({ ...newPerson, medicalClearance: e.target.value })}
                      className="select-control"
                    >
                      <option value="Class-1 Polar Valid">Class-1 Polar Valid (MoES AIIMS)</option>
                      <option value="High-Altitude 4000m Certified">High-Altitude 4000m Certified</option>
                      <option value="Restricted Duty">Restricted Base Duty</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Assigned Radio Callsign</label>
                    <input 
                      type="text" 
                      placeholder="e.g. BHARATI-EXP-08"
                      value={newPerson.callsign}
                      onChange={(e) => setNewPerson({ ...newPerson, callsign: e.target.value })}
                      className="form-control mono"
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Commit to Muster Roll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
