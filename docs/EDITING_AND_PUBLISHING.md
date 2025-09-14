# Editing & Publishing Guide (Non‑technical)

This guide shows how to make changes, preview them locally, and publish to GoDaddy cPanel.

## 1) One‑time setup
- Install Node.js 18 or newer: https://nodejs.org (LTS is fine)
- Get the project folder onto your computer (via GitHub Desktop, git clone, or shared folder)

## 2) Open the project
- Open the folder `life-coach-website` in your editor (or Finder/Explorer)

## 3) Make simple content changes
Easiest places to edit:
- `src/data/site-config.json`
  - Contact email, phone, address
  - Social links
- `src/data/services.json`
  - Services (titles, descriptions, features)
- `src/data/testimonials.json`
  - Testimonials
- `src/data/blog-posts.json`
  - Blog posts

Images go in `src/assets/images/` (then reference in content if needed).

## 4) Preview locally
- Open Terminal (Mac) and run:
  ```bash
  cd /path/to/life-coach-website
  npm ci    # first time; afterwards you can use: npm install
  npm run dev
  ```
- Visit http://localhost:5173 in your browser
- Leave the dev server running while you edit; changes usually refresh automatically
- Press Ctrl+C in Terminal to stop the dev server

## 5) Build & package for upload
Two options (use either):
- Quick command (recommended):
  ```bash
  npm run package:zip
  ```
  This builds the site and creates `dist/site.zip` for upload.

- Manual steps:
  ```bash
  npm run build
  cd dist && zip -r site.zip .
  ```

## 6) Upload to GoDaddy (cPanel)
- Log in to GoDaddy → cPanel Admin → File Manager
- Open `public_html`
- Upload `dist/site.zip`
- Select `site.zip` → Extract → Overwrite existing files
- Make sure you see these items directly in `public_html`:
  - `index.html`, `assets/`, `.htaccess`, `robots.txt`, `sitemap.xml`, `fonts/`, `contact.php`
- Optional: delete `site.zip` after extraction (keeps things tidy)

## 7) Verify live
- Visit https://andreagray.de and do a hard refresh
- Test the contact form

## Tips
- Always rebuild before uploading (content changes are compiled into the build)
- Legal pages are in the root after upload: `/impressum.html`, `/datenschutz.html`
- If the contact form fails, check `contact.php` exists in `public_html` and that email is correct in `src/data/site-config.json`

## Where to change common items
- Footer name/email/phone: `src/data/site-config.json`
- Social links: `src/data/site-config.json` and `src/components/common/Footer.tsx` (defaults)
- Address in structured data (SEO): `index.html` (JSON‑LD block)

That’s it! Edit → preview (`npm run dev`) → package & upload (`npm run package:zip`).
