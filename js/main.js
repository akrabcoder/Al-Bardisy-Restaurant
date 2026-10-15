/* ========================================
   Al Bardisi Restaurant - Main JavaScript
   ======================================== */

(function () {
  'use strict';

  /* ========================================
     1. PRELOADER
     ======================================== */
  window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(function () {
        preloader.classList.add('hidden');
        setTimeout(function () {
          preloader.style.display = 'none';
        }, 600);
      }, 800);
    }
  });

  /* ========================================
     2. HEADER SCROLL EFFECT
     ======================================== */
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  /* ========================================
     3. MOBILE MENU (Hamburger)
     ======================================== */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', function (e) {
      if (
        nav.classList.contains('open') &&
        !nav.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ========================================
     4. SMOOTH SCROLL + ACTIVE NAV LINK
     ======================================== */
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', function () {
    const scrollY = window.scrollY + 120;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  /* ========================================
     5. SCROLL REVEAL ANIMATION
     ======================================== */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
          setTimeout(function () {
            entry.target.classList.add('active');
          }, index * 100);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ========================================
     6. LANGUAGE TOGGLE (AR / EN)
     ======================================== */
  const langToggle = document.getElementById('langToggle');
  const langLabel = document.getElementById('langLabel');
  const htmlTag = document.documentElement;

  let currentLang = localStorage.getItem('bardisi_lang') || 'ar';

  function applyLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    /* Update direction & lang attribute */
    htmlTag.setAttribute('lang', lang);
    htmlTag.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    /* Update all elements with data-i18n */
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        el.textContent = t[key];
      }
    });

    /* Update toggle label */
    if (langLabel) {
      langLabel.textContent = lang === 'ar' ? 'EN' : 'ع';
    }

    /* Update font family based on language */
    if (lang === 'ar') {
      document.body.style.fontFamily = "'Cairo', sans-serif";
    } else {
      document.body.style.fontFamily = "'Almarai', sans-serif";
    }

    /* Save to localStorage */
    localStorage.setItem('bardisi_lang', lang);
    currentLang = lang;
  }

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      const newLang = currentLang === 'ar' ? 'en' : 'ar';
      applyLanguage(newLang);
    });
  }

  /* Apply saved language on load */
  applyLanguage(currentLang);

  /* ========================================
     7. BACK TO TOP
     ======================================== */
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ========================================
     8. REVIEWS SLIDER (Mobile Swipe)
     ======================================== */
  const reviewsSlider = document.getElementById('reviewsSlider');

  if (reviewsSlider && window.innerWidth <= 992) {
    let isDown = false;
    let startX;
    let scrollLeft;

    reviewsSlider.style.display = 'flex';
    reviewsSlider.style.overflowX = 'auto';
    reviewsSlider.style.scrollSnapType = 'x mandatory';
    reviewsSlider.style.gap = '20px';
    reviewsSlider.style.scrollbarWidth = 'none';
    reviewsSlider.style.paddingBottom = '10px';

    reviewsSlider.querySelectorAll('.review-card').forEach(function (card) {
      card.style.minWidth = '85%';
      card.style.scrollSnapAlign = 'center';
    });

    reviewsSlider.addEventListener('mousedown', function (e) {
      isDown = true;
      startX = e.pageX - reviewsSlider.offsetLeft;
      scrollLeft = reviewsSlider.scrollLeft;
    });

    reviewsSlider.addEventListener('mouseleave', function () {
      isDown = false;
    });

    reviewsSlider.addEventListener('mouseup', function () {
      isDown = false;
    });

    reviewsSlider.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - reviewsSlider.offsetLeft;
      const walk = (x - startX) * 1.5;
      reviewsSlider.scrollLeft = scrollLeft - walk;
    });
  }

  /* ========================================
     9. LAZY LOAD FALLBACK
     ======================================== */
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(function (img) {
      img.src = img.src;
    });
  } else {
    /* Fallback for older browsers */
    const script = document.createElement('script');
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }

  /* ========================================
     10. CONSOLE BRANDING
     ======================================== */
  console.log(
    '%c مطعم ومسمط البرديسي ',
    'background: linear-gradient(135deg, #C9A227, #A8861B); color: #1A1310; font-size: 18px; font-weight: bold; padding: 8px 16px; border-radius: 8px;'
  );
  console.log(
    '%c Al Bardisi Restaurant & Grill — Hadayek Al Ahram ',
    'color: #C9A227; font-size: 12px; font-weight: bold;'
  );

})();
