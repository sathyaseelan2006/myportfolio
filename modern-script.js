// ========================================
// MODERN PORTFOLIO ENHANCEMENTS
// ========================================

// Counter Animation for Statistics
function initCounterAnimation() {
  const counters = document.querySelectorAll('.counter');
  
  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + (target > 10 ? '+' : '');
      }
    };
    
    updateCounter();
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

// Initialize all modern features
document.addEventListener('DOMContentLoaded', function() {
  initCounterAnimation();
});
