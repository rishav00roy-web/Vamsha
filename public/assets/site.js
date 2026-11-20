(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  // Mobile drawer
  const menu = document.querySelector('.menu-btn');
  const drawer = document.getElementById('drawer');
  const setMenu = (open) => { menu.setAttribute('aria-expanded', String(open)); drawer.hidden = !open; };
  menu?.addEventListener('click', () => setMenu(drawer.hidden));
  drawer?.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });

  // Hero video sound toggle
  const video = document.querySelector('.hero-video');
  const sound = document.querySelector('.hero-sound');
  if (video && reduce) video.pause();
  sound?.addEventListener('click', () => {
    video.muted = !video.muted;
    if (!video.muted) video.play();
    sound.setAttribute('aria-pressed', String(!video.muted));
    sound.querySelector('.hero-sound-t').textContent = video.muted ? 'Sound off' : 'Sound on';
  });

  // Copy phone number, with visible confirmation
  $$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
    const label = b.textContent;
    try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = 'Copied'; }
    catch { b.textContent = b.dataset.copy; }
    b.classList.add('is-done');
    setTimeout(() => { b.textContent = label; b.classList.remove('is-done'); }, 1800);
  }));

  // Scroll reveals: CSS holds the start state from first paint (html.js), so nothing flashes;
  // the observer only adds .in. Siblings entering together get a small stagger.
  const io = new IntersectionObserver((entries) => {
    entries.filter((e) => e.isIntersecting).forEach((e, i) => {
      e.target.style.transitionDelay = `${i * 70}ms`;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach((el) => io.observe(el));
  document.documentElement.classList.add('reveal-ready');

  // Division index: highlight the card in view
  const idx = $$('.dindex a');
  if (idx.length) {
    const byId = new Map(idx.map((a) => [a.hash.slice(1), a]));
    const spy = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      idx.forEach((a) => a.classList.toggle('is-active', a === byId.get(e.target.id)));
    }), { rootMargin: '-40% 0px -55% 0px' });
    byId.forEach((_, id) => { const el = document.getElementById(id); if (el) spy.observe(el); });
  }

  if (reduce || !window.gsap || !window.ScrollTrigger) return;
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  // Lenis smooth scroll on GSAP's ticker
  if (window.Lenis) {
    const lenis = new window.Lenis({ duration: 1.1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
      const el = document.querySelector(a.hash);
      if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -90 }); }
    }));
  }

  // Circular economy loop: one scroll progress drives the ring, the dots and the labels
  $$('.loop').forEach((loop) => {
    const ring = loop.querySelector('.loop-ring');
    const len = +ring.dataset.len;
    const n = +loop.dataset.steps;
    const steps = [...Array(n)].map((_, i) => $$(`[data-i="${i}"]`, loop));
    const render = (p) => {
      ring.style.strokeDashoffset = len * (1 - p);
      steps.forEach((els, i) => els.forEach((el) => el.classList.toggle('is-on', p >= i / n - 0.001)));
    };
    render(0);
    ScrollTrigger.create({ trigger: loop, start: 'top 75%', end: 'bottom 55%', onUpdate: (st) => render(st.progress) });
  });

  // Gentle parallax on the photo band
  if (document.querySelector('.photo-band-img')) {
    gsap.to('.photo-band-img', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.photo-band', start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  // Images and fonts change the page height after first layout
  addEventListener('load', () => ScrollTrigger.refresh());
})();
