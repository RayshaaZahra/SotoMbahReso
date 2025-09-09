document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');

      if (mobileMenu.classList.contains('open')) {
        mobileMenuButton.innerHTML = '<i class="fas fa-times"></i>';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
      } else {
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = ''; // Restore scrolling
      }
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (mobileMenu && mobileMenu.classList.contains('open')) {
      // Check if click is outside the mobile menu and the menu button
      if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
        mobileMenu.classList.remove('open');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = ''; // Restore scrolling
      }
    }
  });

  // Add active class to current page in navigation
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    
    // Check if current path matches the link's href
    if (currentPath.endsWith(linkPath) || 
        (currentPath.endsWith('/') && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Sticky navigation behavior
  const nav = document.querySelector('.nav');
  let lastScrollPosition = 0;
  
  window.addEventListener('scroll', function() {
    const currentScrollPosition = window.pageYOffset;
    
    // Add shadow to nav when scrolled
    if (currentScrollPosition > 10) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
    
    // Hide/show nav based on scroll direction (optional)
    if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
      // Scrolling down
      nav.classList.add('nav-hidden');
    } else {
      // Scrolling up
      nav.classList.remove('nav-hidden');
    }
    
    lastScrollPosition = currentScrollPosition;
  });

  // Add dropdown functionality if needed
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(event) {
      event.preventDefault();
      const dropdown = this.nextElementSibling;
      
      if (dropdown) {
        dropdown.classList.toggle('show');
        
        // Close other open dropdowns
        dropdownToggles.forEach(otherToggle => {
          if (otherToggle !== toggle) {
            const otherDropdown = otherToggle.nextElementSibling;
            if (otherDropdown && otherDropdown.classList.contains('show')) {
              otherDropdown.classList.remove('show');
            }
          }
        });
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function(event) {
    dropdownToggles.forEach(toggle => {
      if (!toggle.contains(event.target)) {
        const dropdown = toggle.nextElementSibling;
        if (dropdown && dropdown.classList.contains('show')) {
          dropdown.classList.remove('show');
        }
      }
    });
  });
});