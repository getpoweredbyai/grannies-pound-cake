// Modern Animations & Interactions - Powered by UnifiedAI
// Scroll-triggered animations and enhanced UI interactions

class ModernEnhancements {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupParallaxEffects();
    this.setupMagneticButtons();
    this.setupSmoothScrolling();
    this.setupCardTiltEffects();
    this.addPoweredByBadge();
    this.setupLoadingAnimations();
  }

  // Intersection Observer for scroll animations
  setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .product-card, .collection-card, .blog-post-card, h1, h2, h3, .hero-content, .section-header');
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add stagger delay for cards
          if (entry.target.classList.contains('product-card') || 
              entry.target.classList.contains('collection-card') ||
              entry.target.classList.contains('blog-post-card')) {
            entry.target.style.animationDelay = `${index * 0.1}s`;
          }
          
          // Add animation classes
          entry.target.classList.add('fade-in-up');
          entry.target.style.opacity = '1';
          
          // Unobserve after animation
          setTimeout(() => {
            observer.unobserve(entry.target);
          }, 1000);
        }
      });
    }, observerOptions);

    animatedElements.forEach(element => {
      element.classList.add('animate-on-scroll');
      element.style.opacity = '0';
      observer.observe(element);
    });
  }

  // Parallax scrolling effects
  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-element, .hero-image, .banner-image');
    
    if (parallaxElements.length === 0) return;

    let ticking = false;
    
    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.parallaxSpeed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
  }

  // Magnetic button effect
  setupMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.button, button[type="submit"], .btn');
    
    magneticButtons.forEach(button => {
      button.classList.add('magnetic-button');
      
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
      });
    });
  }

  // Smooth scrolling for anchor links
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // 3D card tilt effect
  setupCardTiltEffects() {
    const cards = document.querySelectorAll('.product-card, .collection-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }

  // Add Powered by UnifiedAI badge
  addPoweredByBadge() {
    const badge = document.createElement('a');
    badge.href = 'https://get.poweredbyai.com';
    badge.target = '_blank';
    badge.className = 'powered-by-unifiedai';
    badge.textContent = 'Powered by UnifiedAI';
    document.body.appendChild(badge);
  }

  // Loading animations for dynamic content
  setupLoadingAnimations() {
    // Add shimmer effect to loading states
    const loadingElements = document.querySelectorAll('.loading, .skeleton');
    
    loadingElements.forEach(element => {
      element.classList.add('loading-shimmer');
    });

    // Animate new content when it loads
    const observeNewContent = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              if (node.classList && (node.classList.contains('product-card') || 
                  node.classList.contains('collection-card'))) {
                node.classList.add('animate-on-scroll', 'scale-in');
                node.style.opacity = '0';
                setTimeout(() => {
                  node.style.opacity = '1';
                }, 100);
              }
            }
          });
        }
      });
    });

    // Observe the main content area for changes
    const mainContent = document.querySelector('main') || document.body;
    observeNewContent.observe(mainContent, {
      childList: true,
      subtree: true
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ModernEnhancements();
  });
} else {
  new ModernEnhancements();
}

// Add smooth page transitions
window.addEventListener('beforeunload', () => {
  document.body.classList.add('page-transition');
});