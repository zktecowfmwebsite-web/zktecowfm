# Cookie consent storage on Vercel + Supabase

This integration records future explicit cookie-banner choices, including rejection
and changed preferences. It does not upload existing browser cookies, session tokens,
names, email addresses, IP addresses, page URLs, or past local-only choices.
The browser's random visitor ID is pseudonymous, not a verified user identity.

1. Create/open your Supabase project and run `supabase/cookie-consent.sql` in its SQL editor.
2. In Vercel project environment variables, set:
   - `SUPABASE_URL`: your Supabase project URL.
   - `SUPABASE_SECRET_KEY`: a server secret key (`sb_secret_...`) from Supabase API settings.
   - `CONSENT_ALLOWED_ORIGINS`: comma-separated exact website origins, for example
     `https://zktecowfm.com,https://www.zktecowfm.com`. Add a preview origin only if needed.
3. Redeploy on Vercel. No Astro server adapter is required: `/api/cookie-consent.js`
   is a Vercel Node function alongside the static Astro site.
4. Change preferences via the cookie banner. Check the browser Network panel for
   `POST /api/cookie-consent` returning 201, then view `cookie_consent_events` in
   the Supabase dashboard. Verify Accept All, Reject Non-Essential, and custom choices.

Never use a `PUBLIC_` prefix for the secret or put it in a browser script. View records
through the authenticated Supabase dashboard; no public record-reading endpoint exists.
Enable Vercel firewall rate limiting for this public submission endpoint before launch.
Origin checking prevents ordinary cross-site browser submissions but does not authenticate
visitors or prevent scripted submissions. Choose a retention period for these records
and reflect the storage in your privacy/cookie notice before production use.

`npm run dev` runs Astro only and does not execute root-level Vercel functions.
Use Vercel Preview, or `vercel dev` with local server environment variables, for an
end-to-end test. Local preferences continue to work if the endpoint is unavailable.
Failed remote saves emit `zkconsentstorageerror` and a console warning; they are not
silently reported as saved to the database. There is no automatic retry queue.

References:
- https://vercel.com/docs/functions/runtimes/node-js
- https://supabase.com/docs/guides/getting-started/api-keys
