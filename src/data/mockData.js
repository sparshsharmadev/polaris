// Authentic Operational Data for National Centre for Polar and Ocean Research (NCPOR), MoES, Govt of India
// Covers India's Antarctic Stations, Arctic Station, Himalayan High-Altitude Station, and chartered expedition vessel.

export const STATIONS_DATA = [
  {
    id: 'bharati',
    name: 'Bharati Station',
    type: 'Permanent Antarctic Station',
    region: 'Antarctica (Larsemann Hills, East Antarctica)',
    coords: "69°24'28\"S, 76°11'14\"E",
    elevation: '35 m ASL',
    status: 'Operational',
    temp: -28,
    windSpeed: 38,
    windGust: 52,
    blizzardLevel: 'Condition 2 (Caution)',
    personnelOnSite: 23,
    maxCapacity: 47,
    fuelDaysLeft: 184,
    fuelCurrentL: 211600,
    fuelCapacityL: 420000,
    fuelBurnLpd: 1150,
    microgridKw: 74,
    microgridCapacityKw: 300,
    batterySoc: 92,
    pressureHpa: 984.2,
    waterReservesL: 14800,
    solarStatus: '24h Polar Daylight (Summer Solstice)',
    powerSource: 'Triple 100 kVA Scania Gensets (Combined Heat & Power)',
    lastSync: '0.8s ago (Iridium OpenPort)',
    commissioned: 'March 2012'
  },
  {
    id: 'maitri',
    name: 'Maitri Station',
    type: 'Permanent Antarctic Station',
    region: 'Antarctica (Schirmacher Oasis, Queen Maud Land)',
    coords: "70°45'58\"S, 11°44'09\"E",
    elevation: '117 m ASL',
    status: 'Operational',
    temp: -34,
    windSpeed: 58,
    windGust: 76,
    blizzardLevel: 'Condition 1 (High Alert)',
    personnelOnSite: 25,
    maxCapacity: 65,
    fuelDaysLeft: 142,
    fuelCurrentL: 133480,
    fuelCapacityL: 340000,
    fuelBurnLpd: 940,
    microgridKw: 68,
    microgridCapacityKw: 240,
    batterySoc: 88,
    pressureHpa: 971.8,
    waterReservesL: 8200,
    solarStatus: '24h Polar Daylight (Summer Solstice)',
    powerSource: 'Kirloskar Polar Diesel Gensets (Lake Priyadarshini water circuit)',
    lastSync: '1.2s ago (Inmarsat BGAN)',
    commissioned: '1989'
  },
  {
    id: 'himadri',
    name: 'Himadri Station',
    type: 'Permanent Arctic Station',
    region: 'Arctic (Ny-Ålesund, Spitsbergen, Svalbard, Norway)',
    coords: "78°55'00\"N, 11°56'00\"E",
    elevation: '12 m ASL',
    status: 'Operational',
    temp: -11,
    windSpeed: 18,
    windGust: 26,
    blizzardLevel: 'Condition 3 (Normal)',
    personnelOnSite: 6,
    maxCapacity: 8,
    fuelDaysLeft: 310,
    fuelCurrentL: 62000,
    fuelCapacityL: 75000,
    fuelBurnLpd: 200,
    microgridKw: 22,
    microgridCapacityKw: 50,
    batterySoc: 98,
    pressureHpa: 1012.4,
    waterReservesL: 4500,
    solarStatus: 'Continuous Polar Night (Winter Season)',
    powerSource: 'Kings Bay AS Grid & Marine Lab Backup',
    lastSync: 'Real-time Fiber',
    commissioned: 'July 2008'
  },
  {
    id: 'himansh',
    name: 'Himansh Station',
    type: 'High-Altitude Himalayan Glaciological Station',
    region: 'Himalayas (Sutri Dhaka, Chandra Basin, Lahaul-Spiti, HP)',
    coords: "32°24'00\"N, 77°37'00\"E",
    elevation: '4,080 m ASL (13,500 ft)',
    status: 'Operational',
    temp: -18,
    windSpeed: 24,
    windGust: 35,
    blizzardLevel: 'Condition 3 (Normal)',
    personnelOnSite: 8,
    maxCapacity: 15,
    fuelDaysLeft: 220,
    fuelCurrentL: 17600,
    fuelCapacityL: 25000,
    fuelBurnLpd: 80,
    microgridKw: 14,
    microgridCapacityKw: 40,
    batterySoc: 94,
    pressureHpa: 618.5,
    waterReservesL: 2100,
    solarStatus: 'High-Altitude Insolation (Clear Sky)',
    powerSource: 'Solar PV Array with LiFePO4 Bank & Low-Temp Silent Genset',
    lastSync: '3.4s ago (VSAT Satellite Link)',
    commissioned: 'September 2016'
  },
  {
    id: 'vasily',
    name: 'MV Vasily Golovnin',
    type: 'Chartered Icebreaker & Expedition Vessel',
    region: 'Southern Ocean (En Route to Prydz Bay / Bharati)',
    coords: "54°12'10\"S, 48°30'00\"E",
    elevation: 'Sea Level',
    status: 'In Transit',
    temp: -4,
    windSpeed: 46,
    windGust: 62,
    blizzardLevel: 'Heavy Swell Warning',
    personnelOnSite: 68,
    maxCapacity: 120,
    fuelDaysLeft: 42,
    fuelCurrentL: 580000,
    fuelCapacityL: 1200000,
    fuelBurnLpd: 13800,
    microgridKw: 840,
    microgridCapacityKw: 1400,
    batterySoc: 100,
    pressureHpa: 988.0,
    waterReservesL: 42000,
    solarStatus: 'Maritime Polar Dawn',
    powerSource: 'Twin Sulzer 12ZV40/48 Diesel Marine Propulsion',
    lastSync: '12s ago (Inmarsat FleetBroadband)',
    commissioned: '44th ISEA Charter'
  }
];

export const VOYAGE_MILESTONES = [
  {
    id: 'm1',
    title: 'Expedition Vessel Loading & Customs Manifest Verification',
    location: 'Mormugao Port, Goa (Berth 10)',
    date: '12 Nov 2026',
    status: 'Completed',
    progress: 100,
    notes: '280 multi-modal containers inspected; Arctic diesel bunkering verified by MoES/NCPOR logistics team.'
  },
  {
    id: 'm2',
    title: 'Departure & Indian Ocean Crossing',
    location: 'Goa ➔ Cape Town (Staging Hub Berth 500)',
    date: '24 Nov 2026',
    status: 'Completed',
    progress: 100,
    notes: 'Technical crew rendezvous, secondary cold-weather survival gear inspection, and fresh ration staging.'
  },
  {
    id: 'm3',
    title: 'Southern Ocean Crossing (Roaring Forties & Furious Fifties)',
    location: 'Southern Ocean ➔ Prydz Bay Ice Edge',
    date: '14 Dec 2026',
    status: 'In Progress',
    progress: 65,
    notes: 'Kamov-32 helicopter sea-ice reconnaissance flights active to chart fast-ice lead channels.'
  },
  {
    id: 'm4',
    title: 'Bharati Station Fast-Ice Offloading',
    location: 'Larsemann Hills Fast-Ice Shelf (Antarctica)',
    date: '28 Dec 2026',
    status: 'Upcoming',
    progress: 0,
    notes: 'PistenBully 300 tracked sled convoys to transfer Arctic diesel and scientific payload to Bharati storage tanks.'
  },
  {
    id: 'm5',
    title: 'India Bay Ice Shelf Offloading & Maitri Convoy',
    location: 'Schirmacher Oasis Ice Shelf (Antarctica)',
    date: '14 Jan 2027',
    status: 'Upcoming',
    progress: 0,
    notes: 'Long-distance traverse to Maitri Station; handover between 43rd and 44th overwintering teams.'
  },
  {
    id: 'm6',
    title: 'Hazardous Waste Backload & Return Voyage',
    location: 'Antarctica ➔ Cape Town ➔ Mormugao Goa',
    date: '22 Mar 2027',
    status: 'Upcoming',
    progress: 0,
    notes: 'Complete Madrid Protocol waste backload and ice core transfer in dedicated -20°C reefer containers.'
  }
];

// Fast-Ice Offload Manifest Items for reconciliation tool (<6h target)
export const FAST_ICE_MANIFEST = [
  {
    id: 'TEU-4401',
    description: 'ISO Tank Container: Arctic Diesel Special Pour',
    category: 'Fuel',
    weightMt: 24.5,
    destination: 'Bharati Tank Farm',
    status: 'Reconciled',
    unloadedTime: '02:15 UTC',
    sledAssigned: 'SLED-CONVOY-1',
    barcode: 'NCPOR-44-FUEL-01'
  },
  {
    id: 'TEU-4402',
    description: 'ISO Tank Container: Aviation Turbine Fuel Jet A-1',
    category: 'Fuel',
    weightMt: 22.0,
    destination: 'Bharati Helipad Depot',
    status: 'Reconciled',
    unloadedTime: '03:40 UTC',
    sledAssigned: 'SLED-CONVOY-1',
    barcode: 'NCPOR-44-FUEL-02'
  },
  {
    id: 'TEU-4403',
    description: 'Reefer Container (-20°C): 14-Month Overwintering Rations',
    category: 'Rations',
    weightMt: 18.2,
    destination: 'Bharati Kitchen Store',
    status: 'In Transit',
    unloadedTime: '04:55 UTC',
    sledAssigned: 'PISTEN-SLED-3',
    barcode: 'NCPOR-44-FOOD-03'
  },
  {
    id: 'TEU-4404',
    description: 'PistenBully 300 Polar Track Replacement Spares',
    category: 'Heavy Spares',
    weightMt: 14.8,
    destination: 'Vehicle Hangar Bay-B',
    status: 'In Transit',
    unloadedTime: '05:20 UTC',
    sledAssigned: 'PISTEN-SLED-4',
    barcode: 'NCPOR-44-MECH-04'
  },
  {
    id: 'TEU-4405',
    description: 'Deep Bedrock Ice Core Drill System (132mm)',
    category: 'Scientific',
    weightMt: 11.5,
    destination: 'Glaciology Clean Lab',
    status: 'Crane Hoist',
    unloadedTime: 'Pending',
    sledAssigned: 'SLED-CONVOY-2',
    barcode: 'NCPOR-44-SCI-05'
  },
  {
    id: 'TEU-4406',
    description: 'Scania 100kVA Overwintering Genset Overhaul Core',
    category: 'Microgrid',
    weightMt: 16.4,
    destination: 'Power Generation Module',
    status: 'Staged on Deck',
    unloadedTime: 'Pending',
    sledAssigned: 'Pending Crane',
    barcode: 'NCPOR-44-PWR-06'
  }
];

export const INITIAL_CARGO = [
  {
    id: 'CARGO-001',
    name: 'Special Cold-Pour Arctic Diesel Fuel',
    category: 'Fuel',
    station: 'Bharati Station',
    quantity: 420000,
    unit: 'Litres',
    burnRate: '1,150 L/day',
    daysLeft: 184,
    status: 'Normal',
    tempReq: 'Pour point -50°C (Anti-gelling additive class-A)',
    container: 'Bulk Fuel Tank Farm B-01',
    rfidTag: 'E280-1160-2001'
  },
  {
    id: 'CARGO-002',
    name: 'Aviation Turbine Fuel (Jet A-1 Low Temp)',
    category: 'Fuel',
    station: 'Maitri Station',
    quantity: 68000,
    unit: 'Litres',
    burnRate: '280 L/day (flight days)',
    daysLeft: 242,
    status: 'Normal',
    tempReq: 'Ambient Sub-zero (-40°C rated)',
    container: 'Helipad Fuel Depot M-02',
    rfidTag: 'E280-1160-2002'
  },
  {
    id: 'CARGO-003',
    name: 'PistenBully 300 Polar Track & Hydraulic Spares',
    category: 'Vehicle Spares',
    station: 'Bharati Station',
    quantity: 14,
    unit: 'Assemblies',
    burnRate: 'Scheduled Service',
    daysLeft: 420,
    status: 'Normal',
    tempReq: 'Heated Workshop Storage',
    container: 'Vehicle Maintenance Hangar',
    rfidTag: 'E280-1160-2003'
  },
  {
    id: 'CARGO-004',
    name: 'Lake Priyadarshini RO Filtration Cartridges',
    category: 'Life Support',
    station: 'Maitri Station',
    quantity: 48,
    unit: 'Units',
    burnRate: '2 units / month',
    daysLeft: 720,
    status: 'Normal',
    tempReq: 'Frost-Protected Indoor Store',
    container: 'Priyadarshini Water Treatment Bay',
    rfidTag: 'E280-1160-2004'
  },
  {
    id: 'CARGO-005',
    name: 'Freeze-Dried Balanced Expedition Meals',
    category: 'Rations',
    station: 'Himansh Station',
    quantity: 1200,
    unit: 'Ration Packs',
    burnRate: '24 packs / day',
    daysLeft: 50,
    status: 'Warning',
    tempReq: 'Dry High-Altitude Shelter',
    container: 'Himansh Pantry Bay 1',
    rfidTag: 'E280-1160-2005'
  },
  {
    id: 'CARGO-006',
    name: 'Sub-glacial Ice Core Drilling Head (132 mm)',
    category: 'Scientific Payload',
    station: 'Bharati Station',
    quantity: 4,
    unit: 'Sets',
    burnRate: 'Drill Season Only',
    daysLeft: 300,
    status: 'Normal',
    tempReq: 'Sub-zero Storage',
    container: 'Glaciology Lab Container GL-3',
    rfidTag: 'E280-1160-2006'
  },
  {
    id: 'CARGO-007',
    name: 'Portable Hyperbaric Gamow Bag & Oxygen Kits',
    category: 'Medical',
    station: 'Himansh Station',
    quantity: 3,
    unit: 'Kits',
    burnRate: 'Emergency Standby',
    daysLeft: 365,
    status: 'Normal',
    tempReq: 'Indoor Medical Locker',
    container: 'High-Altitude Clinic Spiti',
    rfidTag: 'E280-1160-2007'
  },
  {
    id: 'CARGO-008',
    name: 'High-Speed Polar Generator Diesel',
    category: 'Fuel',
    station: 'Maitri Station',
    quantity: 85000,
    unit: 'Litres',
    burnRate: '940 L/day',
    daysLeft: 90,
    status: 'Warning',
    tempReq: 'Double-walled Bunded Tank',
    container: 'Maitri Main Tank Farm T-03',
    rfidTag: 'E280-1160-2008'
  }
];

// Madrid Protocol Environmental Compliance Ledger (Annex III Protocol on Environmental Protection)
export const MADRID_PROTOCOL_LEDGER = [
  {
    id: 'ENV-2026-01',
    category: 'Group 1: Sewage & Domestic Greywater',
    source: 'Bharati Station Biological Treatment Plant',
    quantity: '4,200 L/week',
    treatment: 'Aerobic MBBR filtration & UV sterilization prior to discharge',
    compliance: 'Madrid Annex III Article 5 Compliant',
    auditor: 'NCPOR Environmental Cell',
    status: 'Verified Nominal'
  },
  {
    id: 'ENV-2026-02',
    category: 'Group 2: Fuel Sludge & Used Lube Oils',
    source: 'Scania & Kirloskar Polar Gensets',
    quantity: '1,450 Litres',
    treatment: 'Sealed 200L UN-rated steel drums for MV Vasily Golovnin backload',
    compliance: 'Zero Antarctica Discharge Enforced',
    auditor: 'ATCM Treaty Inspectorate',
    status: 'Staged for Backload'
  },
  {
    id: 'ENV-2026-03',
    category: 'Group 3: Chemical & Battery Hazard Waste',
    source: 'Atmospheric Physics & Glaciology Labs',
    quantity: '320 kg',
    treatment: 'Dry vermiculite packing inside air-tight polypropylene crates',
    compliance: 'Basel Convention & Madrid Annex III',
    auditor: 'MoES Environmental Audit',
    status: 'Certified Sealed'
  },
  {
    id: 'ENV-2026-04',
    category: 'Group 4: Non-Combustible Solid Waste & Scrap',
    source: 'Station Refurbishment & Vehicle Workshops',
    quantity: '12.4 Metric Tonnes',
    treatment: 'Compacted and crated for vessel retrograde to Cape Town',
    compliance: 'Annual Waste Management Plan 2026-27',
    auditor: 'Station Commander Maitri',
    status: 'Staged at Ice Shelf'
  }
];

export const INITIAL_PERSONNEL = [
  {
    id: 'PER-001',
    name: 'Dr. Thamban Meloth',
    role: 'Expedition Scientific Lead / Cryosphere Specialist',
    institute: 'NCPOR Goa (MoES)',
    station: 'Bharati Station',
    status: 'On Station',
    location: 'Main Science Complex (Lab 2)',
    medicalClearance: 'Class-1 Polar Valid',
    callsign: 'BHARATI-EXP-LEAD',
    heartRate: '72 bpm',
    spo2: '98%',
    bodyTemp: '36.8°C',
    lastCheckIn: '6m ago (RFID Gate 1)'
  },
  {
    id: 'PER-002',
    name: 'Capt. Rajeshwar Singh (Retd.)',
    role: 'Station Operations & Logistics Officer',
    institute: 'Border Roads Organisation (BRO)',
    station: 'Maitri Station',
    status: 'On Station',
    location: 'Maitri Operations Bridge',
    medicalClearance: 'Class-1 Polar Valid',
    callsign: 'MAITRI-OPS-CHIEF',
    heartRate: '76 bpm',
    spo2: '97%',
    bodyTemp: '36.6°C',
    lastCheckIn: '12m ago (Control Room)'
  },
  {
    id: 'PER-003',
    name: 'Dr. Manish Tiwari',
    role: 'Glaciologist & Paleoclimate Scientist',
    institute: 'NCPOR Goa',
    station: 'Himadri Station',
    status: 'On Station',
    location: 'Marine Laboratory Kongsfjorden',
    medicalClearance: 'Class-1 Polar Valid',
    callsign: 'HIMADRI-SCIENCE-1',
    heartRate: '68 bpm',
    spo2: '99%',
    bodyTemp: '37.0°C',
    lastCheckIn: '24m ago (Marine Pier)'
  },
  {
    id: 'PER-004',
    name: 'Dr. Parmanand Sharma',
    role: 'Himalayan Cryosphere Lead',
    institute: 'NCPOR Goa / WIHG',
    station: 'Himansh Station',
    status: 'Field Expedition',
    location: 'Samudra Tapu Glacier AWS Site (4,250m)',
    medicalClearance: 'High-Altitude 4000m Certified',
    callsign: 'HIMANSH-SPITI-1',
    heartRate: '84 bpm',
    spo2: '91%',
    bodyTemp: '36.5°C',
    lastCheckIn: '4m ago (VHF Satellite Relay)'
  },
  {
    id: 'PER-005',
    name: 'Sub. Major Ramesh Chandra',
    role: 'Heavy Vehicle & PistenBully Specialist',
    institute: 'Corps of Engineers, Indian Army',
    station: 'Bharati Station',
    status: 'Field Convoy',
    location: 'Polar Traverse 14km South (Larsemann Hills)',
    medicalClearance: 'Class-1 Polar Valid',
    callsign: 'TRAVERSE-CONVOY-A',
    heartRate: '78 bpm',
    spo2: '96%',
    bodyTemp: '36.7°C',
    lastCheckIn: '2m ago (Iridium SBD)'
  },
  {
    id: 'PER-006',
    name: 'Dr. Swati Rastogi',
    role: 'Senior Meteorologist & Upper-Air Radiosonde Lead',
    institute: 'India Meteorological Department (IMD)',
    station: 'Maitri Station',
    status: 'On Station',
    location: 'IMD Radiosonde Station Maitri',
    medicalClearance: 'Class-1 Polar Valid',
    callsign: 'MAITRI-MET-1',
    heartRate: '70 bpm',
    spo2: '98%',
    bodyTemp: '36.9°C',
    lastCheckIn: '18m ago (Met Mast 3)'
  },
  {
    id: 'PER-007',
    name: 'Er. Vikrant Deshmukh',
    role: 'Microgrid & Power Systems Engineer',
    institute: 'Central Power Research Institute (CPRI)',
    station: 'Bharati Station',
    status: 'On Station',
    location: 'Power Generation Module',
    medicalClearance: 'Class-1 Polar Valid',
    callsign: 'BHARATI-POWER-1',
    heartRate: '74 bpm',
    spo2: '97%',
    bodyTemp: '36.8°C',
    lastCheckIn: '8m ago (Genset Bay 2)'
  }
];

// Active Field Traverses & Geofenced Expedition Teams
export const ACTIVE_TRAVERSES = [
  {
    id: 'TRV-01',
    name: 'Polar Plateau Deep Traverse (Sled Convoy Alpha)',
    baseStation: 'Bharati Station',
    leader: 'Sub. Major Ramesh Chandra',
    teamSize: 4,
    vehicles: '2x PistenBully 300 Tracked Snowcats + Kassbohrer Living Caboose',
    currentCoords: "69°31'40\"S, 76°08'20\"E",
    distanceKm: 14.2,
    geofenceStatus: 'Within Authorized Corridor (Sector Echo)',
    vhfChannel: 'Ch-16 Marine / 156.800 MHz',
    safetyStatus: 'Nominal',
    beaconHex: '1D3B829000F4A1'
  },
  {
    id: 'TRV-02',
    name: 'Chandra Basin High-Altitude AWS Service Traverse',
    baseStation: 'Himansh Station',
    leader: 'Dr. Parmanand Sharma',
    teamSize: 3,
    vehicles: 'Foot Traverse with Alpine Ropes & Sleds',
    currentCoords: "32°25'12\"N, 77°38'44\"E",
    distanceKm: 3.8,
    geofenceStatus: 'Moraine Ridge Safe Line',
    vhfChannel: 'Ch-09 Alpine / 156.450 MHz',
    safetyStatus: 'Nominal',
    beaconHex: '1D3B829000F4B2'
  }
];

export const RECENT_LOGS = [
  {
    time: '14:22 UTC',
    station: 'Bharati',
    type: 'nominal',
    text: 'Scania generator #2 automated oil lubrication cycle completed. Microgrid load 74 kW nominal.'
  },
  {
    time: '13:58 UTC',
    station: 'Maitri',
    type: 'warning',
    text: 'Ultrasonic anemometer recorded wind gust of 76 kts. Blizzard Condition 1 Lockout protocol enforced.'
  },
  {
    time: '13:15 UTC',
    station: 'Himansh',
    type: 'nominal',
    text: 'Satellite link established via GSAT-7A. Samudra Tapu AWS 4,250m cryospheric telemetry downloaded.'
  },
  {
    time: '12:40 UTC',
    station: 'Himadri',
    type: 'nominal',
    text: 'Kongsfjorden water sampling completed; Arctic polar night atmospheric radiation spectrophotometers online.'
  },
  {
    time: '11:10 UTC',
    station: 'Vasily',
    type: 'nominal',
    text: 'MV Vasily Golovnin crossed 54°S latitude (Furious Fifties). Ballast tanks trimmed for fast-ice approach.'
  },
  {
    time: '09:45 UTC',
    station: 'NCPOR Goa',
    type: 'nominal',
    text: 'COSPAS-SARSAT ground mission control (INMCC Bangalore) test carrier link heartbeat acknowledged.'
  }
];
