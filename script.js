// Custom Cursor - Disabled
/*
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX - 10 + 'px';
        cursorFollower.style.top = e.clientY - 10 + 'px';
    }, 100);
});

// Cursor hover effects
document.querySelectorAll('a, button, .category-card, .service-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});
*/

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (window.scrollY > lastScrollY && window.scrollY > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollY = window.scrollY;
});

// Smooth scroll for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add stagger effect for grid items
            if (entry.target.classList.contains('service-card')) {
                const cards = entry.target.parentElement.querySelectorAll('.service-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.service-card, .category-card, .feature-item, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Parallax effect for hero orbs
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        
        orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// Categories horizontal scroll with mouse wheel
const categoriesScroll = document.querySelector('.categories-scroll');
if (categoriesScroll) {
    categoriesScroll.addEventListener('wheel', (e) => {
        e.preventDefault();
        categoriesScroll.scrollLeft += e.deltaY;
    });
}

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Add mobile menu styles dynamically
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: var(--navbar-bg);
            flex-direction: column;
            padding: 40px;
            gap: 30px;
            backdrop-filter: blur(20px);
            animation: slideDown 0.3s ease;
            border-top: 1px solid var(--border-color);
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .menu-toggle.active span:first-child {
            transform: rotate(45deg) translateY(6px);
        }
        
        .menu-toggle.active span:last-child {
            transform: rotate(-45deg) translateY(-6px);
        }
    }
`;
document.head.appendChild(style);

// Add magnetic effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// Text splitting animation for hero title
function splitText() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const lines = heroTitle.querySelectorAll('span');
        lines.forEach(line => {
            const text = line.textContent;
            line.innerHTML = text.split('').map((char, i) => 
                `<span style="animation-delay: ${i * 0.02}s">${char}</span>`
            ).join('');
        });
    }
}

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    const html = document.documentElement;

    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);

    // Update toggle position based on current theme
    if (currentTheme === 'light') {
        themeSwitch.checked = true;
    }

    // Theme switch event listener
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
});

// Initialize on load
window.addEventListener('load', () => {
    splitText();
    
    // Add loaded class for initial animations
    document.body.classList.add('loaded');
    
    // Preloader if needed
    setTimeout(() => {
        document.body.style.overflow = 'visible';
    }, 500);
});

// Enhanced Scroll-Triggered Animations
const createScrollObserver = () => {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Handle staggered children animations
                if (entry.target.classList.contains('stagger-children')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections and animated elements
    document.querySelectorAll('.section-animate').forEach(el => {
        observer.observe(el);
    });
    
    return observer;
};

// Initialize scroll animations
let scrollObserver;
document.addEventListener('DOMContentLoaded', () => {
    scrollObserver = createScrollObserver();
    optimizeAnimations();
});

// Add performance optimization for scroll animations
const optimizeAnimations = () => {
    let ticking = false;
    
    const updateAnimations = () => {
        // Add any scroll-based animation updates here
        ticking = false;
    };
    
    const requestTick = () => {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', requestTick);
};

// Dynamic gradient animation on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.5;
        orb.style.transform = `translateY(${scrolled * speed * 0.1}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Category cards auto-scroll
let isScrolling = false;
const startAutoScroll = () => {
    if (!isScrolling && categoriesScroll) {
        isScrolling = true;
        let scrollAmount = 0;
        const scrollStep = 1;
        
        const autoScroll = setInterval(() => {
            categoriesScroll.scrollLeft += scrollStep;
            scrollAmount += scrollStep;
            
            if (scrollAmount >= categoriesScroll.scrollWidth - categoriesScroll.clientWidth) {
                categoriesScroll.scrollLeft = 0;
                scrollAmount = 0;
            }
        }, 30);
        
        categoriesScroll.addEventListener('mouseenter', () => {
            clearInterval(autoScroll);
            isScrolling = false;
        });
    }
};

// Start auto-scroll after 3 seconds
setTimeout(startAutoScroll, 3000);

// Add glitch effect on hover for logo
const logo = document.querySelector('.logo-text');
if (logo) {
    logo.addEventListener('mouseenter', () => {
        logo.style.animation = 'glitch 0.3s ease';
        setTimeout(() => {
            logo.style.animation = '';
        }, 300);
    });
}

// Add glitch animation
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    @keyframes glitch {
        0%, 100% {
            text-shadow: 
                2px 0 #FF1493,
                -2px 0 #00FFFF,
                0 0 10px #FF1493;
        }
        25% {
            text-shadow: 
                -2px 0 #FF1493,
                2px 0 #00FFFF,
                0 0 10px #00FFFF;
        }
        50% {
            text-shadow: 
                2px 2px #FF1493,
                -2px -2px #00FFFF,
                0 0 15px #FF1493;
        }
        75% {
            text-shadow: 
                -2px 2px #FF1493,
                2px -2px #00FFFF,
                0 0 15px #00FFFF;
        }
    }
`;
document.head.appendChild(glitchStyle);

// Particle System
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.sparkles = [];
        this.maxParticles = 150;
        this.maxSparkles = 50;
        
        this.init();
        this.createParticles();
        this.createSparkles();
        this.animate();
    }
    
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 0.8 + 0.2,
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() - 0.5) * 0.2,
                opacity: Math.random() * 0.3 + 0.1,
                color: Math.random() > 0.5 ? 'rgba(255, 20, 147,' : 'rgba(255, 215, 0,',
                life: Math.random() * 200 + 100,
                maxLife: Math.random() * 100 + 50
            });
        }
    }
    
    createSparkles() {
        // Create DOM sparkles for more variety
        for (let i = 0; i < this.maxSparkles; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = `sparkle ${Math.random() > 0.6 ? 'gold' : 'pink'} sparkle-${Math.floor(Math.random() * 4) + 1}`;
            sparkle.style.left = Math.random() * window.innerWidth + 'px';
            sparkle.style.top = window.innerHeight + Math.random() * 100 + 'px';
            
            document.querySelector('.particles-container').appendChild(sparkle);
            
            // Remove sparkle after animation
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 12000);
        }
    }
    
    updateParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Update life
            particle.life--;
            particle.opacity = (particle.life / particle.maxLife) * 0.5;
            
            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color + particle.opacity + ')';
            this.ctx.fill();
            
            // Add subtle glow
            this.ctx.shadowColor = particle.color + '0.3)';
            this.ctx.shadowBlur = particle.size * 2;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
            
            // Reset particle if life is over
            if (particle.life <= 0) {
                particle.x = Math.random() * this.canvas.width;
                particle.y = Math.random() * this.canvas.height;
                particle.life = particle.maxLife;
                particle.speedX = (Math.random() - 0.5) * 0.2;
                particle.speedY = (Math.random() - 0.5) * 0.2;
            }
        });
    }
    
    animate() {
        this.updateParticles();
        requestAnimationFrame(() => this.animate());
    }
    
    // Optimize performance
    reduceParticles() {
        if (this.particles.length > this.maxParticles * 2) {
            this.particles = this.particles.slice(0, this.maxParticles);
        }
    }
    
    addBurst(x, y) {
        // Add particle burst at position
        for (let i = 0; i < 8; i++) {
            this.particles.push({
                x: x,
                y: y,
                size: Math.random() * 0.6 + 0.2,
                speedX: (Math.random() - 0.5) * 1.5,
                speedY: (Math.random() - 0.5) * 1.5,
                opacity: 0.6,
                color: Math.random() > 0.5 ? 'rgba(255, 20, 147,' : 'rgba(255, 215, 0,',
                life: 50,
                maxLife: 50
            });
        }
        this.reduceParticles();
    }
}

// Initialize particle system
let particleSystem;
document.addEventListener('DOMContentLoaded', () => {
    // Wait for DOM to be fully ready
    setTimeout(() => {
        particleSystem = new ParticleSystem();
        console.log('Particle system initialized');
        
        // Add sparkle generation interval
        setInterval(() => {
            if (document.querySelectorAll('.sparkle').length < 30) {
                particleSystem.createSparkles();
            }
        }, 3000);
    }, 1000);
});

// Add particles on scroll
window.addEventListener('scroll', () => {
    if (Math.random() > 0.95 && particleSystem) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        particleSystem.addBurst(x, y);
    }
});

// AI Image Slider Functionality
class AIImageSlider {
    constructor() {
        this.slider = document.querySelector('.before-after-slider');
        this.handle = document.getElementById('slider-handle');
        this.line = document.getElementById('slider-line');
        this.afterImage = document.querySelector('.after-image');
        this.processBtn = document.getElementById('process-btn');
        this.uploadBtn = document.getElementById('upload-btn');
        this.imageUpload = document.getElementById('image-upload');
        this.beforeImg = document.getElementById('before-img');
        this.afterImg = document.getElementById('after-img');
        
        this.isDragging = false;
        this.sliderRect = null;
        this.aiModel = null;
        this.session = null;
        
        this.init();
    }
    
    init() {
        if (!this.slider) return;
        
        this.bindEvents();
        this.setupAutoDemo();
        this.initializeAI();
    }
    
    async initializeAI() {
        try {
            // Initialize ONNX Runtime
            console.log('Initializing ONNX Runtime for browser AI processing...');
            
            // For demonstration, we'll use a lightweight approach
            // In production, you'd load actual pre-trained models
            this.aiReady = true;
            console.log('AI system ready for processing');
        } catch (error) {
            console.error('AI initialization failed:', error);
            this.aiReady = false;
        }
    }
    
    bindEvents() {
        // Mouse events
        this.handle.addEventListener('mousedown', (e) => this.startDrag(e));
        document.addEventListener('mousemove', (e) => this.onDrag(e));
        document.addEventListener('mouseup', () => this.stopDrag());
        
        // Touch events
        this.handle.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]), { passive: false });
        document.addEventListener('touchmove', (e) => this.onDrag(e.touches[0]), { passive: false });
        document.addEventListener('touchend', () => this.stopDrag());
        
        // Process button
        if (this.processBtn) {
            this.processBtn.addEventListener('click', () => this.processWithAI());
        }
        
        // Upload button
        if (this.uploadBtn && this.imageUpload) {
            this.uploadBtn.addEventListener('click', () => this.imageUpload.click());
            this.imageUpload.addEventListener('change', (e) => this.handleImageUpload(e));
        }
        
        // Click on slider to move handle
        this.slider.addEventListener('click', (e) => {
            if (!this.isDragging) {
                this.moveToPosition(e);
            }
        });
    }
    
    startDrag(e) {
        this.isDragging = true;
        this.sliderRect = this.slider.getBoundingClientRect();
        this.handle.style.cursor = 'grabbing';
        e.preventDefault();
    }
    
    onDrag(e) {
        if (!this.isDragging || !this.sliderRect) return;
        
        const x = e.clientX - this.sliderRect.left;
        const percentage = Math.max(0, Math.min(100, (x / this.sliderRect.width) * 100));
        
        this.updateSlider(percentage);
        e.preventDefault();
    }
    
    stopDrag() {
        this.isDragging = false;
        this.sliderRect = null;
        this.handle.style.cursor = 'grab';
    }
    
    moveToPosition(e) {
        const rect = this.slider.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        
        this.updateSlider(percentage);
    }
    
    updateSlider(percentage) {
        // Update handle position
        this.handle.style.left = `${percentage}%`;
        this.line.style.left = `${percentage}%`;
        
        // Update clip-path for after image
        this.afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        
        // Add particle burst at handle position
        if (particleSystem && Math.random() > 0.8) {
            const rect = this.slider.getBoundingClientRect();
            const x = rect.left + (rect.width * percentage / 100);
            const y = rect.top + rect.height / 2;
            particleSystem.addBurst(x, y);
        }
    }
    
    setupAutoDemo() {
        // Auto-slide demo every 5 seconds
        let direction = 1;
        let position = 50;
        
        setInterval(() => {
            if (!this.isDragging) {
                position += direction * 20;
                if (position >= 80 || position <= 20) {
                    direction *= -1;
                }
                
                this.animateToPosition(position);
            }
        }, 4000);
    }
    
    animateToPosition(targetPercentage) {
        const currentPos = parseFloat(this.handle.style.left) || 50;
        const duration = 1000;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentPosition = currentPos + (targetPercentage - currentPos) * easeProgress;
            
            this.updateSlider(currentPosition);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            this.beforeImg.src = event.target.result;
            
            // Create a simple filtered version for demo
            this.createProcessedVersion(event.target.result);
        };
        reader.readAsDataURL(file);
    }
    
    createProcessedVersion(imageSrc) {
        // Create a canvas to process the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Draw original image
            ctx.drawImage(img, 0, 0);
            
            // Apply simple processing (edge detection filter simulation)
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            
            // Simple segmentation effect
            for (let i = 0; i < data.length; i += 4) {
                const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
                
                if (brightness > 128) {
                    // Highlight bright areas in pink
                    data[i] = Math.min(255, data[i] + 50);     // Red
                    data[i + 1] = Math.max(0, data[i + 1] - 20); // Green
                    data[i + 2] = Math.min(255, data[i + 2] + 30); // Blue
                } else {
                    // Enhance dark areas
                    data[i] = Math.min(255, data[i] + 20);
                    data[i + 1] = Math.min(255, data[i + 1] + 40);
                    data[i + 2] = Math.min(255, data[i + 2] + 60);
                }
            }
            
            ctx.putImageData(imageData, 0, 0);
            this.afterImg.src = canvas.toDataURL();
        };
        
        img.src = imageSrc;
    }
    
    async processWithAI() {
        if (!this.aiReady) {
            console.log('AI system not ready, falling back to demo mode');
            return this.simulateAIProcessing();
        }
        
        const btnText = this.processBtn.querySelector('.btn-text');
        const btnLoading = this.processBtn.querySelector('.btn-loading');
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        this.processBtn.disabled = true;
        
        try {
            // In a real implementation, this would:
            // 1. Load the ONNX model
            // 2. Preprocess the image
            // 3. Run inference
            // 4. Post-process results
            
            // For now, simulate processing
            await this.simulateAIInference();
            
        } catch (error) {
            console.error('AI processing failed:', error);
        } finally {
            // Reset button
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            this.processBtn.disabled = false;
        }
    }
    
    async simulateAIInference() {
        // Simulate AI processing steps
        await new Promise(resolve => setTimeout(resolve, 500));
        this.animateToPosition(20);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.animateToPosition(80);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.animateToPosition(50);
    }
    
    simulateAIProcessing() {
        // Legacy method for fallback
        this.processWithAI();
    }
}

// Newsletter Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = e.target.querySelector('.newsletter-input').value;
            const button = e.target.querySelector('.newsletter-btn');
            const originalText = button.textContent;
            
            if (!email || !email.trim()) return;
            
            // Show loading state
            button.textContent = 'Subscribing...';
            button.disabled = true;
            
            try {
                // Handle newsletter signup with Supabase
                const result = await handleNewsletterSignup(email);
                
                if (result.success) {
                    // Show success animation
                    button.textContent = '✨ Subscribed!';
                    button.style.background = '#32CD32';
                    
                    // Add particle burst
                    if (particleSystem) {
                        const rect = button.getBoundingClientRect();
                        particleSystem.addBurst(rect.left + rect.width/2, rect.top + rect.height/2);
                    }
                    
                    // Reset form
                    e.target.reset();
                } else {
                    button.textContent = 'Try Again';
                    button.style.background = '#FF6B6B';
                }
            } catch (error) {
                console.error('Newsletter signup error:', error);
                button.textContent = 'Error - Try Again';
                button.style.background = '#FF6B6B';
            }
            
            // Reset button after 3 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                button.disabled = false;
            }, 3000);
        });
    }
});

// Supabase Configuration
const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Replace with your Supabase anon key

// Initialize Supabase client
let supabaseClient = null;
if (typeof supabase !== 'undefined' && SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// V0 Chat Interface - Exact from 21st.dev component
class VercelV0Chat {
    constructor() {
        this.value = "";
        this.textareaRef = document.getElementById('v0-textarea');
        this.sendBtn = document.getElementById('v0-send-btn');
        this.messagesWrapper = document.getElementById('v0-messages');
        this.messagesScroll = document.querySelector('.v0-messages-scroll');
        this.actionBtns = document.querySelectorAll('.v0-action-btn');
        this.actionButtons = document.querySelector('.v0-action-buttons');
        this.isLoading = false;
        
        this.minHeight = 60;
        this.maxHeight = 200;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.adjustHeight();
        this.updateSendButton();
        
        // Set initial height
        if (this.textareaRef) {
            this.textareaRef.style.height = `${this.minHeight}px`;
        }
        
        // Handle window resize
        window.addEventListener("resize", () => this.adjustHeight());
    }
    
    bindEvents() {
        // Textarea events
        if (this.textareaRef) {
            this.textareaRef.addEventListener('input', (e) => {
                this.value = e.target.value;
                this.adjustHeight();
                this.updateSendButton();
            });
            
            this.textareaRef.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (this.value.trim() && !this.isLoading) {
                        this.sendMessage();
                    }
                }
            });
        }
        
        // Send button
        if (this.sendBtn) {
            this.sendBtn.addEventListener('click', () => {
                if (this.value.trim() && !this.isLoading) {
                    this.sendMessage();
                }
            });
        }
        
        // Action buttons
        this.actionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const text = btn.dataset.text;
                this.value = text;
                this.textareaRef.value = text;
                this.adjustHeight();
                this.updateSendButton();
                this.sendMessage();
            });
        });
    }
    
    adjustHeight(reset = false) {
        if (!this.textareaRef) return;

        if (reset) {
            this.textareaRef.style.height = `${this.minHeight}px`;
            return;
        }

        // Temporarily shrink to get the right scrollHeight
        this.textareaRef.style.height = `${this.minHeight}px`;

        // Calculate new height
        const newHeight = Math.max(
            this.minHeight,
            Math.min(
                this.textareaRef.scrollHeight,
                this.maxHeight || Number.POSITIVE_INFINITY
            )
        );

        this.textareaRef.style.height = `${newHeight}px`;
    }
    
    updateSendButton() {
        const hasText = this.value && this.value.trim().length > 0;
        if (this.sendBtn) {
            this.sendBtn.classList.toggle('active', hasText && !this.isLoading);
        }
    }
    
    async sendMessage() {
        if (this.isLoading || !this.value.trim()) return;
        
        this.isLoading = true;
        const message = this.value.trim();
        
        // Show messages container
        if (this.messagesWrapper) {
            this.messagesWrapper.style.display = 'block';
        }
        
        // Hide action buttons after first message
        if (this.actionButtons) {
            this.actionButtons.style.display = 'none';
        }
        
        // Add user message
        this.addMessage(message, 'user');
        
        // Clear textarea and reset height
        this.value = '';
        this.textareaRef.value = '';
        this.adjustHeight(true);
        this.updateSendButton();
        
        // Add typing indicator
        this.addTypingIndicator();
        
        try {
            // Store message in Supabase
            if (supabaseClient) {
                await supabaseClient
                    .from('chat_messages')
                    .insert([{
                        message: message,
                        user_email: null,
                        user_agent: navigator.userAgent,
                        ip_address: null
                    }]);
            }
            
            // Generate response
            const response = await this.generateResponse(message);
            
            // Remove typing indicator and add response
            setTimeout(() => {
                this.removeTypingIndicator();
                this.addMessage(response, 'assistant');
                this.isLoading = false;
                this.updateSendButton();
            }, 1000 + Math.random() * 1000);
            
        } catch (error) {
            console.error('Error sending message:', error);
            this.removeTypingIndicator();
            this.addMessage('Sorry, I encountered an error. Please try again or contact us directly.', 'assistant');
            this.isLoading = false;
            this.updateSendButton();
        }
    }
    
    addMessage(content, type) {
        if (!this.messagesScroll) return;
        
        const messageEl = document.createElement('div');
        messageEl.className = `v0-message ${type}`;
        
        const contentEl = document.createElement('div');
        contentEl.className = 'v0-message-content';
        contentEl.textContent = content;
        
        messageEl.appendChild(contentEl);
        this.messagesScroll.appendChild(messageEl);
        this.scrollToBottom();
    }
    
    addTypingIndicator() {
        if (!this.messagesScroll) return;
        
        const messageEl = document.createElement('div');
        messageEl.className = 'v0-message assistant typing-indicator';
        
        const contentEl = document.createElement('div');
        contentEl.className = 'v0-message-content';
        
        const dotsEl = document.createElement('div');
        dotsEl.className = 'v0-typing-dots';
        dotsEl.innerHTML = '<span></span><span></span><span></span>';
        
        contentEl.appendChild(dotsEl);
        messageEl.appendChild(contentEl);
        this.messagesScroll.appendChild(messageEl);
        this.scrollToBottom();
    }
    
    removeTypingIndicator() {
        const indicator = this.messagesScroll?.querySelector('.typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    scrollToBottom() {
        if (this.messagesContainer) {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }
    }
    
    generateResponse(message) {
        return new Promise(resolve => {
            let response = "Thanks for your question! ";
            
            const msg = message.toLowerCase();
            
            if (msg.includes('materials') || msg.includes('source')) {
                response += "We source a wide variety of building materials including cabinets, countertops, flooring, windows, doors, railings, vanities, and garage doors. Our factories in Guangdong Province specialize in premium materials that meet US building standards. Would you like specific pricing on any materials?";
            } else if (msg.includes('save') || msg.includes('money') || msg.includes('cost') || msg.includes('price')) {
                response += "Our clients typically save 40-60% on material costs compared to US retail prices. For example, on a $50,000 material budget, you could save $20,000-$30,000! The exact savings depend on your specific materials and quantities. Want a custom quote?";
            } else if (msg.includes('quality') || msg.includes('control') || msg.includes('ensure')) {
                response += "Quality is our top priority! We provide in-person factory visits, detailed photo/video QC reports, sample approvals before mass production, and verification that all products meet US building codes and standards. Every shipment is inspected before leaving China.";
            } else if (msg.includes('tour') || msg.includes('factory') || msg.includes('visit') || msg.includes('china')) {
                response += "Our VIP China sourcing tours are incredible! Join us for 7 days visiting 5-10 vetted factories, attending the Canton Fair, and negotiating directly with manufacturers. The next tour is October 22-29, 2025, with only 10 spots available. Interested in joining?";
            } else if (msg.includes('shipping') || msg.includes('logistics') || msg.includes('delivery')) {
                response += "We handle all shipping logistics including CBM calculations, container loading, port coordination, customs documentation, and anti-dumping duty research. Typical shipping time from China to US ports is 25-35 days. We'll track everything for you!";
            } else if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
                response += "Welcome to PNK Trading! I'm here to help you source premium building materials directly from China at factory prices. What materials are you looking to source for your project?";
            } else {
                response += "I'd love to help you with your specific sourcing needs! For detailed information and custom quotes, I recommend scheduling a free consultation with our team. What type of project are you working on?";
            }
            
            setTimeout(() => resolve(response), 500);
        });
    }
}

// Legacy Chat functionality for compatibility
class PNKChatInterface {
    constructor() {
        this.chatInput = document.querySelector('.chat-input');
        this.sendButton = document.querySelector('.send-button');
        this.chatMessages = document.querySelector('.chat-messages');
        this.suggestionCards = document.querySelectorAll('.suggestion-card');
        this.isLoading = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.enableSendButton();
    }
    
    bindEvents() {
        // Input field events
        if (this.chatInput) {
            this.chatInput.addEventListener('input', (e) => {
                this.enableSendButton();
            });
            
            this.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey && this.chatInput.value.trim()) {
                    e.preventDefault();
                    this.sendMessage(this.chatInput.value.trim());
                }
            });
        }
        
        // Send button
        if (this.sendButton) {
            this.sendButton.addEventListener('click', () => {
                if (this.chatInput.value.trim() && !this.isLoading) {
                    this.sendMessage(this.chatInput.value.trim());
                }
            });
        }
        
        // Suggestion cards
        this.suggestionCards.forEach(card => {
            card.addEventListener('click', () => {
                const text = card.querySelector('.suggestion-text').textContent;
                this.chatInput.value = text;
                this.enableSendButton();
                this.sendMessage(text);
            });
        });
    }
    
    enableSendButton() {
        const hasText = this.chatInput.value.trim().length > 0;
        this.sendButton.disabled = !hasText || this.isLoading;
        this.sendButton.style.opacity = hasText && !this.isLoading ? '1' : '0.5';
    }
    
    async sendMessage(message) {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.enableSendButton();
        
        // Add user message to UI
        this.addUserMessage(message);
        
        // Clear input
        this.chatInput.value = '';
        this.enableSendButton();
        
        // Hide suggestions after first message
        const suggestions = document.querySelector('.suggested-questions');
        if (suggestions) {
            suggestions.style.display = 'none';
        }
        
        // Add typing indicator
        this.addTypingIndicator();
        
        try {
            // Store message in Supabase
            if (supabaseClient) {
                await supabaseClient
                    .from('chat_messages')
                    .insert([{
                        message: message,
                        user_email: null,
                        user_agent: navigator.userAgent,
                        ip_address: null // Will be set by server
                    }]);
            }
            
            // Simulate AI response
            const response = await this.generateResponse(message);
            
            // Remove typing indicator and add response
            setTimeout(() => {
                this.removeTypingIndicator();
                this.addBotMessage(response);
                this.isLoading = false;
                this.enableSendButton();
            }, 1000 + Math.random() * 1000);
            
        } catch (error) {
            console.error('Error sending message:', error);
            this.removeTypingIndicator();
            this.addBotMessage('Sorry, I encountered an error. Please try again or contact us directly.');
            this.isLoading = false;
            this.enableSendButton();
        }
    }
    
    addUserMessage(message) {
        const messageWrapper = document.createElement('div');
        messageWrapper.className = 'message-wrapper';
        messageWrapper.style.justifyContent = 'flex-end';
        
        messageWrapper.innerHTML = `
            <div class="message user-message">
                <div class="message-content" style="background: linear-gradient(135deg, #FF1493, #8B008B); color: white; border-radius: 18px 18px 4px 18px; max-width: 280px; margin-left: auto;">
                    <p style="margin: 0; padding: 12px 16px; font-size: 14px;">${this.escapeHtml(message)}</p>
                </div>
            </div>
        `;
        
        this.chatMessages.appendChild(messageWrapper);
        this.scrollToBottom();
    }
    
    addBotMessage(message) {
        const messageWrapper = document.createElement('div');
        messageWrapper.className = 'message-wrapper';
        
        messageWrapper.innerHTML = `
            <div class="message assistant-message">
                <div class="message-avatar">
                    <svg viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px;">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                </div>
                <div class="message-content">
                    <p style="margin: 0; font-size: 14px;">${this.escapeHtml(message)}</p>
                </div>
            </div>
        `;
        
        this.chatMessages.appendChild(messageWrapper);
        this.scrollToBottom();
    }
    
    addTypingIndicator() {
        const messageWrapper = document.createElement('div');
        messageWrapper.className = 'message-wrapper typing-indicator';
        
        messageWrapper.innerHTML = `
            <div class="message assistant-message">
                <div class="message-avatar">
                    <svg viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px;">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                </div>
                <div class="message-content">
                    <div class="typing-dots">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </div>
        `;
        
        this.chatMessages.appendChild(messageWrapper);
        this.scrollToBottom();
    }
    
    removeTypingIndicator() {
        const indicator = this.chatMessages.querySelector('.typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    generateResponse(message) {
        return new Promise(resolve => {
            let response = "Thanks for your question! ";
            
            const msg = message.toLowerCase();
            
            if (msg.includes('materials') || msg.includes('source')) {
                response += "We source a wide variety of building materials including cabinets, countertops, flooring, windows, doors, railings, vanities, and garage doors. Our factories in Guangdong Province specialize in premium materials that meet US building standards. Would you like specific pricing on any materials?";
            } else if (msg.includes('save') || msg.includes('money') || msg.includes('cost') || msg.includes('price')) {
                response += "Our clients typically save 40-60% on material costs compared to US retail prices. For example, on a $50,000 material budget, you could save $20,000-$30,000! The exact savings depend on your specific materials and quantities. Want a custom quote?";
            } else if (msg.includes('quality') || msg.includes('control') || msg.includes('ensure')) {
                response += "Quality is our top priority! We provide in-person factory visits, detailed photo/video QC reports, sample approvals before mass production, and verification that all products meet US building codes and standards. Every shipment is inspected before leaving China.";
            } else if (msg.includes('tour') || msg.includes('factory') || msg.includes('visit') || msg.includes('china')) {
                response += "Our VIP China sourcing tours are incredible! Join us for 7 days visiting 5-10 vetted factories, attending the Canton Fair, and negotiating directly with manufacturers. The next tour is October 22-29, 2025, with only 10 spots available. Interested in joining?";
            } else if (msg.includes('shipping') || msg.includes('logistics') || msg.includes('delivery')) {
                response += "We handle all shipping logistics including CBM calculations, container loading, port coordination, customs documentation, and anti-dumping duty research. Typical shipping time from China to US ports is 25-35 days. We'll track everything for you!";
            } else if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
                response += "Welcome to PNK Trading! I'm here to help you source premium building materials directly from China at factory prices. What materials are you looking to source for your project?";
            } else {
                response += "I'd love to help you with your specific sourcing needs! For detailed information and custom quotes, I recommend scheduling a free consultation with our team. What type of project are you working on?";
            }
            
            setTimeout(() => resolve(response), 500);
        });
    }
}

// Newsletter form functionality with Supabase
async function handleNewsletterSignup(email) {
    try {
        if (!supabaseClient) {
            console.log('Supabase not configured, simulating signup for:', email);
            return { success: true, message: 'Successfully subscribed!' };
        }
        
        const { data, error } = await supabaseClient
            .from('newsletter_subscribers')
            .insert([{
                email: email.toLowerCase().trim(),
                subscribed_at: new Date().toISOString(),
                user_agent: navigator.userAgent,
                source: 'website_newsletter'
            }])
            .select();
        
        if (error) {
            if (error.code === '23505') { // Unique constraint violation
                return { success: true, message: 'Email already subscribed!' };
            }
            throw error;
        }
        
        return { success: true, message: 'Successfully subscribed!' };
    } catch (error) {
        console.error('Newsletter signup error:', error);
        return { success: false, message: 'Failed to subscribe. Please try again.' };
    }
}

// Claude Chat Widget Functionality (Legacy - keeping for compatibility)
class ClaudeChatWidget {
    constructor() {
        this.widget = document.querySelector('.claude-chat-widget');
        this.promptBtns = document.querySelectorAll('.prompt-btn');
        this.chatInput = document.querySelector('.chat-input-field');
        this.sendBtn = document.querySelector('.chat-send-btn');
        this.chatMessages = document.querySelector('.chat-messages');
        
        this.init();
    }
    
    init() {
        if (!this.widget) return;
        
        this.bindEvents();
        this.startTypingAnimation();
    }
    
    bindEvents() {
        // Prompt button clicks
        this.promptBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.sendMessage(btn.textContent.replace(/"/g, ''));
            });
        });
        
        // Send button click
        if (this.sendBtn) {
            this.sendBtn.addEventListener('click', () => {
                if (this.chatInput.value.trim()) {
                    this.sendMessage(this.chatInput.value);
                    this.chatInput.value = '';
                }
            });
        }
        
        // Enter key in input
        if (this.chatInput) {
            this.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendBtn.click();
                }
            });
        }
    }
    
    sendMessage(message) {
        // Add user message
        this.addMessage(message, 'user');
        
        // Simulate typing
        setTimeout(() => {
            this.addTypingIndicator();
            
            // Add bot response after delay
            setTimeout(() => {
                this.removeTypingIndicator();
                this.addBotResponse(message);
            }, 1500);
        }, 500);
        
        // Add particle burst
        if (particleSystem) {
            const rect = this.widget.getBoundingClientRect();
            particleSystem.addBurst(rect.left + rect.width/2, rect.top + rect.height/2);
        }
    }
    
    addMessage(message, type) {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}-message`;
        
        const contentEl = document.createElement('div');
        contentEl.className = 'message-content';
        contentEl.textContent = message;
        
        messageEl.appendChild(contentEl);
        
        // Remove suggested prompts if they exist
        const prompts = this.chatMessages.querySelector('.suggested-prompts');
        if (prompts && type === 'user') {
            prompts.remove();
        }
        
        this.chatMessages.appendChild(messageEl);
        this.scrollToBottom();
    }
    
    addBotResponse(userMessage) {
        let response = "Thanks for your question! ";
        
        if (userMessage.toLowerCase().includes('cabinet') || userMessage.toLowerCase().includes('kitchen')) {
            response += "For cabinets, we work directly with premium factories in Guangdong Province. Typical savings are 40-60% compared to US retail prices. Would you like to schedule a factory tour?";
        } else if (userMessage.toLowerCase().includes('save') || userMessage.toLowerCase().includes('cost')) {
            response += "Our clients typically save 40-60% on material costs. For a $50K project, that's $20-30K in savings! The exact amount depends on your specific materials and quantities.";
        } else if (userMessage.toLowerCase().includes('tour') || userMessage.toLowerCase().includes('factory')) {
            response += "Our VIP sourcing tours visit 5-10 vetted factories over 3 days. You'll negotiate directly, see quality processes, and build relationships. Next tour is in March!";
        } else if (userMessage.toLowerCase().includes('quality') || userMessage.toLowerCase().includes('control')) {
            response += "We provide in-person QC visits, detailed photo/video reports, and sample approvals before shipping. Every product is verified to meet US building standards.";
        } else {
            response += "I'd love to help you with that! For detailed information about your specific sourcing needs, let's schedule a free consultation call. What materials are you looking to source?";
        }
        
        this.addMessage(response, 'bot');
    }
    
    addTypingIndicator() {
        const typingEl = document.createElement('div');
        typingEl.className = 'message bot-message typing-indicator';
        typingEl.innerHTML = '<div class="message-content"><div class="typing-dots"><span></span><span></span><span></span></div></div>';
        
        this.chatMessages.appendChild(typingEl);
        this.scrollToBottom();
    }
    
    removeTypingIndicator() {
        const typing = this.chatMessages.querySelector('.typing-indicator');
        if (typing) {
            typing.remove();
        }
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    startTypingAnimation() {
        // Add CSS for typing animation
        const style = document.createElement('style');
        style.textContent = `
            .typing-dots {
                display: flex;
                gap: 4px;
                padding: 4px 0;
            }
            
            .typing-dots span {
                width: 6px;
                height: 6px;
                background: #999;
                border-radius: 50%;
                animation: typing 1.4s infinite;
            }
            
            .typing-dots span:nth-child(1) { animation-delay: 0s; }
            .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
            .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
            
            @keyframes typing {
                0%, 60%, 100% { opacity: 0.3; transform: scale(0.8); }
                30% { opacity: 1; transform: scale(1); }
            }
            
            .user-message .message-content {
                background: var(--pink-gradient);
                color: white;
                border-radius: 16px 16px 4px 16px;
                margin-left: auto;
                max-width: 280px;
            }
            
            .user-message {
                justify-content: flex-end;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize AI slider and Chat Interface
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new AIImageSlider();
        new ClaudeChatWidget();
        new VercelV0Chat(); // Initialize the v0 chat interface
        new PNKChatInterface(); // Initialize the legacy chat interface (fallback)
    }, 500);
    
    // Add typing animation CSS
    const typingStyle = document.createElement('style');
    typingStyle.textContent = `
        .typing-dots {
            display: flex;
            gap: 4px;
            padding: 8px 0;
        }
        
        .typing-dots span {
            width: 6px;
            height: 6px;
            background: #999;
            border-radius: 50%;
            animation: typing 1.4s infinite;
        }
        
        .typing-dots span:nth-child(1) { animation-delay: 0s; }
        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes typing {
            0%, 60%, 100% { opacity: 0.3; transform: scale(0.8); }
            30% { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(typingStyle);
});