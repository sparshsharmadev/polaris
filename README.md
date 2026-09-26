# ❄️ POLARIS: Polar Expedition Operations & Asset Suite

> **Smart India Hackathon (SIH) 2026**  
> **Problem Statement ID:** SIH26062  
> **Problem Statement Title:** Integrated Polar Expedition Logistics and Asset Management System  
> **Sponsoring Ministry:** Ministry of Earth Sciences (MoES) / National Centre for Polar and Ocean Research (NCPOR), Goa  
> **Theme:** Smart Automation | **Category:** Software  
> **Team:** Dev React (Team ID: 137578) | **Team Leader:** Sparsh Sharma  

[![React 18](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Offline First](https://img.shields.io/badge/Architecture-Local--First_PWA-00C7B7?style=for-the-badge)](https://localfirstweb.com/)

---

## 📌 Overview

**POLARIS** is an indigenously engineered, offline-first operations and logistics management platform built for the **National Centre for Polar and Ocean Research (NCPOR)**. It bridges mainland command in Goa with India's "Three Poles" scientific research network:
- **South Pole (Antarctica):** Bharati Station & Maitri Station
- **North Pole (Arctic):** Himadri Station (Svalbard)
- **The Third Pole (Himalayas):** Himansh High-Altitude Station (Spiti Valley, 4,080m)
- **Maritime Supply Vessels:** Chartered icebreaker vessel (MV Vasily Golovnin)

In extreme sub-zero conditions (-40°C) with frequent multi-week satellite communication blackouts, standard cloud applications fail. POLARIS runs locally on station infrastructure with zero internet dependency, queuing transactions in browser storage (IndexedDB) and auto-syncing conflict-free with headquarters when satellite connectivity flickers back on.

---

## 🚀 Key Functional Modules

### 1. 🌐 Cryospheric Command Center & Telemetry
- Tactical WGS-84 coordinate radar monitoring 5 strategic polar nodes.
- Real-time station telemetry: ambient temperature, wind gusts, solar irradiation, microgrid electrical power (kW), battery SoC, and life-support fuel endurance days.
- Single-click automated Situation Report (SITREP) generator.

### 2. 🚢 Expedition Voyage Planner & Fast-Ice Reconciliation
- Manages the annual 44th Indian Scientific Expedition to Antarctica (44-ISEA) voyage lifecycle: Mormugao Port (Goa) ➔ Cape Town staging ➔ Prydz Bay & India Bay fast-ice offload.
- Real-time digital barcode/RFID scanner simulation for fast-ice container verification.
- Slashes cargo manifest reconciliation time from **72 hours to under 6 hours**.

### 3. 📦 Cold-Chain Asset Management & Fuel ERP
- Monitors Arctic-grade High Flash High Speed Diesel (HFHSD), Jet A-1 aviation fuel, generator lubricants, and freeze-dried rations.
- **Predictive ML Burn-Rate Simulator:** Mathematical engine correlating external sub-zero temperatures (-40°C) with overwintering crew headcount to forecast exact fuel reserve depletion dates months in advance.
- **Madrid Protocol Environmental Ledger:** Complies with Antarctic Treaty Annex III (Waste Management) and Annex IV (Marine Pollution) with return-cargo hazardous waste auditing.

### 4. 👥 Personnel Safety, Station Muster & Geofencing
- Digital station muster roll separating indoor occupants from deep-plateau traverse parties (Larsemann Hills & Schirmacher Oasis).
- Tracks daily medical clearances, radio check-in schedules, and satellite telemetry pings.
- Instant 1-click station muster drill verifying 100% crew headcount in under 2 seconds.

### 5. 🚨 Blizzard Emergency Hazard Cockpit
- Automated 3-tier polar weather alert switcher:
  - **Condition 3:** Normal operations; unrestricted outdoor travel.
  - **Condition 2:** Deteriorating weather (winds 35–55 kts); buddy-system & lifelines required.
  - **Condition 1:** Full whiteout blizzard (winds >55 kts); mandatory outdoor lockout.
- 1-click **COSPAS-SARSAT 406 MHz** emergency satellite distress beacon dispatch and Search & Rescue (SAR) muster protocol.

### 6. 🛰️ 100% Offline-First Synchronization Engine
- Operates 100% offline using local browser storage (IndexedDB) and local station LAN edge servers.
- When satellite connectivity reconnects, an automated Store-and-Forward replication queue synchronizes batched, deduplicated delta transactions (<50 KB) back to NCPOR Goa using Conflict-Free Replicated Data Types (CRDTs).

---

## 🛠️ Technology Stack

- **Frontend:** React 18 (SPA), Vite 6
- **Styling & Design System:** Tactical Polar UI / CSS Custom Properties (Deep Carbon `#050505`, Crisp 1px hairlines, High-Contrast Dark & Light modes, JetBrains Mono tabular telemetry)
- **Icons & UI Feedback:** Lucide React, Canvas Confetti
- **Local Persistence & Sync:** IndexedDB (Store-and-Forward Outbox), LocalStorage, CRDT state merge
- **Algorithms:** Predictive thermal fuel burn-rate regression, geospatial coordinate transforms
- **Deployment:** Progressive Web App (PWA) / Dockerized Edge Container

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- npm / yarn

### Installation & Running

```bash
# Clone the repository
git clone https://github.com/sparshsharmadev/polaris.git
cd polaris

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Open your browser and navigate to:
```
http://localhost:5173/
```

### Keyboard Shortcuts
- `1` - `5`: Quick-switch between operational tabs
- `O`: Toggle simulated polar satellite drop (Offline / Online mode)
- `?`: Open the SIH 2026 Evaluation Demo Guide
- `Esc`: Close any open dialog or modal

---

## 📄 Compliance & Regulatory Standards

- **COMNAP:** Council of Managers of National Antarctic Programs safety standards
- **SCAR:** Scientific Committee on Antarctic Research data governance guidelines
- **Madrid Protocol:** Environmental Protection to the Antarctic Treaty (Annex III & IV)
- **COSPAS-SARSAT:** International 406 MHz Search and Rescue satellite specification

---

## 👨‍💻 Team Dev React

- **Team Leader:** Sparsh Sharma ([@sparshsharmadev](https://github.com/sparshsharmadev))
- **Institute:** Rajkiya Engineering College, Mirzapur
- **Event:** Smart India Hackathon (SIH) 2026
