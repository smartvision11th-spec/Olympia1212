// =============================================
// OLYMPIA GYM - PREMIUM WEBSITE JAVASCRIPT
// Ultra-Modern Luxury Fitness Brand
// =============================================

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', initializeWebsite);

function initializeWebsite() {
    // Remove loading screen after animations
    setTimeout(() => {
        hideLoadingScreen();
    }, 4500);

    // Initialize all features
    setupNavigation();
    setupHeroAnimations();
    setupSmoothScrolling();
    setupScrollReveal();
    setupScrollListeners();
    setupServiceCards();
    setupPricingCards();
    setupGallery();
    setupBMICalculator();
    setupFormValidation();
    setupBookingFormSubmit();
    setupBackToTop();
    setupReviewSlider();
    setupCounterAnimation();
    setupIntersectionObserver();
}

// ============ LOADING SCREEN ============
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        document.body.classList.remove('no-scroll');
    }
}

// ============ NAVIGATION ============
function setupNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Close mobile menu
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.classList.remove('no-scroll');

            // Smooth scroll handled by default behavior
        });
    });

    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// ============ SMOOTH SCROLLING ============
function setupSmoothScrolling() {
    // Handle join button
    const joinBtn = document.getElementById('joinBtn');
    if (joinBtn) {
        joinBtn.addEventListener('click', () => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Handle services button
    const servicesBtn = document.getElementById('servicesBtn');
    if (servicesBtn) {
        servicesBtn.addEventListener('click', () => {
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Handle owner contact buttons
    const contactOwnerBtn = document.getElementById('contactOwnerBtn');
    if (contactOwnerBtn) {
        contactOwnerBtn.addEventListener('click', () => {
            openWhatsApp('I want to contact the owner');
        });
    }

    const joinOwnerBtn = document.getElementById('joinOwnerBtn');
    if (joinOwnerBtn) {
        joinOwnerBtn.addEventListener('click', () => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Handle book membership button
    const bookMembershipBtn = document.getElementById('bookMembershipBtn');
    if (bookMembershipBtn) {
        bookMembershipBtn.addEventListener('click', () => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// ============ HERO ANIMATIONS ============
function setupHeroAnimations() {
    // The animations are handled via CSS animations with delays
    // This function ensures proper timing
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // Content becomes visible after 3 seconds via CSS
        // JavaScript validation happens here
    }
}

// ============ SCROLL REVEAL ANIMATIONS ============
function setupScrollReveal() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        reveals.forEach(reveal => {
            reveal.classList.add('scroll-reveal');
            revealObserver.observe(reveal);
        });
    }
}

// ============ SCROLL LISTENERS ============
function setupScrollListeners() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });
}

// ============ SERVICE CARDS ============
function setupServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.8s ease ${0.1 * index}s backwards`;
        card.classList.add('scroll-reveal');
    });
}

// ============ PRICING CARDS ============
function setupPricingCards() {
    const pricingButtons = document.querySelectorAll('[data-plan]');
    
    pricingButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const plan = button.getAttribute('data-plan');
            const planField = document.getElementById('pricingPlan');
            
            if (planField) {
                // Set the appropriate plan
                const options = planField.querySelectorAll('option');
                options.forEach(option => {
                    if (option.value.includes(plan)) {
                        planField.value = option.value;
                    }
                });
            }

            // Scroll to form
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// ============ GALLERY LIGHTBOX ============
function setupGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imageSrc = item.getAttribute('data-image');
            if (lightboxImage && lightbox) {
                lightboxImage.src = imageSrc;
                lightbox.classList.add('active');
                document.body.classList.add('no-scroll');
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    }
}

// ============ BMI CALCULATOR ============
function setupBMICalculator() {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const calculateBtn = document.getElementById('calculateBtn');
    const bmiResult = document.getElementById('bmiResult');
    const bmiValue = document.getElementById('bmiValue');
    const bmiCategory = document.getElementById('bmiCategory');
    const bmiMessage = document.getElementById('bmiMessage');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateBMI);
    }

    // Real-time calculation
    if (heightInput && weightInput) {
        heightInput.addEventListener('input', calculateBMI);
        weightInput.addEventListener('input', calculateBMI);
    }

    function calculateBMI() {
        const height = parseFloat(heightInput?.value);
        const weight = parseFloat(weightInput?.value);

        if (!height || !weight || height <= 0 || weight <= 0) {
            if (bmiResult) bmiResult.style.display = 'none';
            return;
        }

        const bmi = weight / ((height / 100) ** 2);
        const roundedBMI = bmi.toFixed(1);

        let category = '';
        let message = '';

        if (bmi < 18.5) {
            category = 'Underweight';
            message = 'Join OLYMPIA GYM muscle gain programs to build strength and size.';
        } else if (bmi < 25) {
            category = 'Normal';
            message = 'Maintain your physique and achieve aesthetic body goals at OLYMPIA GYM.';
        } else if (bmi < 30) {
            category = 'Overweight';
            message = 'Join OLYMPIA GYM fat loss transformation programs for healthier fitness.';
        } else {
            category = 'Obese';
            message = 'Join OLYMPIA GYM fat loss transformation programs for healthier fitness.';
        }

        if (bmiValue) bmiValue.textContent = roundedBMI;
        if (bmiCategory) bmiCategory.textContent = category;
        if (bmiMessage) bmiMessage.textContent = message;
        if (bmiResult) bmiResult.style.display = 'block';
    }
}

// ============ FORM VALIDATION ============
function setupFormValidation() {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.parentElement.querySelector('.form-error').classList.contains('show')) {
                validateField(input);
            }
        });
    });
}

function validateField(field) {
    const errorElement = field.parentElement.querySelector('.form-error');
    let isValid = true;
    let errorMessage = '';

    // Reset error
    if (errorElement) {
        errorElement.classList.remove('show');
        errorElement.textContent = '';
    }

    switch (field.id) {
        case 'fullName':
            if (!field.value.trim()) {
                isValid = false;
                errorMessage = 'Full name is required';
            } else if (field.value.trim().length < 3) {
                isValid = false;
                errorMessage = 'Name must be at least 3 characters';
            }
            break;

        case 'mobile':
            if (!field.value.trim()) {
                isValid = false;
                errorMessage = 'Mobile number is required';
            } else if (!/^[0-9]{10}$/.test(field.value.replace(/[^0-9]/g, ''))) {
                isValid = false;
                errorMessage = 'Enter a valid 10-digit phone number';
            }
            break;

        case 'age':
            if (!field.value) {
                isValid = false;
                errorMessage = 'Age is required';
            } else if (field.value < 13 || field.value > 100) {
                isValid = false;
                errorMessage = 'Age must be between 13 and 100';
            }
            break;

        case 'email':
            if (!field.value.trim()) {
                isValid = false;
                errorMessage = 'Email is required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                isValid = false;
                errorMessage = 'Enter a valid email address';
            }
            break;

        case 'joiningDate':
            if (!field.value) {
                isValid = false;
                errorMessage = 'Joining date is required';
            }
            break;

        case 'address':
            if (!field.value.trim()) {
                isValid = false;
                errorMessage = 'Address is required';
            } else if (field.value.trim().length < 5) {
                isValid = false;
                errorMessage = 'Address must be at least 5 characters';
            }
            break;

        default:
            if (field.hasAttribute('required') && !field.value) {
                isValid = false;
                errorMessage = 'This field is required';
            }
    }

    // Show error if invalid
    if (!isValid && errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
    }

    return isValid;
}

// ============ BOOKING FORM SUBMISSION ============
function setupBookingFormSubmit() {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields
        const inputs = form.querySelectorAll('input, select, textarea');
        let isFormValid = true;

        inputs.forEach(input => {
            if (input.hasAttribute('required') && !validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            alert('Please fill all required fields correctly');
            return;
        }

        // Get form data
        const formData = {
            fullName: document.getElementById('fullName')?.value || '',
            mobile: document.getElementById('mobile')?.value || '',
            gender: document.getElementById('gender')?.value || '',
            age: document.getElementById('age')?.value || '',
            email: document.getElementById('email')?.value || '',
            fitnessGoal: document.getElementById('fitnessGoal')?.value || '',
            services: getSelectedServices(),
            pricingPlan: document.getElementById('pricingPlan')?.value || '',
            joiningDate: document.getElementById('joiningDate')?.value || '',
            address: document.getElementById('address')?.value || '',
            message: document.getElementById('message')?.value || ''
        };

        // Send to WhatsApp
        sendToWhatsApp(formData);
    });
}

function getSelectedServices() {
    const checkboxes = document.querySelectorAll('input[name="services"]:checked');
    return Array.from(checkboxes).map(cb => cb.value).join(', ');
}

function sendToWhatsApp(data) {
    const phoneNumber = '919897417774'; // WhatsApp number with country code
    
    let message = `Hello OLYMPIA GYM! I want to join your premium fitness center.\n\n`;
    message += `*Personal Details:*\n`;
    message += `Name: ${data.fullName}\n`;
    message += `Mobile: ${data.mobile}\n`;
    message += `Email: ${data.email}\n`;
    message += `Gender: ${data.gender}\n`;
    message += `Age: ${data.age}\n\n`;
    
    message += `*Fitness Goals:*\n`;
    message += `Goal: ${data.fitnessGoal}\n`;
    message += `Services: ${data.services}\n`;
    message += `Membership Plan: ${data.pricingPlan}\n\n`;
    
    message += `*Additional Info:*\n`;
    message += `Joining Date: ${data.joiningDate}\n`;
    message += `Address: ${data.address}\n`;
    
    if (data.message) {
        message += `\nMessage: ${data.message}\n`;
    }

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');

    // Reset form
    document.getElementById('bookingForm')?.reset();
    alert('Form submitted! Opening WhatsApp to complete your registration.');
}

function openWhatsApp(initialMessage = '') {
    const phoneNumber = '919897417774';
    const encodedMessage = encodeURIComponent(initialMessage);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// ============ BACK TO TOP BUTTON ============
function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============ COUNTER ANIMATIONS ============
function setupCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    let hasRun = false;

    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasRun) {
                hasRun = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    animateCounter(counter, target);
                });
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats-container');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }
}

function animateCounter(element, target) {
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// ============ REVIEW SLIDER ============
function setupReviewSlider() {
    const reviews = document.querySelectorAll('.review-card');
    if (reviews.length <= 1) return;

    let currentIndex = 0;

    const showReviews = () => {
        const visibleCount = window.innerWidth <= 768 ? 1 : 3;
        
        reviews.forEach((review, index) => {
            review.style.display = 'none';
        });

        for (let i = 0; i < visibleCount && i < reviews.length; i++) {
            const idx = (currentIndex + i) % reviews.length;
            reviews[idx].style.display = 'block';
            reviews[idx].style.animation = `fadeInUp 0.6s ease ${i * 0.1}s backwards`;
        }
    };

    showReviews();

    // Auto advance
    setInterval(() => {
        currentIndex++;
        showReviews();
    }, 5000);

    // Update on resize
    window.addEventListener('resize', showReviews);
}

// ============ INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ============
function setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;

    const options = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.classList.add('scroll-reveal');
        observer.observe(card);
    });

    // Observe pricing cards
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.classList.add('scroll-reveal');
        observer.observe(card);
    });

    // Observe blog cards
    document.querySelectorAll('.blog-card').forEach(card => {
        card.classList.add('scroll-reveal');
        observer.observe(card);
    });

    // Observe social cards
    document.querySelectorAll('.social-card').forEach(card => {
        card.classList.add('scroll-reveal');
        observer.observe(card);
    });

    // Observe review cards
    document.querySelectorAll('.review-card').forEach(card => {
        card.classList.add('scroll-reveal');
        observer.observe(card);
    });
}

// ============ PARALLAX EFFECT ============
window.addEventListener('scroll', () => {
    const lights = document.querySelectorAll('.light');
    const scrollY = window.pageYOffset;

    lights.forEach((light, index) => {
        light.style.transform = `translate(0, ${scrollY * (0.3 + index * 0.1)}px)`;
    });
});

// ============ KEYBOARD SHORTCUTS ============
document.addEventListener('keydown', (e) => {
    // Home - scroll to top
    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // End - scroll to bottom
    if (e.key === 'End') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

// ============ PERFORMANCE OPTIMIZATION ============
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============ UTILITY FUNCTIONS ============
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============ PERFORMANCE MONITORING ============
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time:', pageLoadTime + 'ms');
    });
}

// ============ ERROR HANDLING ============
window.addEventListener('error', (e) => {
    console.error('Error:', e.message);
    // Could send to error tracking service here
});

// ============ MOBILE OPTIMIZATION ============
// Prevent zoom on double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// ============ SESSION STORAGE ============
// Store user preferences
function saveUserPreference(key, value) {
    try {
        sessionStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.warn('SessionStorage not available:', e);
    }
}

function getUserPreference(key) {
    try {
        const value = sessionStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (e) {
        console.warn('SessionStorage not available:', e);
        return null;
    }
}

// ============ CONSOLE WELCOME MESSAGE ============
console.log(
    '%c🏋️ Welcome to OLYMPIA GYM - Elite Fitness Center 🏋️',
    'color: #ff1744; font-size: 18px; font-weight: bold;'
);
console.log(
    '%cTransform Your Body. Build Legends. Achieve Excellence.',
    'color: #ffffff; font-size: 14px;'
);
console.log(
    '%cContact us on WhatsApp: +91 98974 17774',
    'color: #25d366; font-size: 12px;'
);