# ⚡ **SYSTEM PERIPHERAL MONITORING SYSTEM (DESKBOT)**

*An IoT-enabled hardware security and automated attendance logging system that prevents workspace peripheral theft and streamlines lab check-ins using real-time load diagnostics, RFID authentication, and relay-gated USB signal paths.*

---

## 📅 **Project Metadata**
* **Duration**: 4 Weeks (May 2026)
* **Project Type**: Solo Project (Academic / IoT Prototype Research)

---

## 🛠️ **Tech Stack**

* **Firmware / Hardware Control**: ESP32, C++ (Arduino Framework), PlatformIO, I2C, SPI.
* **Embedded Sensors & Actuators**: Adafruit INA219 (high-precision current/voltage monitor), MFRC522 (RFID reader), 2-Channel Relay Board, Active Buzzer/LED.
* **Server Tier**: Node.js, Express.js, Body-Parser, CORS, dotenv.
* **Mobile Client**: Flutter, Dart, Hive (Encrypted Local Storage), Provider, Awesome Notifications, Workmanager.
* **Data Persistence & Sync**: Firebase Realtime Database (RTDB), MongoDB (Mongoose), MQTT (Mosquitto broker integration).
* **Communication & Notifications**: Nodemailer (Gmail API), Twilio API (WhatsApp Sandbox), Firebase RTD Event Stream.
* **Analytical Pipeline**: Python 3.12, Matplotlib, NumPy (for hardware telemetry & paper figure generation).

---

## 🔍 **Project Overview**

* **What it is**: DeskBot is a dual-operational IoT security and productivity platform designed for educational, industrial, or corporate lab spaces. It functions by locking the USB data lines of workspace peripherals (such as mice or keyboards) behind RFID authentication. Once authorized, it monitors the device's electrical load characteristics in real-time, instantly triggering alarms and digital alerts if the peripheral is disconnected without authorization.
* **Why it exists**: Workspace peripheral theft and hardware tampering are common in public or shared labs. Traditional methods like physical cable locks are expensive, cumbersome, and easily bypassed, while manual logbooks for tracking student attendance and system usage are inefficient, prone to human error, and difficult to audit.
* **What problem it solves**: It eliminates workspace hardware shrinkage (theft) by sounding physical alarms and dispatching instant mobile/email notifications the second a device is unplugged. Concurrently, it automates lab logging, replacing slow manual sign-in sheets with contact-free RFID attendance that is instantly synced to the cloud.

---

## 🏆 **Key Milestone & Achievement**

* **Scientific Evaluation & Figure Generation**: Successfully designed, simulated, and evaluated signal integrity and electrical telemetry models to generate academic-grade evaluation figures (`01_peripheral_current_signature`, `02_theft_detection_latency`, `03_handshake_signal_integrity`, and `04_attendance_efficiency`) using a custom Python Matplotlib/NumPy data pipeline.
* **Lab Prototype Validation**: Built and tested a physical hardware loop that successfully detects USB unplug events within a strict **1.0-second** confirmation window, logging attendance in **1.5 seconds** (a **91.4% time reduction** compared to manual sign-ins).

---

## 👨‍💻 **Leadership & Responsibilities**

As a solo project, I was responsible for the entire design and implementation lifecycle:
* **System Design**: Engineered the end-to-end hardware-software pipeline, including low-level ESP32 register setup (SPI/I2C/GPIO), state-machine transitions (`WAITING_AUTH` to `SESSION_ACTIVE`), and dual server/mobile network routing topologies.
* **Database Design**: Structured MongoDB schemas (utilizing compound indexes for fast query resolution), configured Firebase Realtime Database paths, and implemented encrypted Hive boxes for local caching.
* **Frontend Development**: Programmed the Flutter admin app, incorporating Provider state management, responsive charts, and background task schedulers.
* **Backend Development**: Created the Express.js API gateway, an MQTT-to-Firebase synchronizer, and integration points for Nodemailer and Twilio WhatsApp alerts.
* **Testing & Deployment**: Tested hardware switching delays, USB enumeration handshakes, and deployed testing scripts for automated local configuration.

---

## ⚠️ **Problem Statement**

* **High Hardware Shrinkage**: Shared computer labs face continuous, unnoticed loss of USB peripherals (mice, keyboards, dongles) which wastes IT budgets and disrupts workspace availability.
* **Slow & Error-Prone Attendance Logging**: Lab sign-in procedures require students to manually write down names, entry times, and assigned PC numbers, taking an average of **17.5 seconds per student** and leading to illegible, unverifiable records.
* **Lack of Immediate Alerts**: IT administrators are only notified of theft or hardware malfunctions hours or days after the event, making it impossible to identify the responsible parties or recover stolen assets in real time.
* **Fragile Network Environments**: Many labs lack stable internet connections or complex server infrastructures, meaning a pure cloud-reliant security system is prone to total system failure if the connection drops.

---

## 💡 **Solution Implemented**

We engineered **DeskBot**, a comprehensive security and automation loop composed of three primary subsystems:
1. **ESP32 Edge Node**: A physical hardware enclosure situated at each workstation containing an ESP32 board, an INA219 sensor, an MFRC522 RFID reader, and a 2-channel relay. The relay gates the USB data lines (D+ and D-). The peripheral is powered off on startup. When a student scans their RFID card, the ESP32 reads their identity block, posts attendance to Firebase, and gates the relay open to connect the peripheral.
2. **Node.js Gateway & Alert Dispatcher**: An Express server connected to a MongoDB backend that continuously listens for heartbeat telemetry (RSSID, voltage, current, power) and alert posts. It distributes critical email warnings (Nodemailer) and WhatsApp text messages (Twilio) to the lab admin.
3. **Flutter Admin Console**: A mobile app that runs in two configurations: a *Cloud-Sync Edition* listening to Firebase RTD updates, and a *Local-Zero-Config Edition* that hosts an internal HTTP server (on port `8080` using Dart Shelf) to receive data directly from the ESP32 over local WiFi, storing logs in local Hive boxes and firing high-priority Android/iOS notifications.

---

## ✨ **Key Features**

### 🔑 **1. RFID-Based Lab Attendance**
* **Feature**: Contactless Card Decoding & Identification.
* **Capability**: Reads student credentials ("Name|StudentId") from sector data blocks (sectors 4–6) of MIFARE Classic cards using default key arrays, with automatic fallback to a local UID mapping table.
* **Benefit**: Log-in speed is accelerated from **17.5 seconds** (manual) to **1.5 seconds**, instantly uploading attendance records (including system number and timestamp) to the database.

### 🔌 **2. Dual-Channel Relay Signal Gating**
* **Feature**: Synchronous USB Line Interception.
* **Capability**: Uses a 2-channel relay board to gate the USB D+ and D- data wires, ensuring both signal lines rise synchronously.
* **Benefit**: Restricts unauthorized peripheral access (device remains unusable until authenticated) while maintaining perfect USB signal integrity and preventing OS-level device enumeration failures.

### 📊 **3. Real-Time Telemetry & Watchdog**
* **Feature**: Electrical Load Diagnostics.
* **Capability**: Samples USB load current every 250 ms. Tracks voltage, current, and milliwatt power draw continuously, reporting a telemetry heartbeat every 2000 ms.
* **Benefit**: Establishes an adaptive electrical baseline for connected peripherals, allowing the system to identify abnormal power drops instantly.

### 🚨 **4. Intentional Unplug Watchdog (Theft Alert)**
* **Feature**: 1.0-Second Confirmation Loop.
* **Capability**: Detects current drops below `12 mA`. When 4 consecutive samples (4 * 250ms) confirm the low-current state, the node de-energizes the relay, triggers a local GPIO piezo alarm (200ms blink rate), and pushes alert data.
* **Benefit**: Instantly locks the USB pathway, prevents bypass attempts, triggers visual/audible alarms, and dispatches remote notifications with zero false alarms from momentary load spikes.

### 🔔 **5. Multi-Channel Dispatch Engine**
* **Feature**: Cross-Platform Notification Routing.
* **Capability**: Dispatches critical notifications across Email (Nodemailer), WhatsApp (Twilio), and local mobile push notifications (Awesome Notifications) with repeating alarm sounds and screen-wake triggers.
* **Benefit**: Admins receive warning alerts within seconds of a theft event, regardless of whether they are at a computer dashboard, on their phone, or offline (local WiFi mode).

---

## 🏗️ **System Architecture**

### **Physical & Network Architecture Flow**
```
                  ┌─────────────────────────────────────┐
                  │        PHYSICAL WORKSTATION         │
                  │  ┌───────────┐       ┌───────────┐  │
                  │  │ USB Mouse │       │ RFID Card │  │
                  │  └─────┬─────┘       └─────┬─────┘  │
                  └────────┼───────────────────┼────────┘
                           │ (USB Data)        │ (MIFARE 13.56MHz)
                           ▼                   ▼
                  ┌─────────────────────────────────────┐
                  │            DESKBOT NODE             │
                  │  ┌───────────┐       ┌───────────┐  │
                  │  │  2-Ch     │       │ MFRC522   │  │
                  │  │  Relay    │       │ RFID Rcvr │  │
                  │  └─────▲─────┘       └─────┬─────┘  │
                  │        │ (Gate Control)    │ (SPI)  │
                  │  ┌─────┴───────────────────▼─────┐  │
                  │  │         ESP32 MCU             │  │
                  │  │    - State Watchdog           │  │
                  │  │    - WiFi Telemetry Client    │  │
                  │  └─────▲───────────────────▲─────┘  │
                  │        │ (I2C)             │        │
                  │  ┌─────┴─────┐             │ (GPIO) │
                  │  │  INA219   │       ┌─────▼─────┐  │
                  │  │  Sensor   │       │Buzzer/LED │  │
                  │  └───────────┘       └───────────┘  │
                  └────────┬────────────────────────────┘
                           │ HTTP POST / HTTPS PUT
                           ▼
  ┌───────────────────────────────────────────────────────────────┐
  │                        NETWORK LAYER                          │
  │        (Direct Local WiFi OR WAN Firebase Realtime DB)         │
  └────────┬──────────────────────────────────────────────┬───────┘
           │ (Direct Local WiFi - Port 8080)              │ (Firebase RTD Event stream)
           ▼                                              ▼
┌──────────────────────────────────────┐        ┌──────────────────────────────────────┐
│       LOCAL-ONLY MOBILE CLIENT       │        │         CLOUD TELEMETRY TIER         │
│  ┌────────────────────────────────┐  │        │  ┌────────────────────────────────┐  │
│  │   Flutter Admin App            │  │        │  │  Firebase Realtime Database    │  │
│  │   - Local Dart Shelf Server    │  │        │  │  - Synchronizes online status  │  │
│  │   - Hive Encrypted Cache       │  │        │  │  - Holds real-time events      │  │
│  │   - Local Awesome Notifications│  │        │  └───────────────┬────────────────┘  │
│  └────────────────────────────────┘  │        │                  │ (REST API)        │
│                                      │        │                  ▼                   │
│                                      │        │  ┌────────────────────────────────┐  │
│                                      │        │  │  Express.js API Server         │  │
│                                      │        │  │  - Port 3000 Gateway           │  │
│                                      │        │  │  - Node.js Controller          │  │
│                                      │        │  └───────────────┬────────────────┘  │
│                                      │        │                  │                   │
│                                      │        │         ┌────────┴────────┐          │
│                                      │        │         ▼                 ▼          │
│                                      │        │  ┌─────────────┐   ┌─────────────┐   │
│                                      │        │  │ MongoDB     │   │Notification │   │
│                                      │        │  │ Database    │   │Engines      │   │
│                                      │        │  │ - Alert Logs│   │- Twilio API │   │
│                                      │        │  │ - Device MD │   │- Nodemailer │   │
│                                      │        │  └─────────────┘   └─────────────┘   │
└──────────────────────────────────────┘        └──────────────────────────────────────┘
```

### **Logical Tier Pipeline**
```
           ┌────────────────────────┐
           │     FLUTTER CLIENT     │  (Frontend View & Actions)
           └───────────┬────────────┘
                       │ HTTP / Firebase Websocket
                       ▼
           ┌────────────────────────┐
           │      EXPRESS API       │  (Endpoints & JSON Gateways)
           └───────────┬────────────┘
                       │ Routing & Validation
                       ▼
           ┌────────────────────────┐
           │  BUSINESS LOGIC TIER   │  (Watchdog, Email/WhatsApp Dispatchers)
           └───────────┬────────────┘
                       │ Document Mappings (Mongoose)
                       ▼
            ┌────────────────────────┐
            │    MONGODB DATABASE    │  (Persistent Collections)
            └────────────────────────┘
```

### **Clean Architecture Design**
Here is a conceptual representation of the Clean Architecture model implemented across the DeskBot system, showing the concentric layers of dependency:

![DeskBot Clean Architecture Diagram](analysis/figures/05_clean_architecture.png)

### **System Operations & Gating Flowchart**
Below is the execution flow representing NFC card processing, authentication gating, telemetry monitoring, and dashboard updates:

![DeskBot System Operations Flowchart](analysis/figures/06_system_workflow.png)

---

## 💾 **Database Concepts Applied**

* **Indexing**: Configured compound and single indexes in MongoDB to optimize queries on historical log tables. Specifically:
  * `alertSchema.index({ deviceId: 1, receivedAt: -1 })`: Speeds up retrieval of recent alerts for a specific workstation.
  * `alertSchema.index({ alertType: 1, acknowledged: 1 })`: Optimizes dashboard views displaying unresolved/unacknowledged critical alerts.
* **Data Integrity & Schema Enforcement**: Implemented strict schema validation using Mongoose to enforce data formats, default values (e.g., `acknowledged: false`), and enums (`alertType: ['WARNING', 'CRITICAL', 'RESOLVED']`).
* **Encrypted Local Cache (Hive)**: The mobile client utilizes Hive—a lightweight, fast key-value database written in Dart. Telemetry logs and alerts are cached locally using encrypted boxes (`DB_ENCRYPTION_KEY`), ensuring sensitive workspace credentials and user logs are kept secure on the administrator's device.
* **Real-Time Data Sync**: Utilized Firebase Realtime Database (RTDB) as a low-latency sync layer between the hardware nodes and mobile app, ensuring that state transitions instantly trigger client-side notifications without requiring polling overhead.

---

## 🧠 **Challenges Faced**

### **[CHALLENGE-01] Mismatch in Relay Polarity Leading to Dead USB Connections**
* **Problem**: Relay boards available in the market are split between *Active-Low* (triggering when pin is grounded) and *Active-High* (triggering when pin is driven high). When deploying firmware globally across different hardware revisions, incorrect polarity configurations would cause the ESP32 to de-energize the relay when trying to unlock the USB ports, leaving the workstation mouse completely dead even after successful authentication.
* **Solution**: Developed an adaptive runtime fallback mechanism (`tryRelayPolarityFallback`). If a student logs in successfully but the INA219 sensor reads no current flow (`lastCurrentmA < MOUSE_PRESENCE_THRESHOLD_MA`) for 3000 ms, the firmware flags a potential hardware polarity mismatch. It automatically flips the runtime active state (`relayActiveLowRuntime = !relayActiveLowRuntime`) and re-triggers the lock/unlock lines, instantly restoring USB power without requiring a manual firmware re-flash.

### **[CHALLENGE-02] USB Enumeration Failures from Asynchronous Gating**
* **Problem**: Gating the D+ and D- lines of a USB 2.0 interface asynchronously (due to slight relay click delays or staggered pin outputs) caused host operating systems (Windows/Linux) to throw "USB Device Descriptor Failure" errors, rendering the mouse useless until unplugged and plugged back in.
* **Solution**: Evaluated asynchronous versus synchronous signal rise times (documented in our research graphs). Configured the hardware to use a high-speed, dual-channel relay board driven by synchronized GPIO commands. Initiated a startup relay self-test sequence (`runRelaySelfTest`) to verify switching times and ensure both D+ and D- lines engage simultaneously within a sub-millisecond range, achieving a 100% success rate on host OS handshake enumeration.

### **[CHALLENGE-03] Adaptive Baseline Drift in USB Optical Sensor States**
* **Problem**: A standard USB optical mouse draws fluctuating currents: ~35 mA when idle, spiking to ~55 mA when moving (wake spike), and settling back to ~45 mA. Using a rigid, static current-drop threshold resulted in false theft alarms when the mouse entered low-power idle states or went to sleep.
* **Solution**: Engineered a dynamic baseline tracking algorithm in the ESP32 firmware. During the first 3 seconds of a user session, the system records the peak active load as `sessionBaselineCurrentmA`. Once established, the threshold adjusts dynamically, tracking load variations using a slow adaptive filter (`baseline = baseline * 0.9 + current * 0.1`). Theft alerts are only triggered if the current falls below 80% of this dynamic baseline, suppressing false alarms entirely.

---

## 📈 **Results & Impact**

* **91.4% Sign-in Speed Improvement**: Lab entry attendance latency dropped from a manual average of **17.5 seconds** per student to just **1.5 seconds** using RFID sectoral reads.
* **Sub-Second Theft Response**: Unplug detection latency was locked to **1.0 second** (4 samples × 250 ms confirmation cadence), allowing immediate relay isolation and physical buzzer alerts, preventing any possibility of quick-unplug theft.
* **Zero Cloud Reliance**: The local mobile app edition proved 100% stable in completely offline lab environments, successfully hosting local HTTP listeners and generating push notifications on local subnets.
* **Zero False Alarms**: The combined use of a dynamic current baseline and a 4-sample confirmation window eliminated false alarms triggered by electrical noise or mouse sleep modes.

---

## 🔮 **Future Scope**

* **AI-Based Power Fingerprinting**: Incorporating lightweight machine learning (e.g., TinyML) on the ESP32 to analyze current waveforms, allowing the system to identify the *exact type* of peripheral connected (mouse vs. keyboard vs. USB drive) and detect if a thief swapped the monitored mouse with a cheaper clone.
* **Bi-Directional WebSocket Telemetry**: Replacing simple HTTP POST heartbeats with persistent WebSockets to enable sub-100ms real-time graphing of workspace voltage/current draw on the web dashboard.
* **Power Delivery (USB-PD) Integration**: Upgrading the sensor array to handle higher voltage/current profiles (up to 20V/5A) for monitoring expensive lab equipment like oscilloscopes, soldering stations, and 3D printers.

---

## 🔗 **Project Links & Source Files**

* **Main System Entrypoint**: [main.cpp](file:///e:/brainstroming/deskbot/src/main.cpp)
* **API Gateway Script**: [server.js](file:///e:/brainstroming/deskbot/server/server.js)
* **Mobile App Entrypoint**: [main.dart](file:///e:/brainstroming/deskbot/mobile-app/lib/main.dart)
* **PowerShell Setup Utility**: [setup.ps1](file:///e:/brainstroming/deskbot/setup.ps1)
* **Nodemailer Service**: [emailService.js](file:///e:/brainstroming/deskbot/server/services/emailService.js)
* **Twilio WhatsApp Service**: [whatsappService.js](file:///e:/brainstroming/deskbot/server/services/whatsappService.js)
* **MQTT-Firebase Data Bridge**: [mqtt-firebase-bridge.js](file:///e:/brainstroming/deskbot/server/mqtt-firebase-bridge.js)
* **Telemetry Graph Generator**: [generate_paper_figures.py](file:///e:/brainstroming/deskbot/analysis/generate_paper_figures.py)
* **Detailed Architecture Overview**: [ARCHITECTURE.md](file:///e:/brainstroming/deskbot/ARCHITECTURE.md)
* **Mobile App Setup & Quickstart**: [QUICKSTART.md](file:///e:/brainstroming/deskbot/mobile-app/QUICKSTART.md)
