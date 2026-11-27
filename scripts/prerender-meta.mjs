// Writes one HTML file per public route into dist/, each with its own title, description and
// share tags. Crawlers such as LinkedIn and WhatsApp do not run JavaScript, so they read these
// files directly. The app itself still loads and takes over in the browser.
import fs from 'node:fs';
import path from 'node:path';
import {
  COMMERCIAL_VENTURES,
  OPEN_SOURCE_TOOLS,
  TRIPPY_FOUNDER_SPOTLIGHT,
  FIXIT_FOUNDER_SPOTLIGHT,
} from '../src/data/portfolioData.js';

const SITE = 'https://harshit.buzz';
const DIST = path.resolve('dist');
const SHARE_IMAGE = `${SITE}/og-image.png`;
const DEFAULT_TITLE = 'Harshit Agarwal — Senior Product Manager';
const DEFAULT_DESC =
  'Harshit Agarwal builds B2B fintech, AI tools and startups, from zero to live. Experience, products, open source and credentials.';

const pages = [
  { path: '/', title: null, desc: null },
  { path: '/about', title: 'About', desc: 'Profile, at-a-glance metrics, awards, education and certifications for Harshit Agarwal.' },
  { path: '/experience', title: 'Experience', desc: 'Product roles at Tekion, Tally, Shiprocket and Frendy, with outcomes and skills.' },
  { path: '/startups', title: 'Startups', desc: 'Trippy, a consumer AI travel network, and FixIT, a B2B feedback-to-fix platform. Both in active beta.' },
  { path: '/trippy', title: TRIPPY_FOUNDER_SPOTLIGHT.name, desc: TRIPPY_FOUNDER_SPOTLIGHT.tagline },
  { path: '/fixit', title: FIXIT_FOUNDER_SPOTLIGHT.name, desc: FIXIT_FOUNDER_SPOTLIGHT.tagline },
  { path: '/ventures', title: 'Commercial Projects', desc: 'Six commercial platforms built end to end, from problem to shipped product.' },
  {
    path: '/open-source',
    title: 'Open-Source Projects',
    desc: `${OPEN_SOURCE_TOOLS.length} MIT-licensed open-source projects: agentic dev tools, LLM cost control and playful AI experiments.`,
  },
  { path: '/case-studies', title: 'Case Studies & PRDs', desc: 'Product documents: market research, analytics, MVP specs and unit economics.' },
  ...COMMERCIAL_VENTURES.map((v) => ({ path: `/ventures/${v.id}`, title: v.name, desc: v.tagline })),
  ...OPEN_SOURCE_TOOLS.map((t) => ({ path: `/open-source/${t.id}`, title: t.name, desc: t.tagline })),
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

function withHead(html, { title, desc, url }) {
  const fullTitle = title ? `${title} · Harshit Agarwal` : DEFAULT_TITLE;
  const description = desc || DEFAULT_DESC;

  // Remove the tags we replace, then add the page's own set before </head>.
  let out = html
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/<meta\s+(?:name|property)="(?:description|og:title|og:description|og:url|twitter:title|twitter:description)"[^>]*>/g, '')
    .replace(/<link rel="canonical"[^>]*>/g, '')
    .replace(/<meta\s+(?:property|name)="og:image"[^>]*>/g, '')
    .replace(/<meta\s+name="twitter:image"[^>]*>/g, '');

  const block = [
    `<title>${esc(fullTitle)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta property="og:title" content="${esc(fullTitle)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${SHARE_IMAGE}" />`,
    `<meta name="twitter:title" content="${esc(fullTitle)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${SHARE_IMAGE}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
  ].join('\n    ');

  return out.replace('</head>', `    ${block}\n  </head>`);
}

for (const p of pages) {
  const url = `${SITE}${p.path}`;
  const html = withHead(template, { title: p.title, desc: p.desc, url });
  if (p.path === '/') {
    fs.writeFileSync(path.join(DIST, 'index.html'), html);
    continue;
  }
  const dir = path.join(DIST, p.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}
console.log(`Wrote share pages for ${pages.length} routes into dist/`);
