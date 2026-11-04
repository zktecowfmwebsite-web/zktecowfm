# ZKTecoWFM Production Launch Log

**Release:** v125  
**Prepared:** October 1, 2026  
**Deployment target:** Vercel / static Astro output  
**Launch inventory:** 80 deployable routes (24 core pages and 56 insight articles)

## Launch summary

This release delivers the complete ZKTecoWFM marketing site, product and solution pages, resource library, legal pages, lead capture, cookie controls and thought-leadership content. The build is static Astro output with Vercel deployment configuration, clean URLs and permanent redirects for `/index.html` and `/resources`.

## Production page list

### Core pages (24)

| Route | Purpose |
| --- | --- |
| `/` | Homepage and workforce-data ecosystem overview |
| `/accessibility` | Accessibility statement |
| `/biometric-privacy-policy` | Biometric privacy policy |
| `/cirrusconnect` | CirrusConnect product page |
| `/contact` | Contact and sales inquiry page |
| `/cookie-policy` | Cookie policy and preference information |
| `/customer-stories` | Customer stories / case-study page |
| `/educational-disclaimer` | Educational, legal, HR, payroll and compliance disclaimer |
| `/events` | Events listing |
| `/legal-privacy` | Legal and privacy resource hub |
| `/manufacturing-facilities` | Manufacturing facilities page |
| `/privacy` | Privacy and GDPR notice |
| `/product-collaterals` | Product downloads and collateral |
| `/resource-hub` | Resource hub |
| `/security-trust` | Security and trust page |
| `/software-partners` | Software partner solution |
| `/support` | Customer and partner support |
| `/terms` | Website terms |
| `/thought-leadership` | Thought Leadership hub |
| `/timetrack` | TimeTrack product page |
| `/ultima-series` | Ultima Series product family |
| `/use-cases` | Industry and workforce use cases |
| `/why-zkteco-wfm` | ZKTecoWFM company/value proposition |
| `/workday` | Workday solution and CirrusDCS integration |

### Insight articles (56)

| Theme | Routes |
| --- | --- |
| AI, platform and integration | `/insights/ai-workforce-edge`, `/insights/android-lifecycle-enterprise`, `/insights/apis-not-device-strategy`, `/insights/api-vs-sftp-integration`, `/insights/cloud-middleware-role`, `/insights/data-mapping-time-labor`, `/insights/sdk-app-middleware-choice` |
| Data quality and workforce controls | `/insights/attendance-vs-labor-data`, `/insights/auditability-workforce-data`, `/insights/data-quality-starts-at-source`, `/insights/department-transfer-split-punch`, `/insights/duplicate-punch-prevention`, `/insights/employee-attestation-strategy`, `/insights/employee-self-service-clock`, `/insights/intelligent-enforcement-point`, `/insights/labor-codes-worktags-edge`, `/insights/manager-override-controls`, `/insights/meal-rest-break-controls`, `/insights/rounding-rules-timekeeping`, `/insights/schedule-lockout-design`, `/insights/shift-types-workforce-design` |
| Identity, privacy and security | `/insights/authentication-strategy-time-clocks`, `/insights/biometric-consent-workforce`, `/insights/biometric-template-vs-image`, `/insights/certificate-lockout-safety`, `/insights/security-workforce-edge` |
| Devices and operations | `/insights/connectivity-power-time-clocks`, `/insights/device-management-at-scale`, `/insights/enterprise-grade-time-clock`, `/insights/future-time-clock`, `/insights/manufacturing-matters`, `/insights/offline-resilience`, `/insights/ota-update-governance`, `/insights/product-lifecycle-time-clocks`, `/insights/purpose-built-vs-tablet`, `/insights/remote-diagnostics-time-clocks`, `/insights/rugged-time-clocks`, `/insights/screen-size-workforce-ux`, `/insights/time-clock-buyers-guide` |
| Partner strategy | `/insights/hardware-partner-roadmap`, `/insights/partner-android-platform`, `/insights/partner-device-management`, `/insights/partner-reseller-device-ops`, `/insights/software-partner-build-vs-buy`, `/insights/software-partner-expectations`, `/insights/supply-chain-product-feature` |
| Workday | `/insights/workday-beyond-certification`, `/insights/workday-data-flow`, `/insights/workday-go-live-testing`, `/insights/workday-labor-worktags`, `/insights/workday-legacy-clock-replacement`, `/insights/workday-mixed-workforce`, `/insights/workday-third-party-scheduling`, `/insights/workday-time-clock-implementation`, `/insights/workday-time-clock-lockouts`, `/insights/workday-time-clock-strategy` |

The custom `/404` page is included as an error fallback and is not counted as a deployable content route.

## Production feature list

| Feature area | Release capability |
| --- | --- |
| Shared site experience | Sticky shared header, responsive navigation, Products and Resource Hub menus, shared footer, standardised branding and responsive layouts. |
| Homepage | Ecosystem positioning, four-model Ultima showcase, Workday and software-partner paths, five-stage workforce-data journey, resource cards and conversion CTA. |
| Product portfolio | Dedicated pages for Ultima Series, TimeTrack and CirrusConnect, including product assets and downloadable resources. |
| Solution marketing | Dedicated Workday, Software Partners, Use Cases, Why ZKTecoWFM, manufacturing, security/trust and support content. |
| Content and resources | Resource Hub, product collateral downloads, events, customer-story page and 56 educational insight articles. |
| Lead generation | Contact page and reusable Zoho CRM "Talk to an Expert" modal with validation, CAPTCHA, honeypot fields, focus management and Escape-to-close behavior. |
| Consent controls | Necessary/analytics/marketing cookie preferences, local browser persistence and site-wide Cookie Preferences entry point. |
| Consent-event API | Optional `/api/cookie-consent` server endpoint with origin, content-type, payload-size, UUID and consent-field validation; designed for Supabase event storage. |
| SEO and routing | Per-page descriptions/canonical URLs, sitemap, robots file, clean internal Astro routes and permanent legacy redirects. |
| Security headers | Vercel configuration supplies `nosniff`, referrer policy, restrictive permissions policy, `SAMEORIGIN` framing and a report-only Content Security Policy. |
| Build validation | Asset synchronization, scoped Tailwind generation, Tailwind-link verification, Astro checks and static production build. |

## Release history

| Version | Production change |
| --- | --- |
| v125 | QA baseline recorded no missing local page, CSS, JavaScript or image references. |
| v115 | Added the Workday article "Don't Just Record the Punch. Control It." and linked it from the Thought Leadership hub. |
| v108 | Simplified the homepage Ultima overview while retaining full specifications on the Ultima Series page. |
| v107 | Refreshed the punch journey with icon-led stages and clearer time-and-labor data messaging. |
| v106 | Refreshed homepage data-journey content and introduced the sticky global header geometry. |
| v104 | Updated the homepage architecture visual with bidirectional data flow. |
| v102-v99 | Standardised approved branding, header alignment, content width, gutters and hero spacing. |
| v92 | Standardised the visual presentation of the insight library. |

## Launch gates and owner actions

| Gate | Required production action |
| --- | --- |
| Consent-event storage | Run [`supabase/cookie-consent.sql`](supabase/cookie-consent.sql), then configure `SUPABASE_URL`, `SUPABASE_SECRET_KEY` and `CONSENT_ALLOWED_ORIGINS`. |
| Zoho lead capture | Verify the Zoho Web-to-Lead endpoint, CAPTCHA operation and production return URL. |
| Tracking | Add analytics/marketing tags only after their matching consent category is granted. |
| Legal review | Obtain approval for privacy, cookies, terms, biometric policy and disclaimer content; update the cookie inventory for production services. |
| Trust Center | Keep the Drata Trust Center link inactive until its destination is live and approved. |
| Final build | Run `npm.cmd run build` before deployment. |

## Build and deployment verification

```powershell
npm.cmd run build
```

The build synchronizes public assets, generates Tailwind CSS, validates stylesheet links, runs Astro checks and produces the static `dist` output used by Vercel.
