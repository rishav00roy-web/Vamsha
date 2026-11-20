import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { icon } from './icons.mjs';
import * as C from './content.mjs';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
mkdirSync(OUT, { recursive: true });

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ul = (list, cls = 'list') => `<ul class="${cls}">${list.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
const ol = (list, cls = 'olist') => `<ol class="${cls}">${list.map((x) => `<li><span>${esc(x)}</span></li>`).join('')}</ol>`;
const slug = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Live domain. Change this one line once the domain is bought; canonicals, social tags,
// structured data, robots.txt and sitemap.xml all follow it.
const SITE = (process.env.SITE_URL || 'https://vamshaa.example').replace(/\/$/, '');
const abs = (path) => `${SITE}/${path === 'index.html' ? '' : path}`;

// Per-page search titles (about 60 characters) and descriptions (under 160).
const SEO = {
  'index.html': ['Vamshaa Agrotech Foundation | Bamboo & Waste, Singrauli', 'Section 8 foundation in Singrauli, Madhya Pradesh, building a green economy from bamboo industries, waste management and the circular economy.', 'grove', 'Home'],
  'about.html': ['About Vamshaa Agrotech Foundation | Singrauli, MP', 'Who we are: a Section 8 company in Singrauli, Madhya Pradesh, working on bamboo industries, waste management and rural enterprise.', 'grove', 'About'],
  'bamboo.html': ['Bamboo Industry Division | Vamshaa Agrotech Foundation', 'Bamboo plantation, processing, construction, furniture, handicrafts, charcoal and biomass: our plan for a bamboo industry in Madhya Pradesh.', 'bundles', 'Bamboo industries'],
  'waste.html': ['Waste Management Division | Vamshaa Agrotech Foundation', 'Waste collection, segregation, recycling, composting and recovery of plastic, e-waste and C&D waste, turning waste into wealth.', null, 'Waste management'],
  'circular-economy.html': ['Circular Economy & Industrial Clusters | Vamshaa', 'How we link bamboo industries and waste management in one circular economy, with green industrial clusters for Singrauli and beyond.', null, 'Circular economy'],
  'community.html': ['Agriculture & Rural Development | Vamshaa Agrotech', 'Support for farmers, artisans and rural entrepreneurs, women and youth enterprise, and community participation in bamboo and waste work.', 'weaver', 'Agriculture & rural development'],
  'research.html': ['Research, Training & Technology | Vamshaa Agrotech', 'Research and development, skill training and technology for bamboo products and waste recovery, with institutions and industry.', null, 'Research & training'],
  'partnerships.html': ['CSR & Partnerships | Vamshaa Agrotech Foundation', 'Partner with us on CSR, industrial and institutional projects in bamboo, waste management and rural development in Madhya Pradesh.', null, 'Partnerships'],
  'projects.html': ['Projects & Impact | Vamshaa Agrotech Foundation', 'Our proposed bamboo, waste management and rural development projects, and the environmental, economic and social impact we work towards.', 'paper', 'Projects & impact'],
  'contact.html': ['Contact & Join Us | Vamshaa Agrotech Foundation', 'Contact Vamshaa Agrotech Foundation in Singrauli, Madhya Pradesh. Call +91 9981968555 to partner with us or join our work.', null, 'Contact'],
};

const NAV = [
  ['about.html', 'About'],
  ['bamboo.html', 'Bamboo'],
  ['waste.html', 'Waste'],
  ['circular-economy.html', 'Circular economy'],
  ['community.html', 'Community'],
  ['research.html', 'Research'],
  ['partnerships.html', 'Partnerships'],
  ['projects.html', 'Projects'],
];

const roughFilter = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
<filter id="rough" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.6"/></filter>
</defs></svg>`;

const ogImage = (file) => {
  const img = SEO[file][2];
  const [src, w, h] = img ? [`assets/img/${img}.jpg`, img === 'paper' ? 848 : 1600, img === 'paper' ? 478 : 900] : ['assets/img/logo-3d.png', 0, 0];
  return [`<meta property="og:image" content="${SITE}/${src}">`, w && `<meta property="og:image:width" content="${w}">\n<meta property="og:image:height" content="${h}">`, `<meta name="twitter:image" content="${SITE}/${src}">`].filter(Boolean).join('\n');
};

// JSON-LD: the organisation on every page, the website on the home page, breadcrumbs elsewhere.
const ORG_ID = () => `${SITE}/#org`;
const orgLd = () => {
  const o = C.org;
  return {
    '@type': 'NGO',
    '@id': ORG_ID(),
    name: 'Vamshaa Agrotech Foundation',
    legalName: 'VAMSHAA AGROTECH FOUNDATION',
    slogan: 'Go green, go clean',
    url: `${SITE}/`,
    logo: `${SITE}/assets/img/logo.png`,
    description: SEO['index.html'][1],
    foundingDate: '2025-12-24',
    telephone: o.phone.replace(/\s/g, ''),
    address: { '@type': 'PostalAddress', streetAddress: 'Ward No. 8, Gaytri Mandir Road, Sai Nagar', addressLocality: 'Singrauli', addressRegion: 'Madhya Pradesh', postalCode: '486889', addressCountry: 'IN' },
    areaServed: { '@type': 'State', name: 'Madhya Pradesh' },
    knowsAbout: ['Bamboo industries', 'Waste management', 'Circular economy', 'Rural industrialisation'],
    identifier: [{ '@type': 'PropertyValue', propertyID: 'CIN', value: o.cin }, { '@type': 'PropertyValue', propertyID: 'GSTIN', value: o.gstin }],
    contactPoint: { '@type': 'ContactPoint', telephone: o.phone.replace(/\s/g, ''), contactType: 'general enquiries', areaServed: 'IN', availableLanguage: ['en', 'hi'] },
  };
};
const jsonLd = (file) => {
  const graph = [orgLd()];
  if (file === 'index.html') graph.push({ '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: 'Vamshaa Agrotech Foundation', inLanguage: 'en-IN', publisher: { '@id': ORG_ID() } });
  else graph.push({ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` }, { '@type': 'ListItem', position: 2, name: SEO[file][3], item: abs(file) }] });
  graph.push({ '@type': 'WebPage', '@id': `${abs(file)}#page`, url: abs(file), name: SEO[file][0], description: SEO[file][1], inLanguage: 'en-IN', isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': ORG_ID() } });
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
};

function layout({ file, title, desc, body, current }) {
  const nav = NAV.map(([h, t]) => `<li><a href="${h}"${current === h ? ' aria-current="page"' : ''}>${t}</a></li>`).join('');
  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${abs(file)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Vamshaa Agrotech Foundation">
<meta property="og:locale" content="en_IN">
<meta property="og:url" content="${abs(file)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
${ogImage(file)}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
${file === 'index.html' ? '<link rel="preload" href="assets/img/poster.jpg" as="image" fetchpriority="high">\n' : ''}<script type="application/ld+json">${jsonLd(file)}</script>
<meta name="theme-color" content="#14402f">
<link rel="icon" href="assets/img/favicon.png">
<link rel="preload" href="assets/fonts/barlow-condensed-latin-700-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/instrument-sans-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/site.css">
<script>document.documentElement.classList.add('js');setTimeout(()=>{const r=document.documentElement;if(!r.classList.contains('reveal-ready'))r.classList.remove('js')},3000)</script>
</head>
<body id="top" data-page="${file.replace('.html', '')}">
<a class="skip" href="#main">Skip to content</a>
<header class="site-head">
  <div class="wrap head-row">
    <a class="brand" href="index.html" aria-label="Vamshaa Agrotech Foundation, home"><img src="assets/img/logo.png" alt="Vamshaa Agrotech Foundation" width="140" height="60"></a>
    <nav class="nav" aria-label="Main"><ul>${nav}</ul></nav>
    <a class="btn btn-small head-cta" href="contact.html">Join us</a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="drawer"><span class="sr">Menu</span>${icon('menu')}</button>
  </div>
  <div class="drawer" id="drawer" hidden>
    <ul>${nav}<li><a href="contact.html">Join us &amp; contact</a></li></ul>
  </div>
</header>
<main id="main">
${body}
</main>
${footer()}
<script src="assets/vendor/gsap.min.js" defer></script>
<script src="assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="assets/vendor/lenis.min.js" defer></script>
<script src="assets/site.js" defer></script>
</body>
</html>`;
}

function footer() {
  const o = C.org;
  const col = (title, links) => `<div><h2 class="foot-h">${title}</h2><ul class="foot-links">${links.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></div>`;
  return `<footer class="site-foot">
  <div class="wrap">
    <div class="foot-top">
      <div class="foot-brand">
        <img src="assets/img/logo.png" alt="Vamshaa Agrotech Foundation" width="180" height="78" loading="lazy">
        <p>A Section 8 foundation in Singrauli building a green economy from bamboo and waste.</p>
        <a class="foot-phone" href="${o.phoneHref}">${icon('phone')}<span>${o.phone}</span></a>
      </div>
      <nav class="foot-nav" aria-label="Footer">
        ${col('Our work', [['bamboo.html', 'Bamboo industries'], ['waste.html', 'Waste management'], ['circular-economy.html', 'Circular economy'], ['community.html', 'Agriculture &amp; rural'], ['research.html', 'Research &amp; training']])}
        ${col('Foundation', [['about.html', 'About us'], ['partnerships.html', 'Partnerships'], ['projects.html', 'Projects &amp; impact'], ['contact.html', 'Contact']])}
      </nav>
      <div class="foot-office">
        <h2 class="foot-h">Registered office</h2>
        <address>${o.address.map(esc).join(' ')}</address>
      </div>
    </div>
    <dl class="foot-corp">
      <div><dt>Status</dt><dd>Section 8 company</dd></div>
      <div><dt>CIN</dt><dd class="mono">${o.cin}</dd></div>
      <div><dt>GSTIN</dt><dd class="mono">${o.gstin}</dd></div>
      <div><dt>Incorporated</dt><dd>${o.incorporated}</dd></div>
    </dl>
    <p class="foot-word" aria-hidden="true"><span>Go green<em>.</em></span> <span>Go clean<em>.</em></span></p>
    <div class="foot-notes">
      <p>Government bodies named on this site are prospective collaboration areas, not existing partnerships.</p>
      <details class="foot-credits">
        <summary>Photo credits</summary>
        <p>${PHOTOS.map(([, t, a, f]) => `<a href="https://commons.wikimedia.org/wiki/File:${f}">${esc(t)}</a> by ${esc(a)}`).join('; ')}. All <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>, cropped. Other images are from the Foundation's own film.</p>
      </details>
    </div>
    <div class="foot-base">
      <p>© 2026 Vamshaa Agrotech Foundation</p>
      <p class="credit">Designed &amp; developed by Lios Labs</p>
      <a class="foot-top-link" href="#top">Back to top ${icon('arrow', 'ico ico-up')}</a>
    </div>
  </div>
</footer>`;
}

// Licensed photos (Wikimedia Commons, cropped to 16:9). Each ships at 1600 and 960 wide.
const PHOTOS = [
  ['grove', 'Bamboo from JP Nagar Forest, Bengaluru', 'Firos AK', 'Bamboo_from_JP_Nagar_Forest,Banaglore,Karnataka,India.jpg'],
  ['bundles', 'Ochlandra in Vazhachal forest', 'PJeganathan', 'Ochlandra_in_vazachal_forest_IMG_1094.jpg'],
  ['weaver', 'Bamboo craft, Purulia, West Bengal', 'IMG1952', 'BAMBOO_CRAFT_PURULIA_WEST_BENGAL_IMG_0256.jpg'],
  ['assam', 'Innovative bamboo crafts of Assam', 'Chiring chandan', 'Innovative_Bamboo_Crafts_of_Assam_2.jpg'],
];
const photo = (name, alt, attrs = '', sizes = '(max-width: 860px) 100vw, 50vw') => PHOTOS.some(([n]) => n === name)
  ? `<img src="assets/img/${name}.jpg" srcset="assets/img/${name}-960.jpg 960w, assets/img/${name}.jpg 1600w" sizes="${sizes}" alt="${alt}" width="1600" height="900"${attrs}>`
  : `<img src="assets/img/${name}.jpg" alt="${alt}" width="848" height="478"${attrs}>`;

const HERO_ALT = {
  grove: 'Tall bamboo culms in a forest grove in Karnataka',
  bundles: 'Freshly cut bamboo poles stacked beside a bamboo clump',
  weaver: 'A woman in West Bengal weaving a bamboo mat with her child on her lap',
  paper: 'Bamboo paper rolls on a processing line',
};

const pageHero = ({ kicker, title, lead, img, iconName, tone = '' }) => `
<section class="page-hero ${tone}">
  <div class="wrap page-hero-grid">
    <div class="page-hero-text">
      ${kicker ? `<p class="crumb"><a href="index.html">Home</a> / ${esc(kicker)}</p>` : ''}
      <h1 class="display reveal">${esc(title)}</h1>
      ${lead ? `<p class="lead reveal">${esc(lead)}</p>` : ''}
    </div>
    ${img ? `<figure class="page-hero-img reveal">${photo(img, HERO_ALT[img] || '')}</figure>` : ''}
    ${iconName ? `<div class="page-hero-ico reveal">${icon(iconName, 'ico ico-xl')}</div>` : ''}
  </div>
</section>`;

const sectionHead = (title, intro, id) => `<div class="sec-head reveal"${id ? ` id="${id}"` : ''}><h2 class="h2">${esc(title)}</h2>${intro ? `<p>${esc(intro)}</p>` : ''}</div>`;

const chain = (steps) => `<ol class="chain reveal" aria-label="Value chain">${steps.map((s, i) => `<li><span class="chain-n mono">${String(i + 1).padStart(2, '0')}</span>${esc(s)}</li>`).join('')}</ol>`;

const divisionCard = (it) => `<article class="dcard reveal" id="s-${it.n.replace('.', '-')}">
  <div class="dcard-top">${icon(it.icon, 'ico ico-l')}<span class="dcard-n mono">${it.n}</span></div>
  <h3>${esc(it.t)}</h3>
  ${ul(it.list, 'list list-leaf')}
  ${it.note ? `<p class="note">${esc(it.note)}</p>` : ''}
</article>`;

const divisionIndex = (items, extra = []) => `<nav class="dindex" aria-label="On this page"><p class="dindex-h">On this page</p><ol>${[...items, ...extra].map((it) => `<li><a href="#s-${it.n.replace('.', '-')}"><span class="mono">${it.n}</span> ${esc(it.t.replace(/^Bamboo /, ''))}</a></li>`).join('')}</ol></nav>`;

const joinBand = () => `
<section class="join-band">
  <div class="wrap join-grid">
    <div>
      <h2 class="display-l reveal">${C.join.slogan.map((s) => `<span class="line">${esc(s)}</span>`).join('')}</h2>
    </div>
    <div class="join-side reveal">
      <p>${esc(C.join.close)}</p>
      <div class="actions"><a class="btn btn-sun" href="contact.html">Partner with us</a><a class="btn btn-ghost-light" href="${C.org.phoneHref}">Call ${C.org.phone}</a></div>
    </div>
  </div>
</section>`;

const circleModel = () => {
  const steps = C.circular.model;
  const R = 230, cx = 300, cy = 300, C2 = 2 * Math.PI * R;
  const nodes = steps.map((s, i) => {
    const a = (-90 + (360 / steps.length) * i) * Math.PI / 180;
    const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
    const lx = cx + (R + 34) * Math.cos(a), ly = cy + (R + 34) * Math.sin(a);
    const anchor = x > cx + 10 ? 'start' : x < cx - 10 ? 'end' : 'middle';
    const top = i === 0;
    return { s, x, y, lx, ly, anchor, top, i };
  });
  const labels = nodes.map((n) => {
    const nY = n.top ? n.ly - 34 : n.ly - 14, tY = n.top ? n.ly - 6 : n.ly + 14;
    return `<g class="lt" data-i="${n.i}"><text class="lt-n" x="${n.lx.toFixed(1)}" y="${nY.toFixed(1)}" text-anchor="${n.anchor}">${String(n.i + 1).padStart(2, '0')}</text><text class="lt-t" x="${n.lx.toFixed(1)}" y="${tY.toFixed(1)}" text-anchor="${n.anchor}">${esc(n.s.toUpperCase())}</text></g>`;
  }).join('');
  return `<figure class="loop" data-steps="${steps.length}">
  <svg class="loop-svg" viewBox="-170 -20 940 640" role="img" aria-labelledby="loop-t">
    <title id="loop-t">Circular economy model: ${steps.join(', then ')}, and back to natural resources.</title>
    <circle class="loop-track" cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke-width="1.5" stroke-dasharray="2 8"/>
    <circle class="loop-ring" cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke-width="4" stroke-linecap="round" stroke-dasharray="${C2.toFixed(2)}" stroke-dashoffset="0" transform="rotate(-90 ${cx} ${cy})" data-len="${C2.toFixed(2)}"/>
    ${nodes.map((n) => `<g class="loop-node" data-i="${n.i}" transform="translate(${n.x.toFixed(1)} ${n.y.toFixed(1)})"><circle r="11"/><text class="loop-num" y="5" text-anchor="middle">${n.i + 1}</text></g>`).join('')}
    ${labels}
  </svg>
  <ol class="loop-labels">${nodes.map((n) => `<li class="ll" data-i="${n.i}"><span class="mono">${String(n.i + 1).padStart(2, '0')}</span>${esc(n.s)}</li>`).join('')}</ol>
  <figcaption class="loop-center"><span class="loop-c1">From waste</span><span class="loop-c2">back to value</span></figcaption>
</figure>`;
};

// ---------------- Pages ----------------
const pages = [];

// HOME
pages.push({
  file: 'index.html',
  body: `
<section class="hero" aria-label="Introduction">
  <video class="hero-video" autoplay muted loop playsinline preload="metadata" poster="assets/img/poster.jpg">
    <source src="assets/video/intro.mp4" type="video/mp4">
  </video>
  <div class="hero-shade"></div>
  <div class="wrap hero-inner">
    <h1 class="hero-h"><span class="sr-only">Vamshaa Agrotech Foundation: </span><span class="line">Go green.</span><span class="line">Go clean.</span></h1>
    <p class="hero-p">${esc(C.org.statement)}</p>
    <div class="actions"><a class="btn btn-sun" href="about.html">Explore our work</a><a class="btn btn-ghost-light" href="contact.html">Partner with us</a></div>
  </div>
  <button class="hero-sound" type="button" aria-pressed="false"><span class="sr">Play video sound</span><span class="hero-sound-t">Sound off</span></button>
</section>

<div class="marquee" aria-label="${esc(C.org.sectors.join(', '))}">
  <div class="marquee-track" aria-hidden="true">${Array.from({ length: 4 }).map(() => C.org.sectors.map((s) => `<span>${esc(s)}</span>${icon('leaf', 'ico ico-s')}`).join('')).join('')}</div>
</div>

<section class="intro">
  <div class="wrap intro-grid">
    <p class="statement reveal">${esc(C.about.belief)}</p>
    <div class="intro-side reveal">
      <p>${esc(C.about.p[0])}</p>
      <h2 class="h3">Our development approach is based on three principles</h2>
      ${ul(C.about.principles, 'plist')}
      <a class="link" href="about.html">About the Foundation ${icon('arrow', 'ico ico-s')}</a>
    </div>
  </div>
</section>

<section class="divisions">
  <div class="wrap">
    ${sectionHead('Two sectors, one green economy')}
    <div class="div-grid">
      <a class="div-card div-bamboo reveal" href="bamboo.html">
        <figure>${photo('assam', 'Hand-woven bamboo lampshades and baskets from Assam', ' loading="lazy"')}</figure>
        <div class="div-body">
          <h3 class="h2">${esc(C.about.sectors[0].t)}</h3>
          <p>${esc(C.about.sectors[0].d)}</p>
          <span class="link">15 bamboo industry areas ${icon('arrow', 'ico ico-s')}</span>
        </div>
      </a>
      <a class="div-card div-waste reveal" href="waste.html">
        <div class="div-art" aria-hidden="true">${['segregation', 'mrf', 'organic', 'plastic', 'msw', 'wealth'].map((n) => icon(n, 'ico')).join('')}</div>
        <div class="div-body">
          <h3 class="h2">${esc(C.about.sectors[1].t)}</h3>
          <p>${esc(C.about.sectors[1].d)}</p>
          <span class="link">11 waste management areas ${icon('arrow', 'ico ico-s')}</span>
        </div>
      </a>
    </div>
  </div>
</section>

<section class="icon-row-sec">
  <div class="wrap">
    <ul class="icon-row">
      ${[['cultivation', 'Plantation'], ['construction', 'Construction'], ['furniture', 'Furniture'], ['handicraft', 'Handicrafts'], ['segregation', 'Segregation'], ['organic', 'Composting']].map(([i, t]) => `<li class="reveal">${icon(i, 'ico ico-xl')}<span>${t}</span></li>`).join('')}
    </ul>
  </div>
</section>

<section class="circular-sec">
  <div class="wrap circ-grid">
    <div class="circ-text">
      <h2 class="display-l reveal">Bamboo and waste, connected in one loop</h2>
      <p class="reveal">${esc(C.circular.p[0])} ${esc(C.circular.p[1])}</p>
      <p class="reveal circ-goal">${esc(C.circular.goal)}</p>
      <a class="btn btn-sun reveal" href="circular-economy.html">See the circular model</a>
    </div>
    ${circleModel()}
  </div>
</section>

<section class="photo-band">
  ${photo('grove', 'Tall bamboo culms in a forest grove', ' class="photo-band-img" loading="lazy"', '100vw')}
  <div class="photo-band-shade"></div>
  <div class="wrap photo-band-inner">
    <h2 class="h3">Our vision</h2>
    <p class="quote reveal">${esc(C.about.vision)}</p>
  </div>
</section>

<section class="values">
  <div class="wrap">
    ${sectionHead('Our core values')}
    <ul class="value-grid">${C.about.values.map((v) => `<li class="value reveal">${icon(v.icon, 'ico ico-l')}<h3>${v.t}</h3><p>${esc(v.d)}</p></li>`).join('')}</ul>
  </div>
</section>

<section class="impact-teaser">
  <div class="wrap">
    ${sectionHead('Building a green economy', C.projects.impactLead)}
    <ul class="impact-grid">${C.projects.impact.map((v) => `<li class="impact reveal">${icon(v.icon, 'ico ico-l')}<h3>${v.t}</h3><p>${esc(v.d)}</p></li>`).join('')}</ul>
  </div>
</section>
${joinBand()}`,
});

// ABOUT
pages.push({
  file: 'about.html',
  body: `${pageHero({ kicker: 'About us', title: 'About the Foundation', lead: C.about.p[0], img: 'grove' })}
<section class="sec">
  <div class="wrap two-col">
    <div class="prose reveal">${C.about.p.slice(1).map((p) => `<p>${esc(p)}</p>`).join('')}<p>${esc(C.about.belief)}</p><p>${esc(C.about.approach)}</p></div>
    <aside class="panel reveal">
      <h2 class="h3">Our development approach is based on three principles</h2>
      ${ul(C.about.principles, 'plist')}
    </aside>
  </div>
</section>
<section class="sec sec-mint">
  <div class="wrap">
    ${sectionHead('We focus on two major sectors')}
    <div class="sector-grid">${C.about.sectors.map((s) => `<a class="sector reveal" href="${s.href}">${icon(s.icon, 'ico ico-xl')}<h3 class="h2">${esc(s.t)}</h3><p>${esc(s.d)}</p><span class="link">Read more ${icon('arrow', 'ico ico-s')}</span></a>`).join('')}</div>
  </div>
</section>
<section class="sec">
  <div class="wrap vm-grid">
    <div class="vm reveal" id="vision">${icon('vision', 'ico ico-l')}<h2 class="h2">Our vision</h2><p class="quote-s">${esc(C.about.vision)}</p></div>
    <div class="vm reveal" id="mission">${icon('mission', 'ico ico-l')}<h2 class="h2">Our mission</h2>${ul(C.about.mission, 'list list-leaf list-2')}</div>
  </div>
</section>
<section class="sec sec-cream values">
  <div class="wrap">
    ${sectionHead('Our core values')}
    <ul class="value-grid">${C.about.values.map((v) => `<li class="value reveal">${icon(v.icon, 'ico ico-l')}<h3>${v.t}</h3><p>${esc(v.d)}</p></li>`).join('')}</ul>
  </div>
</section>
<section class="sec">
  <div class="wrap">
    ${sectionHead('Board of directors')}
    <ul class="people">${C.org.directors.map((d) => `<li class="person reveal"><span class="avatar" aria-hidden="true">${d.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span><div><h3>${esc(d.name)}</h3><p>${d.role}</p><p class="mono small">DIN: ${d.din}</p></div></li>`).join('')}</ul>
  </div>
</section>
${joinBand()}`,
});

// BAMBOO
pages.push({
  file: 'bamboo.html',
  body: `${pageHero({ kicker: 'Bamboo industries', title: C.bamboo.title, lead: C.bamboo.lead, img: 'bundles' })}
<section class="sec">
  <div class="wrap two-col">
    <div class="prose reveal">${C.bamboo.p.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
    <div class="reveal"><h2 class="h3">The complete bamboo value chain</h2>${chain(C.bamboo.chain)}</div>
  </div>
</section>
<section class="sec sec-cream">
  <div class="wrap div-layout">
    ${divisionIndex(C.bamboo.items)}
    <div class="dgrid">${C.bamboo.items.map(divisionCard).join('')}</div>
  </div>
</section>
<section class="gallery">
  <div class="wrap gal-grid">
    ${[['paper', 'Bamboo paper rolls on a processing line'], ['charcoal', 'Bamboo charcoal briquettes'], ['food', 'Workers packing bamboo products'], ['assam', 'Hand-woven bamboo lampshades and baskets']].map(([f, a]) => `<figure class="reveal">${photo(f, a, ' loading="lazy"')}</figure>`).join('')}
  </div>
</section>
${joinBand()}`,
});

// WASTE
pages.push({
  file: 'waste.html',
  body: `${pageHero({ kicker: 'Waste management', title: C.waste.title, lead: C.waste.lead, iconName: 'wealth', tone: 'page-hero-mint' })}
<section class="sec">
  <div class="wrap two-col">
    <div class="prose reveal">${C.waste.p.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
    <div class="reveal"><h2 class="h3">An integrated system, from source to recovery</h2>${chain(C.waste.chain)}</div>
  </div>
</section>
<section class="sec sec-cream">
  <div class="wrap div-layout">
    ${divisionIndex(C.waste.items, [C.waste.infra])}
    <div class="dgrid">${C.waste.items.map(divisionCard).join('')}
      <article class="dcard dcard-wide reveal" id="s-6-11">
        <div class="dcard-top">${icon('infra', 'ico ico-l')}<span class="dcard-n mono">6.11</span></div>
        <h3>${esc(C.waste.infra.t)}</h3>
        <p>${esc(C.waste.infra.lead)}</p>
        ${ol(C.waste.infra.list, 'olist olist-2')}
      </article>
    </div>
  </div>
</section>
${joinBand()}`,
});

// CIRCULAR + CLUSTERS
pages.push({
  file: 'circular-economy.html',
  body: `${pageHero({ kicker: 'Circular economy', title: 'Bamboo + waste: circular economy', lead: C.circular.p[0], iconName: 'i-circular', tone: 'page-hero-mint' })}
<section class="circular-sec">
  <div class="wrap circ-grid">
    <div class="circ-text">
      <h2 class="display-l reveal">${esc(C.circular.title)}</h2>
      <p class="reveal">${esc(C.circular.p[1])}</p>
      <p class="reveal circ-goal">${esc(C.circular.goal)}</p>
    </div>
    ${circleModel()}
  </div>
</section>
<section class="sec">
  <div class="wrap">
    ${sectionHead('Integrated opportunities')}
    <ul class="opp-grid">${C.circular.opportunities.map((o) => `<li class="opp reveal">${icon('leaf', 'ico ico-m')}<p>${esc(o)}</p></li>`).join('')}</ul>
  </div>
</section>
<section class="sec sec-cream">
  <div class="wrap two-col">
    <div class="reveal">${icon('cluster', 'ico ico-xl')}<h2 class="h2">Bamboo industrial clusters</h2><p class="prose-p">${esc(C.circular.clusters.p)}</p></div>
    <div class="panel reveal"><h3 class="h3">Proposed components</h3>${ul(C.circular.clusters.list, 'list list-leaf')}</div>
  </div>
</section>
<section class="sec">
  <div class="wrap">
    ${sectionHead('Common Facility Centres (CFC)')}
    <div class="cfc-grid">
      <article class="dcard reveal"><div class="dcard-top">${icon('processing', 'ico ico-l')}</div><h3>Bamboo CFC</h3>${ul(C.circular.cfc.bamboo, 'list list-leaf')}</article>
      <article class="dcard reveal"><div class="dcard-top">${icon('mrf', 'ico ico-l')}</div><h3>Waste Management CFC</h3>${ul(C.circular.cfc.waste, 'list list-leaf')}</article>
    </div>
    <p class="note reveal">${esc(C.circular.cfc.note)}</p>
  </div>
</section>
${joinBand()}`,
});

// COMMUNITY
pages.push({
  file: 'community.html',
  body: `${pageHero({ kicker: 'Agriculture & rural development', title: 'Agriculture & rural development', lead: C.community.agri.p, img: 'weaver' })}
<section class="sec">
  <div class="wrap two-col">
    <div class="reveal">${icon('agri', 'ico ico-xl')}<h2 class="h2">Agriculture & bamboo farmer development</h2><p class="prose-p">${esc(C.community.agri.p)}</p></div>
    <div class="panel reveal"><h3 class="h3">Proposed activities</h3>${ul(C.community.agri.list, 'list list-leaf')}</div>
  </div>
</section>
<section class="sec sec-mint">
  <div class="wrap">
    ${sectionHead('Rural entrepreneurship', 'We aim to encourage local entrepreneurship through:')}
    <ul class="chip-grid">${C.community.rural.map((r) => `<li class="chip reveal">${icon('leaf', 'ico ico-s')}${esc(r)}</li>`).join('')}</ul>
  </div>
</section>
<section class="sec">
  <div class="wrap two-col">
    <div class="reveal">${icon('i-women', 'ico ico-xl')}<h2 class="h2">Women & youth empowerment</h2><p class="prose-p">${esc(C.community.women.p)}</p></div>
    <div class="panel reveal"><h3 class="h3">Proposed programmes include</h3>${ul(C.community.women.list, 'list list-leaf')}</div>
  </div>
</section>
${joinBand()}`,
});

// RESEARCH
pages.push({
  file: 'research.html',
  body: `${pageHero({ kicker: 'Research, training & technology', title: 'Research, training & technology', lead: C.research.rd.p, iconName: 'research', tone: 'page-hero-mint' })}
<section class="sec">
  <div class="wrap">
    ${sectionHead('Research & development', 'Priority research areas:')}
    <div class="cfc-grid">
      <article class="dcard reveal"><div class="dcard-top">${icon('engineering', 'ico ico-l')}</div><h3>Bamboo research</h3>${ul(C.research.rd.bamboo, 'list list-leaf')}</article>
      <article class="dcard reveal"><div class="dcard-top">${icon('i-circular', 'ico ico-l')}</div><h3>Waste management research</h3>${ul(C.research.rd.waste, 'list list-leaf')}</article>
    </div>
  </div>
</section>
<section class="sec sec-cream">
  <div class="wrap">
    ${sectionHead('Skill development & training', 'Proposed training programmes:')}
    ${ul(C.research.training, 'list list-leaf list-3')}
  </div>
</section>
<section class="sec">
  <div class="wrap two-col">
    <div class="reveal">${icon('technology', 'ico ico-xl')}<h2 class="h2">Technology & innovation</h2><p class="prose-p">${esc(C.research.tech.p)}</p></div>
    <div class="panel reveal"><h3 class="h3">Focus areas</h3>${ul(C.research.tech.list, 'list list-leaf')}</div>
  </div>
</section>
${joinBand()}`,
});

// PARTNERSHIPS
pages.push({
  file: 'partnerships.html',
  body: `${pageHero({ kicker: 'Partnerships', title: 'CSR, government & industrial partnerships', lead: C.partners.csr.p, iconName: 'handshake', tone: 'page-hero-mint' })}
<section class="sec">
  <div class="wrap">
    ${sectionHead('CSR partnerships', 'Proposed CSR projects')}
    ${ol(C.partners.csr.list, 'olist olist-3')}
    <p class="note reveal">${esc(C.partners.csr.note)}</p>
  </div>
</section>
<section class="sec sec-cream">
  <div class="wrap two-col">
    <div class="reveal">${icon('govt', 'ico ico-xl')}<h2 class="h2">Government & institutional collaborations</h2><p class="prose-p">${esc(C.partners.govt.p)}</p><p class="note">${esc(C.partners.govt.note)}</p></div>
    <div class="panel reveal">${ul(C.partners.govt.list, 'list list-leaf')}</div>
  </div>
</section>
<section class="sec">
  <div class="wrap">
    ${sectionHead('Industrial & business partnerships', 'We welcome collaboration with:')}
    <ul class="chip-grid">${C.partners.industry.map((r) => `<li class="chip reveal">${icon('leaf', 'ico ico-s')}${esc(r)}</li>`).join('')}</ul>
  </div>
</section>
${joinBand()}`,
});

// PROJECTS + IMPACT
pages.push({
  file: 'projects.html',
  body: `${pageHero({ kicker: 'Projects & impact', title: 'Our project portfolio', lead: C.projects.p, img: 'paper' })}
<section class="sec">
  <div class="wrap">
    ${sectionHead('Project areas')}
    <div class="cfc-grid cfc-3">${C.projects.groups.map((g) => `<article class="dcard reveal"><div class="dcard-top">${icon(g.icon, 'ico ico-l')}</div><h3>${esc(g.t)}</h3>${ul(g.list, 'list list-leaf')}</article>`).join('')}</div>
  </div>
</section>
<section class="sec sec-forest">
  <div class="wrap">
    ${sectionHead('Our impact & development objectives', C.projects.impactLead)}
    <ul class="impact-grid">${C.projects.impact.map((v) => `<li class="impact reveal">${icon(v.icon, 'ico ico-l')}<h3>${v.t}</h3><p>${esc(v.d)}</p></li>`).join('')}</ul>
  </div>
</section>
${joinBand()}`,
});

// CONTACT + JOIN
const o = C.org;
pages.push({
  file: 'contact.html',
  body: `${pageHero({ kicker: 'Join us', title: C.join.title, lead: C.join.p, iconName: 'csr', tone: 'page-hero-mint' })}
<section class="sec">
  <div class="wrap two-col">
    <div class="reveal">
      <h2 class="h2">You can collaborate with us through</h2>
      ${ul(C.join.list, 'list list-leaf list-2')}
      <p class="prose-p">${esc(C.join.close)}</p>
    </div>
    <aside class="contact-card reveal" id="contact">
      <h2 class="h2">Contact</h2>
      <ul class="contact-list">
        <li>${icon('phone', 'ico ico-m')}<div><p class="small">Contact number</p><a class="big-link" href="${o.phoneHref}">${o.phone}</a><button class="copy-btn" type="button" data-copy="${o.phone}">Copy number</button></div></li>
        <li>${icon('pin', 'ico ico-m')}<div><p class="small">Registered office</p><address>${o.address.map(esc).join('<br>')}</address><a class="link" href="https://www.google.com/maps/search/?api=1&query=Gaytri+Mandir+Road+Sai+Nagar+Singrauli+486889" rel="noopener" target="_blank">Open in Maps ${icon('arrow', 'ico ico-s')}</a></div></li>
        <li>${icon('doc', 'ico ico-m')}<div><p class="small">Email and official website</p><p>${o.email}</p></div></li>
      </ul>
    </aside>
  </div>
</section>
<section class="sec sec-cream">
  <div class="wrap two-col">
    <div class="reveal">
      <h2 class="h2">Corporate information</h2>
      <dl class="facts">
        <dt>Name</dt><dd>${esc(o.name)}</dd>
        <dt>Tagline</dt><dd>${esc(o.tagline)}</dd>
        <dt>Legal status</dt><dd>${esc(o.legal)}</dd>
        <dt>CIN</dt><dd class="mono">${o.cin}</dd>
        <dt>GSTIN</dt><dd class="mono">${o.gstin}</dd>
        <dt>Date of incorporation</dt><dd>${o.incorporated}</dd>
      </dl>
    </div>
    <div class="reveal">
      <h2 class="h2">Board of directors</h2>
      <ul class="people people-stack">${o.directors.map((d) => `<li class="person"><span class="avatar" aria-hidden="true">${d.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span><div><h3>${esc(d.name)}</h3><p>${d.role}</p><p class="mono small">DIN: ${d.din}</p></div></li>`).join('')}</ul>
    </div>
  </div>
</section>
${joinBand()}`,
});

for (const p of pages) {
  const [title, desc] = SEO[p.file];
  writeFileSync(join(OUT, p.file), layout({ ...p, title, desc, current: p.file }));
}
const today = new Date().toISOString().slice(0, 10);
writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${abs(p.file)}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`);
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`);
if (SITE.endsWith('.example')) console.warn('note: SITE_URL is still the placeholder; set it to the live domain before launch');
writeFileSync(join(OUT, 'vercel.json'), JSON.stringify({ cleanUrls: false, headers: [{ source: '/assets/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }] }] }, null, 2));
console.log('built', pages.length, 'pages');
