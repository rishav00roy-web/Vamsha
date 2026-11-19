// Icon set: Phosphor duotone (MIT, see src/phosphor/LICENSE) plus three bamboo-specific
// icons drawn on the same 256 grid with a 16px stroke so they sit in the same family.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), 'phosphor');
const ph = (name) => {
  const svg = readFileSync(join(DIR, `${name}-duotone.svg`), 'utf8');
  return svg.replace(/^.*?<svg[^>]*>/s, '').replace(/<\/svg>\s*$/s, '').replace(/ opacity="0\.2"/g, ' class="duo"');
};

const S = (d) => `<g fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">${d}</g>`;

const custom = {
  // Bamboo grove: two culms with nodes, a leaf off each, on the ground line
  cultivation:
    '<rect class="duo" x="80" y="40" width="40" height="176" rx="14"/><rect class="duo" x="136" y="80" width="40" height="136" rx="14"/>' +
    S('<rect x="80" y="40" width="40" height="176" rx="14"/><path d="M80 100h40M80 160h40"/><rect x="136" y="80" width="40" height="136" rx="14"/><path d="M136 140h40"/>' +
      '<path d="M176 104c18-26 44-36 64-32-4 22-30 40-64 32z"/><path d="M80 72C62 48 38 42 20 48c6 20 30 32 60 24z"/><path d="M24 216h208"/>'),
  // Primary processing: a culm turned into slats
  processing:
    '<rect class="duo" x="40" y="32" width="40" height="192" rx="14"/>' +
    S('<rect x="40" y="32" width="40" height="192" rx="14"/><path d="M40 96h40M40 160h40"/>' +
      '<rect x="112" y="56" width="104" height="32" rx="10"/><rect x="112" y="112" width="104" height="32" rx="10"/><rect x="112" y="168" width="104" height="32" rx="10"/>'),
  // Bamboo shoot with overlapping sheaths
  food:
    '<path class="duo" d="M128 32C100 68 76 128 76 172a52 52 0 0 0 104 0c0-44-24-104-52-140z"/>' +
    S('<path d="M128 32C100 68 76 128 76 172a52 52 0 0 0 104 0c0-44-24-104-52-140z"/><path d="M100 112l28 24 28-24M86 160l42 34 42-34"/><path d="M40 232h176"/>'),
};

const map = {
  // Bamboo division
  construction: 'house-line', furniture: 'chair', paper: 'scroll', packaging: 'package', textile: 'needle',
  handicraft: 'basket', charcoal: 'fire', biomass: 'lightning', utility: 'fork-knife', engineering: 'stack',
  machinery: 'gear', 'bamboo-waste': 'recycle',
  // Waste division
  msw: 'truck', segregation: 'trash', mrf: 'funnel', plastic: 'beer-bottle', organic: 'potted-plant',
  industrial: 'factory', cnd: 'wall', ewaste: 'device-mobile', biomedical: 'first-aid', wealth: 'hand-coins', infra: 'warehouse',
  // Values
  'v-sustain': 'plant', 'v-innovate': 'lightbulb', 'v-include': 'users-three', 'v-enterprise': 'storefront',
  'v-transparent': 'eye', 'v-collab': 'handshake',
  // Impact
  'i-env': 'globe-hemisphere-west', 'i-industry': 'factory', 'i-jobs': 'briefcase', 'i-rural': 'farm',
  'i-women': 'gender-female', 'i-circular': 'arrows-clockwise', 'i-tech': 'cpu', 'i-community': 'users',
  // Misc
  agri: 'grains', research: 'flask', technology: 'laptop', csr: 'hand-heart',
  govt: 'bank', handshake: 'handshake', phone: 'phone', pin: 'map-pin', doc: 'file-text',
  mission: 'target', vision: 'eye', cluster: 'buildings', leaf: 'leaf', arrow: 'arrow-right', menu: 'list',
};

export const icons = { ...custom };
for (const [k, v] of Object.entries(map)) icons[k] = ph(v);

export const icon = (name, cls = 'ico', label) => {
  const body = icons[name];
  if (!body) throw new Error('missing icon ' + name);
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"';
  return `<svg class="${cls}" viewBox="0 0 256 256" ${a11y} fill="currentColor">${body}</svg>`;
};
