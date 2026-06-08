/* ═══════════════════════════════════════════════════════════
   OLYMPIA GYM — script.js
   Vanilla JS | Mobile-first | Error-free
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ── Helpers ─────────────────────────────────────────────── */
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ══════════════════════════════════════════════════════════
   1. LOADING SCREEN
   ══════════════════════════════════════════════════════════ */
(function initLoader() {
  const loader = qs('#loader');
  if (!loader) return;

  const hideLoader = () => {
    loader.classList.add('hidden');
    // After loader hides, start hero reveal sequence
    setTimeout(startHeroSequence, 300);
  };

  // Hide after load or max 2.8s
  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 2500);
  } else {
    window.addEventListener('load', () => setTimeout(hideLoader, 2500));
    setTimeout(hideLoader, 2800); // safety fallback
  }
})();

/* ══════════════════════════════════════════════════════════
   2. HERO SEQUENCE — 3s cinematic intro then reveal
   ══════════════════════════════════════════════════════════ */
function startHeroSequence() {
  const heroContent = qs('#heroContent');
  if (!heroContent) return;

  // Wait 3 seconds (cinematic), then reveal elements
  setTimeout(() => {
    heroContent.classList.add('revealed');

    // Stagger the navbar fade in
    const navbar = qs('#navbar');
    if (navbar) {
      navbar.style.opacity = '0';
      navbar.style.transform = 'translateY(-20px)';
      navbar.style.transition = 'opacity .6s ease, transform .6s ease';
      requestAnimationFrame(() => {
        navbar.style.opacity = '1';
        navbar.style.transform = 'translateY(0)';
      });
    }
  }, 3000);
}

/* ══════════════════════════════════════════════════════════
   3. PARTICLE CANVAS
   ══════════════════════════════════════════════════════════ */
(function initParticles() {
  const canvas = qs('#heroParticles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    const count = Math.min(Math.floor((W * H) / 15000), 80);
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(224, 10, 10, ${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  // Init
  resize();
  createParticles();
  draw();

  // Debounced resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); createParticles(); }, 150);
  });
})();

/* ══════════════════════════════════════════════════════════
   4. STICKY NAVBAR
   ══════════════════════════════════════════════════════════ */
(function initNavbar() {
  const navbar = qs('#navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();

/* ══════════════════════════════════════════════════════════
   5. MOBILE MENU
   ══════════════════════════════════════════════════════════ */
(function initMobileMenu() {
  const hamburger    = qs('#hamburger');
  const overlay      = qs('#mobileOverlay');
  const closeBtn     = qs('#mobileClose');
  const mobLinks     = qsa('.mob-link');

  if (!hamburger || !overlay) return;

  function openMenu() {
    hamburger.classList.add('open');
    overlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Close on any mobile link click
  mobLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on backdrop click
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeMenu();
  });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeMenu();
  });
})();

/* ══════════════════════════════════════════════════════════
   6. SMOOTH SCROLLING
   ══════════════════════════════════════════════════════════ */
(function initSmoothScroll() {
  document.addEventListener('click', e => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const target = qs(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')) || 72;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
})();

/* ══════════════════════════════════════════════════════════
   7. SCROLL REVEAL (Intersection Observer)
   ══════════════════════════════════════════════════════════ */
(function initScrollReveal() {
  const items = qsa('.reveal-up');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  items.forEach(item => observer.observe(item));
})();

/* ══════════════════════════════════════════════════════════
   8. ACTIVE NAV LINK on SCROLL
   ══════════════════════════════════════════════════════════ */
(function initActiveNav() {
  const sections = qsa('section[id], div[id]');
  const navLinks = qsa('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

/* ══════════════════════════════════════════════════════════
   9. ANIMATED COUNTERS
   ══════════════════════════════════════════════════════════ */
(function initCounters() {
  const counters = qsa('.stat-card__num[data-target]');
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target.toLocaleString();
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
})();

/* ══════════════════════════════════════════════════════════
   10. PRICING → AUTOFILL BOOKING FORM
   ══════════════════════════════════════════════════════════ */
(function initPricingAutofill() {
  const pricingBtns = qsa('.pricing-card__btn');
  const planSelect  = qs('#plan');
  const bookingSection = qs('#booking');

  pricingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan');
      if (plan && planSelect) {
        planSelect.value = plan;
      }
      if (bookingSection) {
        const navH = 72;
        const top  = bookingSection.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();

/* ══════════════════════════════════════════════════════════
   11. BMI CALCULATOR
   ══════════════════════════════════════════════════════════ */
(function initBMI() {
  const calcBtn    = qs('#bmiCalcBtn');
  const heightInp  = qs('#bmiHeight');
  const weightInp  = qs('#bmiWeight');
  const resultBox  = qs('#bmiResult');
  const scoreEl    = qs('#bmiScore');
  const categoryEl = qs('#bmiCategory');
  const barFill    = qs('#bmiBarFill');
  const messageEl  = qs('#bmiMessage');

  if (!calcBtn) return;

  const categories = [
    { max: 18.5, label: 'Underweight', color: '#4fc3f7', pct: 12,
      msg: 'Join OLYMPIA GYM muscle gain programs to build strength and size. Our certified coaches will craft a hypertrophy plan tailored to help you gain healthy, lean mass efficiently.' },
    { max: 25.0, label: 'Normal Weight', color: '#66bb6a', pct: 38,
      msg: 'Maintain your physique and achieve aesthetic body goals at OLYMPIA GYM. Optimise your current fitness with personalised training and nutrition guidance from our elite coaches.' },
    { max: 30.0, label: 'Overweight',    color: '#ffa726', pct: 65,
      msg: 'Join OLYMPIA GYM fat loss transformation programs for healthier fitness. Our HIIT and cardio programs combined with nutrition coaching will help you burn fat and build confidence.' },
    { max: Infinity, label: 'Obese',     color: '#ef5350', pct: 90,
      msg: 'Join OLYMPIA GYM fat loss transformation programs for healthier fitness. We provide a safe, structured, and supportive environment to guide your complete body transformation journey.' },
  ];

  function calculate() {
    const h = parseFloat(heightInp.value);
    const w = parseFloat(weightInp.value);

    if (!h || !w || h < 100 || h > 250 || w < 30 || w > 300) {
      heightInp.style.borderColor = (!h || h < 100 || h > 250) ? 'var(--primary)' : '';
      weightInp.style.borderColor = (!w || w < 30 || w > 300)  ? 'var(--primary)' : '';
      return;
    }

    heightInp.style.borderColor = '';
    weightInp.style.borderColor = '';

    const bmi  = w / ((h / 100) ** 2);
    const cat  = categories.find(c => bmi < c.max);

    scoreEl.textContent    = bmi.toFixed(1);
    categoryEl.textContent = cat.label;
    categoryEl.style.color = cat.color;
    scoreEl.style.color    = cat.color;
    messageEl.textContent  = cat.msg;

    // Reveal
    resultBox.hidden = false;

    // Animate bar after short delay
    requestAnimationFrame(() => {
      setTimeout(() => { barFill.style.width = cat.pct + '%'; barFill.style.background = cat.color; }, 50);
    });
  }

  calcBtn.addEventListener('click', calculate);

  // Allow Enter key
  [heightInp, weightInp].forEach(inp => {
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });
})();

/* ══════════════════════════════════════════════════════════
   12. GALLERY LIGHTBOX
   ══════════════════════════════════════════════════════════ */
(function initLightbox() {
  const lightbox    = qs('#lightbox');
  const lightboxImg = qs('#lightboxImg');
  const closeBtn    = qs('#lightboxClose');
  const galleryItems = qsa('.gallery__item');

  if (!lightbox) return;

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lightbox.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  galleryItems.forEach(item => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    const img = item.querySelector('img');
    const label = item.querySelector('.gallery__overlay span');

    const open = () => {
      if (img) openLightbox(img.src, label ? label.textContent : img.alt);
    };
    item.addEventListener('click', open);
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
})();

/* ══════════════════════════════════════════════════════════
   13. REVIEW SLIDER
   ══════════════════════════════════════════════════════════ */
(function initReviewSlider() {
  const track   = qs('#reviewsTrack');
  const prevBtn = qs('#reviewPrev');
  const nextBtn = qs('#reviewNext');
  const dotsWrap = qs('#reviewDots');

  if (!track) return;

  const cards  = qsa('.review-card', track);
  const total  = cards.length;
  let current  = 0;
  let autoTimer;

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'review-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Review ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    if (dotsWrap) dotsWrap.appendChild(dot);
  });

  function getCardWidth() {
    if (!cards[0]) return 0;
    const style = getComputedStyle(track);
    const gap   = parseFloat(style.gap) || 24;
    return cards[0].offsetWidth + gap;
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, total - 1));
    track.style.transform = `translateX(-${current * getCardWidth()}px)`;

    // Update dots
    qsa('.review-dot', dotsWrap).forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  function next() { goTo(current < total - 1 ? current + 1 : 0); }
  function prev() { goTo(current > 0 ? current - 1 : total - 1); }

  function startAuto() {
    autoTimer = setInterval(next, 4500);
  }
  function stopAuto() { clearInterval(autoTimer); }

  if (nextBtn) nextBtn.addEventListener('click', () => { stopAuto(); next(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { stopAuto(); diff > 0 ? next() : prev(); startAuto(); }
  });

  // Recalculate on resize
  window.addEventListener('resize', () => goTo(current));

  startAuto();
  goTo(0);
})();

/* ══════════════════════════════════════════════════════════
   14. WHATSAPP BOOKING FORM
   ══════════════════════════════════════════════════════════ */
(function initBookingForm() {
  const submitBtn = qs('#bookingSubmit');
  if (!submitBtn) return;

  const WHATSAPP_NUMBER = '919897417774';

  function getFieldValue(id) {
    const el = qs(`#${id}`);
    return el ? el.value.trim() : '';
  }

  function getCheckedServices() {
    const checked = qsa('.form-checkboxes input[type="checkbox"]:checked');
    return checked.map(cb => cb.value).join(', ') || 'None selected';
  }

  function validateForm() {
    const required = ['fullName', 'mobile', 'gender', 'age', 'goal', 'joiningDate', 'plan'];
    let valid = true;

    required.forEach(id => {
      const el = qs(`#${id}`);
      if (!el) return;
      const val = el.value.trim();
      if (!val) {
        el.style.borderColor = 'var(--primary)';
        el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
        valid = false;
      } else {
        el.style.borderColor = '';
      }
    });

    // Mobile validation
    const mobileEl = qs('#mobile');
    if (mobileEl) {
      const digits = mobileEl.value.replace(/\D/g, '');
      if (digits.length < 10) {
        mobileEl.style.borderColor = 'var(--primary)';
        valid = false;
      }
    }

    return valid;
  }

  submitBtn.addEventListener('click', () => {
    if (!validateForm()) {
      // Scroll to first invalid field
      const firstInvalid = qs('.booking__card input[style*="var(--primary)"], .booking__card select[style*="var(--primary)"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const name     = getFieldValue('fullName');
    const mobile   = getFieldValue('mobile');
    const gender   = getFieldValue('gender');
    const age      = getFieldValue('age');
    const goal     = getFieldValue('goal');
    const plan     = getFieldValue('plan');
    const date     = getFieldValue('joiningDate');
    const address  = getFieldValue('address');
    const message  = getFieldValue('message');
    const services = getCheckedServices();

    const text = [
      `🏋️ *OLYMPIA GYM — New Membership Enquiry*`,
      ``,
      `👤 *Name:* ${name}`,
      `📞 *Mobile:* ${mobile}`,
      `⚧ *Gender:* ${gender}`,
      `🎂 *Age:* ${age} yrs`,
      `🎯 *Fitness Goal:* ${goal}`,
      `💼 *Services:* ${services}`,
      `💳 *Plan:* ${plan}`,
      `📅 *Joining Date:* ${date}`,
      address  ? `📍 *Address:* ${address}` : '',
      message  ? `💬 *Message:* ${message}` : '',
      ``,
      `_Sent via OLYMPIA GYM Website_`,
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
})();

/* ══════════════════════════════════════════════════════════
   15. HERO PARALLAX (subtle, performance-safe)
   ══════════════════════════════════════════════════════════ */
(function initParallax() {
  const heroImg = qs('.hero__img');
  if (!heroImg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const hero = qs('.hero');
        if (!hero) { ticking = false; return; }
        const heroH = hero.offsetHeight;
        if (scrolled < heroH) {
          const offset = scrolled * 0.25;
          heroImg.style.transform = `scale(1.1) translateY(${offset}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ══════════════════════════════════════════════════════════
   16. BACK TO TOP
   ══════════════════════════════════════════════════════════ */
(function initBackToTop() {
  const btn = qs('#backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ══════════════════════════════════════════════════════════
   17. FOOTER YEAR
   ══════════════════════════════════════════════════════════ */
(function initFooterYear() {
  const el = qs('#footerYear');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ══════════════════════════════════════════════════════════
   18. BLOG CARD — Read More (demo interaction)
   ══════════════════════════════════════════════════════════ */
(function initBlogCards() {
  qsa('.blog-card__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Placeholder: in production link to article page
      const card  = btn.closest('.blog-card');
      const title = card ? card.querySelector('.blog-card__title').textContent : 'this article';
      alert(`"${title}"\n\nFull article coming soon. Stay tuned to OLYMPIA GYM's fitness blog!`);
    });
  });
})();

/* ══════════════════════════════════════════════════════════
   19. DATE INPUT — set min to today
   ══════════════════════════════════════════════════════════ */
(function initDateMin() {
  const dateInput = qs('#joiningDate');
  if (!dateInput) return;
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
})();
