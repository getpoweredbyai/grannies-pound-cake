class ModernAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Initialize scroll triggers
    this.initScrollTriggers();
    
    // Initialize magnetic buttons
    this.initMagneticButtons();
    
    // Initialize parallax effects
    this.initParallax();
    
    // Initialize micro interactions
    this.initMicroInteractions();
    
    // Initialize smooth scroll
    this.initSmoothScroll();
    
    console.log('🚀 Modern Animations initialized - Powered by UnifiedAI');
  }

  // Intersection Observer for scroll animations
  initScrollTriggers() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe elements with scroll animation classes
    const elementsToAnimate = document.querySelectorAll('.product-card, .press-card, .hero-modern__content');
    elementsToAnimate.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      observer.observe(el);
    });
  }

  // Magnetic button effect
  initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.hero-modern__cta, .product-card__cta, .product-showcase__view-all');
    
    magneticButtons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0px, 0px) scale(1)';
      });
    });
  }

  // Parallax scrolling effects
  initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-modern__background');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      parallaxElements.forEach(element => {
        element.style.transform = `translate3d(0, ${rate}px, 0)`;
      });
    });
  }

  // Micro interactions
  initMicroInteractions() {
    // Ripple effect on buttons
    this.initRippleEffect();
    
    // Hover animations for cards
    this.initCardHoverEffects();
    
    // Loading animations
    this.initLoadingAnimations();
  }

  initRippleEffect() {
    const buttons = document.querySelectorAll('.product-card__cta, .hero-modern__cta');
    
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
    
    // Add ripple animation to CSS
    if (!document.querySelector('#ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  initCardHoverEffects() {
    const cards = document.querySelectorAll('.product-card, .press-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  initLoadingAnimations() {
    // Stagger animation for grid items
    const gridItems = document.querySelectorAll('.product-showcase__grid .product-card');
    
    gridItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
    });
  }

  // Smooth scroll for anchor links
  initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Advanced scroll effects
  initAdvancedScrollEffects() {
    // Fade in elements on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      fadeObserver.observe(section);
    });
  }

  // 3D card tilt effect
  init3DCardEffect() {
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // Performance optimized scroll handler
  initOptimizedScrollHandler() {
    let ticking = false;
    
    const updateScrollEffects = () => {
      const scrollY = window.pageYOffset;
      
      // Update parallax elements
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        const y = scrollY * speed;
        element.style.transform = `translate3d(0, ${y}px, 0)`;
      });
      
      ticking = false;
    };
    
    const requestScrollUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ModernAnimations();
  });
} else {
  new ModernAnimations();
}