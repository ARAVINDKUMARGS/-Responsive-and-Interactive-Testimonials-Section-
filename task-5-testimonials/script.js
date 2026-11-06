/**
 * ============================================================================
 * TASK 5: VISIONARY & UNIQUE TESTIMONIALS SECTION
 * Pure Vanilla JavaScript (ES6+) - Chromatic Theming, 3D Optics & Gestures
 * ============================================================================
 */

'use strict';

// ----------------------------------------------------------------------------
// 1. DATA STORE: Customer Testimonials with Metrics & Tags
// ----------------------------------------------------------------------------
const testimonialsData = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'VP of Product',
    company: 'TechFlow Systems',
    category: 'Productivity',
    metric: '📈 +340% GROWTH',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    quote: 'Implementing this platform transformed our team’s velocity within the first week. The intuitive design and microsecond latency helped accelerate our release cycles by 40%. Truly unmatched customer support!',
    verified: true
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Chief Technology Officer',
    company: 'CloudScale Inc.',
    category: 'Engineering',
    metric: '⚡ 99.99% UPTIME',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    quote: 'The security architecture and fault-tolerant protocols exceeded our strict enterprise compliance requirements. It seamlessly sustained our peak multi-region traffic spikes without a single hiccup.',
    verified: true
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Lead Product Designer',
    company: 'Apex Creative Studio',
    category: 'Design',
    metric: '🎨 5x PROTOTYPING',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    quote: 'As a designer, I care deeply about optical balance, typography, and visual harmony. Every element feels deliberate, fluid, and delight-inducing. It elevated our entire executive pitch experience.',
    verified: true
  },
  {
    id: 4,
    name: 'Marcus Vance',
    role: 'Head of Growth',
    company: 'Pulse Metrics',
    category: 'Productivity',
    metric: '🚀 +185% LEADS',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    quote: 'Our customer acquisition costs dropped substantially within ninety days. The analytics attribution dashboard gives us crystal-clear insights that our executive committee relies upon every week.',
    verified: true
  },
  {
    id: 5,
    name: 'Priya Patel',
    role: 'Senior Engineering Director',
    company: 'NexaCore Labs',
    category: 'Engineering',
    metric: '🛡️ 65 hrs SAVED/MO',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    quote: 'The developer ergonomics are phenomenal. Zero boilerplate friction, modular contracts, and clear documentation made onboarding a cohort of twelve engineers completely effortless and enjoyable.',
    verified: true
  },
  {
    id: 6,
    name: 'Alexander Wright',
    role: 'Founder & CEO',
    company: 'Vanguard Ventures',
    category: 'Leadership',
    metric: '💎 10x VELOCITY',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80',
    quote: 'In 15 years of founding tech startups, I have rarely seen a product deliver so immediately on its value proposition. It has become an indispensable foundation of our high-growth operating stack.',
    verified: true
  }
];

// ----------------------------------------------------------------------------
// 2. COMPONENT STATE
// ----------------------------------------------------------------------------
const state = {
  currentIndex: 0,
  currentCategory: 'all',
  filteredItems: [...testimonialsData],
  cardsPerView: 3,
  maxIndex: 0,
  autoplayDuration: 5000,
  autoplayTimer: null,
  progressInterval: null,
  progressValue: 0,
  isAutoplayActive: true,
  isPausedByHover: false,
  // Touch / Drag State
  touchStartX: 0,
  touchEndX: 0,
  isDragging: false
};

// ----------------------------------------------------------------------------
// 3. DOM ELEMENTS
// ----------------------------------------------------------------------------
const DOM = {
  track: document.getElementById('testimonialsTrack'),
  viewport: document.getElementById('sliderViewport'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),
  dotsContainer: document.getElementById('paginationDots'),
  currentSlideNum: document.getElementById('currentSlideNum'),
  totalSlidesNum: document.getElementById('totalSlidesNum'),
  autoplayBtn: document.getElementById('autoplayBtn'),
  progressBarFill: document.getElementById('progressBarFill'),
  filterBtns: document.querySelectorAll('.pill-btn'),
  themeToggle: document.getElementById('themeToggle'),
  paletteBtns: document.querySelectorAll('.palette-btn')
};

// ----------------------------------------------------------------------------
// 4. SVG GENERATORS (5 Stars & Verified Badge)
// ----------------------------------------------------------------------------
function generateStarRating(rating = 5) {
  let starsHtml = '';
  for (let i = 1; i <= 5; i++) {
    starsHtml += `
      <svg class="star-icon" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    `;
  }
  return `<div class="star-rating" role="img" aria-label="${rating} out of 5 stars">${starsHtml}</div>`;
}

function generateVerifiedBadge() {
  return `
    <span class="verified-icon-pill" title="Verified Customer" aria-label="Verified Customer">
      <svg class="verified-svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
      </svg>
    </span>
  `;
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

// ----------------------------------------------------------------------------
// 5. RENDER FUNCTIONS: Cards, 3D Hover & Pagination
// ----------------------------------------------------------------------------

/**
 * Dynamically builds testimonial card markup and injects into the track
 */
function renderTestimonials() {
  DOM.track.innerHTML = '';

  if (state.filteredItems.length === 0) {
    DOM.track.innerHTML = `
      <div style="padding: 4rem; text-align: center; width: 100%; color: var(--text-muted); font-family: var(--font-mono);">
        <p>// NO TESTIMONIALS MATCH THIS CATEGORY</p>
      </div>
    `;
    return;
  }

  const cardsHtml = state.filteredItems.map((item, index) => {
    const initials = getInitials(item.name);
    return `
      <article 
        class="testimonial-card" 
        data-id="${item.id}" 
        data-index="${index}"
        tabindex="0"
        role="group" 
        aria-roledescription="slide" 
        aria-label="Testimonial ${index + 1} of ${state.filteredItems.length}: ${item.name}">
        
        <!-- Editorial Watermark -->
        <span class="card-watermark" aria-hidden="true">“</span>

        <!-- Card Header: Stars & Metric Pill -->
        <div class="card-header-bar">
          ${generateStarRating(item.rating)}
          <span class="metric-chip">${item.metric}</span>
        </div>

        <!-- Feedback Body -->
        <blockquote class="testimonial-quote-box">
          <p>"${item.quote}"</p>
        </blockquote>

        <!-- Profile Footer -->
        <footer class="card-profile-footer">
          <div class="avatar-halo-wrapper">
            <img 
              src="${item.avatar}" 
              alt="${item.name}" 
              class="profile-avatar" 
              loading="lazy"
              onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';"
            />
            <div class="profile-avatar-fallback" style="display:none;" aria-hidden="true">
              ${initials}
            </div>
            ${item.verified ? generateVerifiedBadge() : ''}
          </div>

          <div class="profile-meta">
            <h3 class="profile-name">${item.name}</h3>
            <p class="profile-role">${item.role} • <span class="profile-company">${item.company}</span></p>
          </div>
        </footer>

      </article>
    `;
  }).join('');

  DOM.track.innerHTML = cardsHtml;
  initCard3DOptics();
  calculateLayout();
  renderPaginationDots();
  updateSliderPosition(false);
}

/**
 * Attaches interactive 3D perspective tilt & cursor spotlight glare to cards
 */
function initCard3DOptics() {
  const cards = DOM.track.querySelectorAll('.testimonial-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update cursor spotlight variables
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Gentle 3D perspective tilt
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.015)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/**
 * Calculates responsive columns & maximum slide bounds
 */
function calculateLayout() {
  const width = window.innerWidth;
  if (width >= 1024) {
    state.cardsPerView = 3;
  } else if (width >= 768) {
    state.cardsPerView = 2;
  } else {
    state.cardsPerView = 1;
  }

  const total = state.filteredItems.length;
  state.maxIndex = Math.max(0, total - state.cardsPerView);

  if (state.currentIndex > state.maxIndex) {
    state.currentIndex = state.maxIndex;
  }
}

/**
 * Renders pagination dots matching valid positions
 */
function renderPaginationDots() {
  DOM.dotsContainer.innerHTML = '';
  const totalPositions = state.maxIndex + 1;

  for (let i = 0; i < totalPositions; i++) {
    const dot = document.createElement('button');
    dot.className = `prismatic-dot ${i === state.currentIndex ? 'active' : ''}`;
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Navigate to slide ${i + 1}`);
    dot.setAttribute('aria-selected', i === state.currentIndex ? 'true' : 'false');
    dot.dataset.index = i;

    dot.addEventListener('click', () => {
      goToSlide(i);
      resetAutoplayTimer();
    });

    DOM.dotsContainer.appendChild(dot);
  }

  updateCounter();
}

/**
 * Updates digital counter display: [ 01 // 06 ]
 */
function updateCounter() {
  const currentFormatted = String(state.currentIndex + 1).padStart(2, '0');
  const totalFormatted = String(state.maxIndex + 1).padStart(2, '0');
  
  DOM.currentSlideNum.textContent = currentFormatted;
  DOM.totalSlidesNum.textContent = totalFormatted;
}

// ----------------------------------------------------------------------------
// 6. SLIDER ENGINE & HARDWARE-ACCELERATED TRANSITIONS
// ----------------------------------------------------------------------------

function updateSliderPosition(animate = true) {
  if (state.filteredItems.length === 0) return;

  const firstCard = DOM.track.querySelector('.testimonial-card');
  if (!firstCard) return;

  const cardWidth = firstCard.getBoundingClientRect().width;
  const computedStyle = window.getComputedStyle(DOM.track);
  const gap = parseFloat(computedStyle.gap) || 28;

  const offset = state.currentIndex * (cardWidth + gap);

  DOM.track.style.transition = animate ? 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)' : 'none';
  DOM.track.style.transform = `translateX(-${offset}px)`;

  // Update active dots
  const dots = DOM.dotsContainer.querySelectorAll('.prismatic-dot');
  dots.forEach((dot, idx) => {
    const isActive = idx === state.currentIndex;
    dot.classList.toggle('active', isActive);
    dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  // Update slide counter
  updateCounter();

  // Update navigation button states
  const hasMultiplePages = state.maxIndex > 0;
  DOM.prevBtn.disabled = !hasMultiplePages;
  DOM.nextBtn.disabled = !hasMultiplePages;
}

function goToSlide(index) {
  if (state.maxIndex === 0) return;

  if (index < 0) {
    state.currentIndex = state.maxIndex; // Circular wrap
  } else if (index > state.maxIndex) {
    state.currentIndex = 0; // Circular wrap
  } else {
    state.currentIndex = index;
  }

  updateSliderPosition(true);
}

function nextSlide() {
  goToSlide(state.currentIndex + 1);
}

function prevSlide() {
  goToSlide(state.currentIndex - 1);
}

// ----------------------------------------------------------------------------
// 7. AUTOPLAY & SPECTRUM PROGRESS ENGINE
// ----------------------------------------------------------------------------

function startAutoplay() {
  if (!state.isAutoplayActive || state.maxIndex === 0) return;
  clearInterval(state.autoplayTimer);
  clearInterval(state.progressInterval);

  state.progressValue = 0;
  DOM.progressBarFill.style.width = '0%';

  const stepTime = 50;
  const stepIncrement = (stepTime / state.autoplayDuration) * 100;

  state.progressInterval = setInterval(() => {
    if (state.isPausedByHover) return;

    state.progressValue += stepIncrement;
    DOM.progressBarFill.style.width = `${Math.min(100, state.progressValue)}%`;

    if (state.progressValue >= 100) {
      state.progressValue = 0;
      DOM.progressBarFill.style.width = '0%';
      nextSlide();
    }
  }, stepTime);
}

function pauseAutoplay() {
  clearInterval(state.progressInterval);
  clearInterval(state.autoplayTimer);
  DOM.progressBarFill.style.width = '0%';
  state.progressValue = 0;
}

function resetAutoplayTimer() {
  if (state.isAutoplayActive) {
    startAutoplay();
  }
}

function toggleAutoplay() {
  state.isAutoplayActive = !state.isAutoplayActive;
  DOM.autoplayBtn.classList.toggle('paused', !state.isAutoplayActive);
  DOM.autoplayBtn.setAttribute('aria-label', state.isAutoplayActive ? 'Pause autoplay' : 'Resume autoplay');

  if (state.isAutoplayActive) {
    startAutoplay();
  } else {
    pauseAutoplay();
  }
}

// ----------------------------------------------------------------------------
// 8. CATEGORY FILTERING
// ----------------------------------------------------------------------------
function handleFilterClick(e) {
  const btn = e.target.closest('.pill-btn');
  if (!btn) return;

  DOM.filterBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const filter = btn.dataset.filter;
  state.currentCategory = filter;
  state.currentIndex = 0;

  if (filter === 'all') {
    state.filteredItems = [...testimonialsData];
  } else {
    state.filteredItems = testimonialsData.filter(item => item.category === filter);
  }

  renderTestimonials();
  resetAutoplayTimer();
}

// ----------------------------------------------------------------------------
// 9. CHROMATIC PALETTE & THEME MANAGEMENT
// ----------------------------------------------------------------------------
function initTheming() {
  // Load saved palette & mode
  const savedPalette = localStorage.getItem('vibe_palette') || 'aurora';
  const savedTheme = localStorage.getItem('vibe_theme') || 'dark';

  document.documentElement.setAttribute('data-palette', savedPalette);
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Mark active palette button
  DOM.paletteBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.palette === savedPalette);
  });
}

function setPalette(paletteName) {
  document.documentElement.setAttribute('data-palette', paletteName);
  localStorage.setItem('vibe_palette', paletteName);

  DOM.paletteBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.palette === paletteName);
  });
}

function toggleThemeMode() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('vibe_theme', next);
}

// ----------------------------------------------------------------------------
// 10. TOUCH & MOUSE SWIPE GESTURES
// ----------------------------------------------------------------------------
function initGestures() {
  const viewport = DOM.viewport;

  // Touch handlers
  viewport.addEventListener('touchstart', (e) => {
    state.touchStartX = e.changedTouches[0].screenX;
    state.isPausedByHover = true;
  }, { passive: true });

  viewport.addEventListener('touchend', (e) => {
    state.touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    state.isPausedByHover = false;
  }, { passive: true });

  // Mouse drag handlers
  let mouseStartX = 0;
  let isMouseDown = false;

  viewport.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    mouseStartX = e.clientX;
    state.isPausedByHover = true;
  });

  window.addEventListener('mouseup', (e) => {
    if (!isMouseDown) return;
    isMouseDown = false;
    const diff = e.clientX - mouseStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prevSlide();
      else nextSlide();
      resetAutoplayTimer();
    }
    state.isPausedByHover = false;
  });
}

function handleSwipe() {
  const diff = state.touchEndX - state.touchStartX;
  const threshold = 40;

  if (Math.abs(diff) > threshold) {
    if (diff < 0) nextSlide();
    else prevSlide();
    resetAutoplayTimer();
  }
}

// ----------------------------------------------------------------------------
// 11. KEYBOARD NAVIGATION
// ----------------------------------------------------------------------------
function initKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        prevSlide();
        resetAutoplayTimer();
        break;

      case 'ArrowRight':
        e.preventDefault();
        nextSlide();
        resetAutoplayTimer();
        break;

      case 'Home':
        e.preventDefault();
        goToSlide(0);
        resetAutoplayTimer();
        break;

      case 'End':
        e.preventDefault();
        goToSlide(state.maxIndex);
        resetAutoplayTimer();
        break;

      case ' ':
        if (DOM.viewport.contains(document.activeElement) || document.activeElement === DOM.autoplayBtn) {
          e.preventDefault();
          toggleAutoplay();
        }
        break;
    }
  });
}

// ----------------------------------------------------------------------------
// 12. EVENT LISTENERS INITIALIZATION
// ----------------------------------------------------------------------------
function initEvents() {
  // Navigation Buttons
  DOM.prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoplayTimer();
  });

  DOM.nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoplayTimer();
  });

  // Autoplay & Theme Toggles
  DOM.autoplayBtn.addEventListener('click', toggleAutoplay);
  DOM.themeToggle.addEventListener('click', toggleThemeMode);

  // Palette buttons
  DOM.paletteBtns.forEach(btn => {
    btn.addEventListener('click', () => setPalette(btn.dataset.palette));
  });

  // Category Filter Pills
  DOM.filterBtns.forEach(btn => btn.addEventListener('click', handleFilterClick));

  // Autoplay pause on hover / focus
  DOM.viewport.addEventListener('mouseenter', () => { state.isPausedByHover = true; });
  DOM.viewport.addEventListener('mouseleave', () => { state.isPausedByHover = false; });
  DOM.viewport.addEventListener('focusin', () => { state.isPausedByHover = true; });
  DOM.viewport.addEventListener('focusout', () => { state.isPausedByHover = false; });

  // Window Resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      calculateLayout();
      renderPaginationDots();
      updateSliderPosition(false);
    }, 120);
  });
}

// ----------------------------------------------------------------------------
// 13. BOOTSTRAP APP
// ----------------------------------------------------------------------------
function initApp() {
  initTheming();
  renderTestimonials();
  initEvents();
  initGestures();
  initKeyboardNavigation();
  startAutoplay();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
