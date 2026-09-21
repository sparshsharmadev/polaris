import React, { useState } from 'react';
import { 
  Crosshair, 
  RefreshCw, 
  MapPin, 
  Wind, 
  Thermometer, 
  Zap, 
  Gauge, 
  Users, 
  ShieldAlert, 
  ArrowRight,
  SunMedium,
  FileText,
  Printer,
  X
} from 'lucide-react';
import { RECENT_LOGS } from '../data/mockData';

export default function StationOverview({ stations, setActiveTab, blizzardLevel }) {
  const [selectedStationId, setSelectedStationId] = useState('bharati');
  const [logFilter, setLogFilter] = useState('All');
  const [showSitrepModal, setShowSitrepModal] = useState(false);

  const selectedStation = stations.find(s => s.id === selectedStationId) || stations[0];

  // Tactical Map Coordinates (Normalized to SVG 1000x520 canvas)
  const mapNodes = [
    {
      id: 'himadri',
      name: 'Himadri Station (Arctic)',
      coordsText: "78°55'N, 11°56'E",
      elevation: '12m ASL',
      temp: '-11°C',
      status: 'NOMINAL',
      x: 510,
      y: 65,
      type: 'base'
    },
    {
      id: 'himansh',
      name: 'Himansh Station (Himalayas)',
      coordsText: "32°24'N, 77°37'E",
      elevation: '4,080m ASL',
      temp: '-18°C',
      status: 'NOMINAL',
      x: 700,
      y: 195,
      type: 'base'
    },
    {
      id: 'goa_hq',
      name: 'NCPOR Goa (HQ Command)',
      coordsText: "15°24'N, 73°48'E",
      elevation: 'Sea Level',
      temp: '+29°C',
      status: 'HQ ACTIVE',
      x: 685,
      y: 255,
      type: 'hq'
    },
    {
      id: 'capetown',
      name: 'Cape Town Staging Berth 500',
      coordsText: "33°55'S, 18°25'E",
      elevation: 'Logistics Staging',
      temp: '+17°C',
      status: 'COMPLETED',
      x: 535,
      y: 350,
      type: 'staging'
    },
    {
      id: 'vasily',
      name: 'MV Vasily Golovnin (Vessel)',
      coordsText: "54°12'S, 48°30'E",
      elevation: 'Southern Ocean',
      temp: '-4°C',
      status: 'EN ROUTE',
      x: 625,
      y: 415,
      type: 'vessel'
    },
    {
      id: 'maitri',
      name: 'Maitri Station (Antarctica)',
      coordsText: "70°45'S, 11°44'E",
      elevation: '117m ASL (Schirmacher)',
      temp: '-34°C',
      status: 'LOCKOUT',
      x: 505,
      y: 470,
      type: 'base'
    },
    {
      id: 'bharati',
      name: 'Bharati Station (Antarctica)',
      coordsText: "69°24'S, 76°11'E",
      elevation: '35m ASL (Larsemann)',
      temp: '-28°C',
      status: 'CAUTION',
      x: 710,
      y: 465,
      type: 'base'
    }
  ];

  const filteredLogs = logFilter === 'All' 
    ? RECENT_LOGS 
    : RECENT_LOGS.filter(l => l.station.toLowerCase().includes(logFilter.toLowerCase()));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 4 Core Mission KPI Strips */}
      <div className="metrics-strip">
        <div className="metric-cell">
          <span className="metric-label">GLOBAL COMMAND NODES</span>
          <span className="metric-value">5 OPERATIONAL</span>
          <span className="metric-note">Antarctica, Arctic, Himalayas & Southern Ocean</span>
        </div>
        <div className="metric-cell">
          <span className="metric-label">DEPLOYED EXPEDITIONERS</span>
          <span className="metric-value">130 ACCOUNTED</span>
          <span className="metric-note">Zero casualty index across all 5 sectors</span>
        </div>
        <div className="metric-cell">
          <span className="metric-label">LIFE-SUPPORT FUEL HORIZON</span>
          <span className="metric-value">142 - 310 DAYS</span>
          <span className="metric-note">Sub-zero reserve threshold verified nominal</span>
        </div>
        <div className="metric-cell">
          <span className="metric-label">EXPEDITION CYCLE DISPATCH</span>
          <span className="metric-value">44th ISEA ACTIVE</span>
          <span className="metric-note">MV Vasily Golovnin approaching fast-ice shelf</span>
        </div>
      </div>

      {/* Main Command Console: Tactical Radar (Left) + Station Telemetry Matrix (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: '16px', alignItems: 'stretch' }}>
        
        {/* LEFT: Tactical Geospatial Operations Theater */}
        <div className="solid-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="section-bar">
            <div className="section-bar-title">
              <Crosshair size={14} style={{ color: 'var(--accent)' }} />
              <h2>NCPOR Cryospheric Operations Theater</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="tag-badge">COSPAS-SARSAT 406MHz</span>
              <span className="mono" style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
                GLOBAL GRID WGS-84
              </span>
            </div>
          </div>

          <div style={{ position: 'relative', flex: 1, minHeight: '440px', backgroundColor: 'var(--map-ocean)' }}>
            <svg 
              viewBox="0 0 1000 520" 
              preserveAspectRatio="xMidYMid meet"
              style={{ width: '100%', height: '100%', display: 'block' }}
            >
              <defs>
                <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border-subtle)" strokeWidth="0.5" />
                </pattern>
              </defs>

              {/* Tactical Reference Grid */}
              <rect width="1000" height="520" fill="url(#gridPattern)" />

              {/* Latitude Reference Markers */}
              <line x1="40" y1="65" x2="960" y2="65" stroke="var(--border-color)" strokeWidth="0.75" strokeDasharray="4 4" />
              <text x="50" y="58" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">78°N ARCTIC (HIMADRI)</text>

              <line x1="40" y1="195" x2="960" y2="195" stroke="var(--border-color)" strokeWidth="0.75" strokeDasharray="4 4" />
              <text x="50" y="188" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">32°N HIMALAYAN GLACIOLOGICAL ZONE (HIMANSH 4,080m)</text>

              <line x1="40" y1="255" x2="960" y2="255" stroke="var(--border-color)" strokeWidth="0.75" strokeDasharray="4 4" />
              <text x="50" y="248" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">15°N NCPOR HEADQUARTERS (GOA)</text>

              <line x1="40" y1="350" x2="960" y2="350" stroke="var(--border-color)" strokeWidth="0.75" strokeDasharray="4 4" />
              <text x="50" y="343" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">34°S CAPE TOWN EXPEDITION BAYS</text>

              <line x1="40" y1="415" x2="960" y2="415" stroke="var(--border-color)" strokeWidth="0.75" strokeDasharray="4 4" />
              <text x="50" y="408" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">54°S ROARING FORTIES TRANSIT CORRIDOR</text>

              <line x1="40" y1="468" x2="960" y2="468" stroke="var(--border-color)" strokeWidth="0.75" strokeDasharray="4 4" />
              <text x="50" y="462" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">70°S ANTARCTIC FAST-ICE SHELF (MAITRI & BHARATI)</text>

              {/* Nautical Route Vectors */}
              {/* Mormugao Goa -> Cape Town */}
              <path 
                d="M 685 255 Q 610 300 535 350" 
                fill="none" 
                stroke="var(--color-nominal)" 
                strokeWidth="1.5" 
                strokeDasharray="4 4" 
              />

              {/* Cape Town -> Southern Ocean Icebreaker */}
              <path 
                d="M 535 350 Q 575 385 625 415" 
                fill="none" 
                stroke="var(--accent)" 
                strokeWidth="2" 
              />

              {/* Vessel -> Fast Ice Offload Shelf (Bharati & Maitri) */}
              <path 
                d="M 625 415 L 710 465" 
                fill="none" 
                stroke="var(--accent)" 
                strokeWidth="1.5" 
                strokeDasharray="3 3" 
              />
              <path 
                d="M 625 415 L 505 470" 
                fill="none" 
                stroke="var(--accent)" 
                strokeWidth="1" 
                strokeDasharray="2 4" 
              />

              {/* Interactive Node Render */}
              {mapNodes.map((node) => {
                const isSelected = selectedStationId === node.id;
                const isBaseOrVessel = ['bharati', 'maitri', 'himadri', 'himansh', 'vasily'].includes(node.id);

                return (
                  <g 
                    key={node.id} 
                    style={{ cursor: isBaseOrVessel ? 'pointer' : 'default' }}
                    onClick={() => {
                      if (isBaseOrVessel) setSelectedStationId(node.id);
                    }}
                  >
                    {/* Pulsing Selection Ring */}
                    {isSelected && (
                      <circle 
                        cx={node.x} 
                        cy={node.y} 
                        r={14} 
                        fill="none" 
                        stroke="var(--accent)" 
                        strokeWidth="1.5" 
                        strokeDasharray="2 2"
                      />
                    )}

                    {/* Concentric Target Crosshair */}
                    <circle 
                      cx={node.x} 
                      cy={node.y} 
                      r={node.type === 'vessel' ? 8 : node.type === 'hq' ? 7 : 5} 
                      fill="var(--bg-surface)" 
                      stroke={
                        node.type === 'vessel' ? 'var(--accent)' :
                        node.type === 'hq' ? 'var(--color-nominal)' :
                        node.status === 'LOCKOUT' ? 'var(--color-critical)' :
                        node.status === 'CAUTION' ? 'var(--color-warning)' :
                        'var(--text-primary)'
                      } 
                      strokeWidth="1.5" 
                    />
                    <circle 
                      cx={node.x} 
                      cy={node.y} 
                      r={2} 
                      fill={isSelected ? 'var(--accent)' : 'var(--text-primary)'} 
                    />

                    {/* Node Text Label */}
                    <text 
                      x={node.x + 10} 
                      y={node.y + 3} 
                      fontFamily="var(--font-mono)"
                      fontSize="10"
                      fontWeight={isSelected ? 700 : 500}
                      fill={isSelected ? 'var(--accent-text)' : 'var(--text-primary)'}
                    >
                      {node.name}
                    </text>
                    <text 
                      x={node.x + 10} 
                      y={node.y + 13} 
                      fontFamily="var(--font-mono)"
                      fontSize="8"
                      fill="var(--text-muted)"
                    >
                      {node.coordsText} • {node.temp}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Tactical HUD Overlay Box */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 12px',
              fontSize: '0.725rem',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>ACTIVE VESSEL: </span>
                <strong style={{ color: 'var(--text-primary)' }}>MV Vasily Golovnin</strong>
              </div>
              <span style={{ color: 'var(--border-strong)' }}>|</span>
              <div className="mono" style={{ color: 'var(--accent-text)' }}>
                SPEED: 13.4 KTS • HEADING: 168° SSE
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Live Station & Vessel Telemetry Matrix */}
        <div className="solid-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="section-bar">
            <div className="section-bar-title">
              <Gauge size={14} style={{ color: 'var(--accent)' }} />
              <h2>Station Telemetry Matrix</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="status-tag status-tag-nominal">LIVE TELEMETRY</span>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => setShowSitrepModal(true)}
                title="Generate official NCPOR Daily Situation Report (SITREP)"
              >
                <FileText size={12} />
                <span>Daily SITREP</span>
              </button>
            </div>
          </div>

          {/* Node Quick Switcher Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-surface-elevated)',
            overflowX: 'auto'
          }}>
            {stations.map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStationId(st.id)}
                style={{
                  flex: 1,
                  padding: '8px 6px',
                  backgroundColor: selectedStationId === st.id ? 'var(--bg-surface)' : 'transparent',
                  border: 'none',
                  borderBottom: selectedStationId === st.id ? '2px solid var(--accent)' : '2px solid transparent',
                  color: selectedStationId === st.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  fontWeight: selectedStationId === st.id ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {st.id.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Detailed Telemetry Content for Selected Node */}
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
            
            {/* Header Identity */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{selectedStation.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    <MapPin size={11} style={{ color: 'var(--accent)' }} />
                    <span>{selectedStation.region}</span>
                  </div>
                </div>
                <span className={`status-tag ${
                  selectedStation.blizzardLevel?.includes('Condition 1') ? 'status-tag-critical' :
                  selectedStation.blizzardLevel?.includes('Condition 2') ? 'status-tag-warning' :
                  'status-tag-nominal'
                }`}>
                  {selectedStation.blizzardLevel || 'OPERATIONAL'}
                </span>
              </div>
              <div className="mono" style={{ fontSize: '0.675rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                COORDS: {selectedStation.coords} • ELEVATION: {selectedStation.elevation}
              </div>
            </div>

            {/* Environmental & Meteorological Readings */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              padding: '10px',
              backgroundColor: 'var(--bg-surface-elevated)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)'
            }}>
              <div>
                <div className="metric-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Thermometer size={10} />
                  <span>TEMP</span>
                </div>
                <div className="mono" style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '2px', color: 'var(--text-primary)' }}>
                  {selectedStation.temp}°C
                </div>
              </div>
              <div>
                <div className="metric-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Wind size={10} />
                  <span>WIND</span>
                </div>
                <div className="mono" style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '2px', color: 'var(--text-primary)' }}>
                  {selectedStation.windSpeed} kts
                </div>
                <div className="mono" style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>
                  GUST {selectedStation.windGust}
                </div>
              </div>
              <div>
                <div className="metric-label">BAROMETER</div>
                <div className="mono" style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '2px', color: 'var(--text-primary)' }}>
                  {selectedStation.pressureHpa || 984.2} hPa
                </div>
              </div>
            </div>

            {/* Microgrid Power Generation & Battery SoC */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
                  <Zap size={11} style={{ color: 'var(--accent)' }} />
                  <span>Microgrid Demand Load</span>
                </span>
                <span className="mono" style={{ fontWeight: 600 }}>
                  {selectedStation.microgridKw || 74} kW / {selectedStation.microgridCapacityKw || 300} kW
                </span>
              </div>
              <div className="meter-container">
                <div 
                  className="meter-fill"
                  style={{ width: `${((selectedStation.microgridKw || 74) / (selectedStation.microgridCapacityKw || 300)) * 100}%` }}
                ></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                <span>{selectedStation.powerSource}</span>
                <span className="mono">BATTERY: {selectedStation.batterySoc || 92}%</span>
              </div>
            </div>

            {/* Life-Support Fuel Reserve & Overwintering Endurance */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Fuel Autonomy Horizon</span>
                <span className="mono" style={{ fontWeight: 700, color: selectedStation.fuelDaysLeft < 100 ? 'var(--color-warning)' : 'var(--text-primary)' }}>
                  {selectedStation.fuelDaysLeft} DAYS REMAINING
                </span>
              </div>
              <div className="meter-container">
                <div 
                  className={`meter-fill ${selectedStation.fuelDaysLeft < 100 ? 'meter-fill-warning' : 'meter-fill-nominal'}`}
                  style={{ width: `${Math.min(100, (selectedStation.fuelDaysLeft / 365) * 100)}%` }}
                ></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                <span className="mono">STOCK: {(selectedStation.fuelCurrentL || 211600).toLocaleString()} L</span>
                <span className="mono">BURN: {selectedStation.fuelBurnLpd || 1150} L/day</span>
              </div>
            </div>

            {/* Overwintering Headcount Berths */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
                  <Users size={11} />
                  <span>Station Headcount Berths</span>
                </span>
                <span className="mono">
                  {selectedStation.personnelOnSite} / {selectedStation.maxCapacity} Allocated
                </span>
              </div>
              <div className="meter-container">
                <div 
                  className="meter-fill"
                  style={{ width: `${(selectedStation.personnelOnSite / selectedStation.maxCapacity) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Daylight / Solar Regime */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 10px',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.7rem',
              color: 'var(--text-secondary)'
            }}>
              <SunMedium size={12} style={{ color: 'var(--accent)' }} />
              <span>{selectedStation.solarStatus || 'Polar Solstice Regime'}</span>
            </div>

            {/* Direct Contextual Navigation Actions */}
            <div style={{ marginTop: 'auto', display: 'flex', gap: '8px', paddingTop: '10px' }}>
              <button 
                className="btn btn-secondary btn-sm" 
                style={{ flex: 1 }}
                onClick={() => setActiveTab('cargo')}
              >
                <span>Cargo ERP</span>
                <ArrowRight size={12} />
              </button>
              <button 
                className="btn btn-secondary btn-sm" 
                style={{ flex: 1 }}
                onClick={() => setActiveTab('personnel')}
              >
                <span>Muster Roll</span>
                <ArrowRight size={12} />
              </button>
              <button 
                className="btn btn-secondary btn-sm" 
                style={{ 
                  flex: 1, 
                  borderColor: selectedStation.blizzardLevel?.includes('Condition 1') ? 'var(--color-critical)' : 'var(--border-color)',
                  color: selectedStation.blizzardLevel?.includes('Condition 1') ? 'var(--color-critical)' : 'var(--text-primary)'
                }}
                onClick={() => setActiveTab('emergency')}
              >
                <ShieldAlert size={12} />
                <span>Hazard Cockpit</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Full-Width Dispatch & Satellite Telemetry Log */}
      <div className="solid-panel">
        <div className="section-bar">
          <div className="section-bar-title">
            <RefreshCw size={13} style={{ color: 'var(--accent)' }} />
            <h3>Polar & High-Altitude Ground Station Dispatch Feed</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>FILTER:</span>
            {['All', 'Bharati', 'Maitri', 'Himansh', 'Himadri', 'Vasily'].map((f) => (
              <button
                key={f}
                onClick={() => setLogFilter(f)}
                className={`chip-filter ${logFilter === f ? 'active' : ''}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: '6px 16px', maxHeight: '180px', overflowY: 'auto' }}>
          {filteredLogs.map((log, idx) => (
            <div 
              key={idx} 
              style={{
                display: 'grid',
                gridTemplateColumns: '75px 85px 1fr',
                gap: '12px',
                alignItems: 'center',
                padding: '6px 0',
                borderBottom: idx === filteredLogs.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                fontSize: '0.78125rem'
              }}
            >
              <span className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                {log.time}
              </span>
              <span className={`status-tag ${
                log.type === 'warning' ? 'status-tag-warning' : 'status-tag-nominal'
              }`}>
                {log.station.toUpperCase()}
              </span>
              <span style={{ color: 'var(--text-primary)' }}>
                {log.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Official Polar Daily Situation Report (SITREP) Modal */}
      {showSitrepModal && (
        <div className="modal-overlay" onClick={() => setShowSitrepModal(false)}>
          <div className="modal-content" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={15} style={{ color: 'var(--accent)' }} />
                <h3>Official Polar Daily Situation Report (SITREP)</h3>
              </div>
              <button className="close-btn" onClick={() => setShowSitrepModal(false)}>
                <X size={15} />
              </button>
            </div>

            <div className="modal-body" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '12px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                  GOVERNMENT OF INDIA • MINISTRY OF EARTH SCIENCES
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>
                  National Centre for Polar and Ocean Research (NCPOR), Headland Sada, Goa
                </div>
                <div style={{ marginTop: '6px', color: 'var(--accent-text)', fontSize: '0.725rem' }}>
                  OPERATIONAL DISPATCH REF: NCPOR/SITREP/{selectedStation.id.toUpperCase()}/{new Date().toISOString().slice(0, 10)}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '12px' }}>
                <div><strong>COMMAND NODE:</strong> {selectedStation.name}</div>
                <div><strong>SECTOR:</strong> {selectedStation.region}</div>
                <div><strong>COORDINATES:</strong> {selectedStation.coords}</div>
                <div><strong>ELEVATION:</strong> {selectedStation.elevation}</div>
                <div><strong>METEOROLOGY:</strong> {selectedStation.temp}°C | Wind {selectedStation.windSpeed} kts (Gust {selectedStation.windGust})</div>
                <div><strong>BLIZZARD LEVEL:</strong> {selectedStation.blizzardLevel || 'Condition 3 (Nominal)'}</div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', marginBottom: '12px' }}>
                <div style={{ fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>1. LIFE-SUPPORT & MICROGRID READINGS</div>
                <div>- Fuel Autonomy Remaining: {selectedStation.fuelDaysLeft} Days (Stock: {(selectedStation.fuelCurrentL || 211600).toLocaleString()} L)</div>
                <div>- Microgrid Demand Load: {selectedStation.microgridKw || 74} kW / {selectedStation.microgridCapacityKw || 300} kW (Battery: {selectedStation.batterySoc || 92}%)</div>
                <div>- Potable Water Reserves: {(selectedStation.waterReservesL || 14800).toLocaleString()} Litres (Thermal tracing online)</div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', marginBottom: '12px' }}>
                <div style={{ fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>2. PERSONNEL ACCOUNTABILITY (100% ACCOUNTED)</div>
                <div>- Overwintering Contingent on Station: {selectedStation.personnelOnSite} Berths</div>
                <div>- Max Station Capacity: {selectedStation.maxCapacity} Berths</div>
                <div>- Health / Casualties Index: 0 Nominal (All personnel Class-1 Polar Certified)</div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                <div style={{ fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>3. COMMAND AUTHENTICATION</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>
                  Transmitted via Iridium/Inmarsat satellite store-and-forward link. Verified Madrid Protocol compliant.
                </div>
                <div style={{ marginTop: '8px', color: 'var(--text-primary)' }}>
                  COMMANDING LOGISTICS OFFICER SIGN-OFF: <strong>[AUTHENTICATED DIGITAL DISPATCH]</strong>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary btn-sm" onClick={() => setShowSitrepModal(false)}>
                Close
              </button>
              <button 
                className="btn btn-primary btn-sm" 
                onClick={() => window.print()}
              >
                <Printer size={13} />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
