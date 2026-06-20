# POLYVAULT

A lightweight knowledge-management platform with interactive SVG mindmaps.

---

## 📅 Project Metadata
- **Duration**: 2 Weeks (June 2026)
- **Role**: Solo Developer (System Design, Database Design, Frontend & Backend Development, Testing & Cloud Deployment)

---

## 💻 Tech Stack
- **Backend Language**: Java (JRE 22)
- **Authentication**: Firebase Auth (Client) + Google Identity Toolkit API REST Validation (Server)
- **Security & Authorization**: Stateless JWT Bearer token interception
- **Frontend Core**: Vanilla HTML5, CSS3 (featuring responsive HSL-tailored custom variables)
- **Graphics Engine**: Pure Vector SVGs with client-side force-directed coordinate physics (Vanilla JS, no D3 dependency)
- **Compression**: Java GZIP input/output streams
- **Cloud Infrastructure**: Render Web Services (Java API), Firebase Hosting (Web Static Assets)

---

## 🔍 Project Overview
PolyVault is an ultra-lightweight, privacy-first personal knowledge-management platform and versioned storage vault. It bridges the gap between text-based note-taking tools and cloud storage drives by projecting a folder hierarchy onto an interactive, visual SVG mindmap canvas.

### Why it Exists
Traditional knowledge bases require either trusting large cloud corporations with private files or installing heavy local desktop packages (like Electron wrappers) which cannot be easily accessed securely from multiple devices. PolyVault offers a self-hostable, server-client system that puts users in control of their private files under standard GZIP compression, authenticated securely via Google Firebase.

### What Problem it Solves
- **Data Privacy**: Prevents cloud hosts from indexing and monetizing user files.
- **Resource Bloat**: Replaces massive frameworks like Spring Boot or Node.js with a tiny, dependency-free Java backend.
- **Hierarchical Visibility**: Solves the folder-nesting problem by displaying notes, projects, and files in a visual mindmap.

---

## 🏆 Key Milestone & Achievements
- **Multi-Tenant Partitioning**: Isolated database storage paths per user UID under the `/data/users/<userId>/` directory.
- **Lightweight JWT Auth Interceptor**: Built a custom REST token verifier query using standard JRE libraries, completely removing dependency on the heavy Firebase Admin Java SDK.
- **Collision-Free Shared Workspaces**: Implemented an index-shifting math algorithm (`shareIndex * 10,000,000 + localId`) to overlay shared folder nodes on the student's personal canvas without ID collisions.
- **Fast Local compilation**: Developed a custom Python compilation script building all Java files in `< 1.0` second without Gradle or Maven dependencies.
- **Cloud Deployment**: Deployed static assets on Firebase Hosting and containerized JRE API on Render Web Services.

---

## 👥 Leadership & Responsibilities (Solo Project)
- **System Design**: Designed a unified backend hosting both a REST HTTP API server (`:8080` / `PORT`) and a multithreaded socket server (`:5050`) using standard JRE packages.
- **Database Design**: Engineered a thread-safe, text-file-based TSV relational metadata store.
- **Frontend Development**: Created a glassmorphic dashboard UI with vanilla JS controls, rendering responsive canvas SVG nodes, customized node shapes, and active state indicators.
- **Backend Development**: Authored all API servlet-context routing, multi-tenant path resolution, file compression streams, sharing validation hooks, and invite code records.
- **Testing & Deployment**: Developed test routines, validated sandbox boundary isolation, wrote Dockerfiles, and pushed deployment cycles to GitHub and Firebase CLI.

---

## ⚠️ Problem Statement
- **User Profile Data Exposure**: Centralized cloud systems index, analyze, and monetize private documents and user notes.
- **Bloated Infrastructure**: Modern collaboration platforms require gigabytes of RAM, SQL database engines (Postgres/MySQL), and heavy containers, rendering them unsuitable for low-tier environments.
- **Disconnected Files and Thoughts**: Cloud storage is isolated into rigid folder lists, while mindmapping tools are disconnected from the actual files they mention.

---

## 🛠️ Solution Implemented
A zero-dependency Java server exposing:
1. A **REST HTTP Server** (`com.sun.net.httpserver.HttpServer`) to serve front-end files and accept mindmap mutations.
2. A **Multithreaded Socket Server** (`java.net.ServerSocket`) executing CLI commands over sockets.
3. A **User Sandbox Directory structure**: Files are GZIP compressed and stored sequentially (`v1.gz`, `v2.gz`), and metadata is stored in flat Tab-Separated Value files (`nodes.tsv`, `files.tsv`, `versions.tsv`).
4. An **Interactive SVG Mindmap Canvas**: Draws hierarchy linkages dynamically using Vanilla JS vector calculations.

---

## 🌟 Key Features

### 🔐 Authentication
- **Feature**: Google Firebase Authentication Integration.
- **Capability**: Enables secure user log-in, registration, password recoveries, and Google Sign-in.
- **Benefit**: Provides enterprise-grade security on the frontend while verifying callers statelessly on the backend using standard JWT token validation headers.

### 📁 Knowledge Storage & Sandbox
- **Feature**: User Partitioned Metadata & File Storage.
- **Capability**: Resolves user context using the verified Firebase UID, partitioning reads/writes to `data/users/<userId>/metadata` and `data/users/<userId>/storage`.
- **Benefit**: Prevents workspace leakage, guaranteeing students cannot see, edit, or delete other users' files.

### 🌐 Interactive Mindmap
- **Feature**: Vector SVG force-directed knowledge canvas.
- **Capability**: Supports creating, customizing (node shapes, colors, shortcuts), and deleting workspaces, folders, notes, and projects.
- **Benefit**: Gives a clean, visual representation of files in relation to conceptual thoughts, with instant drag-and-drop feedback.

### 🔄 Version Control
- **Feature**: Sequential GZIP file versioning.
- **Capability**: Compresses files via JRE's `GZIPOutputStream` on upload and tracks version histories sequentially.
- **Benefit**: Drastically reduces server storage overhead and permits reverting to historical files in case of accidental overwrites.

### 🤝 Peer Sharing & Collaboration
- **Feature**: Workspace Sharing and Co-working Invite Links.
- **Capability**: Allows folder owners to toggle workspaces to "Shared" mode, invite peers by email, or generate copy-pasteable invite links (`/?invite=UUID`).
- **Benefit**: Seniors and admins can easily share files and templates to juniors in a read-only viewer mode without manual email configurations.

### 📖 Interactive Onboarding
- **Feature**: Collapsible Left-Sidebar Guide.
- **Capability**: Step-by-step instructions details on mindmap controls, node dragging, file uploads, and collaboration toggles.
- **Benefit**: Accelerates the learning curve, ensuring new users understand how to interact with the visual workspace immediately.

---

## 🏗️ System Architecture

### Information Flow
```text
Frontend (SVG Mindmap / Glassmorphic UI)
    ↓ (HTTPS REST + JWT Token Header)
API Layer (GraphApiServer / Zero-Dependency JWT Verifier)
    ↓ (User Sandbox Context Resolution)
Business Logic (MetadataStore / ShareStore / InviteStore / StorageService)
    ↓ (Flat-File I/O & GZIP Streams)
Local Filesystem Database (tsv metadata & gz storage blocks)
```

### System Architecture Diagram
![PolyVault System Architecture](docs/polyvault_architecture_diagram.png)

### Core Workflow Sequences
![PolyVault Core Workflows](docs/polyvault_flow_diagram.png)

---

## 📊 Database Concepts Applied

### 1. TSV Metadata Storage
Rather than bringing in a heavy SQL server, tabular data is stored in Tab-Separated Value files acting as flat-file databases. The schema relations are maintained using primary and foreign key mapping:
- **`nodes.tsv`**: `id` | `parentId` | `type` | `title` | `color` | `shape` | `important` | `favorite` | `shortcut` | `updatedAt`
- **`files.tsv`**: `id` | `nodeId` | `parentId` | `originalFilename` | `currentVersion` | `createdAt`
- **`versions.tsv`**: `fileId` | `versionNumber` | `storagePath` | `originalSize` | `createdAt`

### 2. File Versioning Relationships
A **One-to-Many Relationship** exists between `files.tsv` and `versions.tsv`. The `fileId` in the version record references the unique primary key of the file, allowing the server to fetch all upload history or download the latest compressed GZIP byte block.

### 3. Memory Mapping & Indexing
To ensure fast reads, the `MetadataStore` parses the TSVs into in-memory `HashMap` structures on backend startup. Reads (like fetching the graph structure) are executed at $O(1)$ efficiency.

### 4. Data Integrity & Atomicity
Write locks are secured using Java's `synchronized` block monitors in metadata stores. This prevents multiple concurrent API threads from corrupting the TSV records during simultaneous uploads or creations.

---

## ⚡ Challenges Faced

### [CHALLENGE-01] Cross-Origin Resource Sharing (CORS) Blocks
- **Problem**: When the Firebase frontend (`https://polyvault-6990a.web.app`) queried the Render backend (`https://polyvault-7m5s.onrender.com`), the browser blocked requests due to CORS policies.
- **Solution**: We added customized header writers in `GraphApiServer.java` sending `Access-Control-Allow-Origin: *` and intercepted pre-flight HTTP `OPTIONS` requests to immediately return `204 No Content`.

### [CHALLENGE-02] HTTPS Mixed Content Security
- **Problem**: Browsers block secure HTTPS static clients from contacting insecure HTTP backends (`http://localhost:8080`), making local server development difficult for developers logged into the cloud console.
- **Solution**: We modified the frontend `api.js` to dynamically inspect `window.location.hostname`. If running on `localhost` or `127.0.0.1`, it defaults to local endpoints; if running in production, it routes requests to the secure hosted Render backend.

### [CHALLENGE-03] Render Container Cold-Starts
- **Problem**: Render's free tier spins down the Java backend container after 15 minutes of inactivity, resulting in a 50-second delay when waking up.
- **Solution**: We added a visual `Connecting` state status pill in the UI. When the server wakes up, the pill automatically transitions to green (`ONLINE`) and reloads the graph without forcing the user to manually refresh.

### [CHALLENGE-04] Nested Syntax Error in Block-Scoped Scripts
- **Problem**: A missing curly brace `};` during frontend scripting nested an `export` statement inside an event handler, causing an `Uncaught SyntaxError` which broke the Firebase sign-in hooks.
- **Solution**: Traced the console errors, properly closed the parent functions in `ui.js`, and deployed immediate patches to restore functionality.

---

## 📈 Results & Impact
- **Minimal Resource Usage**: The entire Java core runs in a Docker container using **less than 50MB RAM** (under $10\%$ of typical Spring Boot setups).
- **Instant Workspace Filtering**: Filtering between personal and shared vaults is done client-side, giving users instantaneous transitions without waiting on network queries.
- **Robust Collaboration**: Senior students and teachers can instantly generate co-working invite links and share templates with dozens of juniors in seconds.

---

## 🔮 Future Scope
- **SQLite Migration**: Upgrade from TSV flat-files to an embedded SQLite database engine using `sqlite-jdbc` to improve relational query structures.
- **Zero-Knowledge Encryption**: Compress and encrypt files client-side using the browser Web Crypto API before transmitting them, keeping the server completely blind to the storage contents.
- **WebSockets Real-time Panning**: Replace HTTP API polling with WebSockets to synchronise mindmap node dragging positions between multiple active users concurrently.

---

## 🔗 Project Links
- **Live Demo Website**: [polyvault-6990a.web.app](https://polyvault-6990a.web.app)
- **Render REST API Endpoint**: [polyvault-7m5s.onrender.com](https://polyvault-7m5s.onrender.com)
- **GitHub Code Repository**: [github.com/sathyaseelan2006/PolyVault](https://github.com/sathyaseelan2006/PolyVault)