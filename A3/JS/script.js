const elements = {
    contactForm: document.querySelector('.contact-form form'),
    loginForm: document.querySelector('.login-form form'),
    navItems: document.querySelector('.nav-items'),
    showcaseImages: document.querySelectorAll('.showcase img'),
    stats: document.querySelectorAll('.count-items span'),
  };
  
  // 1. Contact Form Validation
  function validateContactForm() {
    if (!elements.contactForm) return;
  
    elements.contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('Username').value.trim();
      const email = document.getElementById('Email').value.trim();
      const phone = document.getElementById('Phone').value.trim();
      const message = document.getElementById('Message').value.trim();
  
      if (!name || !email || !phone || !message) {
        showAlert('Please fill in all required fields', 'error');
        return;
      }
  
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showAlert('Please enter a valid email address', 'error');
        return;
      }
  
      if (!/^\d{10,15}$/.test(phone.replace(/\D/g, ''))) {
        showAlert('Please enter a valid phone number (10-15 digits)', 'error');
        return;
      }
  
      showAlert('Thank you for your message! We will get back to you soon.', 'success');
      elements.contactForm.reset();
    });
  }
  
  // 2. Login Form Validation
  function validateLoginForm() {
    if (!elements.loginForm) return;
  
    elements.loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
  
      if (!email || !password) {
        showAlert('Please fill in all fields', 'error');
        return;
      }
  
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showAlert('Please enter a valid email address', 'error');
        return;
      }
  
      showAlert('Login successful! Redirecting to your dashboard...', 'success');
      setTimeout(() => {
        window.location.href = 'landing.html'; // Redirect after success
      }, 1500);
    });
  }
 // 3. Mobile Navigation Toggle - Updated
function setupMobileNav() {
  const navBar = document.querySelector('.nav-bar');
  if (!navBar) return;

  // Create mobile menu button
  const navToggle = document.createElement('button');
  navToggle.className = 'mobile-nav-toggle';
  navToggle.setAttribute('aria-label', 'Toggle navigation');
  navToggle.innerHTML = '<i class="fas fa-bars"></i>';
  navBar.appendChild(navToggle);

  const navItems = document.querySelector('.nav-items');
  if (!navItems) return;

  // Handle click on mobile menu button
  navToggle.addEventListener('click', function() {
      const isVisible = navItems.classList.contains('show-mobile');
      
      // Toggle visibility
      navItems.classList.toggle('show-mobile');
      navToggle.classList.toggle('active');
      
      // Update icon
      navToggle.innerHTML = isVisible ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
  });

  // Close menu when clicking on nav items
  document.querySelectorAll('.nav-item a').forEach(item => {
      item.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
              navItems.classList.remove('show-mobile');
              navToggle.classList.remove('active');
              navToggle.innerHTML = '<i class="fas fa-bars"></i>';
          }
      });
  });
}
  
  // 4. Smooth Scrolling
  function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
  
  // 5. Animate Stats (About Page)
  function animateStats() {
    if (!elements.stats.length) return;
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = +entry.target.innerText;
          animateCounter(entry.target, target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
  
    elements.stats.forEach(stat => observer.observe(stat));
  }
  
  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 50);
  }
  
  // 6. Image Gallery
  function setupImageGallery() {
    if (!elements.showcaseImages.length) return;
  
    elements.showcaseImages.forEach(img => {
      img.addEventListener('click', function() {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
          <div class="modal-content">
            <img src="${this.src}" alt="${this.alt}">
            <button class="close-modal">&times;</button>
          </div>
        `;
        document.body.appendChild(modal);
  
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
          if (e.target === modal) modal.remove();
        });
      });
    });
  }
  
  // 7. Newsletter Popup
  function setupNewsletter() {
    if (localStorage.getItem('newsletterClosed')) return;
  
    setTimeout(() => {
      const newsletter = document.createElement('div');
      newsletter.className = 'newsletter-popup';
      newsletter.innerHTML = `
        <div class="newsletter-content">
          <h3>Get Travel Deals</h3>
          <p>Subscribe for exclusive offers!</p>
          <form>
            <input type="email" placeholder="Your email" required>
            <button type="submit">Subscribe</button>
          </form>
          <button class="close-newsletter">✕</button>
        </div>
      `;
      document.body.appendChild(newsletter);
  
      const closeBtn = newsletter.querySelector('.close-newsletter');
      closeBtn.addEventListener('click', () => {
        newsletter.remove();
        localStorage.setItem('newsletterClosed', 'true');
      });
  
      newsletter.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input').value.trim();
        if (email) {
          showAlert(`Thank you for subscribing with ${email}!`, 'success');
          newsletter.remove();
          localStorage.setItem('newsletterClosed', 'true');
        }
      });
    }, 5000);
  }
  
  // 8. Dark Mode Toggle
  function setupDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(darkModeToggle);
  
    if (localStorage.getItem('darkMode') === 'true') {
      document.documentElement.classList.add('dark-mode');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  
    darkModeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark-mode');
      const isDark = document.documentElement.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDark);
      darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
  }
  
  // 9. Scroll to Top Button
  function setupScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollBtn);
  
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('show', window.scrollY > 300);
    });
  
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // Helper function to show alerts
  function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    document.body.appendChild(alert);
  
    setTimeout(() => {
      alert.classList.add('fade-out');
      setTimeout(() => alert.remove(), 500);
    }, 3000);
  }
  
 
  function init() {
    validateContactForm();
    validateLoginForm();
    setupMobileNav();
    setupSmoothScrolling();
    animateStats();
    setupImageGallery();
    setupNewsletter();
    setupDarkMode();
    setupScrollToTop();
  }
  
  document.addEventListener('DOMContentLoaded', init);