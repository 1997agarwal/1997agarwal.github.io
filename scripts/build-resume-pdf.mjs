// Renders the resume views of the built site to PDFs in dist/:
//   Harshit-Agarwal-Resume-1-Page.pdf  (Quick View, exactly 1 page)
//   Harshit-Agarwal-Resume-Full.pdf    (Full Resume, up to 2 pages)
// Runs after `vite build`, so the PDF always matches src/data/portfolioData.js.
// Set CHROME_PATH if Chrome is not at /usr/bin/google-chrome.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const dist = path.resolve('dist');
const types = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.json': 'application/json', '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  let file = path.join(dist, urlPath === '/' ? 'index.html' : urlPath);
  if (!file.startsWith(dist) || !fs.existsSync(file)) file = path.join(dist, 'index.html');
  res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

async function render(hash, file, maxPages) {
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123 });
  await page.goto(`${base}/${hash}`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('[role="dialog"][aria-label="Resume"]');
  await Promise.race([page.evaluate(() => document.fonts.ready), new Promise((r) => setTimeout(r, 5000))]);
  await page.emulateMediaType('print');

  // Largest scale that fits the page budget
  for (let scale = 1; scale >= 0.6; scale = Math.round((scale - 0.05) * 100) / 100) {
    const pdf = await page.pdf({ preferCSSPageSize: true, printBackground: true, scale });
    const pages = (Buffer.from(pdf).toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
    if (pages <= maxPages) {
      fs.writeFileSync(path.join(dist, file), pdf);
      console.log(`Wrote dist/${file} (${pages} page${pages > 1 ? 's' : ''}, scale ${scale})`);
      await page.close();
      return;
    }
  }
  throw new Error(`${file}: could not fit in ${maxPages} page(s) at a readable size`);
}

try {
  await render('#resume', 'Harshit-Agarwal-Resume-1-Page.pdf', 1);
  await render('#resume-full', 'Harshit-Agarwal-Resume-Full.pdf', 2);
} finally {
  await browser.close();
  server.close();
}
