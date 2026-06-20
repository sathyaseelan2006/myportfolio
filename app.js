// Initialize EmailJS with public key
if (typeof emailjs !== 'undefined') {
  emailjs.init('vsj_MQ6R9MHOxCJGX');
  console.log('✅ EmailJS initialized successfully');
}

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const stars = [];
const shootingStars = [];
let width = 0;
let height = 0;
let animationFrame = null;

function spawnShootingStar() {
  const isLeftToRight = Math.random() > 0.5;
  const startX = isLeftToRight ? Math.random() * (width * 0.7) : (width * 0.3) + Math.random() * (width * 0.7);
  const startY = -40;
  
  const angle = isLeftToRight
    ? (Math.PI * 0.15 + Math.random() * Math.PI * 0.15)
    : (Math.PI * 0.7 + Math.random() * Math.PI * 0.15);
    
  const speed = Math.random() * 6 + 7;
  
  shootingStars.push({
    x: startX,
    y: startY,
    dx: Math.cos(angle) * speed,
    dy: Math.sin(angle) * speed,
    life: 1.0,
    decay: Math.random() * 0.02 + 0.012,
    color: Math.random() > 0.4 ? "rgba(255, 81, 111, " : "rgba(255, 245, 245, "
  });
}

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  stars.length = 0;
  shootingStars.length = 0;
  const count = Math.min(260, Math.floor((width * height) / 5200));
  for (let index = 0; index < count; index += 1) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 0.9 + 0.1,
      radius: Math.random() * 1.4 + 0.2,
      speed: Math.random() * 0.18 + 0.04,
      tint: Math.random() > 0.8 ? "rgba(255, 70, 95," : "rgba(255, 245, 245,"
    });
  }
}

function renderStars() {
  ctx.clearRect(0, 0, width, height);

  const gradient = ctx.createRadialGradient(width * 0.62, height * 0.16, 20, width * 0.62, height * 0.16, width * 0.7);
  gradient.addColorStop(0, "rgba(255, 18, 63, 0.16)");
  gradient.addColorStop(0.42, "rgba(70, 0, 12, 0.08)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  stars.forEach((star) => {
    const alpha = 0.2 + star.z * 0.68;
    ctx.beginPath();
    ctx.fillStyle = `${star.tint}${alpha})`;
    ctx.arc(star.x, star.y, star.radius * star.z, 0, Math.PI * 2);
    ctx.fill();

    if (!prefersReducedMotion) {
      star.y += star.speed * star.z;
      star.x += Math.sin(star.y * 0.002) * 0.04;
      if (star.y > height + 4) {
        star.y = -4;
        star.x = Math.random() * width;
      }
    }
  });

  if (!prefersReducedMotion) {
    if (Math.random() < 0.006 && shootingStars.length < 3) {
      spawnShootingStar();
    }

    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const star = shootingStars[i];
      star.x += star.dx;
      star.y += star.dy;
      star.life -= star.decay;

      if (star.life <= 0 || star.x < -100 || star.x > width + 100 || star.y > height + 100) {
        shootingStars.splice(i, 1);
        continue;
      }

      const trailX = star.x - star.dx * 5.5;
      const trailY = star.y - star.dy * 5.5;

      ctx.beginPath();
      const grad = ctx.createLinearGradient(star.x, star.y, trailX, trailY);
      grad.addColorStop(0, `${star.color}${star.life * 0.98})`);
      grad.addColorStop(1, `${star.color}0)`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.4;
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(trailX, trailY);
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${star.life * 0.98})`;
      ctx.arc(star.x, star.y, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }

    animationFrame = requestAnimationFrame(renderStars);
  }
}

resizeCanvas();
renderStars();
window.addEventListener("resize", () => {
  cancelAnimationFrame(animationFrame);
  resizeCanvas();
  renderStars();
});

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  document.body.classList.toggle("nav-open", !isOpen);
});

navLinks?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sectionMap = [...document.querySelectorAll("main section[id]")];
const navItems = [...document.querySelectorAll(".nav-links a")];

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navItems.forEach((item) => {
        item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
);

sectionMap.forEach((section) => activeObserver.observe(section));

const projectCases = [
  {
    icon: `<svg viewBox="0 0 24 24" class="project-svg-logo" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><path d="M8 16h.01M8 20h.01M12 18h.01M12 22h.01M16 16h.01M16 20h.01"/></svg>`,
    title: "Air Pollution Monitoring System",
    shortName: "Megam",
    category: "Environmental Data Platform",
    subtitle: "Real-time air quality information platform for accessible environmental awareness.",
    duration: "Completed Nov 2025",
    team: "Portfolio Project",
    role: "Full-stack Developer",
    stack: ["API", "JavaScript", "React", "Python", "Machine Learning", "Flask", "MySQL", "Data Analysis"],
    overview:
      "Megam makes air quality information accessible to everyone. It presents real-time air quality data so individuals and communities can make informed decisions about health and environment.",
    milestone: "Built and deployed as a live environmental data platform.",
    responsibilities: ["Designed the user interface and project flow.", "Integrated environmental data and search behavior.", "Connected front-end experience with backend data logic.", "Presented data through a clean and interactive product surface."],
    problem: ["Air-quality information is often fragmented or difficult to read.", "Users need quick access to city-level environmental context.", "Raw environmental data needs a clearer presentation layer."],
    solution: ["Created a searchable air-quality experience.", "Structured pollution information into readable visual states.", "Used data analysis concepts to support environmental insight."],
    features: ["City search and data discovery.", "Real-time air-quality presentation.", "Environmental data interface.", "Responsive product-style layout."],
    architecture: ["Search UI", "API Layer", "Data Processing", "Storage", "Visualization"],
    database: ["Environmental Metrics", "City Records", "Query Handling", "Data Storage"],
    challenges: ["Presenting dense environmental data in a readable format.", "Maintaining visual polish while keeping the interface fast.", "Designing a data model that can evolve with more metrics."],
    results: ["Delivered a live air-quality monitoring experience.", "Improved accessibility of environmental information.", "Showed ability to merge data, UI, and deployment."],
    actions: [{ label: "Live Demo", href: "https://megam.vercel.app/" }, { label: "GitHub", href: "https://github.com/sathyaseelan2006/Megam" }]
  },
  {
    icon: `<svg viewBox="0 0 24 24" class="project-svg-logo" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.8C2.1 11 2 11.5 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/><path d="M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/></svg>`,
    title: "MotorMony - AI Car Recommendation System",
    shortName: "MotorMony",
    category: "AI Recommendation System",
    subtitle: "Machine-learning car recommendation system based on user queries and preferences.",
    duration: "Completed Dec 2025",
    team: "Portfolio Project",
    role: "ML Product Developer",
    stack: ["Machine Learning", "Python", "Flask", "Data Analysis", "CSV", "AI"],
    overview:
      "MotorMony analyzes a comprehensive car dataset with machine-learning logic to suggest personalized vehicle recommendations based on user preferences and budget.",
    milestone: "Completed and deployed as a live AI recommendation product.",
    responsibilities: ["Prepared vehicle data for recommendation logic.", "Designed user query and preference handling.", "Built recommendation flow and web delivery.", "Deployed the project for public demo access."],
    problem: ["Vehicle selection can be overwhelming for users.", "Budget, type, and preference matching require structured filtering.", "Recommendation output needs to be simple and understandable."],
    solution: ["Used machine-learning and data-analysis logic to compare vehicle options.", "Mapped user preferences to dataset attributes.", "Presented recommendations through a clean product UI."],
    features: ["Preference-driven car search.", "Dataset-backed recommendation logic.", "Budget and category matching.", "Live deployed interface."],
    architecture: ["Query Input", "Dataset", "ML Logic", "Flask", "Recommendation UI"],
    database: ["CSV Dataset", "Feature Columns", "Filtering Logic", "Recommendation Scores"],
    challenges: ["Normalizing vehicle attributes for better matching.", "Making recommendation output understandable for users.", "Keeping the experience simple while supporting flexible queries."],
    results: ["Delivered a live recommendation platform.", "Converted structured vehicle data into user-friendly choices.", "Demonstrated practical ML product thinking."],
    actions: [{ label: "Live Demo", href: "https://motormony-fxg4en3zk-sathyaseelan2006s-projects.vercel.app/" }, { label: "GitHub", href: "https://github.com/sathyaseelan2006/MotorMony" }]
  },
  {
    icon: `<svg viewBox="0 0 24 24" class="project-svg-logo" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22v-2h18v2M4 17h16M4 7V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3M5 17V7M9 17V7M13 17V7M17 17V7"/></svg>`,
    title: "Re:Vive - Indian Heritage Platform",
    shortName: "Re:Vive",
    category: "Cultural Discovery Platform",
    subtitle: "AI-powered cultural platform for exploring Indian heritage.",
    duration: "Completed Dec 2025",
    team: "Portfolio Project",
    role: "Web and AI Integration",
    stack: ["JavaScript", "HTML/CSS", "Supabase", "AI", "Vite", "MongoDB"],
    overview:
      "Re:Vive explores India's heritage through ancient monuments, cultural traditions, historical sites, AI-powered storytelling, authentication, and educational content.",
    milestone: "Connected to an IEEE research paper for the Re:Vive platform.",
    responsibilities: ["Built interactive front-end flows for cultural discovery.", "Integrated AI storytelling concepts into the learning experience.", "Structured content around monuments, traditions, and historical context.", "Shipped the platform as a live web deployment."],
    problem: ["Heritage learning can feel static and difficult to personalize.", "Historical content can feel disconnected from modern learners.", "Cultural discovery needs richer navigation and storytelling."],
    solution: ["Used AI-assisted storytelling to make heritage content more engaging.", "Created a browsable platform for monuments and cultural traditions.", "Added authentication and educational workflows."],
    features: ["AI-powered storytelling.", "Supabase-backed authentication.", "Interactive heritage exploration.", "Responsive live deployment."],
    architecture: ["User", "Supabase Auth", "Heritage Content", "AI Storytelling", "Learning View"],
    database: ["User Authentication", "Content Records", "User Sessions", "Hosted Backend Services"],
    challenges: ["Balancing educational depth with simple navigation.", "Designing content flows that feel interactive without becoming noisy.", "Maintaining performance while delivering rich visual content."],
    results: ["Delivered a live cultural discovery platform.", "Demonstrated practical AI usage in educational storytelling.", "Created a research-aligned project with social impact."],
    actions: [{ label: "Live Demo", href: "https://reviveindia.vercel.app/" }, { label: "GitHub", href: "https://github.com/sathyaseelan2006/Re-Vive" }, { label: "Research", href: "assets/Batch_13_IEEE_Paper submission.pdf" }]
  },
  {
    icon: `<svg viewBox="0 0 24 24" class="project-svg-logo" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    title: "PolyVault - Lightweight Knowledge Vault",
    shortName: "PolyVault",
    category: "Knowledge Management Platform",
    subtitle: "Lightweight knowledge-management platform with interactive SVG mindmaps.",
    duration: "Completed June 2026",
    team: "Portfolio Project",
    role: "Solo Developer",
    stack: ["Java", "Firebase Auth", "HTML5", "CSS3", "SVG", "GZIP", "Render"],
    overview: "PolyVault is a personal knowledge-management platform and versioned storage vault. It projects a folder hierarchy onto an interactive, visual SVG mindmap canvas under thread-safe Tab-Separated Value storage.",
    milestone: "Completed all multi-tenant partitioning, JWT interceptors, and custom GZIP compression pipelines.",
    responsibilities: ["Designed the multithreaded socket server and HTTP API routing.", "Created the TSV flat-file relational storage backend.", "Built interactive force-directed SVG mindmap UI using vanilla JS."],
    problem: ["Centralized cloud notes platforms expose private user files to monetization.", "Modern note apps rely on heavy desktop frameworks.", "Folder trees fail to map thoughts visually."],
    solution: ["Created a self-hostable Java backend running on less than 50MB RAM.", "Implemented GZIP compression on nodes.", "Developed visual SVG mindmap coordinates client-side."],
    features: ["Interactive vector SVG knowledge canvas.", "JWT authentication with Google Firebase.", "Thread-safe TSV tabular databases.", "Sequential version history tracking."],
    architecture: ["Frontend SVG UI", "API Layer", "JWT Verification", "Storage Engine", "Local TSV"],
    database: ["Tab-Separated Value Stores", "Nodes Schema mapping", "Files relationship table", "Version History Tracking"],
    challenges: ["Resolving cross-origin requests securely.", "Enabling HTTPS static clients to connect to secure hosted backends.", "Handling Render cold-starts gracefully."],
    results: ["Delivered a lightweight mindmap note engine.", "Enabled fast version tracking backups.", "Showed zero-dependency Java server architecture."],
    actions: [{ label: "Live Demo", href: "https://polyvault-6990a.web.app" }, { label: "GitHub", href: "https://github.com/sathyaseelan2006/PolyVault" }]
  },
  {
    icon: `<svg viewBox="0 0 24 24" class="project-svg-logo" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8M12 17v4M12 7v4M9 9h6"/></svg>`,
    title: "DeskBot - System Peripheral Monitoring System",
    shortName: "DeskBot",
    category: "IoT Monitoring System",
    subtitle: "ESP32-based monitoring and alert system for connected devices.",
    duration: "Completed 2026",
    team: "Portfolio Project",
    role: "IoT and Backend Developer",
    stack: ["ESP32", "Java", "Node.js", "Flutter", "MongoDB", "IoT"],
    overview:
      "DeskBot combines firmware, a Node.js server, and a mobile app workflow to track connected device status and send notifications through email and WhatsApp.",
    milestone: "Completed as an IoT monitoring system connecting hardware, backend services, and mobile workflows.",
    responsibilities: ["Structured the monitoring workflow from ESP32 device signals to alerts.", "Connected device state handling with backend logic.", "Planned notification workflows for email and WhatsApp.", "Organized mobile-facing monitoring interactions."],
    problem: ["Connected peripherals need reliable monitoring.", "Manual device checking is inefficient.", "Device alerts need to reach users quickly."],
    solution: ["Used ESP32 for device-level monitoring.", "Built a server workflow for status handling.", "Added alerting through email and WhatsApp."],
    features: ["ESP32-based monitoring.", "Node.js server workflow.", "Mobile app integration.", "Email and WhatsApp alerting."],
    architecture: ["ESP32", "Node.js Server", "MongoDB", "Alert Service", "Mobile App"],
    database: ["Device Status Records", "MongoDB Storage", "Alert History", "Monitoring Logs"],
    challenges: ["Coordinating hardware signals with backend status updates.", "Keeping alerts timely and useful.", "Designing a multi-platform workflow across firmware, server, and app."],
    results: ["Delivered a completed IoT monitoring workflow.", "Showed hardware-to-software integration ability.", "Added a strong systems project to the portfolio."],
    actions: [{ label: "GitHub", href: "https://github.com/sathyaseelan2006/System-Peripheral-Monitoring-System" }]
  },
  {
    icon: `<svg viewBox="0 0 24 24" class="project-svg-logo" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8"/></svg>`,
    title: "L.U.D.O - Learning & Utility Digital Operator",
    shortName: "L.U.D.O",
    category: "AI Voice Assistant",
    subtitle: "AI-powered voice assistant with HUD interface, Gemini integration, TTS, gestures, and memory.",
    duration: "Completed Jan 2026",
    team: "Portfolio Project",
    role: "AI Assistant Developer",
    stack: ["Python", "AI/ML", "Google Gemini 2.0", "Neural TTS", "MediaPipe", "Speech Recognition"],
    overview:
      "L.U.D.O is an AI-powered voice assistant featuring Google Gemini 2.0 integration, neural text-to-speech, hand gesture control, intelligent conversation memory, web search capabilities, and memory optimization.",
    milestone: "Completed as an advanced AI assistant project combining voice, gestures, memory, and AI conversation.",
    responsibilities: ["Integrated Gemini-powered conversation features.", "Connected speech recognition and neural TTS workflows.", "Added gesture control using MediaPipe.", "Structured assistant memory and utility behavior."],
    problem: ["Personal assistants need natural interaction beyond text input.", "Voice, gesture, and memory systems are hard to coordinate.", "AI responses need usable context management."],
    solution: ["Combined voice input, TTS output, and gesture control.", "Used Gemini for intelligent conversation.", "Added conversation memory and utility workflows."],
    features: ["Voice assistant interface.", "Google Gemini 2.0 integration.", "Neural text-to-speech.", "Hand gesture control.", "Conversation memory and web search."],
    architecture: ["Speech Input", "Gemini", "Memory", "TTS", "Gesture Control"],
    database: ["Conversation Memory", "Runtime Context", "Preference Storage", "Search Context"],
    challenges: ["Synchronizing speech, AI response, and TTS timing.", "Managing assistant memory without overloading context.", "Keeping gesture control responsive."],
    results: ["Delivered a completed AI assistant project.", "Showed applied Gemini integration.", "Combined multiple AI interaction modes in one system."],
    actions: [{ label: "GitHub", href: "https://github.com/sathyaseelan2006/LUDO_My_personal-AI" }]
  },
  {
    icon: `<svg viewBox="0 0 24 24" class="project-svg-logo" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 5V3m0 18v-2M5 12H3m18 0h-2m-3-6 1.5-1.5M7.5 16.5 6 18m10.5 0 1.5-1.5M7.5 7.5 6 6"/><path d="M12 8a4 4 0 0 0-4 4"/></svg>`,
    title: "Space Debris Risk Prediction",
    shortName: "Space Debris",
    category: "Orbital Mechanics System",
    subtitle: "Python-based orbital mechanics propagation system to track and forecast space debris locations.",
    duration: "Completed June 2026",
    team: "Portfolio Project",
    role: "Solo Developer",
    stack: ["Python", "SGP4 Propagation", "Pandas", "NumPy", "SpaceTrack API", "CSV"],
    overview: "The Space Debris Risk Prediction system is a collection of Python data pipelines and an interactive CLI utility that interfaces with the US Space Command's database (Space-Track.org). It downloads TLE datasets and propagates them to calculate state vectors.",
    milestone: "Successfully built an end-to-end data pipeline that propagates debris trajectories to Cartesian coordinate histories.",
    responsibilities: ["Structured the modular SATCAT extraction and TLE propagation flow.", "Integrated Space-Track API client with custom query throttles.", "Designed terminal argparse lookup CLI."],
    problem: ["Two-Line Element (TLE) datasets are complex strings.", "Space-Track enforces strict API query limits.", "Highly decayed orbits can fail SGP4 propagation computations."],
    solution: ["Implemented SGP4 python propagation models.", "Added query sleep throttles.", "Incorporated out-of-bounds error handles to skip decaying orbits."],
    features: ["Batch TLE catalog downloader.", "Cartesian coordinate trajectory compiler.", "Real-time lookups and forecast projections.", "Local CSV flat-file database stores."],
    architecture: ["Space-Track API", "Python pipeline", "SGP4 Solver", "NumPy Engine", "Output Vector CSV"],
    database: ["NORAD Key Relational Schema", "Historical Epoch Records", "Propagated Cartesian Vectors", "Deduplicated Flat-files"],
    challenges: ["Avoiding Space-Track API 429 rate lockouts.", "Sanitizing string-based API payloads.", "Handling out-of-bounds orbital calculations safely."],
    results: ["Delivered rapid command-line situation reporting.", "Built clean numerical data frames for collision warning research.", "Optimized bandwidth by caching TLE logs locally."],
    actions: [{ label: "GitHub", href: "https://github.com/sathyaseelan2006/space-debris-risk-prediction" }]
  },
  {
    icon: `<svg viewBox="0 0 24 24" class="project-svg-logo" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="3"/><path d="M12 15a4 4 0 0 0-4 4h8a4 4 0 0 0-4-4z"/></svg>`,
    title: "AI-powered Face Recognition Attendance System",
    shortName: "Attendance",
    category: "Computer Vision System",
    subtitle: "Automated attendance with face recognition, database integration, and reporting.",
    duration: "Completed May 2025",
    team: "Portfolio Project",
    role: "Full-stack ML Developer",
    stack: ["Python", "OpenCV", "DeepFace", "Flask", "MySQL", "AI/ML"],
    overview:
      "An advanced attendance system using facial recognition technology with OpenCV and Python. It includes real-time face detection, database integration, and reporting.",
    milestone: "Completed as a live AI attendance workflow combining computer vision, backend APIs, and persistent data storage.",
    responsibilities: ["Designed the recognition workflow from camera input to attendance storage.", "Integrated OpenCV and DeepFace for detection and verification.", "Built backend routes for database-backed attendance records.", "Created reporting-oriented UI flows."],
    problem: ["Manual attendance is slow and prone to proxy entries.", "Institutions need faster and more reliable attendance records.", "Face matching must be usable in real-time conditions."],
    solution: ["Implemented face detection and verification with Python vision libraries.", "Stored verified attendance in MySQL.", "Built a web workflow for review and reporting."],
    features: ["Real-time face detection.", "Face verification using DeepFace.", "MySQL-backed attendance records.", "Report-friendly attendance management interface."],
    architecture: ["Camera", "OpenCV", "DeepFace", "Flask API", "MySQL"],
    database: ["Attendance Records", "Student Identity Mapping", "Query Filtering", "Persistent Storage"],
    challenges: ["Handling face variation under different lighting and angles.", "Keeping detection responsive enough for real-time usage.", "Connecting vision output with reliable attendance storage."],
    results: ["Reduced manual attendance handling.", "Demonstrated applied computer vision in an institutional workflow.", "Combined ML, backend, and database skills in one product."],
    actions: [{ label: "Live Demo", href: "https://ai-powered-face-tracking-git-f03d76-sathyaseelan2006s-projects.vercel.app?_vercel_share=KrUW0wAyw4kBJGcIRFOHheixvxqr1wZv" }, { label: "GitHub", href: "https://github.com/sathyaseelan2006/AI-powered-face-tracking-attendance-system" }]
  }
];


const projectSelector = document.querySelector("[data-project-selector]");
const projectWheel = document.querySelector("[data-project-wheel]");
const caseCard = document.querySelector("[data-case-card]");
const projectCount = document.querySelector("[data-project-count]");
const prevProject = document.querySelector("[data-project-prev]");
const nextProject = document.querySelector("[data-project-next]");
let activeProjectIndex = 0;
let lastProjectWheel = 0;

function listMarkup(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function actionMarkup(actions) {
  return actions.map((action) => `<a href="${action.href}" target="_blank" rel="noopener">${action.label}</a>`).join("");
}

function renderCaseCard(project) {
  // Check if project has a video demo
  // Index 2 is Re:Vive -> "video_demo/revive-project_OwSZbMXm.mp4"
  // Index 4 is DeskBot -> "video_demo/Systemperipheral-demo.mp4"
  let videoHtml = "";
  if (project.shortName === "Re:Vive") {
    videoHtml = `
      <span class="case-card-stack-label" style="color: rgba(255, 18, 63, 0.95); font-weight: bold; margin-bottom: 4px; display: block;">// SYSTEM DEMONSTRATION ACTIVE</span>
      <div class="case-card-video-wrapper">
        <video class="case-card-video" src="video_demo/revive-project_OwSZbMXm.mp4" autoplay loop muted playsinline></video>
      </div>
    `;
  } else if (project.shortName === "DeskBot") {
    videoHtml = `
      <span class="case-card-stack-label" style="color: rgba(255, 18, 63, 0.95); font-weight: bold; margin-bottom: 4px; display: block;">// SYSTEM DEMONSTRATION ACTIVE</span>
      <div class="case-card-video-wrapper">
        <video class="case-card-video" src="video_demo/Systemperipheral-demo.mp4" autoplay loop muted playsinline></video>
      </div>
    `;
  }

  // Create links at the top of the card (GitHub & Live Demo)
  let githubLink = project.actions.find(a => a.label === "GitHub" || a.label.toLowerCase().includes("git"));
  let liveLink = project.actions.find(a => a.label === "Live Demo" || a.label.toLowerCase().includes("live") || a.label.toLowerCase().includes("research"));
  let linksHtml = "";
  if (liveLink) {
    linksHtml += `
      <a href="${liveLink.href}" target="_blank" rel="noopener" class="case-card-link-btn case-card-link-highlight">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        ${liveLink.label}
      </a>
    `;
  }
  if (githubLink) {
    linksHtml += `
      <a href="${githubLink.href}" target="_blank" rel="noopener" class="case-card-link-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
        Source
      </a>
    `;
  }

  let projectIdText = `[PROJ-${String(activeProjectIndex + 1).padStart(2, '0')}]`;
  const tagsHtml = project.stack.map(tag => `<span class="case-card-stack-tag">${tag}</span>`).join("");

  const milestone = project.milestone || "Analysis completed.";
  const problem = project.problem ? project.problem[0] : "Telemetry reading missing.";
  const challenge = project.challenges ? project.challenges[0] : "Deployment logs unresolved.";
  const feature = project.features ? project.features[0] : "Core engine initialization.";

  const diagnosticGridHtml = `
    <div class="case-card-diagnostic-grid">
      <div class="diagnostic-box">
        <span class="diagnostic-label">// MILESTONE</span>
        <p class="diagnostic-text">${milestone}</p>
      </div>
      <div class="diagnostic-box">
        <span class="diagnostic-label">// KEY FEATURE</span>
        <p class="diagnostic-text">${feature}</p>
      </div>
      <div class="diagnostic-box">
        <span class="diagnostic-label">// PROBLEM</span>
        <p class="diagnostic-text">${problem}</p>
      </div>
      <div class="diagnostic-box">
        <span class="diagnostic-label">// CHALLENGE</span>
        <p class="diagnostic-text">${challenge}</p>
      </div>
    </div>
  `;

  caseCard.innerHTML = `
    <div class="case-card-top-bar">
      <span class="case-card-project-id">${projectIdText}</span>
      <div class="case-card-links">${linksHtml}</div>
    </div>
    
    ${videoHtml}

    <div class="case-card-header-info">
      <span class="case-card-category">${project.category}</span>
      <h3>${project.title}</h3>
      <p class="case-card-subtitle">${project.subtitle}</p>
    </div>

    <div class="case-card-meta-line">
      <span>// DURATION: <strong>${project.duration}</strong></span>
    </div>

    <div>
      <span class="case-card-stack-label">// STACK_CORE</span>
      <div class="case-card-stack-badges">${tagsHtml}</div>
    </div>

    <div class="case-card-brief-info">
      ${project.overview}
    </div>

    ${diagnosticGridHtml}

    <button type="button" class="case-card-btn-more" onclick="openProjectDetail()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      Expand Diagnostic Details
    </button>
  `;

  caseCard.scrollTop = 0;
  caseCard.classList.remove("is-swapping");
  requestAnimationFrame(() => caseCard.classList.add("is-swapping"));
}

// ==========================================
// DETAILED README MARKDOWN PARSER ENGINE & MODAL
// ==========================================

function markdownToHtml(md) {
  if (!md) return "";
  const lines = md.split('\n');
  let html = '';
  let inList = false;
  let inCode = false;
  let codeContent = [];
  let codeLang = '';
  let inQuote = false;
  
  for (let line of lines) {
    if (line.trim().startsWith('```')) {
      if (inCode) {
        inCode = false;
        const codeText = codeContent.join('\n')
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        if (codeLang === 'mermaid') {
          html += `<div class="md-mermaid"><pre class="mermaid-raw">${codeText}</pre></div>`;
        } else {
          html += `<pre class="md-code-block"><code class="language-${codeLang}">${codeText}</code></pre>`;
        }
        codeContent = [];
      } else {
        inCode = true;
        codeLang = line.trim().substring(3).trim();
      }
      continue;
    }
    
    if (inCode) {
      codeContent.push(line);
      continue;
    }
    
    const trimmed = line.trim();
    
    if (trimmed.startsWith('>')) {
      if (!inQuote) {
        html += '<blockquote>';
        inQuote = true;
      }
      const quoteText = line.substring(line.indexOf('>') + 1).trim();
      html += parseInlineMarkdown(quoteText) + '<br>';
      continue;
    } else if (inQuote) {
      html += '</blockquote>';
      inQuote = false;
    }
    
    const listMatch = line.match(/^(\s*)([\*\-\+])\s+(.*)$/);
    if (listMatch) {
      if (!inList) {
        html += '<ul>';
        inList = true;
      }
      html += `<li>${parseInlineMarkdown(listMatch[3])}</li>`;
      continue;
    } else {
      if (inList && trimmed === '') {
        // keep list open
      } else if (inList && !listMatch) {
        html += '</ul>';
        inList = false;
      }
    }
    
    if (trimmed.startsWith('#')) {
      const depth = trimmed.match(/^#+/)[0].length;
      const text = trimmed.substring(depth).trim();
      html += `<h${depth}>${parseInlineMarkdown(text)}</h${depth}>`;
      continue;
    }
    
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      html += '<hr>';
      continue;
    }
    
    if (trimmed !== '') {
      html += `<p>${parseInlineMarkdown(line)}</p>`;
    } else {
      html += '<br>';
    }
  }
  
  if (inQuote) html += '</blockquote>';
  if (inList) html += '</ul>';
  
  return html.replace(/<p><\/p>/g, '').replace(/(<br>){2,}/g, '<br>');
}

function parseInlineMarkdown(text) {
  let escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
    
  escaped = escaped.replace(/`([^`]+)`/g, '<code class="md-inline-code">$1</code>');
  escaped = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  escaped = escaped.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  escaped = escaped.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  escaped = escaped.replace(/_([^_]+)_/g, '<em>$1</em>');
  escaped = escaped.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  
  return escaped;
}

function buildFallbackDetailHtml(project) {
  return `
    <h1>${project.title}</h1>
    <div style="font-size: 0.72rem; color: rgba(255, 18, 63, 0.95); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 24px;">
      CASE STUDY
    </div>

    <div class="fallback-modal-grid">
      <div class="fallback-modal-block">
        <h3>// SYSTEM TECH_STACK</h3>
        <div class="case-card-stack-badges">
          ${project.stack.map(tag => `<span class="case-card-stack-tag">${tag}</span>`).join("")}
        </div>
      </div>

      <div class="fallback-modal-block">
        <h3>// PROJECT OVERVIEW</h3>
        <p>${project.overview}</p>
        <p><strong>Milestone:</strong> ${project.milestone}</p>
      </div>

      <div class="fallback-modal-split">
        <div class="fallback-modal-block">
          <h3>// PROBLEM STATEMENT</h3>
          <ul>
            ${project.problem.map(item => `<li>${item}</li>`).join("")}
          </ul>
        </div>
        <div class="fallback-modal-block">
          <h3>// SOLUTION IMPLEMENTED</h3>
          <ul>
            ${project.solution.map(item => `<li>${item}</li>`).join("")}
          </ul>
        </div>
      </div>

      <div class="fallback-modal-block">
        <h3>// LEADERSHIP & RESPONSIBILITIES</h3>
        <ul>
          ${project.responsibilities.map(item => `<li>${item}</li>`).join("")}
        </ul>
      </div>

      <div class="fallback-modal-block">
        <h3>// KEY FEATURES</h3>
        <ul>
          ${project.features.map(item => `<li>${item}</li>`).join("")}
        </ul>
      </div>

      <div class="fallback-modal-block">
        <h3>// SYSTEM ARCHITECTURE</h3>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
          ${project.architecture.map(node => `<div class="case-card-stack-tag">${node}</div>`).join(" &rarr; ")}
        </div>
      </div>

      <div class="fallback-modal-split">
        <div class="fallback-modal-block">
          <h3>// DATABASE CONCEPTS APPLIED</h3>
          <ul>
            ${project.database.map(item => `<li>${item}</li>`).join("")}
          </ul>
        </div>
        <div class="fallback-modal-block">
          <h3>// CHALLENGES FACED</h3>
          <ul>
            ${project.challenges.map(item => `<li>${item}</li>`).join("")}
          </ul>
        </div>
      </div>

      <div class="fallback-modal-block">
        <h3>// RESULTS & IMPACT</h3>
        <ul>
          ${project.results.map(item => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}

const detailModal = document.getElementById("project-detail-modal");
const modalContent = detailModal ? detailModal.querySelector(".project-modal-content") : null;

window.openProjectDetail = function() {
  if (!detailModal || !modalContent) return;
  const project = projectCases[activeProjectIndex];
  const markdown = (typeof PROJECT_READMES !== "undefined" && PROJECT_READMES) ? PROJECT_READMES[project.shortName] : null;
  
  if (markdown) {
    modalContent.innerHTML = markdownToHtml(markdown);
  } else {
    modalContent.innerHTML = buildFallbackDetailHtml(project);
  }
  
  detailModal.classList.add("active");
  detailModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

window.closeProjectDetail = function() {
  if (!detailModal) return;
  detailModal.classList.remove("active");
  detailModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

if (detailModal) {
  const closeBtn = detailModal.querySelector(".project-modal-close");
  const backdrop = detailModal.querySelector(".project-modal-backdrop");
  
  closeBtn?.addEventListener("click", window.closeProjectDetail);
  backdrop?.addEventListener("click", window.closeProjectDetail);
  
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && detailModal.classList.contains("active")) {
      window.closeProjectDetail();
    }
  });
}

function positionWheelNodes() {
  const nodes = document.querySelectorAll(".wheel-node");
  nodes.forEach((node, index) => {
    const offset = index - activeProjectIndex;
    const clamped = Math.max(-3, Math.min(3, offset));
    const angle = clamped * 34;
    const radians = (angle * Math.PI) / 180;
    const xRadius = 74;
    const yRadius = 188;
    const x = -Math.cos(radians) * xRadius + 8;
    const y = Math.sin(radians) * yRadius - 24;
    const visibleDistance = Math.min(Math.abs(offset), 4);
    const opacity = Math.max(0.1, 1 - visibleDistance * 0.22);
    const blur = visibleDistance === 0 ? 0 : Math.min(4, visibleDistance * 0.75);
    const scale = visibleDistance === 0 ? 1.08 : Math.max(0.78, 1 - visibleDistance * 0.09);

    node.style.setProperty("--wheel-x", `${x}px`);
    node.style.setProperty("--wheel-y", `${y}px`);
    node.style.setProperty("--wheel-opacity", opacity);
    node.style.setProperty("--wheel-blur", `${blur}px`);
    node.style.setProperty("--wheel-scale", scale);
    node.style.zIndex = String(10 - visibleDistance);
    node.classList.toggle("active", index === activeProjectIndex);
    node.setAttribute("aria-current", index === activeProjectIndex ? "true" : "false");
  });
}

function setActiveProject(index) {
  const nextIndex = Math.max(0, Math.min(projectCases.length - 1, index));
  if (nextIndex === activeProjectIndex && caseCard.innerHTML) return;
  activeProjectIndex = nextIndex;
  renderCaseCard(projectCases[activeProjectIndex]);
  positionWheelNodes();
  projectCount.textContent = `${String(activeProjectIndex + 1).padStart(2, "0")} / ${String(projectCases.length).padStart(2, "0")}`;
}

if (projectSelector && projectWheel && caseCard) {
  projectSelector.tabIndex = 0;

  projectCases.forEach((project, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "wheel-node";
    button.innerHTML = `
      <span class="wheel-icon">${project.icon}</span>
      <span class="wheel-name"><strong>${project.shortName}</strong><span>${project.category}</span></span>
    `;
    button.addEventListener("click", () => setActiveProject(index));
    projectWheel.appendChild(button);
  });

  setActiveProject(0);

  nextProject?.addEventListener("click", () => setActiveProject(activeProjectIndex + 1));
  prevProject?.addEventListener("click", () => setActiveProject(activeProjectIndex - 1));

  projectSelector.addEventListener(
    "wheel",
    (event) => {
      if (Math.abs(event.deltaY) < 8) return;
      const direction = event.deltaY > 0 ? 1 : -1;
      const atStart = activeProjectIndex === 0 && direction < 0;
      const atEnd = activeProjectIndex === projectCases.length - 1 && direction > 0;
      if (atStart || atEnd) return;

      event.preventDefault();
      const now = Date.now();
      if (now - lastProjectWheel < 620) return;
      lastProjectWheel = now;
      setActiveProject(activeProjectIndex + direction);
    },
    { passive: false }
  );

  projectSelector.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      setActiveProject(activeProjectIndex + 1);
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      setActiveProject(activeProjectIndex - 1);
    }
  });
}

const blackHole = document.querySelector("[data-black-hole]");

if (blackHole && !prefersReducedMotion) {
  window.addEventListener("pointermove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 14;
    const y = (event.clientY / window.innerHeight - 0.5) * -14;
    blackHole.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  });

  window.addEventListener("pointerleave", () => {
    blackHole.style.transform = "rotateY(0deg) rotateX(0deg)";
  });
}

document.querySelectorAll(".project-card, .feature-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (prefersReducedMotion) return;
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 5;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -5;
    card.style.transform = `translateY(-4px) rotateX(${y}deg) rotateY(${x}deg)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

const contactForm = document.getElementById("contactForm");

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  const submitBtn = contactForm.querySelector("button[type='submit']");
  if (!submitBtn) return;
  const originalBtnText = submitBtn.innerHTML;

  let statusMsg = contactForm.querySelector(".contact-status-msg");
  if (!statusMsg) {
    statusMsg = document.createElement("p");
    statusMsg.className = "contact-status-msg";
    contactForm.appendChild(statusMsg);
  }
  
  // Set loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <svg viewBox="0 0 24 24" class="btn-spinner-icon" aria-hidden="true" style="animation: spin 1s linear infinite; width: 16px; height: 16px; margin-right: 8px; vertical-align: middle; stroke: currentColor;"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.49 8.49l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.49-8.49l2.83-2.83" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
    Transmitting...
  `;
  
  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  try {
    if (typeof emailjs !== 'undefined') {
      const response = await emailjs.sendForm('service_ecgl309', 'template_awoksaq', contactForm);
      console.log('✅ EmailJS Response:', response);
      statusMsg.className = "contact-status-msg success";
      statusMsg.textContent = "✨ Message sent successfully! I'll get back to you soon.";
      contactForm.reset();
    } else {
      throw new Error("EmailJS SDK not loaded.");
    }
  } catch (error) {
    console.error('❌ EmailJS transmission error:', error);
    statusMsg.className = "contact-status-msg error";
    statusMsg.textContent = "❌ Transmission failed. Fallback to direct mail link...";
    
    // Redirect via mailto after a short delay
    setTimeout(() => {
      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
      window.location.href = `mailto:ksathyaseelan34@gmail.com?subject=${subject}&body=${body}`;
    }, 1800);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
  }
});

// ==========================================
// SKILLS VISUALIZER ENGINE
// ==========================================

const skillsData = [
  {
    id: "python",
    name: "Python",
    level: 85,
    category: "Languages & Databases",
    growth: { 2023: 15, 2024: 45, 2025: 75, 2026: 85 },
    description: "Core programming language for developing AI/ML models, numerical computing, computer vision algorithms, and backend scripting.",
    projects: [0, 1, 5, 6, 7], // Megam, MotorMony, L.U.D.O, Space Debris, Attendance
    certs: [
      { name: "Supervised Machine Learning (Coursera)", href: "#credentials" },
      { name: "Oracle Data Science Professional", href: "#credentials" }
    ]
  },
  {
    id: "java",
    name: "Java",
    level: 90,
    category: "Languages & Databases",
    growth: { 2023: 50, 2024: 75, 2025: 85, 2026: 90 },
    description: "Primary programming language for backend architectures, object-oriented software engineering (SDE), data structures, algorithms, and system integration.",
    projects: [3, 4], // PolyVault, DeskBot
    certs: [
      { name: "Academic DSA Coursework", href: "#credentials" }
    ]
  },
  {
    id: "sql",
    name: "SQL",
    level: 85,
    category: "Languages & Databases",
    growth: { 2023: 30, 2024: 60, 2025: 75, 2026: 85 },
    description: "Structured querying language used to design databases, write optimized complex queries, and manage transactional schemas.",
    projects: [0, 1, 7], // Megam, MotorMony, Attendance
    certs: [
      { name: "Oracle Cloud Database Services", href: "#credentials" }
    ]
  },
  {
    id: "mysql",
    name: "MySQL",
    level: 80,
    category: "Languages & Databases",
    growth: { 2023: 20, 2024: 55, 2025: 70, 2026: 80 },
    description: "Relational database management system implemented for user profiles, transaction logs, and persistent state storage.",
    projects: [0, 7], // Megam, Attendance
    certs: [
      { name: "Oracle Cloud Database Services", href: "#credentials" }
    ]
  },
  {
    id: "mongodb",
    name: "MongoDB",
    level: 80,
    category: "Languages & Databases",
    growth: { 2023: 0, 2024: 25, 2025: 60, 2026: 80 },
    description: "NoSQL document store used for flexible logging, high-throughput IoT signals, and cached data structures.",
    projects: [2, 4], // Re:Vive, DeskBot
    certs: []
  },
  {
    id: "flask",
    name: "Flask & REST APIs",
    level: 82,
    category: "Backend & AI/ML",
    growth: { 2023: 0, 2024: 30, 2025: 70, 2026: 82 },
    description: "Micro-framework used to construct API servers, handle secure requests, and deliver ML model inference pipelines.",
    projects: [0, 1, 7], // Megam, MotorMony, Attendance
    certs: []
  },
  {
    id: "analytics",
    name: "Data Analytics",
    level: 82,
    category: "Backend & AI/ML",
    growth: { 2023: 10, 2024: 40, 2025: 70, 2026: 82 },
    description: "Techniques for data cleansing, parsing logs, generating statistical distributions, and optimizing backend systems.",
    projects: [0, 1, 6], // Megam, MotorMony, Space Debris
    certs: [
      { name: "Oracle Data Science Professional", href: "#credentials" }
    ]
  },
  {
    id: "opencv",
    name: "Computer Vision (OpenCV)",
    level: 80,
    category: "Backend & AI/ML",
    growth: { 2023: 0, 2024: 35, 2025: 65, 2026: 80 },
    description: "Real-time image processing, frame transformations, contours detection, and drawing utility layers in visual applications.",
    projects: [7], // Attendance
    certs: []
  },
  {
    id: "deepface",
    name: "DeepFace Recognition",
    level: 80,
    category: "Backend & AI/ML",
    growth: { 2023: 0, 2024: 0, 2025: 50, 2026: 80 },
    description: "Neural face verification models integrated for automated attendance scanning and matching filters.",
    projects: [7], // Attendance
    certs: []
  },
  {
    id: "git",
    name: "Git",
    level: 88,
    category: "Cloud & Tools",
    growth: { 2023: 20, 2024: 55, 2025: 80, 2026: 88 },
    description: "Distributed version control system utilized across all engineering operations for deployment, branching, and team integration.",
    projects: [0, 1, 2, 3, 4, 5, 6, 7], // All
    certs: []
  },
  {
    id: "vscode",
    name: "VS Code",
    level: 90,
    category: "Cloud & Tools",
    growth: { 2023: 45, 2024: 70, 2025: 85, 2026: 90 },
    description: "Primary development workspace, configured with custom debug runtimes, linting configurations, and remote server access.",
    projects: [0, 1, 2, 3, 4, 5, 6, 7], // All
    certs: []
  },
  {
    id: "xampp",
    name: "XAMPP",
    level: 80,
    category: "Cloud & Tools",
    growth: { 2023: 30, 2024: 60, 2025: 75, 2026: 80 },
    description: "Local development server workspace containing Apache and MySQL environments for prototyping DBMS solutions.",
    projects: [0, 7], // Megam, Attendance
    certs: []
  },
  {
    id: "gcloud",
    name: "Google Cloud",
    level: 75,
    category: "Cloud & Tools",
    growth: { 2023: 0, 2024: 20, 2025: 50, 2026: 75 },
    description: "Cloud infrastructure deployment platform, hosting storage buckets, database instances, and functions.",
    projects: [],
    theory: [
      "Cloud Infrastructure & Virtualization Principles",
      "Identity & Access Management (IAM) Service Accounts",
      "Google Compute Engine (GCE) & Virtual Private Clouds (VPCs)",
      "Object Storage Architecture (Google Cloud Storage)",
      "Serverless FaaS Architectures (GCP Cloud Functions)"
    ],
    certs: []
  }
];

// UI element cache
const skillsVisualizer = document.getElementById("skills-visualizer-container");
const svgCanvas = document.getElementById("skills-svg-canvas");
const skillsTooltip = document.getElementById("skills-tooltip");
const chartTabs = document.querySelectorAll(".chart-tab");

// Proof Console cache
const consoleDefault = document.getElementById("console-default-state");
const consoleActive = document.getElementById("console-active-state");
const consoleSkillName = document.getElementById("console-skill-name");
const consoleSkillLevel = document.getElementById("console-skill-level");
const consoleSkillDesc = document.getElementById("console-skill-desc");
const consoleSkillProjects = document.getElementById("console-skill-projects");
const consoleSkillCerts = document.getElementById("console-skill-certs");
const consoleCertsContainer = document.getElementById("console-certs-container");

const growthNodes = {
  2023: document.getElementById("growth-2023"),
  2024: document.getElementById("growth-2024"),
  2025: document.getElementById("growth-2025"),
  2026: document.getElementById("growth-2026")
};

let activeSkill = null;
let currentView = "bar";

// Render SVG chart depending on selection
function initSkillsVisualizer() {
  if (!skillsVisualizer || !svgCanvas) return;

  // Tab switching
  chartTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      chartTabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      currentView = tab.getAttribute("data-view");
      renderActiveChart();
    });
  });

  // Handle outside click to reset console
  document.addEventListener("click", (e) => {
    if (!skillsVisualizer.contains(e.target)) {
      activeSkill = null;
      resetProofConsole();
      renderActiveChart();
    }
  });

  renderActiveChart();
}

function renderActiveChart() {
  // Hide background spider web grid by default
  const webGrid = document.getElementById("spider-web-grid");
  if (webGrid) {
    webGrid.setAttribute("opacity", "0");
  }

  // Clear dynamic SVG elements but keep the background spider web grid and <defs>
  const nodes = Array.from(svgCanvas.childNodes);
  nodes.forEach(node => {
    if (node.id !== "spider-web-grid" && node.tagName !== "defs") {
      svgCanvas.removeChild(node);
    }
  });

  // Re-inject <defs> if cleared
  let defs = svgCanvas.querySelector("defs");
  if (!defs) {
    defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `
      <linearGradient id="barGradient" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stop-color="var(--red-deep)" stop-opacity="0.8" />
        <stop offset="70%" stop-color="var(--red)" stop-opacity="0.9" />
        <stop offset="100%" stop-color="var(--ember)" stop-opacity="1" />
      </linearGradient>
      <linearGradient id="sparklineAreaGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--red)" stop-opacity="0.3" />
        <stop offset="100%" stop-color="var(--red)" stop-opacity="0" />
      </linearGradient>
      <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    `;
    svgCanvas.insertBefore(defs, svgCanvas.firstChild);
  }

  if (currentView === "bar") {
    drawBarChart();
  } else if (currentView === "pie") {
    drawDonutChart();
  } else if (currentView === "spider") {
    drawSpiderChart();
  }
}

function drawBarChart() {
  const top = 40, bottom = 90, left = 70, right = 30;
  const width = 800 - left - right;
  const height = 450 - top - bottom;
  
  // Y Grid lines (20, 40, 60, 80, 100)
  for (let l = 20; l <= 100; l += 20) {
    const yVal = top + height - (l / 100) * height;
    // line
    const gridLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    gridLine.setAttribute("x1", String(left));
    gridLine.setAttribute("y1", String(yVal));
    gridLine.setAttribute("x2", String(left + width));
    gridLine.setAttribute("y2", String(yVal));
    gridLine.setAttribute("stroke", "var(--line)");
    gridLine.setAttribute("stroke-dasharray", "4 4");
    svgCanvas.appendChild(gridLine);

    // text label
    const textLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textLabel.setAttribute("x", String(left - 12));
    textLabel.setAttribute("y", String(yVal + 4));
    textLabel.setAttribute("fill", "var(--dim)");
    textLabel.setAttribute("font-size", "11");
    textLabel.setAttribute("font-weight", "600");
    textLabel.setAttribute("text-anchor", "end");
    textLabel.textContent = `${l}%`;
    svgCanvas.appendChild(textLabel);
  }

  // Base Y Axis Line
  const baseLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
  baseLine.setAttribute("x1", String(left));
  baseLine.setAttribute("y1", String(top + height));
  baseLine.setAttribute("x2", String(left + width));
  baseLine.setAttribute("y2", String(top + height));
  baseLine.setAttribute("stroke", "var(--line)");
  svgCanvas.appendChild(baseLine);

  const step = width / skillsData.length;
  const barWidth = 32;

  skillsData.forEach((skill, i) => {
    const x = left + i * step + (step - barWidth) / 2;
    const barHeight = (skill.level / 100) * height;
    const y = top + height - barHeight;

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.style.cursor = "pointer";
    g.setAttribute("class", "chart-group");

    // Inner group for visual elements (prevents hover jitter by remaining separate from the static overlay)
    const visuals = document.createElementNS("http://www.w3.org/2000/svg", "g");
    visuals.setAttribute("class", "chart-visuals");

    // Glowing rect (animated heights)
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", String(x));
    rect.setAttribute("y", String(top + height));
    rect.setAttribute("width", String(barWidth));
    rect.setAttribute("height", "0");
    rect.setAttribute("rx", "4");
    rect.setAttribute("ry", "4");
    rect.setAttribute("fill", "url(#barGradient)");
    rect.setAttribute("class", "chart-bar");
    rect.style.transition = "height 800ms cubic-bezier(0.2, 0.8, 0.2, 1), y 800ms cubic-bezier(0.2, 0.8, 0.2, 1)";
    rect.style.transitionDelay = `${i * 35}ms`;

    if (activeSkill && activeSkill.id === skill.id) {
      rect.setAttribute("filter", "url(#glowFilter)");
      rect.setAttribute("stroke", "var(--white)");
      rect.setAttribute("stroke-width", "1.5");
    }
    visuals.appendChild(rect);

    // Dynamic glowing cap line (draws at the top of each bar)
    const cap = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    cap.setAttribute("x", String(x));
    cap.setAttribute("y", String(top + height));
    cap.setAttribute("width", String(barWidth));
    cap.setAttribute("height", "2.5");
    cap.setAttribute("rx", "1");
    cap.setAttribute("fill", "var(--white)");
    cap.setAttribute("filter", "url(#glowFilter)");
    cap.style.transition = "y 800ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 300ms ease";
    cap.style.transitionDelay = `${i * 35}ms`;
    cap.style.opacity = "0";
    visuals.appendChild(cap);

    // Trigger animations in the next frame
    requestAnimationFrame(() => {
      rect.setAttribute("y", String(y));
      rect.setAttribute("height", String(barHeight));
      cap.setAttribute("y", String(y));
      cap.style.opacity = "1";
    });

    // Angled Label (fades in staggered)
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const labelX = x + barWidth / 2;
    const labelY = top + height + 18;
    text.setAttribute("x", String(labelX));
    text.setAttribute("y", String(labelY));
    text.setAttribute("transform", `rotate(-35, ${labelX}, ${labelY})`);
    text.setAttribute("text-anchor", "end");
    text.setAttribute("fill", activeSkill && activeSkill.id === skill.id ? "var(--white)" : "var(--muted)");
    text.setAttribute("font-size", "11");
    text.setAttribute("font-weight", "700");
    text.textContent = skill.name;
    text.style.opacity = "0";
    text.style.transition = "opacity 400ms ease";
    text.style.transitionDelay = `${i * 35 + 200}ms`;
    visuals.appendChild(text);

    requestAnimationFrame(() => {
      text.style.opacity = "1";
    });

    // Add visuals to main group
    g.appendChild(visuals);

    // Transparent overlay for easier hover interaction (stays stationary as sibling of visuals)
    const overlay = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    overlay.setAttribute("x", String(left + i * step));
    overlay.setAttribute("y", String(top));
    overlay.setAttribute("width", String(step));
    overlay.setAttribute("height", String(height + 80));
    overlay.setAttribute("fill", "transparent");

    // Events
    overlay.addEventListener("mouseenter", (e) => {
      showTooltip(e, skill);
      updateProofConsole(skill, false);
      g.classList.add("hovered");
      rect.setAttribute("filter", "url(#glowFilter)");
      cap.setAttribute("fill", "var(--ember)");
    });
    overlay.addEventListener("mousemove", (e) => {
      positionTooltip(e);
    });
    overlay.addEventListener("mouseleave", () => {
      hideTooltip();
      g.classList.remove("hovered");
      if (!activeSkill || activeSkill.id !== skill.id) {
        rect.removeAttribute("filter");
        cap.setAttribute("fill", "var(--white)");
      }
      restoreProofConsole();
    });
    overlay.addEventListener("click", (e) => {
      e.stopPropagation();
      activeSkill = skill;
      updateProofConsole(skill, true);
      renderActiveChart();
    });

    g.appendChild(overlay);
    svgCanvas.appendChild(g);
  });
}

function drawDonutChart() {
  const cx = 400;
  const cy = 225;
  const R = 180;
  const r = 115;

  const total = skillsData.reduce((acc, s) => acc + s.level, 0);
  const averageLevel = skillsData.reduce((acc, s) => acc + s.level, 0) / skillsData.length;

  // Background telemetry rings
  const bgRings = [205, 148, 88];
  bgRings.forEach(radius => {
    const bgCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    bgCircle.setAttribute("cx", String(cx));
    bgCircle.setAttribute("cy", String(cy));
    bgCircle.setAttribute("r", String(radius));
    bgCircle.setAttribute("fill", "none");
    bgCircle.setAttribute("stroke", "rgba(255, 18, 63, 0.05)");
    bgCircle.setAttribute("stroke-width", "1");
    if (radius === 148 || radius === 205) {
      bgCircle.setAttribute("stroke-dasharray", "4 8");
    }
    svgCanvas.appendChild(bgCircle);
  });

  // Central dark circular console backing
  const centerBack = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  centerBack.setAttribute("cx", String(cx));
  centerBack.setAttribute("cy", String(cy));
  centerBack.setAttribute("r", "108");
  centerBack.setAttribute("fill", "rgba(5, 3, 5, 0.92)");
  centerBack.setAttribute("stroke", "rgba(255, 18, 63, 0.2)");
  centerBack.setAttribute("stroke-width", "2");
  svgCanvas.appendChild(centerBack);

  // Group label positioning calculations
  const leftLabels = [];
  const rightLabels = [];

  let currentStartAngle = -Math.PI / 2; // top
  skillsData.forEach((skill, i) => {
    const sweepAngle = (skill.level / total) * 2 * Math.PI;
    const midAngle = currentStartAngle + sweepAngle / 2;
    
    // Normalize midAngle to -PI to PI
    let normalizedAngle = midAngle;
    while (normalizedAngle > Math.PI) normalizedAngle -= 2 * Math.PI;
    while (normalizedAngle < -Math.PI) normalizedAngle += 2 * Math.PI;

    const isLeft = Math.cos(normalizedAngle) < 0;
    // Default Y calculation
    const targetY = cy + (R + 25) * Math.sin(normalizedAngle);
    
    const labelData = {
      index: i,
      skill: skill,
      midAngle: normalizedAngle,
      sweepAngle: sweepAngle,
      startAngle: currentStartAngle,
      targetY: targetY,
      y: targetY,
      isLeft: isLeft
    };
    
    if (isLeft) {
      leftLabels.push(labelData);
    } else {
      rightLabels.push(labelData);
    }
    
    currentStartAngle += sweepAngle;
  });

  // Collision resolver relaxation algorithm
  function resolveYPositions(labels) {
    if (labels.length === 0) return;
    
    // Sort from top to bottom
    labels.sort((a, b) => a.targetY - b.targetY);
    
    // Initialize Y
    labels.forEach(l => { l.y = l.targetY; });
    
    const minGap = 21; // minimum spacing
    const minY = 35;
    const maxY = 415;
    
    for (let iter = 0; iter < 30; iter++) {
      for (let i = 0; i < labels.length - 1; i++) {
        const curr = labels[i];
        const next = labels[i + 1];
        const overlap = minGap - (next.y - curr.y);
        if (overlap > 0) {
          curr.y -= overlap / 2;
          next.y += overlap / 2;
        }
      }
      labels.forEach(l => {
        if (l.y < minY) l.y = minY;
        if (l.y > maxY) l.y = maxY;
      });
    }
  }

  resolveYPositions(leftLabels);
  resolveYPositions(rightLabels);

  const resolvedYMap = {};
  leftLabels.forEach(l => { resolvedYMap[l.index] = l.y; });
  rightLabels.forEach(l => { resolvedYMap[l.index] = l.y; });

  // Reset angle to draw
  let drawStartAngle = -Math.PI / 2;

  skillsData.forEach((skill, i) => {
    const sweepAngle = (skill.level / total) * 2 * Math.PI;
    const endAngle = drawStartAngle + sweepAngle;
    const midAngle = drawStartAngle + sweepAngle / 2;
    const isLeft = Math.cos(midAngle) < 0;
    
    const resolvedY = resolvedYMap[i];

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.style.cursor = "pointer";
    g.setAttribute("class", "chart-group");

    // Inset slice angles for Brawl Royale spaces/gaps
    const gapStart = drawStartAngle + 0.012;
    const gapEnd = endAngle - 0.012;

    const x1 = cx + R * Math.cos(gapStart);
    const y1 = cy + R * Math.sin(gapStart);
    const x2 = cx + R * Math.cos(gapEnd);
    const y2 = cy + R * Math.sin(gapEnd);
    const x3 = cx + r * Math.cos(gapEnd);
    const y3 = cy + r * Math.sin(gapEnd);
    const x4 = cx + r * Math.cos(gapStart);
    const y4 = cy + r * Math.sin(gapStart);

    const largeArc = sweepAngle > Math.PI ? 1 : 0;
    const pathData = `M ${x1} ${y1} A ${R} ${R} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${r} ${r} 0 ${largeArc} 0 ${x4} ${y4} Z`;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    
    // Density opacity styling
    const opacityVal = 0.25 + 0.65 * (skill.level / 100);
    const hueAngle = 345 + (i * 1.5);
    path.setAttribute("fill", `hsla(${hueAngle}, 95%, 48%, ${opacityVal})`);
    path.setAttribute("stroke", "rgba(255, 81, 111, 0.45)");
    path.setAttribute("stroke-width", "1.2");
    path.setAttribute("class", "donut-slice");

    // Animation styling
    path.style.opacity = "0";
    path.style.transform = "scale(0.85)";
    path.style.transformOrigin = `${cx}px ${cy}px`;
    path.style.transition = "opacity 600ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1), stroke 200ms ease, fill 200ms ease";
    path.style.transitionDelay = `${i * 30}ms`;

    if (activeSkill && activeSkill.id === skill.id) {
      path.setAttribute("filter", "url(#glowFilter)");
      path.setAttribute("stroke", "var(--white)");
      path.setAttribute("stroke-width", "2");
      path.style.transform = "scale(1.02)";
      requestAnimationFrame(() => {
        path.style.transform = "scale(1.01)";
        path.style.opacity = "1";
      });
    } else {
      requestAnimationFrame(() => {
        path.style.transform = "scale(1)";
        path.style.opacity = "1";
      });
    }
    g.appendChild(path);

    // Radial hatch ticks inside the slice (Battle Royale gauge ticks)
    const ticks = Math.floor(skill.level / 20) + 1;
    for (let t = 1; t < ticks; t++) {
      const tickAngle = gapStart + ((gapEnd - gapStart) * t) / ticks;
      const tx1 = cx + r * Math.cos(tickAngle);
      const ty1 = cy + r * Math.sin(tickAngle);
      const tx2 = cx + R * Math.cos(tickAngle);
      const ty2 = cy + R * Math.sin(tickAngle);
      
      const tickLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      tickLine.setAttribute("x1", String(tx1));
      tickLine.setAttribute("y1", String(ty1));
      tickLine.setAttribute("x2", String(tx2));
      tickLine.setAttribute("y2", String(ty2));
      tickLine.setAttribute("stroke", "rgba(5, 3, 5, 0.5)");
      tickLine.setAttribute("stroke-width", "1.5");
      g.appendChild(tickLine);
    }

    // Lead Connector Lines (e.g. Esports stats curves)
    const sx = cx + R * Math.cos(midAngle);
    const sy = cy + R * Math.sin(midAngle);
    const mx1 = cx + (R + 15) * Math.cos(midAngle);
    const my1 = cy + (R + 15) * Math.sin(midAngle);
    
    const ex = isLeft ? 130 : 670;
    const mx2 = isLeft ? ex + 10 : ex - 10;
    const tx = isLeft ? 50 : 750;
    const textAnchor = isLeft ? "start" : "end";

    const leadLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
    leadLine.setAttribute("d", `M ${sx} ${sy} L ${mx1} ${my1} L ${mx2} ${resolvedY} L ${tx} ${resolvedY}`);
    leadLine.setAttribute("stroke", "rgba(255, 81, 111, 0.28)");
    leadLine.setAttribute("stroke-width", "1.2");
    leadLine.setAttribute("fill", "none");
    leadLine.setAttribute("id", `donut-lead-line-${i}`);
    leadLine.style.transition = "stroke 200ms ease, stroke-width 200ms ease";
    svgCanvas.appendChild(leadLine);

    // Text Label on Side
    const sideLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    sideLabel.setAttribute("x", String(tx));
    sideLabel.setAttribute("y", String(resolvedY + 3.5));
    sideLabel.setAttribute("text-anchor", textAnchor);
    sideLabel.setAttribute("id", `donut-label-${i}`);
    sideLabel.style.fontFamily = "monospace";
    sideLabel.style.fontSize = "10px";
    sideLabel.style.transition = "transform 200ms ease";

    const pctSpan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    pctSpan.setAttribute("font-weight", "900");
    pctSpan.setAttribute("fill", "var(--white)");
    pctSpan.textContent = `${skill.level}%`;
    sideLabel.appendChild(pctSpan);

    const nameSpan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    nameSpan.setAttribute("font-weight", "800");
    nameSpan.setAttribute("fill", "var(--muted)");
    nameSpan.textContent = ` ${skill.name.toUpperCase()}`;
    sideLabel.appendChild(nameSpan);

    svgCanvas.appendChild(sideLabel);

    // Overlay path for wider mouse hit target
    const hoverPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    hoverPath.setAttribute("d", pathData);
    hoverPath.setAttribute("fill", "transparent");
    hoverPath.setAttribute("style", "cursor: pointer;");

    // Hover Events
    hoverPath.addEventListener("mouseenter", (e) => {
      showTooltip(e, skill);
      updateProofConsole(skill, false);
      
      path.setAttribute("filter", "url(#glowFilter)");
      path.setAttribute("stroke", "rgba(255, 255, 255, 0.8)");
      path.style.transform = "scale(1.02)";
      path.style.transformOrigin = `${cx}px ${cy}px`;
      
      const lineEl = document.getElementById(`donut-lead-line-${i}`);
      if (lineEl) {
        lineEl.setAttribute("stroke", "var(--red-soft)");
        lineEl.setAttribute("stroke-width", "1.8");
      }
      
      const lblEl = document.getElementById(`donut-label-${i}`);
      if (lblEl) {
        lblEl.querySelector("tspan:first-child").setAttribute("fill", "var(--red-soft)");
        lblEl.style.transform = "scale(1.08)";
        lblEl.style.transformOrigin = `${isLeft ? 50 : 750}px ${resolvedY}px`;
      }
      
      updateCenterReadout(skill);
    });

    hoverPath.addEventListener("mousemove", (e) => {
      positionTooltip(e);
    });

    hoverPath.addEventListener("mouseleave", () => {
      hideTooltip();
      
      if (!activeSkill || activeSkill.id !== skill.id) {
        path.removeAttribute("filter");
        path.setAttribute("stroke", "rgba(255, 81, 111, 0.45)");
        path.style.transform = "scale(1)";
      } else {
        path.style.transform = "scale(1.01)";
        path.setAttribute("stroke", "var(--white)");
      }
      
      const lineEl = document.getElementById(`donut-lead-line-${i}`);
      if (lineEl) {
        const isLocked = activeSkill && activeSkill.id === skill.id;
        lineEl.setAttribute("stroke", isLocked ? "var(--red-soft)" : "rgba(255, 81, 111, 0.28)");
        lineEl.setAttribute("stroke-width", isLocked ? "1.6" : "1.2");
      }
      
      const lblEl = document.getElementById(`donut-label-${i}`);
      if (lblEl) {
        const isLocked = activeSkill && activeSkill.id === skill.id;
        lblEl.querySelector("tspan:first-child").setAttribute("fill", isLocked ? "var(--red-soft)" : "var(--white)");
        lblEl.style.transform = "scale(1)";
      }
      
      restoreProofConsole();
      restoreCenterReadout();
    });

    hoverPath.addEventListener("click", (e) => {
      e.stopPropagation();
      activeSkill = skill;
      updateProofConsole(skill, true);
      renderActiveChart();
    });

    g.appendChild(hoverPath);
    svgCanvas.appendChild(g);

    drawStartAngle = endAngle;
  });

  // Central Readout Shield Crest
  const crestG = document.createElementNS("http://www.w3.org/2000/svg", "g");
  crestG.setAttribute("class", "donut-center-crest");
  crestG.setAttribute("pointer-events", "none");
  
  // Hexagon shield path centered at (400, 180)
  const hex = document.createElementNS("http://www.w3.org/2000/svg", "path");
  hex.setAttribute("d", "M 400 150 L 424 166 L 424 194 L 400 210 L 376 194 L 376 166 Z");
  hex.setAttribute("fill", activeSkill ? "rgba(255, 18, 63, 0.3)" : "rgba(255, 18, 63, 0.2)");
  hex.setAttribute("stroke", "var(--red-soft)");
  hex.setAttribute("stroke-width", "2");
  hex.setAttribute("id", "donut-center-badge");
  hex.setAttribute("filter", "url(#glowFilter)");
  crestG.appendChild(hex);
  
  // Cyber Star inside shield
  const star = document.createElementNS("http://www.w3.org/2000/svg", "path");
  star.setAttribute("d", "M 400 162 L 404 173 L 416 173 L 406 180 L 410 191 L 400 184 L 390 191 L 394 180 L 384 173 L 396 173 Z");
  star.setAttribute("fill", "var(--white)");
  star.setAttribute("filter", "url(#glowFilter)");
  crestG.appendChild(star);
  
  svgCanvas.appendChild(crestG);

  // Central text group
  const textG = document.createElementNS("http://www.w3.org/2000/svg", "g");
  textG.setAttribute("pointer-events", "none");
  
  const centerText1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
  centerText1.setAttribute("x", String(cx));
  centerText1.setAttribute("y", "240");
  centerText1.setAttribute("text-anchor", "middle");
  centerText1.setAttribute("fill", "var(--muted)");
  centerText1.setAttribute("font-size", "9");
  centerText1.setAttribute("font-weight", "900");
  centerText1.setAttribute("letter-spacing", "0.08em");
  centerText1.setAttribute("id", "donut-center-tag");
  centerText1.textContent = activeSkill ? "SKILL COMPETENCY" : "AVERAGE COMPETENCY";
  textG.appendChild(centerText1);
  
  const centerText2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
  centerText2.setAttribute("x", String(cx));
  centerText2.setAttribute("y", "278");
  centerText2.setAttribute("text-anchor", "middle");
  centerText2.setAttribute("fill", "var(--white)");
  centerText2.setAttribute("font-size", "28");
  centerText2.setAttribute("font-weight", "950");
  centerText2.setAttribute("filter", "drop-shadow(0 0 10px var(--red))");
  centerText2.setAttribute("id", "donut-center-val");
  centerText2.textContent = activeSkill ? `${activeSkill.level}%` : `${Math.round(averageLevel)}%`;
  textG.appendChild(centerText2);
  
  const centerText3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
  centerText3.setAttribute("x", String(cx));
  centerText3.setAttribute("y", "300");
  centerText3.setAttribute("text-anchor", "middle");
  centerText3.setAttribute("fill", "var(--muted)");
  centerText3.setAttribute("font-size", "9");
  centerText3.setAttribute("font-weight", "800");
  centerText3.setAttribute("letter-spacing", "0.05em");
  centerText3.setAttribute("id", "donut-center-desc");
  centerText3.textContent = activeSkill ? activeSkill.name.toUpperCase() : "13 ACTIVE COMPETENCIES";
  textG.appendChild(centerText3);
  
  svgCanvas.appendChild(textG);

  // Helper readout updaters
  function updateCenterReadout(sk) {
    const cVal = document.getElementById("donut-center-val");
    const cTag = document.getElementById("donut-center-tag");
    const cDesc = document.getElementById("donut-center-desc");
    const cBadge = document.getElementById("donut-center-badge");
    
    if (cVal) cVal.textContent = `${sk.level}%`;
    if (cTag) cTag.textContent = "SKILL COMPETENCY";
    if (cDesc) cDesc.textContent = sk.name.toUpperCase();
    if (cBadge) cBadge.setAttribute("fill", "rgba(255, 18, 63, 0.45)");
  }

  function restoreCenterReadout() {
    const cVal = document.getElementById("donut-center-val");
    const cTag = document.getElementById("donut-center-tag");
    const cDesc = document.getElementById("donut-center-desc");
    const cBadge = document.getElementById("donut-center-badge");
    
    if (activeSkill) {
      if (cVal) cVal.textContent = `${activeSkill.level}%`;
      if (cTag) cTag.textContent = "SKILL COMPETENCY";
      if (cDesc) cDesc.textContent = activeSkill.name.toUpperCase();
      if (cBadge) cBadge.setAttribute("fill", "rgba(255, 18, 63, 0.3)");
    } else {
      if (cVal) cVal.textContent = `${Math.round(averageLevel)}%`;
      if (cTag) cTag.textContent = "AVERAGE COMPETENCY";
      if (cDesc) cDesc.textContent = "13 ACTIVE COMPETENCIES";
      if (cBadge) cBadge.setAttribute("fill", "rgba(255, 18, 63, 0.2)");
    }
  }
}

function drawSpiderChart() {
  const cx = 400;
  const cy = 225;
  const maxRadius = 145;
  const N = skillsData.length;

  // Make background spider web SVG grid visible and render it geometrically
  const webGrid = document.getElementById("spider-web-grid");
  if (webGrid) {
    webGrid.setAttribute("opacity", "1");
    webGrid.innerHTML = ""; // Clear old static path

    // Draw 5 concentric web layers with concave curves
    const numRings = 5;
    for (let k = 1; k <= numRings; k++) {
      const r = maxRadius * (k / numRings);
      const ringPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      let d = "";

      for (let i = 0; i < N; i++) {
        const angle1 = -Math.PI / 2 + (i * 2 * Math.PI) / N;
        const angle2 = -Math.PI / 2 + ((i + 1) * 2 * Math.PI) / N;

        const x1 = cx + r * Math.cos(angle1);
        const y1 = cy + r * Math.sin(angle1);
        const x2 = cx + r * Math.cos(angle2);
        const y2 = cy + r * Math.sin(angle2);

        // Control point pulled inward to form the classic web concave segment
        const midAngle = (angle1 + angle2) / 2;
        const rCtrl = r * 0.94; // Symmetrical web scoop factor
        const cxCtrl = cx + rCtrl * Math.cos(midAngle);
        const cyCtrl = cy + rCtrl * Math.sin(midAngle);

        if (i === 0) {
          d += `M ${x1} ${y1} Q ${cxCtrl} ${cyCtrl} ${x2} ${y2}`;
        } else {
          d += ` Q ${cxCtrl} ${cyCtrl} ${x2} ${y2}`;
        }
      }
      d += " Z";

      ringPath.setAttribute("d", d);
      ringPath.setAttribute("fill", "rgba(255, 18, 63, 0.015)");
      const strokeOpacity = k === numRings ? 0.32 : 0.16;
      ringPath.setAttribute("stroke", `rgba(255, 18, 63, ${strokeOpacity})`);
      ringPath.setAttribute("stroke-width", k === numRings ? "1.2" : "0.75");
      if (k === numRings) {
        ringPath.setAttribute("filter", "url(#glowFilter)");
      }
      webGrid.appendChild(ringPath);
    }

    // Draw radial guidelines (spokes) inside the web grid
    for (let i = 0; i < N; i++) {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / N;
      const ax = cx + maxRadius * Math.cos(angle);
      const ay = cy + maxRadius * Math.sin(angle);

      const axisLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      axisLine.setAttribute("x1", String(cx));
      axisLine.setAttribute("y1", String(cy));
      axisLine.setAttribute("x2", String(ax));
      axisLine.setAttribute("y2", String(ay));
      axisLine.setAttribute("stroke", "rgba(255, 18, 63, 0.16)");
      axisLine.setAttribute("stroke-width", "1");
      webGrid.appendChild(axisLine);
    }
  }

  // Draw the main radar polygon representation
  const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  poly.setAttribute("fill", "rgba(255, 18, 63, 0.26)");
  poly.setAttribute("stroke", "var(--red-soft)");
  poly.setAttribute("stroke-width", "2");
  poly.setAttribute("filter", "url(#glowFilter)");
  svgCanvas.appendChild(poly);

  // Easing function for visual growth transition
  function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
  }

  // Polygon bloom animation
  let startTime = null;
  const duration = 650;

  function anim(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeOutCubic(progress);
    
    const points = skillsData.map((skill, i) => {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / N;
      const rVal = (skill.level / 100) * maxRadius * easeProgress;
      const px = cx + rVal * Math.cos(angle);
      const py = cy + rVal * Math.sin(angle);
      return `${px},${py}`;
    }).join(" ");
    
    poly.setAttribute("points", points);
    
    if (progress < 1) {
      requestAnimationFrame(anim);
    }
  }
  requestAnimationFrame(anim);

  // Draw outer text labels
  skillsData.forEach((skill, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / N;
    const lx = cx + (maxRadius + 22) * Math.cos(angle);
    const ly = cy + (maxRadius + 22) * Math.sin(angle);
    
    let textAnchor = "middle";
    const cosVal = Math.cos(angle);
    if (cosVal < -0.15) textAnchor = "end";
    else if (cosVal > 0.15) textAnchor = "start";
    
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", String(lx));
    label.setAttribute("y", String(ly + 4));
    label.setAttribute("text-anchor", textAnchor);
    
    const isActive = activeSkill && activeSkill.id === skill.id;
    label.setAttribute("fill", isActive ? "var(--red-soft)" : "var(--muted)");
    label.setAttribute("font-size", "9px");
    label.setAttribute("font-weight", "800");
    label.style.fontFamily = "monospace";
    label.style.transition = "fill 200ms ease";
    label.textContent = skill.name.toUpperCase();
    label.setAttribute("id", `radar-label-${i}`);
    svgCanvas.appendChild(label);
  });

  // Draw interactive node elements
  skillsData.forEach((skill, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / N;
    const rVal = (skill.level / 100) * maxRadius;
    const px = cx + rVal * Math.cos(angle);
    const py = cy + rVal * Math.sin(angle);
    
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.style.cursor = "pointer";
    
    // Glowing pulse ring
    const pulse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    pulse.setAttribute("cx", String(px));
    pulse.setAttribute("cy", String(py));
    pulse.setAttribute("r", "10");
    pulse.setAttribute("fill", "rgba(255, 18, 63, 0.18)");
    pulse.setAttribute("id", `radar-pulse-${i}`);
    pulse.style.opacity = "0";
    pulse.style.transition = "opacity 200ms ease, transform 200ms ease";
    g.appendChild(pulse);
    
    // Core node
    const core = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    core.setAttribute("cx", String(px));
    core.setAttribute("cy", String(py));
    core.setAttribute("r", "4.5");
    core.setAttribute("fill", "var(--white)");
    core.setAttribute("stroke", "var(--red-soft)");
    core.setAttribute("stroke-width", "1.5");
    core.setAttribute("id", `radar-core-${i}`);
    core.style.transition = "r 200ms ease, fill 200ms ease, stroke 200ms ease";
    
    const isActive = activeSkill && activeSkill.id === skill.id;
    if (isActive) {
      core.setAttribute("fill", "var(--red-soft)");
      core.setAttribute("stroke", "var(--white)");
      core.setAttribute("r", "6");
      pulse.style.opacity = "1";
    }
    g.appendChild(core);
    
    // Interactive mouse hit area
    const target = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    target.setAttribute("cx", String(px));
    target.setAttribute("cy", String(py));
    target.setAttribute("r", "16");
    target.setAttribute("fill", "transparent");
    g.appendChild(target);
    
    // Event bindings
    target.addEventListener("mouseenter", (e) => {
      showTooltip(e, skill);
      updateProofConsole(skill, false);
      
      core.setAttribute("fill", "var(--red-soft)");
      core.setAttribute("stroke", "var(--white)");
      core.setAttribute("r", "6.5");
      
      pulse.style.opacity = "1";
      pulse.style.transform = "scale(1.3)";
      pulse.style.transformOrigin = `${px}px ${py}px`;
      
      const lbl = document.getElementById(`radar-label-${i}`);
      if (lbl) lbl.setAttribute("fill", "var(--red-soft)");
    });
    
    target.addEventListener("mousemove", (e) => {
      positionTooltip(e);
    });
    
    target.addEventListener("mouseleave", () => {
      hideTooltip();
      
      const isLocked = activeSkill && activeSkill.id === skill.id;
      if (!isLocked) {
        core.setAttribute("fill", "var(--white)");
        core.setAttribute("stroke", "var(--red-soft)");
        core.setAttribute("r", "4.5");
        
        pulse.style.opacity = "0";
        pulse.style.transform = "scale(1)";
        
        const lbl = document.getElementById(`radar-label-${i}`);
        if (lbl) lbl.setAttribute("fill", "var(--muted)");
      } else {
        core.setAttribute("fill", "var(--red-soft)");
        core.setAttribute("stroke", "var(--white)");
        core.setAttribute("r", "6");
        pulse.style.opacity = "1";
      }
      restoreProofConsole();
    });
    
    target.addEventListener("click", (e) => {
      e.stopPropagation();
      activeSkill = skill;
      updateProofConsole(skill, true);
      renderActiveChart();
    });
    
    svgCanvas.appendChild(g);
  });
}

function showTooltip(e, skill) {
  if (!skillsTooltip) return;
  skillsTooltip.classList.add("active");
  skillsTooltip.setAttribute("aria-hidden", "false");

  // Lookup project names
  const mappedNames = skill.projects.map(idx => {
    return projectCases[idx] ? projectCases[idx].shortName : "";
  }).filter(Boolean);

  const projectsText = mappedNames.length > 0 
    ? `Used In:<br>${mappedNames.map(name => `✓ ${name}`).join("<br>")}`
    : "Used In: Independent Research";

  skillsTooltip.innerHTML = `
    <div class="tooltip-title">${skill.name}</div>
    <div class="tooltip-level">Current Level: ${skill.level}%</div>
    <div class="tooltip-projects">${projectsText}</div>
  `;
  positionTooltip(e);
}

function positionTooltip(e) {
  if (!skillsTooltip) return;
  const width = skillsTooltip.offsetWidth || 150;
  const height = skillsTooltip.offsetHeight || 80;
  let x = e.pageX + 18;
  let y = e.pageY + 18;

  // Keep inside screen bounds
  if (x + width > window.innerWidth + window.scrollX - 20) {
    x = e.pageX - width - 18;
  }
  if (y + height > window.innerHeight + window.scrollY - 20) {
    y = e.pageY - height - 18;
  }

  skillsTooltip.style.left = `${x}px`;
  skillsTooltip.style.top = `${y}px`;
}

function hideTooltip() {
  if (!skillsTooltip) return;
  skillsTooltip.classList.remove("active");
  skillsTooltip.setAttribute("aria-hidden", "true");
}

function updateProofConsole(skill, isLocked) {
  if (!consoleDefault || !consoleActive) return;

  consoleDefault.classList.remove("active");
  consoleActive.classList.add("active");

  consoleSkillName.textContent = skill.name;
  consoleSkillLevel.textContent = `${skill.level}%`;
  consoleSkillDesc.textContent = skill.description;

  // Timeline growth values
  growthNodes[2023].textContent = `${skill.growth[2023]}%`;
  growthNodes[2024].textContent = `${skill.growth[2024]}%`;
  growthNodes[2025].textContent = `${skill.growth[2025]}%`;
  growthNodes[2026].textContent = `${skill.growth[2026]}%`;

  // Projects list
  consoleSkillProjects.innerHTML = "";
  if (skill.projects && skill.projects.length > 0) {
    skill.projects.forEach(idx => {
      const proj = projectCases[idx];
      if (!proj) return;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "proof-btn";
      btn.innerHTML = `
        <span class="btn-text">View Proof: ${proj.shortName}</span>
        <svg viewBox="0 0 24 24" class="btn-arrow" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h12m0 0-5-5m5 5-5 5"/></svg>
      `;
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const targetSection = document.getElementById("projects");
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
          setActiveProject(idx);
          // Highlight card
          setTimeout(() => {
            const card = document.querySelector(".case-study-card");
            if (card) {
              card.classList.add("proof-flash");
              setTimeout(() => card.classList.remove("proof-flash"), 1500);
            }
          }, 600);
        }
      });
      consoleSkillProjects.appendChild(btn);
    });
  } else if (skill.theory && skill.theory.length > 0) {
    consoleSkillProjects.innerHTML = `
      <div class="console-theory-title">// THEORY & CONCEPTS</div>
      <ul class="console-theory-list">
        ${skill.theory.map(concept => `<li>${concept}</li>`).join("")}
      </ul>
    `;
  } else {
    consoleSkillProjects.innerHTML = `<p class="console-none">No mapped projects. Core competency.</p>`;
  }

  // Certifications
  consoleSkillCerts.innerHTML = "";
  if (skill.certs && skill.certs.length > 0) {
    consoleCertsContainer.style.display = "block";
    skill.certs.forEach(cert => {
      const link = document.createElement("a");
      link.href = cert.href;
      link.className = "console-cert-link";
      link.innerHTML = `
        <span>${cert.name}</span>
        <svg viewBox="0 0 24 24" class="link-icon" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>
      `;
      consoleSkillCerts.appendChild(link);
    });
  } else {
    consoleCertsContainer.style.display = "none";
  }
}

function restoreProofConsole() {
  if (activeSkill) {
    updateProofConsole(activeSkill, true);
  } else {
    resetProofConsole();
  }
}

function resetProofConsole() {
  if (!consoleDefault || !consoleActive) return;
  consoleDefault.classList.add("active");
  consoleActive.classList.remove("active");
}

// Start Visualizer
initSkillsVisualizer();

// ==========================================
// INTERACTIVE SPACE FLIGHT TRAJECTORY ENGINE
// ==========================================

const trajectoryData = [
  {
    stage: "B.TECH (IT)",
    altitude: "1,000 km (Low Earth Orbit Exit)",
    status: "PROPULSION_ACTIVE",
    statusColor: "#ff123f",
    institution: "M. Kumarasamy College of Engineering",
    period: "2023 - Present",
    score: "CGPA: 7.9",
    focus: "B.Tech in Information Technology",
    desc: "Tracking engineering foundations, database architectures, intelligence pipelines, and core programming systems.",
    dashOffset: 430, // 800 - 370px
    labelClass: "label-undergrad",
    nodeY: 80,
    rocketY: 62
  },
  {
    stage: "HSC (CLASS XII)",
    altitude: "400 km (Low Earth Orbit)",
    status: "BOOSTER_COMPLETED",
    statusColor: "#55ff77",
    institution: "Chelammal Vidhyaashram Senior Secondary School",
    period: "2022 - 2023",
    score: "Percentage: 86%",
    focus: "Physics, Chemistry, Mathematics, Computer Science",
    desc: "Advanced secondary schooling. Built core principles in mathematical optimization, physical science systems, and early software logic structures.",
    dashOffset: 600, // 800 - 200px
    labelClass: "label-hsec",
    nodeY: 250,
    rocketY: 232
  },
  {
    stage: "SSLC (CLASS X)",
    altitude: "120 km (Karman Line Ascent)",
    status: "STAGE_DISCHARGED",
    statusColor: "#55ff77",
    institution: "Chelammal Vidhyaashram Senior Secondary School",
    period: "2020 - 2021",
    score: "Percentage: 84%",
    focus: "General Academics",
    desc: "Secondary foundation schooling focusing on science methodologies, fundamental languages, computational systems, and analytical mathematics.",
    dashOffset: 770, // 800 - 30px
    labelClass: "label-sec",
    nodeY: 420,
    rocketY: 402
  }
];

let trajTypewriterTimer = null;
let activeTrajectoryIndex = 0; // Track active stage index (0 is B.Tech Undergraduate default)

function initEducationTrajectory() {
  const stageNodes = document.querySelectorAll(".flight-stage-node");
  if (!stageNodes.length) return;

  // Initialize tracking state
  activeTrajectoryIndex = 0;

  // Set initial draw path on load
  const activePath = document.getElementById("flight-active-path");
  if (activePath) {
    activePath.style.strokeDashoffset = "430"; // STAGE 03 (Undergrad) default
  }

  // Set initial light beam path on load
  const lightBeam = document.getElementById("flight-light-beam");
  if (lightBeam) {
    lightBeam.setAttribute("d", "M 180 450 L 180 80");
  }

  // Set initial rocket position on load
  const rocket = document.getElementById("trajectory-rocket");
  if (rocket) {
    rocket.style.transform = "translateY(62px)";
  }

  // Set initial altimeter axis label active
  const axisLabel = document.querySelector(`.label-undergrad`);
  if (axisLabel) axisLabel.classList.add("active");

  stageNodes.forEach(node => {
    // Hover events
    node.addEventListener("mouseenter", () => {
      const index = parseInt(node.getAttribute("data-index"), 10);
      activateTrajectoryStage(index);
    });

    // Click/Touch events
    node.addEventListener("click", (e) => {
      e.stopPropagation();
      const index = parseInt(node.getAttribute("data-index"), 10);
      activateTrajectoryStage(index);
    });
  });
}

function activateTrajectoryStage(index) {
  // Exit early if already active to prevent typewriter loops and shaking
  if (activeTrajectoryIndex === index) return;
  activeTrajectoryIndex = index;

  const data = trajectoryData[index];
  if (!data) return;

  const stageNodes = document.querySelectorAll(".flight-stage-node");
  stageNodes.forEach(node => {
    const idx = parseInt(node.getAttribute("data-index"), 10);
    if (idx === index) {
      node.classList.add("active");
    } else {
      node.classList.remove("active");
    }
  });

  // Dynamic stroke trace line animation
  const activePath = document.getElementById("flight-active-path");
  if (activePath) {
    activePath.style.strokeDashoffset = data.dashOffset.toString();
  }

  // Update light beam path segment Y-coordinate
  const lightBeam = document.getElementById("flight-light-beam");
  if (lightBeam) {
    lightBeam.setAttribute("d", "M 180 450 L 180 " + data.nodeY);
  }

  // Translate rocket smoothly to target stage height
  const rocket = document.getElementById("trajectory-rocket");
  if (rocket) {
    rocket.style.transform = "translateY(" + data.rocketY + "px)";
  }

  // Update altimeter labels highlight
  const axisLabels = document.querySelectorAll(".axis-label");
  axisLabels.forEach(label => label.classList.remove("active"));
  const activeAxisLabel = document.querySelector(`.${data.labelClass}`);
  if (activeAxisLabel) {
    activeAxisLabel.classList.add("active");
  }

  // Update Telemetry Panel values
  const stageEl = document.getElementById("traj-stage");
  const altitudeEl = document.getElementById("traj-altitude");
  const statusEl = document.getElementById("traj-status");
  const institutionEl = document.getElementById("traj-institution");
  const periodEl = document.getElementById("traj-period");
  const scoreEl = document.getElementById("traj-score");
  const focusEl = document.getElementById("traj-focus");
  const descEl = document.getElementById("traj-log-desc");

  if (stageEl) stageEl.textContent = data.stage;
  if (altitudeEl) altitudeEl.textContent = data.altitude;
  if (statusEl) {
    statusEl.textContent = data.status;
    statusEl.style.color = data.statusColor;
  }
  if (institutionEl) institutionEl.textContent = data.institution;
  if (periodEl) periodEl.textContent = data.period;
  if (scoreEl) scoreEl.textContent = data.score;
  if (focusEl) focusEl.textContent = data.focus;

  // Run Typewriter effect on the sensor log text
  if (descEl) {
    runTrajTypewriter(descEl, data.desc);
  }
}

function runTrajTypewriter(element, text) {
  if (trajTypewriterTimer) {
    clearInterval(trajTypewriterTimer);
  }
  
  element.textContent = "";
  let i = 0;
  trajTypewriterTimer = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(trajTypewriterTimer);
      trajTypewriterTimer = null;
    }
  }, 12); // fast typewriter
}

// Initializing on load
document.addEventListener("DOMContentLoaded", () => {
  initEducationTrajectory();
  initBackToTop();
  initMatrixPortrait();
});
// Run directly in case DOMContentLoaded has already fired
initEducationTrajectory();
initBackToTop();
initMatrixPortrait();

function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    if (!backToTopBtn.dataset.hasListener) {
      backToTopBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
      backToTopBtn.dataset.hasListener = "true";
    }
  }
}

// ==========================================
// HOLOGRAPHIC MATRIX PORTRAIT EFFECT
// ==========================================

function initMatrixPortrait() {
  const container = document.querySelector(".black-hole");
  const canvas = document.getElementById("matrixPortraitCanvas");
  if (!container || !canvas) return;

  const ctx = canvas.getContext("2d");
  let isHovered = false;
  let animationFrameId = null;
  let brightnessGrid = [];
  const COLS = 54;
  const ROWS = 54;
  let isInitialized = false;

  // Load from Base64 to bypass CORS Security Error on local filesystem (file:// protocol)
  if (typeof PROFILE_BASE64 !== "undefined" && PROFILE_BASE64) {
    const imgObj = new Image();
    imgObj.src = PROFILE_BASE64;
    imgObj.onload = () => {
      setupMatrix(imgObj);
    };
  } else {
    // Fallback to DOM image if variable is missing
    const domImg = document.getElementById("heroProfileImg");
    if (domImg) {
      if (domImg.complete) {
        setupMatrix(domImg);
      } else {
        domImg.addEventListener("load", () => setupMatrix(domImg));
      }
    }
  }

  function setupMatrix(imgSource) {
    if (isInitialized) return;
    
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = COLS;
    tempCanvas.height = ROWS;
    const tempCtx = tempCanvas.getContext("2d");
    
    try {
      tempCtx.drawImage(imgSource, 0, 0, COLS, ROWS);
      const imgData = tempCtx.getImageData(0, 0, COLS, ROWS).data;
      
      brightnessGrid = [];
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const idx = (y * COLS + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const a = imgData[idx + 3];
          
          // Calculate grayscale luma
          const luma = a > 50 ? (0.299 * r + 0.587 * g + 0.114 * b) : 0;
          brightnessGrid.push(luma);
        }
      }
      isInitialized = true;
    } catch (e) {
      console.warn("Could not load profile image data for matrix conversion:", e);
      // Fallback grid pattern to guarantee visual effect works
      brightnessGrid = [];
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const dx = x - COLS / 2;
          const dy = y - ROWS / 2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const luma = Math.max(0, 255 - dist * 10);
          brightnessGrid.push(luma);
        }
      }
      isInitialized = true;
    }
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
  }

  let mouseX = -1000;
  let mouseY = -1000;

  container.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  container.addEventListener("mouseenter", () => {
    isHovered = true;
    resizeCanvas();
    if (!animationFrameId) {
      tick();
    }
  });

  container.addEventListener("mouseleave", () => {
    isHovered = false;
    mouseX = -1000;
    mouseY = -1000;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  window.addEventListener("resize", () => {
    if (isHovered) {
      resizeCanvas();
    }
  });

  function tick() {
    if (!isHovered) return;
    draw();
    animationFrameId = requestAnimationFrame(tick);
  }

  function getCharacter(luma) {
    if (luma < 35) return " ";
    if (luma < 70) return ".";
    if (luma < 110) return Math.random() > 0.5 ? "+" : "-";
    if (luma < 185) return Math.random() > 0.5 ? "0" : "1";
    if (luma < 225) return "#";
    return "@";
  }

  function draw() {
    if (!isInitialized) return;
    
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    const cellW = rect.width / COLS;
    const cellH = rect.height / ROWS;
    
    ctx.font = `bold ${cellW * 1.15}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const luma = brightnessGrid[y * COLS + x];
        if (luma < 35) continue;
        
        const charX = x * cellW + cellW / 2;
        const charY = y * cellH + cellH / 2;
        
        const dx = charX - mouseX;
        const dy = charY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const nearMouse = dist < 38;
        
        let char = getCharacter(luma);
        
        if (nearMouse) {
          char = Math.random() > 0.4 ? "1" : "0";
        }
        
        if (nearMouse) {
          ctx.fillStyle = "#ffffff";
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#ff123f";
        } else if (luma > 225) {
          ctx.fillStyle = "#ffffff";
          ctx.shadowBlur = 4;
          ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
        } else if (luma > 185) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.shadowBlur = 0;
        } else if (luma > 110) {
          ctx.fillStyle = "rgba(255, 81, 111, 0.85)";
          ctx.shadowBlur = 0;
        } else if (luma > 70) {
          ctx.fillStyle = "rgba(255, 18, 63, 0.55)";
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = "rgba(255, 18, 63, 0.25)";
          ctx.shadowBlur = 0;
        }
        
        ctx.fillText(char, charX, charY);
        ctx.shadowBlur = 0;
      }
    }
  }
}

// Smooth scroll helper for hash links to bypass local CORS / unique origin checks
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;
  
  const href = link.getAttribute("href");
  if (href && href.startsWith("#") && href.length > 1) {
    e.preventDefault();
    const targetId = href.substring(1);
    if (targetId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      
      // Close mobile menu if open
      if (document.body.classList.contains("nav-open")) {
        document.body.classList.remove("nav-open");
        const navToggle = document.querySelector(".nav-toggle");
        navToggle?.setAttribute("aria-expanded", "false");
      }
    }
  }
});

