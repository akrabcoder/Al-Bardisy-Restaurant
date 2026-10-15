/* ========================================
   EFFECTS & ANIMATIONS
   ======================================== */

/* ---------- Cursor Glow ---------- */
.cursor-glow {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201,162,39,0.15) 0%, rgba(201,162,39,0) 70%);
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
  mix-blend-mode: screen;
}

.cursor-glow-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--gold);
  box-shadow: 0 0 12px var(--gold);
  pointer-events: none;
  z-index: 9999;
  transition: opacity 0.3s ease;
}

/* ---------- Marquee Strip ---------- */
.marquee-strip {
  background: linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-dark));
  padding: 18px 0;
  overflow: hidden;
  position: relative;
  white-space: nowrap;
  border-top: 2px solid var(--brown-dark);
  border-bottom: 2px solid var(--brown-dark);
}

.marquee-inner {
  display: inline-flex;
  align-items: center;
  gap: 30px;
  animation: marqueeScroll 30s linear infinite;
  padding-left: 30px;
}

.marquee-inner span {
  font-family: var(--font-ar);
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--brown-dark);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.marquee-inner i {
  font-size: 0.7rem;
  color: var(--brown-dark);
  opacity: 0.6;
}

@keyframes marqueeScroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

body[dir="ltr"] .marquee-inner {
  animation-direction: reverse;
}

/* ---------- Particles ---------- */
.particles-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.particle {
  position: absolute;
  bottom: -20px;
  border-radius: 50%;
  background: var(--gold);
  opacity: 0;
  box-shadow: 0 0 8px rgba(201,162,39,0.6);
  animation: floatUp linear infinite;
}

@keyframes floatUp {
  0% { transform: translateY(0) translateX(0); opacity: 0; }
  10% { opacity: 0.6; }
  90% { opacity: 0.6; }
  100% { transform: translateY(-110vh) translateX(30px); opacity: 0; }
}

/* ---------- Hide on Mobile ---------- */
@media (max-width: 768px) {
  .cursor-glow,
  .cursor-glow-dot,
  .particles-container {
    display: none;
  }

  .marquee-inner span {
    font-size: 1rem;
  }
}
