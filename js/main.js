document.addEventListener('DOMContentLoaded', function () {
  // Add animation classes to elements when they come into view
  const animateOnScroll = function () {
    const elements = document.querySelectorAll('.animate-on-scroll');

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 50) {
        if (element.dataset.animation === 'fade-in') {
          element.classList.add('fade-in');
        } else if (element.dataset.animation === 'slide-in-bottom') {
          element.classList.add('slide-in-bottom');
        } else if (element.dataset.animation === 'slide-in-left') {
          element.classList.add('slide-in-left');
        } else if (element.dataset.animation === 'slide-in-right') {
          element.classList.add('slide-in-right');
        } else {
          element.classList.add('fade-in');
        }
      }
    });
  };

  // Run on load
  animateOnScroll();

  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);

  // Add staggered animation classes to list items
  const staggeredLists = document.querySelectorAll('.staggered-list');

  staggeredLists.forEach(list => {
    const items = list.querySelectorAll('li, .stagger-item');
    items.forEach((item, index) => {
      item.style.animationDelay = `${0.1 + (index * 0.1)}s`;
    });
  });

  // Initialize hover effect for menu cards
  const menuCards = document.querySelectorAll('.menu-card');
  menuCards.forEach(card => {
    card.classList.add('hover-lift');
  });

  // Initialize hover effect for gallery items
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.classList.add('hover-lift');
  });

  // Dynamic year for copyright
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(element => {
    element.textContent = currentYear;
  });

  // Theme toggle functionality (if needed)
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      document.body.classList.toggle('dark');

      // Save preference to localStorage
      if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
    }
  }

  // Simple form validation (if needed)
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function (event) {
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');

          const errorMessage = document.createElement('div');
          errorMessage.className = 'error-message';
          errorMessage.textContent = 'Field ini wajib diisi';

          // Remove existing error messages
          const existingError = field.parentNode.querySelector('.error-message');
          if (existingError) {
            existingError.remove();
          }

          field.parentNode.appendChild(errorMessage);
        } else {
          field.classList.remove('error');
          const existingError = field.parentNode.querySelector('.error-message');
          if (existingError) {
            existingError.remove();
          }
        }
      });

      if (!isValid) {
        event.preventDefault();
      }
    });
  });

  // WhatsApp order button functionality - ubah ke GoFood
  const whatsappButtons = document.querySelectorAll('.whatsapp-order');
  whatsappButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Arahkan ke GoFood alih-alih WhatsApp
      window.open('https://gofood.link/a/QZudouL', '_blank');
    });
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});