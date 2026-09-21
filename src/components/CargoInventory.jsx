import React, { useState } from 'react';
import { 
  Search, 
  QrCode, 
  Plus, 
  ThermometerSnowflake, 
  X,
  Sliders,
  FileCheck,
  AlertTriangle,
  Flame,
  Calendar,
  Box,
  Download
} from 'lucide-react';
import { INITIAL_CARGO, MADRID_PROTOCOL_LEDGER } from '../data/mockData';

export default function CargoInventory({ onMutation, isOffline }) {
  const [activeSubTab, setActiveSubTab] = useState('inventory'); // 'inventory', 'burnrate', 'madrid'
  const [cargoList, setCargoList] = useState(INITIAL_CARGO);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stationFilter, setStationFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [scannedItem, setScannedItem] = useState(null);
  const [formError, setFormError] = useState('');

  // Predictive ML Burn-Rate Simulator State
  const [simTemp, setSimTemp] = useState(-34); // °C ambient
  const [simHeadcount, setSimHeadcount] = useState(25); // personnel
  const [simStation, setSimStation] = useState('Maitri Station');

  const [newCargo, setNewCargo] = useState({
    name: '',
    category: 'Fuel',
    station: 'Bharati Station',
    quantity: '',
    unit: 'Litres',
    burnRate: '1,150 L/day',
    daysLeft: '365',
    tempReq: 'Pour point -50°C',
    container: 'Tank Farm B-01',
    rfidTag: 'E280-1160-2009'
  });

  const categories = ['All', 'Fuel', 'Rations', 'Vehicle Spares', 'Life Support', 'Scientific Payload', 'Medical'];
  const stations = ['All', 'Bharati Station', 'Maitri Station', 'Himadri Station', 'Himansh Station'];

  // Predictive ML Model Calculation:
  // Base daily burn increases by ~2.5% for every degree drop below -20°C (heating load)
  // Base daily burn increases by ~35 Litres / day per additional overwintering personnel
  const baseFuelBurn = simStation === 'Bharati Station' ? 1150 : 940;
  const currentFuelReserveL = simStation === 'Bharati Station' ? 211600 : 133480;
  const tempDeltaPenalty = Math.max(0, -20 - simTemp) * 0.024; // heating penalty
  const headcountFactor = (simHeadcount / 25);
  const projectedDailyBurn = Math.round(baseFuelBurn * (1 + tempDeltaPenalty) * (0.6 + 0.4 * headcountFactor));
  const projectedDaysLeft = Math.round(currentFuelReserveL / projectedDailyBurn);
  
  // Calculate projected exhaustion date
  const projectedExhaustionDate = new Date();
  projectedExhaustionDate.setDate(projectedExhaustionDate.getDate() + projectedDaysLeft);
  const exhaustionFormatted = projectedExhaustionDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  const filteredCargo = cargoList.filter((item) => {
    const term = searchTerm.trim().toLowerCase();
    const matchesSearch = !term || 
                          item.name.toLowerCase().includes(term) ||
                          item.id.toLowerCase().includes(term) ||
                          item.container.toLowerCase().includes(term);
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesStation = stationFilter === 'All' || item.station === stationFilter;
    return matchesSearch && matchesCategory && matchesStation;
  });

  const handleAddCargo = (e) => {
    e.preventDefault();
    setFormError('');

    const cleanName = newCargo.name.trim().replace(/[<>"/]/g, '');
    const cleanContainer = newCargo.container.trim().replace(/[<>"/]/g, '');
    const numQty = Number(newCargo.quantity);
    const numDays = Number(newCargo.daysLeft);

    if (!cleanName || cleanName.length < 3) {
      setFormError('Description must be at least 3 characters.');
      return;
    }
    if (isNaN(numQty) || numQty <= 0) {
      setFormError('Quantity must be a positive number.');
      return;
    }
    if (isNaN(numDays) || numDays <= 0) {
      setFormError('Days left must be a positive number.');
      return;
    }

    const newItem = {
      ...newCargo,
      id: `CARGO-00${cargoList.length + 1}`,
      name: cleanName,
      container: cleanContainer || 'Bay-01',
      quantity: numQty,
      daysLeft: numDays,
      status: numDays < 100 ? 'Warning' : 'Normal',
      rfidTag: `E280-1160-${2010 + cargoList.length}`
    };

    setCargoList([newItem, ...cargoList]);
    if (onMutation) {
      onMutation('CARGO_MANIFEST', `New cargo item manifested: ${cleanName}`, newItem);
    }
    setShowAddModal(false);
    setNewCargo({
      name: '',
      category: 'Fuel',
      station: 'Bharati Station',
      quantity: '',
      unit: 'Litres',
      burnRate: '1,150 L/day',
      daysLeft: '365',
      tempReq: 'Pour point -50°C',
      container: 'Tank Farm B-01',
      rfidTag: 'E280-1160-2009'
    });
  };

  const handleScanSimulation = () => {
    const randomItem = cargoList[Math.floor(Math.random() * cargoList.length)];
    setScannedItem(randomItem);
    setShowScanModal(true);
  };

  const handleExportMadridCsv = () => {
    const headers = ['Manifest ID', 'Waste Category & Substance', 'Generation Source', 'Quantity', 'Containment & Treatment', 'Compliance Status', 'Auditor'];
    const rows = MADRID_PROTOCOL_LEDGER.map(e => [
      `"${e.id}"`,
      `"${e.category}"`,
      `"${e.source}"`,
      `"${e.quantity}"`,
      `"${e.treatment}"`,
      `"${e.status}"`,
      `"${e.auditor}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Madrid_Protocol_Annex_III_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Module Navigation Sub-Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '8px'
      }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            className={`tab-pill ${activeSubTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('inventory')}
          >
            <Box size={13} />
            <span>Cold-Chain Inventory</span>
          </button>
          <button
            className={`tab-pill ${activeSubTab === 'burnrate' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('burnrate')}
          >
            <Sliders size={13} />
            <span>Predictive ML Burn-Rate Simulator</span>
          </button>
          <button
            className={`tab-pill ${activeSubTab === 'madrid' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('madrid')}
          >
            <FileCheck size={13} />
            <span>Madrid Protocol Environmental Ledger</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm" onClick={handleScanSimulation}>
            <QrCode size={13} />
            <span>RFID / QR Scanner</span>
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)}>
            <Plus size={13} />
            <span>Manifest Asset</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: COLD-CHAIN ASSET INVENTORY TABLE */}
      {activeSubTab === 'inventory' && (
        <div className="solid-panel">
          <div className="section-bar" style={{ flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '260px' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
                <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  placeholder="Search item ID, name, bay..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input mono"
                  style={{ width: '100%', paddingLeft: '32px' }}
                />
              </div>

              <select 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="select-control"
              >
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>

              <select 
                value={stationFilter} 
                onChange={(e) => setStationFilter(e.target.value)}
                className="select-control"
              >
                {stations.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              SHOWING {filteredCargo.length} OF {cargoList.length} ASSETS
            </span>
          </div>

          <div className="table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ASSET ID</th>
                  <th>ITEM SPECIFICATION</th>
                  <th>CATEGORY</th>
                  <th>STATION / CONTAINER</th>
                  <th>QUANTITY</th>
                  <th>BURN-RATE</th>
                  <th>AUTONOMY</th>
                  <th>SUB-ZERO RATING</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredCargo.map((item) => {
                  const isLow = item.daysLeft < 100;

                  return (
                    <tr key={item.id}>
                      <td className="mono" style={{ color: 'var(--accent-text)', fontWeight: 600 }}>
                        {item.id}
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</div>
                        <div className="mono" style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
                          RFID: {item.rfidTag}
                        </div>
                      </td>
                      <td>
                        <span className="tag-badge">{item.category}</span>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-primary)' }}>{item.station}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{item.container}</div>
                      </td>
                      <td className="mono" style={{ fontWeight: 600 }}>
                        {item.quantity.toLocaleString()} {item.unit}
                      </td>
                      <td className="mono" style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>
                        {item.burnRate}
                      </td>
                      <td className="mono" style={{ fontWeight: 700, color: isLow ? 'var(--color-warning)' : 'var(--text-primary)' }}>
                        {item.daysLeft} Days
                      </td>
                      <td style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                        {item.tempReq}
                      </td>
                      <td>
                        <span className={`status-tag ${isLow ? 'status-tag-warning' : 'status-tag-nominal'}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: PREDICTIVE BURN-RATE ML SIMULATOR */}
      {activeSubTab === 'burnrate' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '16px' }}>
          
          {/* Simulation Controls */}
          <div className="solid-panel">
            <div className="section-bar">
              <div className="section-bar-title">
                <Sliders size={14} style={{ color: 'var(--accent)' }} />
                <h2>Ambient Temperature & Headcount Parameters</h2>
              </div>
            </div>

            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label>Target Station Node</label>
                <select 
                  value={simStation} 
                  onChange={(e) => setSimStation(e.target.value)}
                  className="select-control"
                >
                  <option value="Maitri Station">Maitri Station (Antarctica - Queen Maud Land)</option>
                  <option value="Bharati Station">Bharati Station (Antarctica - Larsemann Hills)</option>
                </select>
              </div>

              {/* Ambient Temperature Slider (-10°C to -55°C) */}
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label>Simulated Ambient Temperature</label>
                  <span className="mono" style={{ fontWeight: 700, color: 'var(--accent-text)' }}>
                    {simTemp}°C
                  </span>
                </div>
                <input 
                  type="range" 
                  min="-55" 
                  max="-10" 
                  value={simTemp}
                  onChange={(e) => setSimTemp(Number(e.target.value))}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.675rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  <span>-55°C (Polar Deep Winter)</span>
                  <span>-10°C (Summer Window)</span>
                </div>
              </div>

              {/* Overwintering Crew Headcount Slider (10 to 60) */}
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label>Overwintering Active Headcount</label>
                  <span className="mono" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                    {simHeadcount} Personnel
                  </span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="60" 
                  value={simHeadcount}
                  onChange={(e) => setSimHeadcount(Number(e.target.value))}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.675rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  <span>10 (Skeleton Crew)</span>
                  <span>60 (Maximum Full Berth)</span>
                </div>
              </div>

              <div style={{
                padding: '10px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-surface-elevated)',
                fontSize: '0.725rem',
                color: 'var(--text-secondary)'
              }}>
                <strong>Predictive Algorithm Formulation:</strong>
                <p style={{ marginTop: '4px', fontSize: '0.7rem' }}>
                  Correlates heating loop delta (Combined Heat & Power genset circuit) against sub-zero convection losses and domestic consumption.
                </p>
              </div>
            </div>
          </div>

          {/* Predictive Model Results */}
          <div className="solid-panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="section-bar">
              <div className="section-bar-title">
                <Flame size={14} style={{ color: 'var(--accent)' }} />
                <h2>Predictive Life-Support Horizon Forecast</h2>
              </div>
              <span className="tag-badge">NCPOR ML ENGINE V3.2</span>
            </div>

            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
              
              {/* Core Output Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div style={{
                  padding: '12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-surface-elevated)'
                }}>
                  <div className="metric-label">DYNAMIC PROJECTED BURN</div>
                  <div className="mono" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
                    {projectedDailyBurn.toLocaleString()} L/DAY
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Base: {baseFuelBurn} L/day (Δ {projectedDailyBurn - baseFuelBurn > 0 ? `+${projectedDailyBurn - baseFuelBurn}` : projectedDailyBurn - baseFuelBurn} L)
                  </div>
                </div>

                <div style={{
                  padding: '12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-surface-elevated)'
                }}>
                  <div className="metric-label">PREDICTED ZERO-FUEL DATE</div>
                  <div className="mono" style={{ fontSize: '1.25rem', fontWeight: 700, color: projectedDaysLeft < 100 ? 'var(--color-warning)' : 'var(--text-primary)', marginTop: '4px' }}>
                    {exhaustionFormatted}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {projectedDaysLeft} Days Autonomy Remaining
                  </div>
                </div>
              </div>

              {/* Progress Meter against 365-day Polar Night Cycle */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Overwintering Autonomy Buffer (14-Month Safe Line)</span>
                  <span className="mono" style={{ fontWeight: 700 }}>
                    {projectedDaysLeft} / 420 Days Target
                  </span>
                </div>
                <div className="meter-container">
                  <div 
                    className={`meter-fill ${projectedDaysLeft < 120 ? 'meter-fill-warning' : 'meter-fill-nominal'}`}
                    style={{ width: `${Math.min(100, (projectedDaysLeft / 420) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Actionable Resupply Advisory */}
              <div style={{
                padding: '12px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-surface-elevated)',
                marginTop: 'auto'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <AlertTriangle size={13} style={{ color: projectedDaysLeft < 120 ? 'var(--color-warning)' : 'var(--color-nominal)' }} />
                  <span style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--text-primary)' }}>
                    Logistics Resupply Directive
                  </span>
                </div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {projectedDaysLeft < 120 
                    ? `Warning: Sub-zero heating load accelerates depletion. 44-ISEA tanker offload at fast-ice shelf is strictly critical before ${exhaustionFormatted}.`
                    : `Nominal: Reserve buffer exceeds mandatory 14-month polar overwintering threshold. No emergency bunkering required.`
                  }
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: MADRID PROTOCOL ENVIRONMENTAL WASTE LEDGER */}
      {activeSubTab === 'madrid' && (
        <div className="solid-panel">
          <div className="section-bar">
            <div className="section-bar-title">
              <FileCheck size={14} style={{ color: 'var(--accent)' }} />
              <h2>Madrid Protocol Environmental Protection Ledger (Annex III)</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="tag-badge">ZERO DISCHARGE MANDATE</span>
              <button className="btn btn-secondary btn-sm" onClick={handleExportMadridCsv}>
                <Download size={12} />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <div className="table-wrapper" style={{ border: 'none', borderRadius: 0 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>MANIFEST ID</th>
                  <th>WASTE CATEGORY & SUBSTANCE</th>
                  <th>GENERATION SOURCE</th>
                  <th>QUANTITY</th>
                  <th>CONTAINMENT & TREATMENT SPECIFICATION</th>
                  <th>COMPLIANCE STATUS</th>
                  <th>AUDITOR</th>
                </tr>
              </thead>
              <tbody>
                {MADRID_PROTOCOL_LEDGER.map((entry) => (
                  <tr key={entry.id}>
                    <td className="mono" style={{ color: 'var(--accent-text)', fontWeight: 600 }}>
                      {entry.id}
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {entry.category}
                    </td>
                    <td style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {entry.source}
                    </td>
                    <td className="mono" style={{ fontWeight: 600 }}>
                      {entry.quantity}
                    </td>
                    <td style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>
                      {entry.treatment}
                    </td>
                    <td>
                      <span className="status-tag status-tag-nominal">
                        {entry.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {entry.auditor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RFID Scanner Modal */}
      {showScanModal && scannedItem && (
        <div className="modal-overlay" onClick={() => setShowScanModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <QrCode size={14} style={{ color: 'var(--accent)' }} />
                <h3>Cold-Chain RFID Telemetry Scan</h3>
              </div>
              <button className="close-btn" onClick={() => setShowScanModal(false)}>
                <X size={15} />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '14px' }}>
                <div style={{ padding: '8px 10px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                  <div className="metric-label">RFID TAG EPC</div>
                  <div className="mono" style={{ fontSize: '0.8125rem', color: 'var(--accent-text)', marginTop: '2px' }}>
                    {scannedItem.rfidTag}
                  </div>
                </div>
                <div style={{ padding: '8px 10px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                  <div className="metric-label">ASSET ID</div>
                  <div className="mono" style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', marginTop: '2px' }}>
                    {scannedItem.id}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <div className="metric-label">ITEM DESCRIPTION</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {scannedItem.name}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '0.75rem', marginBottom: '12px' }}>
                <div><strong>Station:</strong> {scannedItem.station}</div>
                <div><strong>Container:</strong> {scannedItem.container}</div>
                <div><strong>Stock:</strong> {scannedItem.quantity.toLocaleString()} {scannedItem.unit}</div>
                <div><strong>Autonomy:</strong> {scannedItem.daysLeft} Days</div>
              </div>

              <div style={{
                padding: '8px 10px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-surface-elevated)',
                fontSize: '0.725rem'
              }}>
                <strong>Sub-Zero Integrity:</strong> {scannedItem.tempReq}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary btn-sm" onClick={() => setShowScanModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manifest New Cargo Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={14} style={{ color: 'var(--accent)' }} />
                <h3>Manifest Asset into Cold-Chain ERP</h3>
              </div>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleAddCargo}>
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
                  <label>Asset Name / Technical Spec</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Arctic Diesel Cold-Pour -50°C"
                    value={newCargo.name}
                    onChange={(e) => setNewCargo({ ...newCargo, name: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select 
                      value={newCargo.category} 
                      onChange={(e) => setNewCargo({ ...newCargo, category: e.target.value })}
                      className="select-control"
                    >
                      {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Station Allocation</label>
                    <select 
                      value={newCargo.station} 
                      onChange={(e) => setNewCargo({ ...newCargo, station: e.target.value })}
                      className="select-control"
                    >
                      {stations.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Quantity</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 50000"
                      value={newCargo.quantity}
                      onChange={(e) => setNewCargo({ ...newCargo, quantity: e.target.value })}
                      className="form-control mono"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Unit of Measure</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Litres, Packs, Sets"
                      value={newCargo.unit}
                      onChange={(e) => setNewCargo({ ...newCargo, unit: e.target.value })}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Storage Container / Bay</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Tank Farm T-04"
                      value={newCargo.container}
                      onChange={(e) => setNewCargo({ ...newCargo, container: e.target.value })}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label>Calculated Days of Autonomy</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 365"
                      value={newCargo.daysLeft}
                      onChange={(e) => setNewCargo({ ...newCargo, daysLeft: e.target.value })}
                      className="form-control mono"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Commit to ERP Manifest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
