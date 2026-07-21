document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('is-open'));
    });
  }

  /* ---- Hero ATS gauge animation ---- */
  const gaugeFill = document.getElementById('heroGaugeFill');
  const gaugeNum = document.getElementById('heroGaugeNum');
  const CIRCUMFERENCE = 327; // 2 * PI * 52, rounded
  const TARGET_SCORE = 91;

  function animateGauge() {
    if (!gaugeFill || !gaugeNum) return;
    const offset = CIRCUMFERENCE - (CIRCUMFERENCE * TARGET_SCORE) / 100;
    gaugeFill.style.strokeDashoffset = offset;

    let current = 0;
    const step = () => {
      current += 2;
      if (current >= TARGET_SCORE) current = TARGET_SCORE;
      gaugeNum.textContent = current;
      if (current < TARGET_SCORE) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---- Typing effect for mock resume bullet ---- */
  const typingEl = document.getElementById('typingBullet');
  const bulletText = 'Led migration of 40+ components, cutting page load time by 35%';
  function typeBullet() {
    if (!typingEl) return;
    let i = 0;
    typingEl.textContent = '';
    const interval = setInterval(() => {
      typingEl.textContent = bulletText.slice(0, i);
      i++;
      if (i > bulletText.length) clearInterval(interval);
    }, 28);
  }

  /* ---- Animated stat counters ---- */
  function animateCounters(container) {
    const nums = container.querySelectorAll('.stat-card__num');
    nums.forEach(el => {
      const target = parseInt(el.dataset.count, 10) || 0;
      let current = 0;
      const increment = Math.max(1, Math.ceil(target / 80));
      const step = () => {
        current += increment;
        if (current >= target) current = target;
        el.textContent = current.toLocaleString();
        if (current < target) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  /* ---- Score bars fill on view ---- */
  function fillScoreBars(container) {
    container.querySelectorAll('.score-track').forEach(track => track.classList.add('in-view'));
  }

  /* ---- IntersectionObserver for reveal + one-shot animations ---- */
  const heroSection = document.querySelector('.hero');
  const statsSection = document.querySelector('.stats');
  const scoreSection = document.querySelector('.score');
  const builderSection = document.querySelector('.builder');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (entry.target === heroSection) { animateGauge(); typeBullet(); io.unobserve(entry.target); }
      if (entry.target === statsSection) { animateCounters(entry.target); io.unobserve(entry.target); }
      if (entry.target === scoreSection) { fillScoreBars(entry.target); io.unobserve(entry.target); }
      if (entry.target === builderSection) { io.unobserve(entry.target); }
    });
  }, { threshold: 0.35 });

  [heroSection, statsSection, scoreSection].forEach(s => s && io.observe(s));

  /* ---- Generic reveal-on-scroll for cards ---- */
  const revealTargets = document.querySelectorAll(
    '.feature-card, .analysis-card, .template-card, .workflow-step, .why-card, .price-card, .testimonial-card'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => revealIO.observe(el));

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-item__q');
    q.addEventListener('click', () => {
      const wasOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item.is-open').forEach(i => i.classList.remove('is-open'));
      if (!wasOpen) item.classList.add('is-open');
    });
  });

  /* ---- Contact form (front-end only) ---- */
  const contactForm = document.getElementById('contactForm');
  const contactStatus = document.getElementById('contactStatus');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactStatus.textContent = "Thanks — we'll get back to you within one business day.";
      contactForm.reset();
    });
  }

  /* ---- Newsletter form (front-end only) ---- */
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterStatus = document.getElementById('newsletterStatus');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterStatus.textContent = "Subscribed — welcome aboard!";
      newsletterForm.reset();
    });
  }

  /* ---- Sticky navbar shadow on scroll ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 8) navbar.classList.add('is-scrolled');
    else navbar.classList.remove('is-scrolled');
  }, { passive: true });

});
