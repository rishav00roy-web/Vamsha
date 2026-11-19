(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile drawer
  const btn = document.querySelector('.menu-btn');
  const drawer = document.getElementById('drawer');
  if (btn && drawer) {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      drawer.hidden = open;
    });
    drawer.addEventListener('click', (e) => { if (e.target.closest('a')) { btn.setAttribute('aria-expanded', 'false'); drawer.hidden = true; } });
  }

  // Hero video: sound toggle, pause when reduced motion
  const video = document.querySelector('.hero-video');
  const sound = document.querySelector('.hero-sound');
  if (video) {
    if (reduce) { video.removeAttribute('autoplay'); video.pause(); }
    if (sound) sound.addEventListener('click', () => {
      video.muted = !video.muted;
      if (!video.muted) video.play();
      sound.setAttribute('aria-pressed', String(!video.muted));
      sound.querySelector('.hero-sound-t').textContent = video.muted ? 'Sound off' : 'Sound on';
    });
  }

  // Division index: highlight current card
  const idx = [...document.querySelectorAll('.dindex a')];
  if (idx.length && 'IntersectionObserver' in window) {
    const map = new Map(idx.map((a) => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { idx.forEach((a) => a.classList.remove('is-active')); map.get(en.target.id)?.classList.add('is-active'); }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    map.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  }

  if (reduce) return;

  const start = () => {
    if (!window.gsap || !window.ScrollTrigger) return;
    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);

    // Lenis smooth scroll, driven by GSAP's ticker
    if (window.Lenis) {
      const lenis = new window.Lenis({ duration: 1.1, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
        const el = document.querySelector(a.getAttribute('href'));
        if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -90 }); }
      }));
    }

    // Hero headline
    const lines = document.querySelectorAll('.hero-h .line, .hero-p, .hero .actions');
    if (lines.length) gsap.from(lines, { y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: .12, delay: .15 });

    // Reveals (content stays visible without JS)
    ScrollTrigger.batch('.reveal', {
      start: 'top 90%',
      once: true,
      onEnter: (els) => gsap.fromTo(els, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: 'power2.out', stagger: .07, overwrite: true }),
    });

    // Icons: a small lift-and-settle as they come into view
    document.querySelectorAll('.draw').forEach((svg) => {
      ScrollTrigger.create({ trigger: svg, start: 'top 90%', once: true, onEnter: () => gsap.fromTo(svg, { scale: .85, rotate: -6 }, { scale: 1, rotate: 0, duration: .9, ease: 'back.out(2)' }) });
    });

    // Circular economy loop: one scroll progress drives the ring, the dots and the labels together
    document.querySelectorAll('.loop').forEach((loop) => {
      const ring = loop.querySelector('.loop-ring');
      const len = parseFloat(ring.dataset.len);
      const n = parseInt(loop.dataset.steps, 10);
      const groups = [...Array(n)].map((_, i) => loop.querySelectorAll(`[data-i="${i}"]`));
      const render = (p) => {
        ring.style.strokeDashoffset = String(len * (1 - p));
        groups.forEach((els, i) => {
          const on = p >= i / n - 0.001;
          els.forEach((el) => el.classList.toggle('is-on', on));
        });
      };
      render(0);
      ScrollTrigger.create({ trigger: loop, start: 'top 75%', end: 'bottom 55%', onUpdate: (st) => render(st.progress), onLeave: () => render(1), onLeaveBack: () => render(0) });
    });

    // Gentle parallax on the photo band
    const band = document.querySelector('.photo-band-img');
    if (band) gsap.to(band, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.photo-band', start: 'top bottom', end: 'bottom top', scrub: true } });

    window.addEventListener('load', () => ScrollTrigger.refresh());
  };

  if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
})();
