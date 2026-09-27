# ❄️ POLARIS — Polar Expedition Operations & Asset Suite

**Smart India Hackathon 2026 · Problem statement SIH26062 · Team Dev React**

> **Prototype status:** This is a hackathon demonstration, not a deployed or commissioned NCPOR system. Station status, telemetry, connectivity loss, and recovery flows use simulated data.

POLARIS explores an offline-first interface for planning polar expeditions and tracking supplies and station operations. I lead the six-person team and work on the app interface, local storage, and project planning.

## What the prototype demonstrates

- Station and mission dashboards for the polar research context
- Expedition supply, asset, and cold-chain inventory views
- Personnel safety and emergency planning screens
- A local transaction outbox stored in IndexedDB, with a simulated replay when connectivity returns

The offline workflow is demonstrated in the browser. It does not connect to real station telemetry or synchronize with operational NCPOR systems.

## Run locally

```bash
npm install
npm run dev
```

To create and preview a production build:

```bash
npm run build
npm run preview
```

## Tech

React 18 · Vite 6 · JavaScript · IndexedDB
