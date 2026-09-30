# Harshit Agarwal — Executive Portfolio

> Senior Product Manager @ Tekion Corp • Founder & 0-to-1 Systems Builder

Live Production Deployment: **[https://1997agarwal.github.io](https://1997agarwal.github.io)**  


---

## ⚡ Tech Stack & Architecture
- **Framework:** React 18, Vite 6
- **Styling:** Tailwind CSS 3
- **Deployment:** GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)
- **Hosting Cost:** $0.00 / month (100% Free Forever)

---

## 🚀 Local Development
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build
```

---

## ✏️ Editing Content
Almost all site content lives in one file: `src/data/portfolioData.js` (experience, ventures, open-source tools, awards, case studies).
The resume modal (`src/components/ResumeModal.jsx`) reads from the same file, so updating the data updates both.
Skills chips and the resume headline are the only resume text kept inside the component.

## 📬 Contact Form (optional inbox delivery)
By default the form opens the visitor's email app. To receive messages directly:
1. Create a free form endpoint (e.g. [Formspree](https://formspree.io)) and copy its URL.
2. In GitHub: **Settings → Secrets and variables → Actions → Variables → New repository variable**
   named `CONTACT_FORM_ENDPOINT` with that URL.
3. Re-run the deploy workflow. No code change needed.

## 📄 Resume: Quick View + PDFs
The resume modal has two tabs: **Quick View** (a 7-second, one-screen summary for recruiters) and **Full Resume** (ATS-friendly).
- Shareable links: `https://1997agarwal.github.io/#resume` and `/#resume-full`.
- On every deploy, `npm run build:pdf` (see `scripts/build-resume-pdf.mjs`) renders both views to
  `Harshit-Agarwal-Resume-1-Page.pdf` and `Harshit-Agarwal-Resume-Full.pdf`, so the PDFs always match `src/data/portfolioData.js`.
- To build them locally: `npm run build && CHROME_PATH=/path/to/chrome npm run build:pdf`.
- Quick View content lives in `QUICK_VIEW` and each role's `quickLine` in `portfolioData.js`.
