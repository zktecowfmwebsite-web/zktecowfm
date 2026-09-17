# ZKTeco WFM Full Website v59 — Normalized Pre-Launch Build

## Start here
Run the Astro development server from the project folder. The site pages live in `src/pages/`.

## Astro migration

The project now includes an Astro + TypeScript application alongside the legacy static pages.

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
```

- Shared site chrome lives in `src/components/Header.astro` and `src/components/Footer.astro`.
- Shared metadata, styles and layout live in `src/layouts/SiteLayout.astro`.
- Insight articles are managed as Markdown entries under `src/content/insights/` and rendered from `src/pages/insights/[slug].astro`.
- Every previous static page is now an Astro page under `src/pages/`, including the Insight articles under `src/pages/insights/`.
- Existing CSS is retained as the visual source of truth during migration.
- Tailwind CSS is available through `src/styles/tailwind.css`. It uses the `tw-` prefix (for example, `tw-flex`) and has Preflight disabled, so it cannot override the existing site styles during the gradual component migration.
- The build runs `scripts/sync-public.mjs` first, keeping the home page and static assets synchronized with their existing sources.

## Included
- Corporate homepage
- Workday solution
- Software Partner solution
- Ultima Series
- TimeTrack
- CirrusConnect
- Why ZKTeco WFM
- Support
- Resource Hub
- Thought Leadership hub + 55 linked insight articles
- Industry / workforce use cases
- Customer Stories / Case Studies placeholder
- Security & Trust page with inactive Drata Trust Center placeholder (`trust.zktecowfm.com`)
- Contact / Talk to an Expert page
- Privacy & GDPR notice
- Cookie Policy + consent / preference center
- Website Terms
- Accessibility Statement
- Educational / Legal / HR / Payroll / Compliance disclaimer
- Existing product assets

## Folder structure
```
ZKTeco-WFM-Full-Site-v59/
  index.html
  ...all main pages...
  assets/
    product images
    site-enhancements.css
    privacy.css
    privacy.js
  insights/
    55 article pages
```

## Testing on your computer
### Easiest
1. Extract the ZIP completely.
2. Leave the `assets` and `insights` folders exactly where they are.
3. Double-click `index.html`.
4. Navigate the site using the menus and links.

All local page, asset and article links are relative, so the site is designed to work from the extracted folder.

### Recommended for production-like testing
A local web server provides behavior closest to a real website, especially for storage of cookie preferences. A web developer can serve this folder directly. If Python is installed, the developer can run `python -m http.server 8080` inside the folder and open `http://localhost:8080/`.

## Trust Center
The new Security & Trust page includes `trust.zktecowfm.com` as a visible but intentionally **inactive** destination. Activate the link only when the Drata Trust Center is production-ready.

## Privacy / Legal review
The legal, privacy, GDPR, cookie, terms and accessibility pages are conservative website drafts and should be reviewed by ZKTeco WFM legal/privacy counsel before public launch. The production web team must also update the Cookie Policy with the actual cookies, analytics, CRM, advertising, chat, embedded media and other tracking technologies enabled in production.

## Cookie consent implementation
- Necessary category: always enabled
- Analytics: off by default until visitor choice
- Marketing: off by default until visitor choice
- Accept All / Reject Non-Essential / Manage Preferences
- Footer Cookie Preferences control on every page
- Consent state stored locally in the browser

The production team should connect analytics or marketing scripts so they load only when the relevant consent category is permitted.


## SCAN-FIRST WEBSITE COPY STANDARD (v91)
- Eyebrow: 2–5 words where practical.
- Main section headline: ideally 4–9 words; avoid exceeding 12 unless clarity requires it.
- Supporting line: ideally 10–18 words.
- Intro copy: generally 20–35 words maximum and only when it adds information not already visible in the headline/visual.
- Prefer diagrams, proof strips, process flows, comparisons and short proof points over explanatory paragraphs.
- Thought Leadership articles remain educational and may be long-form; this standard applies mainly to heroes, section intros, cards and CTA framing.


## v92 insight standardization
- Added final-loaded insight-standard-v92.css to all 55 insight pages.
- Deepened remaining thin Software Partner, Cloud & Operations, Integration, Manufacturing/Lifecycle, Security/Privacy articles.
- Preserved already-deep Supply Chain, Security Architecture, AI and Future Time Clock articles while applying visual standardization.
- Standardized Perspective and Key Takeaway presentation and protected dark-module title contrast.


## v95
- Replaced text-only global header brand with approved ZKTeco WFM / EVERY PUNCH MATTERS logo artwork on all pages using the shared global header.
- Preserved navigation structure and page content.

## v96
- Reduced the global header logo dimensions by 20% from v95 at desktop, tablet and mobile breakpoints.
- Header height and navigation structure are unchanged.


## v97
Tightened hero spacing on Home, Workday, Software Partners, and Why ZKTeco WFM. Header/logo/navigation unchanged.

## v99 Global Layout Standard
- Global desktop header height: 76px on every page.
- Logo and navigation share one vertical alignment standard.
- Global desktop top-of-hero content gap: 64px.
- Shared responsive rules replace page-specific header/hero top-spacing behavior.
- Implemented in `assets/layout-standard-v99.css`, loaded last on every HTML page.

## v101 global layout normalization
- Vertically centers the header logo within the shared header.
- Uses one 1220px primary content width and one viewport gutter system for main page shells.
- Applies first-hero spacing exactly once at section level.
- Removes legacy inner hero padding/min-height that caused oversized Home/Why ZKTeco gaps.

## v102 final-for-now header update
- Approved latest blue/green ZKTeco WFM logo with smaller WFM and Every Punch Matters lockup.
- Header logo vertically centered globally.
- Based on v101 layout/content; no other page content changes.


v104: Homepage architecture diagram visual refresh; layout preserved, bidirectional flow shown, Other Collection Products removed, destinations modernized.


## v106 updates
- Homepage data journey refreshed with stronger contrast, Operate & Support rail, and time-and-labor-data language.
- Global header is now sticky and uses a taller 80px desktop geometry so the cropped logo stays optically centered and cannot drift into the top edge while scrolling.


## v107 homepage journey update
- Removed Operate & Support rail.
- Removed 01-05 numbering from the punch journey.
- Added icon-led color progression and stronger visual contrast.
- Tightened time-and-labor language and retained five-stage structure.


## v108
Homepage Ultima overview simplified to four concise decision points; detailed specifications remain on the Ultima Series page.


## v115 update
- Added final Workday insight: “Don’t Just Record the Punch. Control It.”
- Added article to Thought Leadership index.
- Based on complete v115 static site.
