/* ========================================
   Al Bardisi Restaurant - Responsive Styles
   Mobile-First Approach
   ======================================== */

/* ========================================
   Large Desktops (1400px and below)
   ======================================== */
@media (max-width: 1400px) {
  :root {
    --container: 1140px;
  }
}

/* ========================================
   Desktops (1200px and below)
   ======================================== */
@media (max-width: 1200px) {
  :root {
    --container: 960px;
  }

  .about-grid {
    gap: 50px;
  }

  .about-image img {
    height: 460px;
  }

  .menu-grid {
    gap: 24px;
  }

  .contact-grid {
    gap: 40px;
  }

  .contact-map {
    height: 440px;
  }
}

/* ========================================
   Tablets (992px and below)
   ======================================== */
@media (max-width: 992px) {
  :root {
    --container: 100%;
  }

  .section {
    padding: 80px 0;
  }

  /* Header */
  .nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    max-width: 340px;
    height: 100vh;
    background: var(--brown-dark);
    padding: 100px 30px 40px;
    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
    box-shadow: -10px 0 40px rgba(0,0,0,0.5);
    overflow-y: auto;
  }

  body[dir="ltr"] .nav {
    right: auto;
    left: -100%;
    transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .nav.open {
    right: 0;
  }

  body[dir="ltr"] .nav.open {
    right: auto;
    left: 0;
  }

  .nav-list {
    flex-direction: column;
    gap: 0;
  }

  .nav-list li {
    border-bottom: 1px solid rgba(201,162,39,0.15);
  }

  .nav-link {
    display: block;
    padding: 18px 0;
    font-size: 1.05rem;
  }

  .nav-link::after {
    display: none;
  }

  .hamburger {
    display: flex;
    z-index: 1001;
    position: relative;
  }

  .header-cta {
    display: none;
  }

  /* Hero */
  .hero {
    min-height: 90vh;
  }

  .hero-text {
    max-width: 100%;
  }

  /* Features */
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  /* About */
  .about-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .about-image img {
    height: 400px;
  }

  .about-image {
    order: -1;
  }

  /* Menu */
  .menu-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Branches */
  .branches-grid {
    grid-template-columns: 1fr;
  }

  /* Reviews */
  .reviews-slider {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  /* Contact */
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .contact-map {
    height: 380px;
  }

  /* Footer */
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
}

/* ========================================
   Mobile Landscape / Small Tablets (768px and below)
   ======================================== */
@media (max-width: 768px) {
  html {
    scroll-padding-top: 70px;
  }

  body {
    padding-bottom: 80px; /* space for mobile bottom bar */
  }

  .section {
    padding: 60px 0;
  }

  .container {
    padding: 0 16px;
  }

  /* Header */
  .header {
    padding: 12px 0;
  }

  .header.scrolled {
    padding: 8px 0;
  }

  .logo-main {
    font-size: 1.4rem;
  }

  .logo-sub {
    font-size: 0.6rem;
    letter-spacing: 3px;
  }

  .lang-toggle {
    padding: 6px 10px;
    font-size: 0.75rem;
  }

  .header-actions {
    gap: 8px;
  }

  /* Hero */
  .hero {
    min-height: 88vh;
    text-align: center;
  }

  .hero-content {
    padding-top: 80px;
  }

  .hero-text {
    margin: 0 auto;
  }

  .hero-title::after {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-buttons {
    justify-content: center;
  }

  .btn-lg {
    padding: 14px 26px;
    font-size: 0.92rem;
  }

  /* Features */
  .features {
    padding: 40px 0;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .feature-item {
    padding: 14px 8px;
  }

  .feature-item i {
    font-size: 1.6rem;
  }

  .feature-item h3 {
    font-size: 0.92rem;
  }

  .feature-item p {
    font-size: 0.75rem;
  }

  /* Section Header */
  .section-header {
    margin-bottom: 40px;
  }

  /* About */
  .about-image img {
    height: 320px;
  }

  .about-badge {
    padding: 14px 20px;
    bottom: 16px;
    right: 16px;
  }

  .about-badge-num {
    font-size: 1.5rem;
  }

  .about-badge-txt {
    font-size: 0.7rem;
  }

  /* Menu */
  .menu-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .menu-card-img {
    height: 200px;
  }

  /* Branches */
  .branch-card {
    padding: 30px 24px;
  }

  .branch-num {
    font-size: 2.5rem;
    top: 15px;
    left: 20px;
  }

  .branch-card h3 {
    font-size: 1.2rem;
  }

  .branch-actions {
    flex-direction: column;
  }

  .branch-actions .btn {
    width: 100%;
  }

  /* Reviews */
  .review-card {
    padding: 26px 22px;
  }

  .review-text {
    font-size: 0.92rem;
  }

  /* Contact */
  .contact-map {
    height: 320px;
  }

  .contact-item {
    padding: 14px 16px;
    gap: 14px;
  }

  .contact-icon {
    width: 44px;
    height: 44px;
    font-size: 1rem;
  }

  /* Footer */
  .footer {
    padding: 50px 0 0;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 34px;
    padding-bottom: 34px;
  }

  /* Floating buttons */
  .floating-whatsapp {
    width: 52px;
    height: 52px;
    font-size: 1.5rem;
    bottom: 90px;
    left: 16px;
  }

  body[dir="ltr"] .floating-whatsapp {
    left: auto;
    right: 16px;
  }

  .back-to-top {
    width: 44px;
    height: 44px;
    bottom: 90px;
    right: 16px;
    font-size: 0.95rem;
  }

  body[dir="ltr"] .back-to-top {
    right: auto;
    left: 16px;
  }

  /* Mobile Bottom Bar */
  .mobile-bar {
    display: flex;
  }

  /* Preloader */
  .preloader-logo {
    font-size: 2rem;
  }
}

/* ========================================
   Small Mobiles (480px and below)
   ======================================== */
@media (max-width: 480px) {
  .section {
    padding: 50px 0;
  }

  .container {
    padding: 0 14px;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .section-desc {
    font-size: 0.92rem;
  }

  .section-tag {
    font-size: 0.75rem;
    letter-spacing: 2px;
  }

  .section-tag::before,
  .section-tag::after {
    width: 16px;
  }

  /* Hero */
  .hero {
    min-height: 85vh;
  }

  .hero-badge {
    font-size: 0.75rem;
    padding: 6px 14px;
  }

  .hero-title {
    font-size: 1.6rem;
  }

  .hero-subtitle {
    font-size: 0.92rem;
  }

  .hero-buttons {
    flex-direction: column;
    width: 100%;
  }

  .hero-buttons .btn {
    width: 100%;
  }

  /* Features */
  .features-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .feature-item {
    padding: 12px;
  }

  /* About */
  .about-image img {
    height: 260px;
  }

  .about-text p {
    font-size: 0.95rem;
  }

  /* Menu */
  .menu-card-img {
    height: 180px;
  }

  .menu-card-body {
    padding: 20px;
  }

  .menu-card-body h3 {
    font-size: 1.15rem;
  }

  .menu-card-body p {
    font-size: 0.85rem;
  }

  /* Branches */
  .branch-card {
    padding: 26px 20px;
  }

  .branch-num {
    font-size: 2rem;
    top: 12px;
    left: 16px;
  }

  .branch-card h3 {
    font-size: 1.1rem;
    margin-bottom: 14px;
  }

  .branch-address {
    font-size: 0.9rem;
  }

  /* Reviews */
  .review-card {
    padding: 22px 18px;
  }

  .review-avatar {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .review-author strong {
    font-size: 0.88rem;
  }

  /* Contact */
  .contact-map {
    height: 260px;
  }

  .contact-item {
    padding: 12px 14px;
    gap: 12px;
  }

  .contact-icon {
    width: 40px;
    height: 40px;
    font-size: 0.95rem;
  }

  .contact-item strong {
    font-size: 0.92rem;
  }

  .contact-item span {
    font-size: 0.82rem;
  }

  /* Footer */
  .footer-logo {
    font-size: 1.6rem;
  }

  .footer-col h4 {
    font-size: 1rem;
  }

  /* Mobile Bottom Bar */
  .mobile-bar {
    padding: 6px;
    gap: 6px;
  }

  .mobile-bar-btn {
    padding: 10px 8px;
    font-size: 0.82rem;
  }

  .mobile-bar-btn i {
    font-size: 1rem;
  }

  /* Floating buttons */
  .floating-whatsapp {
    width: 48px;
    height: 48px;
    font-size: 1.35rem;
    bottom: 84px;
  }

  .back-to-top {
    width: 40px;
    height: 40px;
    font-size: 0.85rem;
    bottom: 84px;
  }
}

/* ========================================
   Extra Small (360px and below)
   ======================================== */
@media (max-width: 360px) {
  .logo-main {
    font-size: 1.2rem;
  }

  .logo-sub {
    font-size: 0.55rem;
    letter-spacing: 2px;
  }

  .hero-title {
    font-size: 1.4rem;
  }

  .section-title {
    font-size: 1.35rem;
  }

  .mobile-bar-btn {
    font-size: 0.75rem;
    gap: 5px;
  }

  .mobile-bar-btn i {
    font-size: 0.95rem;
  }
}

/* ========================================
   Landscape Mobile (Short Height)
   ======================================== */
@media (max-height: 500px) and (orientation: landscape) {
  .hero {
    min-height: 100vh;
    padding: 80px 0 40px;
  }

  .hero-scroll {
    display: none;
  }

  .nav {
    padding: 70px 30px 30px;
  }

  .nav-link {
    padding: 12px 0;
  }
}

/* ========================================
   Reduced Motion (Accessibility)
   ======================================== */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .hero-bg {
    animation: none;
  }
}

/* ========================================
   Print Styles
   ======================================== */
@media print {
  .header,
  .mobile-bar,
  .floating-whatsapp,
  .back-to-top,
  .hero-scroll,
  .preloader {
    display: none !important;
  }

  body {
    background: white;
    color: black;
  }

  .section {
    padding: 20px 0;
  }
}
