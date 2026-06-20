# 🤖 L.U.D.O (Learning & Utility Digital Operator)

An AI-Powered Personal Voice Assistant with a retro-futuristic Cyberpunk/Jarvis HUD GUI and Progressive Web App interface.

---

## 📅 Project Metadata

### Duration
* **1 Week** (Intensive Development Sprint: Jan 11, 2026 – Jan 18, 2026)

### System Tech Stack
* **Desktop Client Engine:** Python 3.10+
* **Desktop UI Render:** Pygame 2.6.1 (Vector drawing, text wrapping, and event handling)
* **Gestures & Computer Vision:** MediaPipe 0.10.31 & OpenCV-Python 4.12.0 (Fist tracking, hand landmarks, coordinate scaling)
* **Speech Processing & TTS:** SpeechRecognition 3.14.5, Piper-TTS 1.3.0 (VITS Neural offline speech synthesis), PyAudio 0.2.14, and pyttsx3 2.99
* **AI Cognitive Layer:** Google GenAI SDK (gemini-2.5-flash / gemini-2.0-flash-exp)
* **Web Scraping & Searches:** requests 2.32.5, bs4 4.14.3 (BeautifulSoup4 for DuckDuckGo HTML scraping), and urllib3
* **Web Server & Routing:** Node.js, Express.js 4.18.2, cors 2.8.5, axios 1.6.2, and cheerio 1.0.0-rc.12
* **Web Client:** Vanilla HTML5, Responsive Modern CSS, Service Workers (PWA offline caching)
* **Web Client Datastore:** IndexedDB (NoSQL transactional client-side storage) and LocalStorage

---

## 🔭 Project Overview

### What it is
L.U.D.O is a multi-modal personal desktop companion featuring a heads-up display (HUD) inspired by sci-fi aesthetics, coupled with an installable Progressive Web Application (PWA). It provides conversational voice capability, gesture tracking, environment statistics, custom calendar tools, and automated system commands.

### Why it exists
It was created as a lightweight utility dashboard to automate PC workflows and keep developer context in one place without constant browser context-switching. It also serves as a secure, private assistant that operates locally without relying on expensive SaaS automation webhooks.

### What problem it solves
Commercial AI assistants (Siri, Cortana, Alexa) fail to provide granular terminal and workspace execution controls on Windows developer setups. In addition, constant queries to cloud speech-to-text and text-to-speech APIs generate latency and escalate costs. L.U.D.O offers a localized, offline-first voice and gesture pipeline that saves token costs through context window summarization while granting real system controls.

---

## 🏆 Key Milestones & Achievements
* **Dual-Interface Sync:** Synchronized offline state caching using local IndexedDB instances on the web with flat-file JSON databases in the Python desktop app.
* **Camera Gesture Dragging:** Integrated real-time hand-landmarks classification using MediaPipe to recognize closed-fist grab gestures and drag the HUD window across the desktop workspace.
* **CPU Neural TTS:** Configured offline VITS speech synthesis using Piper ONNX models, enabling natural speech responses locally on the CPU in under 1 second.
* **~50% Token Reduction:** Implemented a sliding conversation history window combined with a custom character-ratio token counter to auto-summarize old exchanges, keeping active context under 2,000 tokens.
* **MEGAMO Environmental API integration:** Integrated real-time air quality metrics fetched directly from the MEGAMO API service, presenting live health alerts inside the HUD panel.

---

## 👤 Leadership & Responsibilities
* **Solo Project (System Design, Database Design, Frontend Development, Backend Development, Testing & Deployment):**
  * **System Design:** Engineered the dual-modality architecture separating Pygame rendering execution from the Web/PWA stack, communicating with a central configuration file.
  * **Database Design:** Created IndexedDB storage tables (`conversations`, `events`, `notes`, `projects`, `pending`) with query indexing in JavaScript, and wrote atomic serialization utilities for local `.json` configurations in Python.
  * **Frontend Development:** Programmed the vector clock, waveform visualization, task calendar grid, and drag-and-drop frames within a resizable Pygame window. Designed the CSS Grid PWA dashboard with futuristic dark themes.
  * **Backend Development:** Wrote the Express routing server to handle CORS-safe API calls, DuckDuckGo search results scrubbing, and static asset streaming.
  * **Testing & Deployment:** Created silent deployment scripts (`Start_LUDO_Silent.bat`) and system environment templates for Windows 10/11 startup optimization.

---

## ⚠️ Problem Statement
* Commercial voice applications rely on persistent cloud telemetry; if internet access drops, voice assistant features break down entirely.
* Repeatedly feeding long developer logs and code history to AI models leads to ballooning token costs and prompt truncation.
* Existing desktop assistants cannot trigger local system actions (e.g. launching VS Code, controlling system master volumes, opening custom local directories).
* Developers suffer from tool fragmentation, checking calendars, notes, project progress, air pollution levels, and to-do lists in five separate windows.

---

## 🛠️ Solution Implemented
* Built **L.U.D.O (Learning & Utility Digital Operator)**. L.U.D.O combines Pygame, MediaPipe hand tracking, and local VITS voice models to deliver a local desktop assistant. By utilizing the Google GenAI SDK, it queries Gemini 2.5 Flash for context and executes local PowerShell and Shell commands to control the host system while preserving and tracking state.

---

## ⚙️ Key Features

### // VOICE ASSISTANT & TTS
* **Feature:** Offline-First Neural TTS & Speech-to-Text.
* **Capability:** Listens via microphone utilizing dynamic noise adaptation and processes queries locally. Generates voices using a Piper ONNX engine (`en_US-lessac-medium`), falling back to Windows SAPI5 (`pyttsx3`) if ONNX files are missing.
* **Benefit:** Ensures fast verbal interaction with less than 1-second vocalization latency and zero cloud voice fees.

### // GESTURE & GUI CONTROL
* **Feature:** Camera-driven Gestural Drag & Drop.
* **Capability:** Captures webcam frames to run hand landmark tracking. Recognizes closed-fist states (grab) and maps coordinates relative to the screen to reposition the Pygame window dynamically.
* **Benefit:** Provides a hands-free Cyberpunk dashboard experience that integrates mouse-free window manipulation.

### // CONTEXT & MEMORY OPTIMIZATION
* **Feature:** Token-Budget context trimmer and auto-summarizer.
* **Capability:** Estimates conversation tokens using character limits. Enforces a strict 2,000 token budget. Preserves the 10 most recent messages in high-fidelity and compresses historical records into a single summary block.
* **Benefit:** Reduces Gemini API costs by ~50% and prevents conversation truncation during long sessions.

### // SYSTEM AUTOMATION
* **Feature:** Voice-Activated OS Command Parser.
* **Capability:** Parses regex intents to adjust system audio volume, search YouTube or Google, open the file explorer, and launch registered applications (VS Code, Spotify, Discord, Chrome, etc.).
* **Benefit:** Streamlines daily workspace commands, replacing desktop navigation with simple spoken phrases.

### // PRODUCTIVITY SUITE
* **Feature:** Connected Calendar, Notepad, and environmental AQI monitor.
* **Capability:** Maintains deadlines, logs system command notes (e.g., "Note this: ..."), parses natural language dates ("tomorrow", "next monday"), and fetches real-time air pollution data from MEGAMO.
* **Benefit:** Consolidates calendar events, system automation logs, tasks, and environment safety statuses in one visual HUD.

---

## 📐 System Architecture

Below is the layout of how the data flows from input actions down to the storage and cognitive backends:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" width="100%">
  <!-- Background -->
  <rect width="900" height="500" rx="15" fill="#0d1117" stroke="#30363d" stroke-width="2"/>
  
  <!-- Grid Lines -->
  <path d="M 0,100 L 900,100 M 0,200 L 900,200 M 0,300 L 900,300 M 0,400 L 900,400" stroke="#161b22" stroke-width="1" />
  <path d="M 150,0 L 150,500 M 300,0 L 300,500 M 450,0 L 450,500 M 600,0 L 600,500 M 750,0 L 750,500" stroke="#161b22" stroke-width="1" />

  <!-- Headers -->
  <text x="450" y="40" font-family="'Segoe UI', Roboto, Helvetica, sans-serif" font-size="22" font-weight="bold" fill="#00ffff" text-anchor="middle">L.U.D.O SYSTEM ARCHITECTURE</text>
  <text x="450" y="60" font-family="'Segoe UI', Roboto, Helvetica, sans-serif" font-size="12" fill="#8b949e" text-anchor="middle">Dual-client Desktop HUD &amp; PWA Interface</text>

  <!-- Left: Inputs -->
  <g transform="translate(40, 100)">
    <rect width="180" height="340" rx="10" fill="#161b22" stroke="#30363d" stroke-width="2"/>
    <text x="90" y="30" font-family="'Segoe UI', Helvetica" font-size="14" font-weight="bold" fill="#ff7b72" text-anchor="middle">INPUT MODALITIES</text>
    
    <!-- Voice input -->
    <rect x="15" y="60" width="150" height="60" rx="6" fill="#21262d" stroke="#00ffff" stroke-width="1"/>
    <text x="90" y="85" font-family="'Segoe UI', Helvetica" font-size="12" fill="#c9d1d9" text-anchor="middle" font-weight="bold">Voice Input</text>
    <text x="90" y="102" font-family="'Segoe UI', Helvetica" font-size="10" fill="#8b949e" text-anchor="middle">SpeechRecognition</text>

    <!-- Text input -->
    <rect x="15" y="140" width="150" height="60" rx="6" fill="#21262d" stroke="#00ffff" stroke-width="1"/>
    <text x="90" y="165" font-family="'Segoe UI', Helvetica" font-size="12" fill="#c9d1d9" text-anchor="middle" font-weight="bold">Keyboard Text</text>
    <text x="90" y="182" font-family="'Segoe UI', Helvetica" font-size="10" fill="#8b949e" text-anchor="middle">Pygame &amp; HTML Form</text>

    <!-- Hand Gestures -->
    <rect x="15" y="220" width="150" height="60" rx="6" fill="#21262d" stroke="#ff7b72" stroke-width="1"/>
    <text x="90" y="245" font-family="'Segoe UI', Helvetica" font-size="12" fill="#c9d1d9" text-anchor="middle" font-weight="bold">Hand Gestures</text>
    <text x="90" y="262" font-family="'Segoe UI', Helvetica" font-size="10" fill="#8b949e" text-anchor="middle">OpenCV / MediaPipe</text>
  </g>

  <!-- Middle: Clients -->
  <!-- Python Desktop HUD Client -->
  <g transform="translate(280, 100)">
    <rect width="200" height="150" rx="10" fill="#161b22" stroke="#00ffff" stroke-width="2"/>
    <text x="100" y="25" font-family="'Segoe UI', Helvetica" font-size="13" font-weight="bold" fill="#00ffff" text-anchor="middle">DESKTOP HUD (Python)</text>
    
    <rect x="15" y="45" width="170" height="35" rx="4" fill="#21262d" stroke="#30363d" stroke-width="1"/>
    <text x="100" y="67" font-family="'Segoe UI', Helvetica" font-size="11" fill="#c9d1d9" text-anchor="middle">Pygame Render Loop</text>
    
    <rect x="15" y="95" width="170" height="40" rx="4" fill="#21262d" stroke="#30363d" stroke-width="1"/>
    <text x="100" y="113" font-family="'Segoe UI', Helvetica" font-size="10" fill="#c9d1d9" text-anchor="middle">Local Engines (VITS TTS,</text>
    <text x="100" y="127" font-family="'Segoe UI', Helvetica" font-size="10" fill="#c9d1d9" text-anchor="middle">Calendar, command_parser)</text>
  </g>

  <!-- PWA & Node.js Client -->
  <g transform="translate(280, 290)">
    <rect width="200" height="150" rx="10" fill="#161b22" stroke="#00ffff" stroke-width="2"/>
    <text x="100" y="25" font-family="'Segoe UI', Helvetica" font-size="13" font-weight="bold" fill="#00ffff" text-anchor="middle">PWA CLIENT &amp; SERVER</text>
    
    <rect x="15" y="45" width="170" height="35" rx="4" fill="#21262d" stroke="#30363d" stroke-width="1"/>
    <text x="100" y="67" font-family="'Segoe UI', Helvetica" font-size="11" fill="#c9d1d9" text-anchor="middle">HTML/JS PWA (Client)</text>
    
    <rect x="15" y="95" width="170" height="40" rx="4" fill="#21262d" stroke="#30363d" stroke-width="1"/>
    <text x="100" y="113" font-family="'Segoe UI', Helvetica" font-size="10" fill="#c9d1d9" text-anchor="middle">Express.js Server (Node.js)</text>
    <text x="100" y="127" font-family="'Segoe UI', Helvetica" font-size="10" fill="#8b949e" text-anchor="middle">Secure routing / Scraping</text>
  </g>

  <!-- Right: Datastores & APIs -->
  <!-- Storage -->
  <g transform="translate(540, 100)">
    <rect width="140" height="340" rx="10" fill="#161b22" stroke="#30363d" stroke-width="2"/>
    <text x="70" y="25" font-family="'Segoe UI', Helvetica" font-size="12" font-weight="bold" fill="#39d353" text-anchor="middle">STORAGE LAYER</text>
    
    <rect x="10" y="45" width="120" height="120" rx="6" fill="#21262d" stroke="#30363d" stroke-width="1"/>
    <text x="70" y="70" font-family="'Segoe UI', Helvetica" font-size="11" fill="#c9d1d9" text-anchor="middle" font-weight="bold">Flat Files</text>
    <text x="70" y="90" font-family="'Segoe UI', Helvetica" font-size="9" fill="#8b949e" text-anchor="middle">.ludo_memory.json</text>
    <text x="70" y="110" font-family="'Segoe UI', Helvetica" font-size="9" fill="#8b949e" text-anchor="middle">.ludo_events.json</text>
    <text x="70" y="130" font-family="'Segoe UI', Helvetica" font-size="9" fill="#8b949e" text-anchor="middle">.ludo_projects.json</text>
    <text x="70" y="150" font-family="'Segoe UI', Helvetica" font-size="9" fill="#8b949e" text-anchor="middle">.todo.txt</text>

    <rect x="10" y="195" width="120" height="120" rx="6" fill="#21262d" stroke="#39d353" stroke-width="1"/>
    <text x="70" y="220" font-family="'Segoe UI', Helvetica" font-size="11" fill="#c9d1d9" text-anchor="middle" font-weight="bold">IndexedDB</text>
    <text x="70" y="240" font-family="'Segoe UI', Helvetica" font-size="9" fill="#8b949e" text-anchor="middle">conversations store</text>
    <text x="70" y="260" font-family="'Segoe UI', Helvetica" font-size="9" fill="#8b949e" text-anchor="middle">events store</text>
    <text x="70" y="280" font-family="'Segoe UI', Helvetica" font-size="9" fill="#8b949e" text-anchor="middle">notes store</text>
    <text x="70" y="300" font-family="'Segoe UI', Helvetica" font-size="9" fill="#8b949e" text-anchor="middle">pending (sync queue)</text>
  </g>

  <!-- Far Right: Services -->
  <g transform="translate(730, 100)">
    <rect width="140" height="340" rx="10" fill="#161b22" stroke="#30363d" stroke-width="2"/>
    <text x="70" y="25" font-family="'Segoe UI', Helvetica" font-size="12" font-weight="bold" fill="#ff7b72" text-anchor="middle">EXTERNAL APIs</text>
    
    <rect x="10" y="45" width="120" height="60" rx="6" fill="#21262d" stroke="#ff7b72" stroke-width="1"/>
    <text x="70" y="70" font-family="'Segoe UI', Helvetica" font-size="11" fill="#c9d1d9" text-anchor="middle" font-weight="bold">Gemini 2.5 / 2.0</text>
    <text x="70" y="88" font-family="'Segoe UI', Helvetica" font-size="9" fill="#8b949e" text-anchor="middle">Google AI Studio</text>

    <rect x="10" y="145" width="120" height="60" rx="6" fill="#21262d" stroke="#ff7b72" stroke-width="1"/>
    <text x="70" y="170" font-family="'Segoe UI', Helvetica" font-size="11" fill="#c9d1d9" text-anchor="middle" font-weight="bold">MEGAMO API</text>
    <text x="70" y="188" font-family="'Segoe UI', Helvetica" font-size="9" fill="#8b949e" text-anchor="middle">Air Quality Data</text>

    <rect x="10" y="245" width="120" height="60" rx="6" fill="#21262d" stroke="#ff7b72" stroke-width="1"/>
    <text x="70" y="270" font-family="'Segoe UI', Helvetica" font-size="11" fill="#c9d1d9" text-anchor="middle" font-weight="bold">DuckDuckGo</text>
    <text x="70" y="288" font-family="'Segoe UI', Helvetica" font-size="9" fill="#8b949e" text-anchor="middle">Cheerio Scraping</text>
  </g>

  <!-- Connectors -->
  <!-- Inputs to Clients -->
  <line x1="220" y1="175" x2="280" y2="175" stroke="#00ffff" stroke-width="1.5" stroke-dasharray="3,3"/>
  <line x1="220" y1="365" x2="280" y2="365" stroke="#00ffff" stroke-width="1.5" stroke-dasharray="3,3"/>
  <line x1="220" y1="270" x2="250" y2="270" stroke="#00ffff" stroke-width="1.5"/>
  <line x1="250" y1="175" x2="250" y2="365" stroke="#00ffff" stroke-width="1.5"/>
  
  <!-- Clients to Storage -->
  <path d="M 480,175 L 510,175 L 510,270 L 540,270" fill="none" stroke="#39d353" stroke-width="1.5"/>
  <path d="M 480,365 L 540,365" fill="none" stroke="#39d353" stroke-width="1.5"/>
  
  <!-- Clients to External APIs -->
  <path d="M 480,135 L 700,135 L 700,75 L 730,75" fill="none" stroke="#ff7b72" stroke-width="1.5"/>
  <path d="M 480,335 L 700,335 L 700,275 L 730,275" fill="none" stroke="#ff7b72" stroke-width="1.5"/>
</svg>
```

---

## 💾 Database Concepts Applied

### 1. Transactional IndexedDB (PWA client)
To allow zero-latency offline performance, the PWA utilizes browser-native `IndexedDB` schemas rather than a central relational server database. It creates separate transactional Object Stores (`conversations`, `pending`, `events`, `notes`, `projects`).

### 2. Search Indexing
Indexes are created on query-heavy attributes:
* `timestamp` index inside the `notes` and `conversations` store to enable fast chronological ordering of messages.
* `date` index inside the `events` store, reducing time-to-render when displaying days inside the calendar widget.

### 3. JSON Flat-File Storage (Python Desktop client)
The desktop script operates on local flat files (`.ludo_memory.json`, `.ludo_context.json`, `.ludo_projects.json`, `.ludo_notepad.json`, and `.ludo_events.json`). Data persistence is handled atomically by writing memory blocks to transient buffers and flushing to disks, preventing corrupted databases during sudden terminations.

### 4. Offline Queue & Synchronization
If L.U.D.O goes offline, requests are stored inside a dedicated `pending` object store. Once a connection check succeeds, this queue is popped, synchronization events are processed chronologically, and updates are posted to the Gemini server.

### 5. Local Obfuscation
API keys stored inside the client browser's `LocalStorage` are reversed and Base64 encoded before persistence, preventing simple cross-site scraping programs from stealing keys in plain text.

---

## 📈 Challenges Faced

### [CHALLENGE-01] Context Window Bloat and Token Inflation
* **Problem:** Every query sent to LLMs requires appending conversation history so that the assistant remembers previous topics. In developer sessions containing multi-line logs, the token count grows exponentially, inflating API usage and increasing API costs.
* **Solution:** Created `token_counter.py` to approximate token usage (character-length / 4). A strict limit of 2,000 context tokens was set. If the limit is crossed, L.U.D.O preserves the 10 most recent exchanges in high detail and feeds the rest into an auto-summarization algorithm. This condenses hundreds of past messages into a brief semantic context string, reducing API costs by 50%.

### [CHALLENGE-02] Cross-Platform UI Rendering & Custom Fonts
* **Problem:** Creating a HUD that looks visually premium in Pygame requires custom TrueType fonts, high-frequency waveforms, and layout grids. Standard system fonts render differently across Windows machines, causing text overflow in narrow layout panels.
* **Solution:** Standardized rendering using a single included TrueType font (`Orbitron-VariableFont_wght.ttf`). Wrote a custom `wrap_text` utility inside `JarvisHUD.py` to calculate letter surface width and break down paragraphs into dynamic word-wrapped arrays before blitting them to the Pygame surface.

### [CHALLENGE-03] Local Real-time Camera Gestures & Latency
* **Problem:** MediaPipe landmark evaluation consumes massive GPU/CPU resources on standard laptops. Running frame processing, Pygame HUD rendering, audio waveform visualizations, and microphone listeners in a single thread caused severe performance issues, dropping frame rates to <10 FPS.
* **Solution:** Shifted heavy processing blocks to background threads. The camera acquisition loop (`mediapipe`) and voice command processing occur in dedicated daemon threads, writing coordinate results to thread-locked global variables (`hand_landmarks_global`). The main thread reads these coordinates asynchronously to reposition UI elements, maintaining a smooth 60 FPS HUD interface.

---

## 📊 Results & Impact
* **Latency Reduction:** Offline neural TTS (Piper-TTS) reduced speech response generation latency from ~3.5 seconds (via cloud APIs) to under 1 second on standard CPUs.
* **Hands-Free Control:** Developers can hide, drag, or reposition their workspace HUD completely using physical fist gestures, keeping their hands on their keyboard/mouse.
* **Zero Cloud Caching Costs:** Local IndexedDB caching ensures notes and schedules are retrieved instantly without network roundtrips.
* **API Cost Containment:** The context sliding window and summarization mechanisms prevented API key exhaustion, allowing continuous background operation during long coding sessions.

---

## 🚀 Future Scope
* **Multi-Agent Task Delegation:** Implement a local multi-agent system where L.U.D.O delegator scripts spawn subagents to run concurrent code audits.
* **Desktop-PWA WebSockets Sync:** Establish active websocket listeners between the Node.js Express server and the Pygame execution thread to sync calendar updates in real time.
* **Advanced Ambient Context Detection:** Automatically track active IDE windows (e.g. tracking open files in VS Code) and feed filenames to L.U.D.O to enrich the active context window.

---

## 🔗 Project Links
* **Live Demo:** [megam.vercel.app](https://megam.vercel.app)
* **GitHub Repository:** [sathyaseelan2006/LUDO_My_personal-AI](https://github.com/sathyaseelan2006/LUDO_My_personal-AI)
* **API Documentation:** [Developer Reference Guide](DESKTOP_APP_GUIDE.md)
* **Developer Email:** ksathyaseelan34@gmail.com
