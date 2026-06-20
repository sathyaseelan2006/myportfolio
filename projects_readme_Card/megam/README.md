# MEGAM

A state-of-the-art 3D interactive application for monitoring real-time global air quality, historical trends, and client-side ML forecasting.

---

## 📅 Project Metadata

- **Duration:** 5 Months (November 2, 2025 to March 26, 2026)
- **Development Type:** Solo Project
- **Author:** Sathyaseelan K
- **Role:** Full-Stack Engineer (System Design, UI Development, API Integration, Client-Side ML Pipeline)

---

## 🛠️ Tech Stack

Megam is built as a highly responsive Single Page Application (SPA) using the following technologies:

### Core Framework & Visuals
*   **React 19 (TypeScript):** Modern component framework for UI state orchestration.
*   **Vite:** Core build tool and hot-reload development server.
*   **Three.js & `react-globe.gl`:** WebGL-based rendering engine for the interactive 3D Earth model.
*   **Recharts:** Scalable SVG charting library used for data-rich analytics.
*   **Tailwind CSS:** Glassmorphism-inspired, responsive dark theme styling.

### Machine Learning & AI
*   **TensorFlow.js (`@tensorflow/tfjs` & `@tensorflow/tfjs-vis`):** In-browser training and inference of LSTM neural networks using client-side WebGL acceleration.
*   **Google Gemini API (`@google/genai`):** Configured in environment and exposed via `geminiService.ts` for future LLM-based narrative air quality summaries (*currently provisioned but inactive in the main UI flow*).

### Database & Storage
*   **IndexedDB:** Browser-level database used to cache compiled and trained TensorFlow.js neural network models directly on the client's machine.
*   **LocalStorage:** Browser key-value storage managing recent search histories, locations, visual preferences, and cookie consent preferences.
*   **Supabase (`@supabase/supabase-js`):** Client configurations are defined in `lib/supabaseClient.ts` (*a relational DB comment/reviews feature was implemented in Nov 2025 but completely removed on Dec 25, 2025*).

### Geocoding & APIs
*   **OSM Nominatim:** Free, open-source geocoding and reverse geocoding wrapper.
*   **Environmental Data APIs:** IQAir AirVisual API, OpenAQ API, NASA MODIS (Aerosol Optical Depth), WAQI (aggregator backup), and Open-Meteo (CAMS Air Quality history).
*   **Vercel Serverless Functions:** Serverless proxy layer to securely forward API requests and resolve CORS restrictions.

---

## 🔍 Project Overview

### What it is
Megam is an interactive, data-dense 3D globe application designed to monitor and forecast global air quality. Users can rotate the planet, click on any coordinate, or search for specific cities to extract instant pollutant metrics.

### Why it exists
Air quality tracking tools are heavily dependent on local government monitoring stations. This introduces massive spatial gaps in developing countries, rural regions, and oceanic coastlines. Megam fuses ground-based metrics with satellite models to guarantee global coverage.

### Problem it Solves
It bridges the coverage gap between official metropolitan air monitoring networks and remote areas. Additionally, it offers client-side forecasting models that train in real-time on the user's browser, eliminating the need for expensive server-side training GPU infrastructure.

---

## 🏆 Key Milestones & Achievements

1.  **3D Globe Visualizer Integration (Nov 2025):** Fully interactive 3D globe displaying color-coded pollution vectors, allowing navigation across global latitude/longitude coordinates.
2.  **Waterfall Fallback Data Fusion (Nov 2025):** Designed a robust data collection service querying IQAir, OpenAQ, NASA, and WAQI in sequence, resolving data voids.
3.  **Client-Side Neural Network Training (Nov 2025):** Developed an LSTM model training process using TensorFlow.js running in the client browser, outputting time-series forecasts.
4.  **CORS Proxy Security (Nov 2025):** Built Vercel serverless API routing endpoints `/api/openaq.ts` and `/api/nasa.ts` to prevent raw API keys from being exposed on client HTTP queries.
5.  **Multi-Location Compare Mode (Late 2025):** Built a side-by-side comparison workspace allowing trend normalization (base=100) and measurement filtration for 2-4 areas.
6.  **Hotspot Danger Alerts & Science Hub (Mar 2026):** Finished a localized danger warning component pre-seeded with historical hotspots and an education dashboard linking directly to WHO/IPCC publications.

---

## 👤 Solo Responsibilities

*   **Architecture Design:** Engineered a layered architecture separating components from services and backend cloud proxies.
*   **Database Design:** Set up LocalStorage caching structures for data queries and mapped TF.js models to IndexedDB stores.
*   **Frontend Development:** Coded complex analytical graphs, custom controls, and a custom education panel from scratch using Tailwind CSS.
*   **API & Integration:** Configured proxies for OpenAQ and NASA, integrated geocoding utilities, and structured the Gemini schema format.
*   **Testing & Deployment:** Configured Vite bundlers, completed Vercel configuration files, and fixed scroll performance bugs.

---

## ⚠️ Problem Statement

*   **Data Fragmentation:** Air quality data is spread out across government databases and commercial paywalled interfaces.
*   **Severe Monitoring Gaps:** Ground stations are sparse. Millions of people live in towns that have no local air monitoring sensors.
*   **High Server Infrastructure Costs:** Running neural-network forecasts for thousands of locations requires constant server-side GPU calculations.
*   **User Privacy Encroachment:** Typical environmental utilities require GPS tracking permissions and upload search profiles to remote servers.

---

## 💡 Solution Implemented

Megam provides a React 19 single-page application centered on an interactive WebGL globe. When a coordinate is clicked, it determines the location using reverse geocoding, queries the nearest monitoring devices within a 100km radius, and falls back to NASA satellite data if nothing is found. 

To forecast, the application downloads 180 days of air quality history (fusing OpenAQ ground sensors with Open-Meteo models) and trains a custom LSTM neural network directly in the user's browser via TensorFlow.js.

---

## 🌟 Key Features

### 1. 🌐 3D Interactive Globe
*   **Feature:** Zoomable, draggable 3D globe powered by `react-globe.gl`.
*   **Capability:** Real-time marker generation based on coordinates, displaying local values and data source confidence scores.
*   **Benefit:** Enables an interactive, visual search interface for climate monitoring.

### 2. 🔀 Hybrid Data Fusion Engine
*   **Feature:** Priority-sorted API waterfall fetch algorithm.
*   **Capability:** Attempts IQAir (primary, includes weather data), falls back to OpenAQ (official ground stations), then NASA MODIS satellite data, and finally WAQI.
*   **Benefit:** Guarantees that users receive air quality feedback for any coordinate on Earth.

### 3. 🧠 Browser-native ML Forecasting
*   **Feature:** Client-side LSTM (Long Short-Term Memory) time-series forecasting.
*   **Capability:** Trains a model on the client GPU/CPU using 180 days of historical data and writes weights to IndexedDB.
*   **Benefit:** No subscription or backend API costs for neural network training; preserves the user's search privacy.

### 4. 📈 Advanced Analytics & Comparison Mode
*   **Feature:** Comparative charting interface for up to 4 locations.
*   **Capability:** Normalizes trend charts (Index base=100) and toggles between merged datasets and measured-only ground readings.
*   **Benefit:** Allows researchers to contrast pollution patterns across different global regions on a unified scale.

### 5. 📚 Atmospheric Education & Science Hub
*   **Feature:** Detailed pollutant encyclopedia and research index.
*   **Capability:** Explains PM2.5, PM10, Lead, VOCs, and Carbon Monoxide with direct links to WHO and Copernicus publications.
*   **Benefit:** Translates raw AQI values into actionable medical and environmental safety insights.

---

## 🏗️ System Architecture

The following diagram illustrates Megam's layered data routing structure:

```
                  🖥️ Client Browser (Vite + React 19)
       ┌───────────────────────────┴───────────────────────────┐
       ▼                                                       ▼
 ┌──────────┐                                            ┌──────────┐
 │  3D Globe│ <────────────────────────────────────────> │UI Panels │
 └────┬─────┘                                            └────┬─────┘
      │                                                       │
      ▼                                                       ▼
┌───────────────────────────────────────────────────────────────────┐
│                           Service Layer                           │
│  - satelliteService.ts  - mlModelService.ts  - geocodingService.ts│
└──────┬───────────────────────────┬───────────────────────────┬────┘
       │                           │                           │
       ▼ (Read/Write)              ▼ (Read/Write)              ▼ (API Proxy)
┌──────────────┐            ┌──────────────┐            ┌──────────────┐
│ LocalStorage │            │  IndexedDB   │            │Vercel API    │
│ (Search logs/│            │ (Trained LSTM│            │Proxy         │
│ Preferences) │            │  model binary│            │(CORS Bypass) │
└──────────────┘            └──────────────┘            └──────┬───────┘
                                                               │
                                                               ▼
                                                       ┌──────────────┐
                                                       │ External APIs│
                                                       │ (IQAir, NASA,│
                                                       │ OpenAQ, WAQI)│
                                                       └──────────────┘
```

---

## 🗄️ Database Concepts Applied

### 1. Client-Side Binary Storage (IndexedDB)
Trained TensorFlow.js neural models cannot be stored efficiently in string-based LocalStorage. Megam utilizes IndexedDB (`indexeddb://`) to save model configurations, layers, and trained weight values directly inside the browser.

### 2. Key-Value Session Storage (LocalStorage)
Handles lightweight state persistence including:
*   `favorites`: Saved tracking points.
*   `aqi_history_`: Cached 180-day historical datasets to prevent redundant API queries.
*   `cookie_consent`: Tracking permission settings.

### 3. In-Memory Data Caching
Implements session caching within the service layer. Repeated coordinate lookups retrieve cached data objects, preventing API rate-limiting issues.

### 4. Relational Database Archival Note
The application includes a `supabaseClient.ts` script configuration for a PostgreSQL reviews database. However, this feature was completely archived and removed from the active application codebase on **December 25, 2025** to shift the product to a 100% zero-login, client-driven platform.

---

## 💥 Challenges Faced

### **[CHALLENGE-01] CORS Restrictions on Air Quality APIs**
*   **Problem:** Browsers blocked direct API calls from `localhost` or custom domains to OpenAQ and NASA due to missing Access-Control-Allow-Origin headers.
*   **Solution:** Built Node.js-based serverless proxy endpoints inside `/api/openaq.ts` and `/api/nasa.ts` to append CORS headers and route traffic.

### **[CHALLENGE-02] Data Gaps in Rural & Offshore Locations**
*   **Problem:** The OpenAQ database contains zero monitoring sensors in remote regions and oceans, causing API fetches to fail.
*   **Solution:** Created a fallback geofence system. If a ground sensor is absent within a 100km radius, the application fetches NASA MODIS satellite modeling context and Open-Meteo forecasts.

### **[CHALLENGE-03] Heavy Computational Overhead of Time-Series Training**
*   **Problem:** Training LSTM networks on 180 days of historical data takes significant time. Training on a serverless backend would hit execution limits and cause high computing bills.
*   **Solution:** Ported the ML pipelines entirely to the client browser using TensorFlow.js. The engine trains in background threads, utilizing the user's local hardware (WebGL accelerated) and storing results in IndexedDB.

---

## 📈 Results & Impact

*   **$0 Monthly Server Costs:** The entire platform runs serverless, and ML computations are delegated to client hardware.
*   **True Global Monitoring Coverage:** Real-time satellite fallbacks allow air quality analysis for any point on Earth.
*   **Absolute User Privacy:** No user details or search records are uploaded or stored on central servers.
*   **High-Fidelity Offline Analysis:** Cached LSTM neural models allow predictions to be evaluated even in poor network environments.

---

## 🔮 Future Scope

1.  **Narrative summaries activation:** Integrate and connect `geminiService.ts` to output AI-generated, natural language summaries of local pollutant conditions.
2.  **Offline Progressive Web App (PWA):** Enable service workers to support fully offline location searches and forecast executions.
3.  **Community Warnings Backend:** Re-enable the Supabase integration to build a privacy-first, community-driven warning board.
4.  **Mobile Wrapper:** Package the application via Capacitor to distribute Megam as a native Android and iOS mobile app.

---

## 🔗 Project Links

*   **GitHub Repository:** [github.com/yourusername/megam](https://github.com/yourusername/megam)
*   **NASA POWER API:** [api.nasa.gov](https://api.nasa.gov/)
*   **OpenAQ Documentation:** [docs.openaq.org](https://docs.openaq.org/)
*   **IQAir Platform:** [iqair.com](https://www.iqair.com/)
