# 🏛️ RE:VIVE
### *Bringing India's Hidden Heritage Back to Life*

[![License: MIT](https://img.shields.io/badge/License-MIT-d4af37.svg?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite)](https://vite.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.9-47A248?style=for-the-badge&logo=mongodb)](https://mongodb.com)
[![Supabase](https://img.shields.io/badge/Supabase-Serverless-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)
[![Gemini](https://img.shields.io/badge/Gemini%20AI-2.5--Flash-f6851f?style=for-the-badge&logo=google-gemini)](https://ai.google.dev)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)

---

## 📅 Project Metadata
* **Duration:** November 2025 – March 2026 (Approx. 4 Months)
* **Status:** Live & Optimized
* **Target Audience:** Culture enthusiasts, history scholars, students, and travelers.

---

## 🛠️ Tech Stack

### Frontend & Client Layer
* **React 18.2 & TypeScript 5.8:** Powering structured components, forms, and strict type definitions.
* **Vite 6.2:** High-performance dev server and build packager.
* **Vanilla CSS3:** Custom-designed dark-gold heritage layout (Cinzel, Cormorant Garamond, and Playfair Display typography).
* **Interactive SVG Map:** Customized vector boundary paths of India with direct DOM manipulations and sessionStorage caching.
* **Web Speech API:** Browser-native Text-to-Speech (TTS) for accessibility and voice narration.
* **Vanilla ES6+ JS:** Custom event management, intersection observers, and performance utilities.

### Backend & Authentication Services
* **Node.js & Express.js 4.18:** REST API backend handling routing, security headers, and AI proxy operations.
* **JWT (jsonwebtoken 9.0):** Signed session tokens with 7-day expiration policies.
* **bcryptjs 2.4:** Secure salted password hashing (10 computation rounds).
* **Helmet 8.1 & CORS 2.8:** Cross-Origin policies and Content-Security-Policy (CSP) injection.

### Databases & Adapters
* **MongoDB 5.9 / Mongoose 8.0:** NoSQL document structures for server-driven environments.
* **Supabase REST API (PostgREST / GoTrue):** Serverless client using direct HTTP request wrappers (no SDK dependency) for auth, user profiles, and recommended sites.

### AI & Storytelling Integration
* **Google Gemini AI (`gemini-2.5-flash`):** Powering the expert chatbot persona (Dr. Thornbury) and bilingually translating narration content (English & Tamil script).

---

## 🏛️ Project Overview
**Re:Vive** is an immersive, intelligent cultural heritage platform designed to breathe digital life into India’s vast history, monuments, and traditions. 

### Why It Exists
Cultural information is often trapped in dense academic papers, dry textbook formats, or static tourism directories. Re:Vive attempts to convert these assets into a vivid, responsive digital museum. It leverages modern web technologies to let users explore monument histories visually, receive recommendations based on their interests, and converse with an AI trained in cultural anthropology.

### What Problem It Solves
1. **Low Engagement:** Replaces walls of text with an interactive map, animated components, and dynamic photo galleries.
2. **Generic Recommendations:** Provides personalized site recommendations based on a user's emotional and thematic interests.
3. **Static Guides:** Offers an active, context-aware AI chatbot on site pages, responding dynamically to architectural or historical questions instead of serving pre-written FAQs.
4. **Accessibility Barriers:** Integrates voice storytelling narrations in multiple languages (English & Tamil) to aid visual learners and travelers.

---

## 🏆 Key Milestone & Achievement
* **Full Geographic Mapping:** All 36 Indian states and Union Territories mapped dynamically with cultural tooltips on hover.
* **Live Heritage Portals:** 21 deep-dive heritage locations live for Tamil Nadu (including Thanjavur, Mahabalipuram, Madurai, Keeladi, Gingee Fort, and Kanyakumari).
* **Dual Backend Integration:** Successfully implemented a dual-mode database adapter, permitting the app to run against local MongoDB servers or a serverless Supabase cloud structure.
* **Extreme Performance:** Implemented a full automation script and lazy loader to achieve smooth 60fps animations and high Lighthouse performance ratings even on low-end hardware.

---

## 👤 Leadership & Responsibilities
As a solo project, I was responsible for the entire lifecycle:
* **System Design:** Conceived the dual-backend architecture, establishing abstract boundaries so the frontend could switch seamlessly between Supabase serverless endpoints and Node/Express services.
* **Database Design:** Created Mongo DB collections and matched their relational architectures inside Supabase database schemas.
* **Frontend Development:** Designed the custom dark heritage UI system using typography, vector SVGs, and responsive CSS. Developed the voice narration player utilizing browser speech systems.
* **Backend Development:** Programmed Express controllers, security middlewares (CSP, Helmet), password validators, and direct API communication layers with the Google Gemini models.
* **Testing & Deployment:** Created PowerShell scripts (`apply-performance-optimizations.ps1`) to automatically configure lazy-loaders and preloads, and managed the production release on Vercel.

---

## ⚠️ Problem Statement
* Traditional heritage sites suffer from low engagement due to static, unengaging layouts.
* Finding historical locations that align with a user's interests (e.g., architectural complexity vs. spiritual historical value) requires extensive manual research.
* AI integrations are often generic, lacking context-specific knowledge about individual monuments and throwing irrelevant responses.
* Embedding audio narrators requires heavy third-party SDK dependencies, causing high load latencies on mobile devices.

---

## 💡 Solution Implemented
* Built a vector-interactive map of India that serves as the entry portal for geographic exploration.
* Engineered a preference scoring engine that sorts locations by matching emotional tags (`romantic`, `spiritual`, `war`, `heroic`, `history`, `architecture`, `nature`, `cultural`) to output ranked recommendations.
* Developed "The Sage" Chatbot interface that injects local site records directly into the Gemini prompt context, ensuring accurate historical responses.
* Programmed a serverless, zero-dependency Supabase connector that carries out authentication and CRUD processes via lightweight HTTP requests.
* Built a performance-monitoring system that disables complex animations on low-power devices and dynamically loads large chatbot files only when clicked.

---

## 🔑 Key Features

### 🔐 Authentication & User Profiles
* **Feature:** Secure signup/login using password hashing and JWT sessions.
* **Capability:** The client securely registers users, hashes passwords at the database level with 10 salt rounds, and verifies sessions.
* **Benefit:** Ensures user preferences, emotional profiles, and recommendation states are persisted and securely isolated.

### 🎯 Cultural Recommendation Engine
* **Feature:** Match-score algorithm based on user interest preferences.
* **Capability:** Maps choices to user profiles (`explorer`, `scholar`, `romantic`, `warrior`, `seeker`), matching them to heritage tags. Scores sites at 20 points per match (capped at 100%).
* **Benefit:** Saves travelers hours of browsing by displaying the top 6 most relevant destinations with a generated matching explanation.

### 🗺️ Interactive India Map
* **Feature:** High-fidelity vector state navigation interface.
* **Capability:** Dynamic mouse hover highlights, custom state-specific tooltip overlays, and sessionStorage caching of the vector markup.
* **Benefit:** Offers a visual exploration portal that runs at 60fps, bypassing network calls on subsequent page loads.

### 🤖 Intelligent Heritage AI ("The Sage")
* **Feature:** Persona-driven context-injected chatbot guide (Dr. Archibald Thornbury).
* **Capability:** Injects current monument specifications (era, builders, measurements) and maintains the last 10 dialog steps in conversation memory.
* **Benefit:** Gives visitors an expert scholarly companion to answer specific questions without religious preaching or promotional bias.

### 🔊 Storytelling Narration Engine
* **Feature:** Spoken voice storyteller generator.
* **Capability:** Summarizes site content into audio-paced narratives and outputs spoken text in English or native Tamil script using browser speech synthesizers.
* **Benefit:** Brings oral historical traditions back to life, assisting visually impaired users and tourists.

---

## 📐 System Architecture

The following diagram illustrates the multi-tier context system, showing how the frontend interacts with either the Express Node server or Supabase:

```
                      ┌─────────────────────────────────┐
                      │          CLIENT LAYER           │
                      │  - React Form Components        │
                      │  - Interactive India SVG Map    │
                      │  - Native Web Speech Engine     │
                      │  - Local / Session Storage      │
                      └────────┬────────────────┬───────┘
                               │                │
          HTTP API Calls / JWT │                │ Direct REST API
                               ▼                ▼
             ┌───────────────────┐            ┌───────────────────┐
             │   EXPRESS SERVER  │            │     SUPABASE      │
             │   - Port 5000     │            │   (PostgREST)     │
             │   - Auth Routes   │            │   - Auth / GoTrue │
             │   - AI Proxy Port │            │   - Profile DB    │
             └─────────┬─────────┘            └─────────┬─────────┘
                       │                                │
          Mongoose ODM │                                │ REST Calls
                       ▼                                ▼
             ┌───────────────────┐            ┌───────────────────┐
             │      MONGODB      │            │   CLOUD TABLES    │
             │ - users           │            │ - user_profiles   │
             │ - heritagesites   │            │ - heritage_sites  │
             └─────────┬─────────┘            └───────────────────┘
                       │
                       │ HTTP Request
                       ▼
             ┌───────────────────┐
             │  GEMINI AI API    │ (Model: gemini-2.5-flash)
             │  - Chat Response  │
             │  - Narrations     │
             └───────────────────┘
```

---

## 🗄️ Database Concepts Applied

### MongoDB Document Schemas & Validation
Implemented Mongoose schemas (`User` and `HeritageSite`) with strict validation rules. Emails are normalized to lowercase and validated with regex, names have minimum lengths, and preferences use specific string arrays (`enum`).

### Indexing
Unique indexes are placed on the `email` field inside the users collection to optimize authentication lookup queries and prevent duplicate accounts under load.

### Data Security & Integrity
* Passwords are encrypted before database insertion using a Mongoose pre-save hook running `bcrypt.hash()`.
* Schema methods (`toJSON()`) are customized to automatically delete password values before JSON serialization, preventing credentials from leaking in network calls.
* Security layers on Supabase implement database checks to secure profile records.

### REST-Based Serverless Architecture
To prevent importing massive cloud SDK packages, the client communicates directly with PostgREST endpoints using lightweight wrappers. It generates CRUD requests to `user_profiles`, `heritage_sites`, and `recommended_sites` using browser `fetch`.

---

## 🛠️ Challenges Faced

### [CHALLENGE-01] Vite Bundler Asset Scoping
* **Problem:** Vite skips compiling script files that are not explicitly imported as modules (such as local page scripts and chatbot code). This left files out of the production build and failed to swap process variables (like `process.env.GEMINI_API_KEY`) in client scripts.
* **Solution:** Created a custom Vite compiler plugin (`copyNonModuleScripts`) that runs post-bundling. It recursively traverses script folders, injects API variables, and writes files directly into the production `dist` directory.

### [CHALLENGE-02] Eliminating Supabase SDK Bloat
* **Problem:** Standard imports of `@supabase/supabase-js` added significant weight to the client bundle size, decreasing load speeds on slower networks.
* **Solution:** Developed a custom, lightweight class `SupabaseClient` in vanilla JS. It handles user authentication, session restoration, profile updates, and recommendations using raw browser `fetch` calls to the REST endpoints `/auth/v1` and `/rest/v1`.

### [CHALLENGE-03] India SVG Map Rendering Performance
* **Problem:** Parsing and rendering the complex paths of the India SVG map on every landing page visit caused visual lag and layout reflows.
* **Solution:** Programmed an SVG caching loader. The client fetches the SVG file once, saves the text markup inside `sessionStorage`, and retrieves it instantly on future visits. Added throttled listeners (`16ms` intervals) to render tooltips without layout jank.

### [CHALLENGE-04] Chatbot File Load Lag
* **Problem:** Loading the large chatbot scripts (`improved-chatbot.js` and configurations) on load delayed first contentful paint (FCP) times on monument detail pages.
* **Solution:** Programmed `chatbot-lazy-loader.js`. The script registers a single event listener on the chatbot bubble icon. The main chatbot script and API modules are downloaded and mounted dynamically only when the user clicks the bubble.

---

## 📈 Results & Impact
* **Unified Cultural Hub:** Integrates visual, textual, audio, and interactive chat tools in one interface.
* **Highly Optimized Performance:** Achieved 60fps animations and lower page weight by applying script deferral, image lazy loading, and hardware-concurrency checking.
* **Dynamic Deployment:** The app is configured to scale easily, serving as either a local server project or a serverless cloud instance.

---

## 🔮 Future Scope
1. **AI Semantic Search:** Transition from static keyword tagging to vector embeddings, letting users search for locations using natural questions (e.g. *"temples built near water during the Chola era"*).
2. **Collaborative Workspaces:** Enable user-shared itinerary planners and culture journals.
3. **Cloud Synchronization:** Link the Express backend to cloud sync channels, enabling instant profile updates between the server and serverless database pools.
4. **Mobile Application:** Compile the optimized HTML5 codebase into native mobile containers (like Capacitor/Cordova) for offline tourism usage.

---

## 🔗 Project Links
* **Live Demo:** [Re:Vive Heritage Explorer (Vercel)](https://revive-cultural-platform.vercel.app)
* **GitHub Repository:** [sathyaseelan2006/Re-Vive](https://github.com/sathyaseelan2006/Re-Vive)
* **API Documentation:** `/api/health` Status Endpoint
