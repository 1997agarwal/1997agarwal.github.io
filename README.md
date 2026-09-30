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

## 🖨️ Resume PDF
Open the resume from the site and use **Download PDF / Print** → *Save as PDF*. Only the resume is printed.

