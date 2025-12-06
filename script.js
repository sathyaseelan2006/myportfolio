// Typing Effect
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Sathyaseelan", "Lifelong Learner", "Data Scientist", "Problem Solver"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (!typedTextSpan || !cursorSpan) return; // Safety check

  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  }
  else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  }
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

// Contact Form Validation and Submission
function initContactForms() {
  const contactForm = document.getElementById('contactForm');
  const projectForm = document.getElementById('projectForm');

  // Contact Form Validation
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      if (!validateContactForm()) {
        return;
      }

      // Submit the form
      await submitContactForm(this);
    });
  }

  // Project Form Validation
  if (projectForm) {
    projectForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      if (!validateProjectForm()) {
        return;
      }

      // Submit the form
      await submitProjectForm(this);
    });
  }

  // Real-time validation
  setupFormValidation();
}

// Contact Form Validation
function validateContactForm() {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');

  let isValid = true;

  // Reset previous errors
  clearErrors();

  // Name validation
  if (!name.value.trim()) {
    showError('nameError', 'Name is required');
    markFieldError(name);
    isValid = false;
  } else if (name.value.trim().length < 2) {
    showError('nameError', 'Name must be at least 2 characters');
    markFieldError(name);
    isValid = false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    showError('emailError', 'Email is required');
    markFieldError(email);
    isValid = false;
  } else if (!emailRegex.test(email.value)) {
    showError('emailError', 'Please enter a valid email address');
    markFieldError(email);
    isValid = false;
  }

  // Subject validation
  if (!subject.value.trim()) {
    showError('subjectError', 'Subject is required');
    markFieldError(subject);
    isValid = false;
  }

  // Message validation
  if (!message.value.trim()) {
    showError('messageError', 'Message is required');
    markFieldError(message);
    isValid = false;
  } else if (message.value.trim().length < 10) {
    showError('messageError', 'Message must be at least 10 characters');
    markFieldError(message);
    isValid = false;
  }

  return isValid;
}

// Project Form Validation
function validateProjectForm() {
  const projectName = document.getElementById('projectName');
  const projectType = document.getElementById('projectType');
  const projectDescription = document.getElementById('projectDescription');

  let isValid = true;

  // Reset previous errors
  clearProjectErrors();

  // Project Name validation
  if (!projectName.value.trim()) {
    showError('projectNameError', 'Project name is required');
    markFieldError(projectName);
    isValid = false;
  }

  // Project Type validation
  if (!projectType.value) {
    showError('projectTypeError', 'Please select a project type');
    markFieldError(projectType);
    isValid = false;
  }

  // Project Description validation
  if (!projectDescription.value.trim()) {
    showError('projectDescriptionError', 'Project description is required');
    markFieldError(projectDescription);
    isValid = false;
  } else if (projectDescription.value.trim().length < 20) {
    showError('projectDescriptionError', 'Description must be at least 20 characters');
    markFieldError(projectDescription);
    isValid = false;
  }

  return isValid;
}

// Show Error Message
function showError(errorId, message) {
  const errorElement = document.getElementById(errorId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add('show');
  }
}

// Mark Field as Error
function markFieldError(field) {
  field.parentElement.classList.add('error');
  field.parentElement.classList.remove('success');
}

// Mark Field as Success
function markFieldSuccess(field) {
  field.parentElement.classList.add('success');
  field.parentElement.classList.remove('error');
}

// Clear All Errors
function clearErrors() {
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(element => {
    element.classList.remove('show');
    element.textContent = '';
  });

  const formGroups = document.querySelectorAll('.form-group');
  formGroups.forEach(group => {
    group.classList.remove('error', 'success');
  });
}

// Clear Project Form Errors
function clearProjectErrors() {
  const projectErrorElements = document.querySelectorAll('#projectForm .error-message');
  projectErrorElements.forEach(element => {
    element.classList.remove('show');
    element.textContent = '';
  });

  const projectFormGroups = document.querySelectorAll('#projectForm .form-group');
  projectFormGroups.forEach(group => {
    group.classList.remove('error', 'success');
  });
}

// Setup Real-time Validation
function setupFormValidation() {
  const inputs = document.querySelectorAll('input, textarea, select');

  inputs.forEach(input => {
    input.addEventListener('blur', function () {
      validateField(this);
    });

    input.addEventListener('input', function () {
      if (this.parentElement.classList.contains('error')) {
        validateField(this);
      }
    });
  });
}

// Validate Individual Field
function validateField(field) {
  const fieldName = field.name;
  const value = field.value.trim();

  // Remove previous error/success states
  field.parentElement.classList.remove('error', 'success');

  // Validate based on field type
  switch (fieldName) {
    case 'name':
      if (!value) {
        showError('nameError', 'Name is required');
        markFieldError(field);
      } else if (value.length < 2) {
        showError('nameError', 'Name must be at least 2 characters');
        markFieldError(field);
      } else {
        markFieldSuccess(field);
      }
      break;

    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        showError('emailError', 'Email is required');
        markFieldError(field);
      } else if (!emailRegex.test(value)) {
        showError('emailError', 'Please enter a valid email address');
        markFieldError(field);
      } else {
        markFieldSuccess(field);
      }
      break;

    case 'subject':
      if (!value) {
        showError('subjectError', 'Subject is required');
        markFieldError(field);
      } else {
        markFieldSuccess(field);
      }
      break;

    case 'message':
      if (!value) {
        showError('messageError', 'Message is required');
        markFieldError(field);
      } else if (value.length < 10) {
        showError('messageError', 'Message must be at least 10 characters');
        markFieldError(field);
      } else {
        markFieldSuccess(field);
      }
      break;

    case 'projectName':
      if (!value) {
        showError('projectNameError', 'Project name is required');
        markFieldError(field);
      } else {
        markFieldSuccess(field);
      }
      break;

    case 'projectType':
      if (!value) {
        showError('projectTypeError', 'Please select a project type');
        markFieldError(field);
      } else {
        markFieldSuccess(field);
      }
      break;

    case 'projectDescription':
      if (!value) {
        showError('projectDescriptionError', 'Project description is required');
        markFieldError(field);
      } else if (value.length < 20) {
        showError('projectDescriptionError', 'Description must be at least 20 characters');
        markFieldError(field);
      } else {
        markFieldSuccess(field);
      }
      break;
  }
}

// Submit Contact Form
async function submitContactForm(form) {
  const submitBtn = form.querySelector('.submit-btn');
  const originalBtnText = submitBtn.innerHTML;

  try {
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    const formData = new FormData(form);

    // Method 1: Using EmailJS (Primary method - works everywhere)
    if (typeof emailjs !== 'undefined') {
      console.log('Using EmailJS to send form...');
      const response = await emailjs.sendForm('service_ecgl309', 'template_awoksaq', form);
      console.log('EmailJS Response:', response);
    }
    // Method 2: Using Netlify Forms (if hosted on Netlify)
    else if (window.location.hostname.includes('netlify')) {
      const response = await fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      });

      if (!response.ok) throw new Error('Submission failed');
    }
    // Method 3: Using your backend server
    else {
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
      };

      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Submission failed');
    }

    // Success
    showSuccessMessage('✅ Message sent successfully! I\'ll get back to you soon.');
    form.reset();
    clearErrors();

  } catch (error) {
    console.error('Form submission error:', error);
    console.error('Error details:', error.message || error);

    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
      showErrorMessage('❌ Email service not loaded. Please refresh the page and try again.');
    } else {
      showErrorMessage('❌ Oops! Something went wrong: ' + (error.text || error.message || 'Please try again or email me directly at ksathyaseelan34@gmail.com'));
    }
  } finally {
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
    submitBtn.innerHTML = originalBtnText;
  }
}

// Submit Project Form
async function submitProjectForm(form) {
  const submitBtn = form.querySelector('.submit-btn');
  const originalBtnText = submitBtn.innerHTML;

  try {
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    const formData = new FormData(form);

    // Method 1: Using EmailJS (Primary method - works everywhere)
    if (typeof emailjs !== 'undefined') {
      console.log('Using EmailJS to send project request...');
      const response = await emailjs.sendForm('service_ecgl309', 'template_awoksaq', form);
      console.log('EmailJS Response:', response);
    }
    // Method 2: Using Netlify Forms (if hosted on Netlify)
    else if (window.location.hostname.includes('netlify')) {
      const response = await fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      });

      if (!response.ok) throw new Error('Submission failed');
    }
    // Method 3: Using your backend server
    else {
      const data = {
        projectName: formData.get('projectName'),
        projectType: formData.get('projectType'),
        projectDescription: formData.get('projectDescription'),
        budget: formData.get('budget'),
        timeline: formData.get('timeline')
      };

      const response = await fetch('http://localhost:5000/api/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Submission failed');
    }

    // Success
    showSuccessMessage('✅ Project request submitted successfully! I\'ll review it and get back to you soon.');
    form.reset();
    clearProjectErrors();

  } catch (error) {
    console.error('Project form submission error:', error);
    console.error('Error details:', error.message || error);

    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
      showErrorMessage('❌ Email service not loaded. Please refresh the page and try again.');
    } else {
      showErrorMessage('❌ Oops! Something went wrong: ' + (error.text || error.message || 'Please try again or email me directly at ksathyaseelan34@gmail.com'));
    }
  } finally {
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
    submitBtn.innerHTML = originalBtnText;
  }
}

// Show Success Message
function showSuccessMessage(message) {
  // Create success notification
  const notification = document.createElement('div');
  notification.className = 'success-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-check-circle"></i>
      <span>${message}</span>
    </div>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #27ae60;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
  `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// Show Error Message
function showErrorMessage(message) {
  // Create error notification
  const notification = document.createElement('div');
  notification.className = 'error-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-exclamation-circle"></i>
      <span>${message}</span>
    </div>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #e74c3c;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
  `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Remove after 7 seconds (longer for errors)
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 7000);
}

// Download CV Tracking
function initDownloadTracking() {
  const downloadBtn = document.querySelector('.download-cv');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function () {
      // Track download (you can integrate with Google Analytics or other tracking)
      console.log('CV downloaded at:', new Date().toISOString());

      // Optional: Show download confirmation
      setTimeout(() => {
        showSuccessMessage('CV downloaded successfully!');
      }, 1000);
    });
  }
}

// Social Media Link Tracking
function initSocialTracking() {
  const socialLinks = document.querySelectorAll('.social-icon');
  socialLinks.forEach(link => {
    link.addEventListener('click', function () {
      const platform = this.getAttribute('title');
      console.log(`Clicked on ${platform} at:`, new Date().toISOString());

      // Optional: Add tracking parameters to URLs
      if (this.href.includes('linkedin.com')) {
        this.href += '?utm_source=portfolio&utm_medium=social&utm_campaign=contact';
      }
    });
  });
}

// Project Filter Functionality
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter');

      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Filter projects
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        const tags = card.getAttribute('data-tags');

        if (filter === 'all' ||
          categories.includes(filter) ||
          tags.toLowerCase().includes(filter.toLowerCase())) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Project Card Animations
function initProjectAnimations() {
  const projectCards = document.querySelectorAll('.project-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// Featured Project Animation
function initFeaturedProject() {
  const featuredProject = document.querySelector('.featured-project');
  if (featuredProject) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    featuredProject.style.opacity = '0';
    featuredProject.style.transform = 'translateY(30px)';
    featuredProject.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(featuredProject);
  }
}

// Project Link Tracking
function initProjectTracking() {
  const projectLinks = document.querySelectorAll('.project-link, .overlay-btn');

  projectLinks.forEach(link => {
    link.addEventListener('click', function () {
      const projectName = this.closest('.project-card')?.querySelector('h3')?.textContent || 'Unknown Project';
      const linkType = this.querySelector('.fab.fa-github') ? 'GitHub' : 'Demo';

      console.log(`${linkType} link clicked for project: ${projectName} at ${new Date().toISOString()}`);

      // Optional: Add tracking parameters
      if (this.href.includes('github.com')) {
        this.href += '?utm_source=portfolio&utm_medium=project&utm_campaign=github';
      } else if (this.href.includes('vercel.app')) {
        this.href += '?utm_source=portfolio&utm_medium=project&utm_campaign=demo';
      }
    });
  });
}

// Enhanced Project Interactions
function initProjectInteractions() {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    // Add hover sound effect (optional)
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });

    // Add click effect
    card.addEventListener('click', function (e) {
      if (!e.target.closest('a')) {
        // If not clicking a link, add a subtle click effect
        this.style.transform = 'translateY(-4px) scale(0.98)';
        setTimeout(() => {
          this.style.transform = 'translateY(-8px) scale(1.02)';
        }, 150);
      }
    });
  });
}

// Animated Skill Bars
function initSkillBars() {
  const skillItems = document.querySelectorAll('.skill-item');
  const skillProgresses = document.querySelectorAll('.skill-progress');
  const skillPercentages = document.querySelectorAll('.skill-percentage');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillItem = entry.target;
        const progressBar = skillItem.querySelector('.skill-progress');
        const percentageElement = skillItem.querySelector('.skill-percentage');
        const targetPercentage = progressBar.getAttribute('data-percentage');

        // Add animation class
        skillItem.classList.add('animate');

        // Animate progress bar
        setTimeout(() => {
          progressBar.style.width = targetPercentage + '%';
          progressBar.classList.add('animate');

          // Animate percentage counter
          animatePercentage(percentageElement, 0, parseInt(targetPercentage), 2000);
        }, 300);

        // Stop observing after animation
        observer.unobserve(skillItem);
      }
    });
  }, { threshold: 0.3 });

  // Observe all skill items
  skillItems.forEach(item => {
    observer.observe(item);
  });
}

// Animate percentage counter
function animatePercentage(element, start, end, duration) {
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentValue = Math.floor(start + (end - start) * easeOutQuart);

    element.textContent = currentValue + '%';

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);
}

// Skill bar hover effects
function initSkillBarInteractions() {
  const skillItems = document.querySelectorAll('.skill-item');

  skillItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-4px) scale(1.02)';
    });

    item.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });

    // Add click effect
    item.addEventListener('click', function () {
      this.style.transform = 'translateY(-2px) scale(0.98)';
      setTimeout(() => {
        this.style.transform = 'translateY(-4px) scale(1.02)';
      }, 150);
    });
  });
}

// Skill icon animations
function initSkillIconAnimations() {
  const skillIcons = document.querySelectorAll('.skill-icon');

  skillIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.2) rotate(5deg)';
      this.style.boxShadow = '0 8px 25px rgba(41, 128, 185, 0.5)';
    });

    icon.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1) rotate(0deg)';
      this.style.boxShadow = '0 4px 15px rgba(41, 128, 185, 0.3)';
    });
  });
}

// Initialize all project features
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(type, newTextDelay + 250);

  // Premium Hero Typing Effect
  function initHeroTyping() {
    const heroText = document.getElementById('heroTypedText');
    if (!heroText) return;

    const textToType = 'Sathyaseelan';
    let charIndex = 0;
    const typingSpeed = 150; // Slower, more premium feel (150ms per character)

    function typeChar() {
      if (charIndex < textToType.length) {
        heroText.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, typingSpeed);
      }
    }

    // Start typing after a short delay
    setTimeout(typeChar, 500);
  }

  // Initialize animations when page loads
  initHeroTyping();
  startCounters();
  initParticles();
  initThemeToggle();
  initSkillsRadarChart();
  initContactForms();
  initDownloadTracking();
  initSocialTracking();
  initProjectFilter();
  initProjectAnimations();
  initFeaturedProject();
  initProjectTracking();
  initProjectInteractions();
  initSkillBars();
  initSkillBarInteractions();
  initSkillIconAnimations();
});

// Theme Toggle Functionality
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Remove preload class after page loads to enable transitions
  window.addEventListener('load', () => {
    body.classList.remove('preload');
  });

  // Add preload class initially to prevent transition on page load
  body.classList.add('preload');

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeToggle.textContent = '☀️';
  }

  // Create blur overlay element
  const overlay = document.createElement('div');
  overlay.className = 'theme-transition-overlay';
  document.body.appendChild(overlay);

  themeToggle.addEventListener('click', () => {
    // Add spinning animation to icon
    themeToggle.classList.add('spinning');

    // Show blur overlay
    overlay.classList.add('active');

    // Add theme-changing class for fade animation
    body.classList.add('theme-changing');

    // Wait for animation to start, then toggle theme
    setTimeout(() => {
      body.classList.toggle('light-theme');
      const isLightTheme = body.classList.contains('light-theme');
      themeToggle.textContent = isLightTheme ? '☀️' : '🌙';
      localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
    }, 150);

    // Remove animations after transition completes
    setTimeout(() => {
      themeToggle.classList.remove('spinning');
      overlay.classList.remove('active');
      body.classList.remove('theme-changing');
    }, 300);
  });
}

// Animated Counter
function startCounters() {
  const counters = document.querySelectorAll('.counter');
  const speed = 200;

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(startCounters, 1);
    } else {
      counter.innerText = target + '+';
    }
  });
}

// Initialize Particles.js
function initParticles() {
  // Check if particlesJS library is loaded
  if (typeof particlesJS === 'undefined') {
    console.log('Particles.js library not loaded, skipping particle effects');
    return;
  }

  particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#3498db"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#3498db",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
}

// Animate timeline items when they come into view
const timelineItems = document.querySelectorAll('.timeline-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

timelineItems.forEach(item => {
  item.style.opacity = 0;
  item.style.transform = 'translateY(20px)';
  item.style.transition = 'all 0.5s ease';
  observer.observe(item);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Skills Radar Chart
function initSkillsRadarChart() {
  const ctx = document.getElementById('skillsRadarChart');
  if (!ctx) return;

  // Destroy existing chart if it exists
  const existingChart = Chart.getChart(ctx);
  if (existingChart) {
    existingChart.destroy();
  }

  const radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Java', 'Python', 'HTML/CSS', 'SQL', 'AI/ML', 'MongoDB', 'Problem Solving'],
      datasets: [{
        label: 'Skill Level',
        data: [75, 10, 60, 80, 70, 70, 85],
        backgroundColor: 'rgba(220, 20, 60, 0.2)',
        borderColor: '#DC143C',
        borderWidth: 2,
        pointBackgroundColor: '#DC143C',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#DC143C',
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20,
            color: 'rgba(255, 255, 255, 0.5)',
            font: {
              size: 12
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.05)'
          },
          angleLines: {
            color: 'rgba(255, 255, 255, 0.05)'
          },
          pointLabels: {
            color: 'rgba(255, 255, 255, 0.7)',
            font: {
              size: 13,
              weight: '500'
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(30, 30, 30, 0.9)',
          titleFont: {
            size: 14,
            weight: 'bold'
          },
          bodyFont: {
            size: 13
          },
          padding: 12,
          displayColors: false,
          callbacks: {
            label: function (context) {
              return context.parsed.r + '%';
            }
          }
        }
      }
    }
  });

  // Update chart colors for light theme
  const body = document.body;
  const observer = new MutationObserver(() => {
    const isLightTheme = body.classList.contains('light-theme');
    const textColor = isLightTheme ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
    const gridColor = isLightTheme ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)';

    radarChart.options.scales.r.ticks.color = textColor;
    radarChart.options.scales.r.grid.color = gridColor;
    radarChart.options.scales.r.angleLines.color = gridColor;
    radarChart.options.scales.r.pointLabels.color = textColor;
    radarChart.update();
  });

  observer.observe(body, { attributes: true, attributeFilter: ['class'] });
}

// Initialize EmailJS with your public key
(function () {
  if (typeof emailjs !== 'undefined') {
    emailjs.init('vsj_MQ6R9MHOxCJGX');
    console.log('✅ EmailJS initialized successfully');
  }
})();

// Contact Form Handler
function initContactForm() {
  const contactForm = document.getElementById('contactForm');

  if (!contactForm) {
    console.log('Contact form not found');
    return;
  }

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Get form data
    const formData = {
      from_name: document.getElementById('name').value,
      from_email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };

    // Send email using EmailJS
    // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS credentials
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
      .then(function (response) {
        console.log('✅ Email sent successfully!', response.status, response.text);

        // Show success message
        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

        // Reset form
        contactForm.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
          submitBtn.style.background = '';
        }, 3000);

      }, function (error) {
        console.error('❌ Email send failed:', error);

        // Show error message
        submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to Send';
        submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';

        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
          submitBtn.style.background = '';
        }, 3000);

        alert('Oops! Something went wrong. Please try again or email me directly at ksathyaseelan34@gmail.com');
      });
  });

  console.log('✅ Contact form handler initialized');
}

// Initialize contact form when DOM is ready
document.addEventListener('DOMContentLoaded', initContactForm);

// Achievements Carousel Navigation
document.addEventListener('DOMContentLoaded', function () {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinkItems = navLinks.querySelectorAll('a');
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      }
    });
  }

  const achievementsGrid = document.querySelector('.achievements-grid');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (achievementsGrid && prevBtn && nextBtn) {
    const scrollAmount = 320; // Card width + gap

    prevBtn.addEventListener('click', () => {
      achievementsGrid.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });

    nextBtn.addEventListener('click', () => {
      achievementsGrid.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });

    // Optional: Hide buttons at scroll boundaries
    function updateButtonVisibility() {
      const maxScroll = achievementsGrid.scrollWidth - achievementsGrid.clientWidth;
      prevBtn.style.opacity = achievementsGrid.scrollLeft <= 0 ? '0.3' : '1';
      nextBtn.style.opacity = achievementsGrid.scrollLeft >= maxScroll ? '0.3' : '1';
      prevBtn.style.pointerEvents = achievementsGrid.scrollLeft <= 0 ? 'none' : 'auto';
      nextBtn.style.pointerEvents = achievementsGrid.scrollLeft >= maxScroll ? 'none' : 'auto';
    }

    achievementsGrid.addEventListener('scroll', updateButtonVisibility);
    updateButtonVisibility(); // Initial check
  }

  // Scroll Animations
  initScrollAnimations();
});

// Scroll Animation Observer
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .timeline-item');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add stagger effect for timeline items
        if (entry.target.classList.contains('timeline-item')) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
        } else {
          entry.target.classList.add('visible');
        }

        // Trigger counting animation for stats
        if (entry.target.classList.contains('skill-gamification')) {
          animateStats();
        }

        // Unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Initialize Skills Word Cloud
  initSkillsCloud();
}

// Animate Stats Counter
function animateStats() {
  const statValues = document.querySelectorAll('.stat-value');

  statValues.forEach(stat => {
    const target = parseInt(stat.dataset.target);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const counter = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = target;
        clearInterval(counter);
      } else {
        stat.textContent = Math.floor(current);
      }
    }, 16);
  });
}

// Skills Word Cloud with 3D Effect
function initSkillsCloud() {
  // Use external SKILLS array if available (loaded via skills-data.js), otherwise fallback
  const skills = (window.SKILLS && Array.isArray(window.SKILLS) && window.SKILLS.length) ? window.SKILLS : [
    { name: 'JavaScript', level: 85, info: 'Built interactive UIs, front-end logic and small Node tools.' },
    { name: 'Python', level: 90, info: 'Implemented AI/ML projects using OpenCV, TensorFlow and scikit-learn.' },
    { name: 'HTML/CSS', level: 95, info: 'Responsive layouts, semantic markup and accessibility.' },
    { name: 'CSS', level: 80, info: 'Custom animations, responsive design and CSS architecture.' },
    { name: 'React', level: 80, info: 'Component-driven front-ends and SPA development.' },
    { name: 'Node.js', level: 75, info: 'Built REST APIs and small backends.' },
    { name: 'SQL', level: 70, info: 'Database design and complex queries for analytics.' },
    { name: 'Docker', level: 65, info: 'Containerized applications for reproducible environments.' },
    { name: 'OpenCV', level: 78, info: 'Computer vision pipelines, face detection, and tracking.' },
    { name: 'Machine Learning', level: 82, info: 'Built models for regression and classification problems.' },
    { name: 'Flask', level: 72, info: 'Microservices and small API endpoints.' },
    { name: 'Git', level: 90, info: 'Version control, branching strategies and CI workflows.' }
  ];

  const cloudContainer = document.getElementById('skillsCloud');
  if (!cloudContainer) return;

  const radius = Math.min(220, Math.floor(Math.min(cloudContainer.clientWidth, cloudContainer.clientHeight) / 2));

  // Create skill tags and add accessible handlers
  skills.forEach((skill, index) => {
    const tag = document.createElement('div');
    tag.className = 'skill-tag';
    tag.textContent = skill.name;
    tag.setAttribute('role', 'button');
    tag.setAttribute('aria-label', `${skill.name} — ${skill.info || 'Skill detail'}`);
    tag.tabIndex = 0;

    // Spherical distribution for layout
    const phi = Math.acos(-1 + (2 * index) / skills.length);
    const theta = Math.sqrt(skills.length * Math.PI) * phi;

    const x = Math.round(radius * Math.cos(theta) * Math.sin(phi));
    const y = Math.round(radius * Math.sin(theta) * Math.sin(phi));
    const z = Math.round(radius * Math.cos(phi));

    const size = 0.85 + ((skill.level || 60) / 100) * 0.9;

    // Store the base transform for each tag
    const baseTransform = `translate3d(${x}px, ${y}px, ${z}px) scale(${size})`;
    tag.style.left = '50%';
    tag.style.top = '50%';
    tag.style.transform = baseTransform;
    tag.dataset.baseTransform = baseTransform;

    const openHandler = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }

      // Pause the cloud rotation while modal is open
      cloudContainer.classList.add('paused');

      showSkillModal(skill);
      tag.classList.add('clicked');
      setTimeout(() => tag.classList.remove('clicked'), 300);
    };

    // Mouse click - primary interaction method
    tag.addEventListener('click', openHandler, { capture: true });

    // Touch handling for mobile - prevent default to stop scroll
    tag.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openHandler(e);
    }, { passive: false, capture: true });

    // Keyboard accessibility
    tag.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openHandler(e);
      }
    });

    // Ensure visibility and clickability
    tag.style.pointerEvents = 'auto';
    tag.style.cursor = 'pointer';

    cloudContainer.appendChild(tag);
  });

  // Pause rotation on hover/touch
  cloudContainer.addEventListener('mouseenter', () => cloudContainer.classList.add('paused'));
  cloudContainer.addEventListener('mouseleave', () => cloudContainer.classList.remove('paused'));
}


// Show Skill Modal
function showSkillModal(skill) {
  // Remove existing modal
  const existingModal = document.querySelector('.skill-modal');
  const existingOverlay = document.querySelector('.modal-overlay');
  if (existingModal) existingModal.remove();
  if (existingOverlay) existingOverlay.remove();

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  // Create modal
  const modal = document.createElement('div');
  modal.className = 'skill-modal';
  modal.innerHTML = `
    <button class="close-modal" aria-label="Close">&times;</button>
    <h3>${skill.name}</h3>
    <p class="skill-description">${skill.info || 'No details provided.'}</p>
    <p style="margin-top:0.6rem;font-weight:600;color:var(--primary-color);">Proficiency</p>
    <div class="skill-level-bar">
      <div class="skill-level-fill" style="width: 0%"></div>
    </div>
    <p style="opacity:0.85;margin-top:0.6rem;">Level: ${skill.level || 'N/A'}</p>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(modal);

  // Animate
  setTimeout(() => {
    overlay.classList.add('active');
    modal.classList.add('active');

    // Animate progress bar
    setTimeout(() => {
      const fill = modal.querySelector('.skill-level-fill');
      fill.style.width = (skill.level || 60) + '%';
    }, 300);
  }, 10);

  // Close handlers
  const closeModal = () => {
    modal.classList.remove('active');
    overlay.classList.remove('active');

    // Resume cloud rotation when modal closes
    const cloudContainer = document.getElementById('skillsCloud');
    if (cloudContainer) {
      cloudContainer.classList.remove('paused');
    }

    setTimeout(() => {
      modal.remove();
      overlay.remove();
    }, 300);
  };

  modal.querySelector('.close-modal').addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  // Close on Escape key
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}


// ========================================
// SKILLS RADAR CHART INITIALIZATION
// ========================================

function initSkillsRadarChart() {
  const canvas = document.getElementById('skillsRadarChart');
  if (!canvas) {
    console.warn('Skills Radar Chart canvas not found');
    return;
  }

  const ctx = canvas.getContext('2d');

  // Detect if light theme is active
  const isLightTheme = document.body.classList.contains('light-theme');
  const labelColor = isLightTheme ? '#0f172a' : 'rgba(255, 255, 255, 0.8)';
  const gridColor = isLightTheme ? 'rgba(100, 116, 139, 0.3)' : 'rgba(220, 20, 60, 0.2)';
  const tickColor = isLightTheme ? '#334155' : 'rgba(255, 255, 255, 0.5)';

  // Skills data for radar chart
  const skillsData = {
    labels: ['Java', 'Python', 'HTML/CSS', 'SQL', 'AI/ML', 'MongoDB', 'Problem Solving'],
    datasets: [{
      label: 'Proficiency Level',
      data: [75, 90, 95, 80, 78, 70, 85],
      backgroundColor: 'rgba(220, 20, 60, 0.2)',
      borderColor: '#DC143C',
      borderWidth: 2,
      pointBackgroundColor: '#DC143C',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#DC143C',
      pointRadius: 5,
      pointHoverRadius: 7
    }]
  };

  // Chart configuration
  const config = {
    type: 'radar',
    data: skillsData,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20,
            color: tickColor,
            backdropColor: 'transparent'
          },
          grid: {
            color: gridColor
          },
          angleLines: {
            color: 'rgba(220, 20, 60, 0.2)'
          },
          pointLabels: {
            color: labelColor,
            font: {
              size: 14,
              weight: '600'
            }
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: labelColor,
            font: {
              size: 12
            },
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: 'rgba(10, 10, 10, 0.9)',
          titleColor: '#DC143C',
          bodyColor: '#fff',
          borderColor: '#DC143C',
          borderWidth: 1,
          padding: 12,
          displayColors: true,
          callbacks: {
            label: function (context) {
              return context.dataset.label + ': ' + context.parsed.r + '%';
            }
          }
        }
      },
      animation: {
        duration: 1500,
        easing: 'easeInOutQuart'
      }
    }
  };

  // Create the chart
  new Chart(ctx, config);
  console.log('Skills Radar Chart initialized successfully');
}
