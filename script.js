// ===================================
// Agape Pedicure - JavaScript
// ===================================

'use strict';

// ===================================
// Mobile Navigation
// ===================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Handle dropdown menu on mobile
document.querySelectorAll('.dropdown > .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            link.parentElement.classList.toggle('active');
        }
    });
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ===================================
// Navbar Scroll Effect
// ===================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Active Navigation Link
// ===================================

const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===================================
// Smooth Scroll
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Scroll to Top Button
// ===================================

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Intersection Observer for Animations
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInElements = document.querySelectorAll('.service-card, .pricing-card, .testimonial-card, .gallery-item, .contact-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeInElements.forEach(element => {
    observer.observe(element);
});

// ===================================
// Preload High-Resolution Images
// ===================================

function preloadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger load
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.src;
        });
    }
}

// Initialize preload on page load
document.addEventListener('DOMContentLoaded', preloadImages);

// ===================================
// Gallery Lightbox Effect (Simple)
// ===================================

const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        // Add a simple zoom effect or could integrate a lightbox library
        const img = this.querySelector('img');
        if (img) {
            // Simple implementation - you can integrate a proper lightbox library for production
            console.log('Gallery item clicked:', img.src);
            // Example: Open image in new tab or integrate a lightbox
            // window.open(img.src, '_blank');
        }
    });
});

// ===================================
// Form Validation (if contact form is added)
// ===================================

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// ===================================
// Loading Animation
// ===================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero content on load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ===================================
// Parallax Effect for Hero
// ===================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// Booking Widget Helper
// ===================================

// Function to handle booking widget events
function initBookingWidget() {
    const bookingWidget = document.querySelector('.booking-widget iframe');
    
    if (bookingWidget) {
        // Listen for messages from the iframe if needed
        window.addEventListener('message', (event) => {
            // Handle booking completion or other events
            // This depends on SimplyMeet.me API
            if (event.data && event.data.type === 'booking-complete') {
                console.log('Booking completed successfully');
                // You can add tracking, analytics, or confirmation messages here
            }
        });
    }
}

// Initialize booking widget
document.addEventListener('DOMContentLoaded', initBookingWidget);

// ===================================
// Service Card Stagger Animation
// ===================================

function staggerAnimation() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

staggerAnimation();

// ===================================
// Counter Animation for Stats (if added)
// ===================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ===================================
// Testimonial Carousel (Optional Enhancement)
// ===================================

class TestimonialCarousel {
    constructor(container) {
        this.container = container;
        this.cards = container.querySelectorAll('.testimonial-card');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
    }
    
    init() {
        if (window.innerWidth <= 768 && this.cards.length > 1) {
            this.setupCarousel();
            this.autoPlay();
        }
    }
    
    setupCarousel() {
        // Add navigation buttons if needed
        // This is a simple implementation
    }
    
    autoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.next();
        }, 5000);
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.updateCarousel();
    }
    
    updateCarousel() {
        // Update carousel position
    }
}

// Initialize carousel on mobile
const testimonialContainer = document.querySelector('.testimonials-grid');
if (testimonialContainer) {
    const carousel = new TestimonialCarousel(testimonialContainer);
    carousel.init();
}

// ===================================
// Accessibility Enhancements
// ===================================

// Keyboard navigation for gallery
galleryItems.forEach(item => {
    item.setAttribute('tabindex', '0');
    item.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            item.click();
        }
    });
});

// ===================================
// Performance Monitoring
// ===================================

if ('PerformanceObserver' in window) {
    // Monitor largest contentful paint
    try {
        const po = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('LCP:', entry.renderTime || entry.loadTime);
            }
        });
        po.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
        // Observer not supported
    }
}

// ===================================
// Cookie Consent (Optional)
// ===================================

function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
        // Show cookie banner
        // This is a placeholder for actual cookie consent implementation
    }
}

// Initialize cookie check
checkCookieConsent();

// ===================================
// Initialize All Features
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Agape Pedicure website loaded successfully');
    
    // Add any initialization code here
    highlightNavigation();
    
    // Add smooth reveal for sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
    });
    
    // Reveal sections on scroll
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => sectionObserver.observe(section));
});

// ===================================
// Error Handling
// ===================================

window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // You can send errors to analytics or error tracking service
});

// ===================================
// Responsive Image Loading
// ===================================

function updateImageSources() {
    const images = document.querySelectorAll('img[data-src]');
    
    images.forEach(img => {
        const screenWidth = window.innerWidth;
        let src = img.getAttribute('data-src');
        
        // Adjust image quality based on screen size
        if (screenWidth < 768) {
            src = src.replace('w=2400', 'w=800');
        } else if (screenWidth < 1200) {
            src = src.replace('w=2400', 'w=1600');
        }
        
        img.src = src;
    });
}

// Update on load and resize
window.addEventListener('load', updateImageSources);
window.addEventListener('resize', updateImageSources);





