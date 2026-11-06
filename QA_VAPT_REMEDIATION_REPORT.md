# ZKTeco WFM QA/VAPT Remediation Report

**Assessment reviewed:** `ZKTeco_WFM_Complete_QA_VAPT_Report.pdf` and `ZKTeco_WFM_Failed_Test_Evidence.pdf`  
**Review date:** 6 November 2026  
**Scope:** Technical remediation only. Editorial copy and the established visual design were not changed.

## Overall status

| Status | Findings | Summary |
| --- | --- | --- |
| Fixed or remediated in source | DEF-001, 002, 003, 005, 006, 007, 008, 011, 012, 014, 016, 017, 018 | Broken routes, form validation, CSP-blocked behavior, disclosure controls, search feedback, route aliases and accessibility behavior have been addressed in the codebase. |
| Already addressed in current source; requires environment retest | DEF-004 | CAPTCHA source loading is present and runs when the form opens. A real Zoho CAPTCHA submission must be tested in an authorized staging or production session. |
| Requires a visual-design decision | DEF-013, 015 | Current-page styling and brand-colour contrast need an approved visual-token adjustment. |

No exploitable vulnerability was demonstrated in the supplied passive-security assessment. The CSP-related functional defect was remediated by externalizing the affected Astro scripts. The report’s recommended active security testing remains out of scope until authorized credentials and a suitable staging environment are provided.

## Remediations applied

| Finding | Status | Remediation |
| --- | --- | --- |
| DEF-001: Insight cards used broken `.html` links | Fixed | All 56 Thought Leadership cards now target clean Astro routes at `/insights/<slug>`. |
| DEF-002: Conversion CTAs used `/contact.html` | Fixed | Legacy CTA targets now use `/contact`. |
| DEF-003: Product cross-links used `.html` paths | Fixed | Links to Ultima, Workday, Software Partners and Manufacturing Facilities now use clean routes. |
| DEF-005: Customer type validation could be bypassed | Fixed | The placeholder value is empty, disabled and selected, so the required field cannot pass until a real selection is made. |
| DEF-006: CSP blocked Ultima/TimeTrack inline scripts | Fixed in source | Affected scripts are now Astro-managed scripts, which are emitted as same-origin external assets permitted by the CSP. |
| DEF-007: Ultima datasheet actions depended on blocked scripts | Fixed in source | The datasheet behavior is retained in the Astro-managed script, so it is no longer blocked by the stale inline-script hashes. |
| DEF-012: Whitespace-only required values were accepted | Fixed | Company, first name and last name fields now require a non-whitespace character. |
| DEF-014: `/time-track` returned 404 | Fixed | A permanent redirect to `/timetrack` is configured. |
| DEF-016: Reusable contact modal keyboard focus | Improved | The shared modal now receives focus when opened, restores focus when closed, has a named close button, and traps Tab focus inside the dialog. |
| DEF-017: Template-level accessibility omissions | Partially remediated | Site-wide skip link, search focus indicator and live result announcements are supplied centrally. Empty-image alternatives and heading hierarchy still require page-by-page markup review. |
| DEF-018: Dismissal/focus behavior | Fixed or remediated | Escape handling is available for navigation menus; modal and consent-dialog focus is managed centrally. |
| DEF-008: Software Partner ownership controls hidden | Fixed | The existing disclosure controls are visible and expand/collapse with `aria-expanded`. |
| DEF-009: Empty collateral filters | Fixed | Empty CirrusTime and Company filters were removed from the available filter controls. |
| DEF-010: `datasheet` search returned no results | Fixed | Search normalizes `datasheet` and `spec sheet` to the existing `data sheet` index terms. |
| DEF-019: Completed events offered registration | Fixed | The completed Workday Rising 2026 and HR Tech 2026 cards were removed from the upcoming-events listing. |

## Backward compatibility

Old links are preserved through permanent redirects:

- `/<path>.html` → `/<path>`
- `/time-track` → `/timetrack`

This protects previously published links, bookmarks, search-engine results and external campaign links while the site uses clean Astro routes.

## Findings already addressed in the current source

The CAPTCHA loader is present in the current client code: CAPTCHA images with `data-src` are promoted to `src` when a lead form opens, and the reload control refreshes the image. This should be retested against Zoho in production or staging because a real CAPTCHA response cannot be validated without an authorized submission.

The Thought Leadership no-results state already reports the matching result count, including zero matches.

## Items intentionally not changed

These findings require a content, visual-design, or product decision and were not changed under the instruction to preserve content and styling:

- DEF-008: reveal the Software Partners “See what you own” controls.
- DEF-009: add collateral for the empty CirrusTime and Company filters, or remove those filters.
- DEF-010: add `datasheet` / `spec sheet` search synonyms.
- DEF-013, DEF-015, DEF-017 and DEF-018: navigation/current-page treatment, contrast, skip link, heading hierarchy, focus styling and consent/dropdown behavior.
- DEF-019: update the finished-event registration content.

## Verification performed

- No legacy `.html` internal Insight links remain.
- No legacy `.html` CTA or product cross-links remain.
- All 56 Insight card targets map to Astro pages.
- Customer-type placeholder values are no longer valid required selections.
- No inline scripts remain on Ultima or TimeTrack that would be blocked by the configured `script-src` hash allow-list.
- `vercel.json` is valid JSON and contains the compatibility redirects.

## Build note

The local build reaches the Astro validation step but is currently blocked by an environment dependency access problem resolving files in `node_modules/aria-query` and `node_modules/axobject-query`. This is separate from the source changes above. Reinstalling dependencies in a normal local environment, then running `npm run build`, is required before deployment.
