# Consent-record storage setup

The site records anonymous consent selections through `POST /api/consent` and
displays them at `/consent-records`. It stores no name, email address, form
submission, or IP address in the consent table.

## Deploy configuration

1. In Vercel, open the project and install a Neon Postgres integration from
   **Marketplace → Storage**. Connect it to this project. Vercel will add
   `DATABASE_URL` to the project environment variables.
2. Add `CONSENT_ADMIN_TOKEN` in **Settings → Environment Variables** for
   Production and Preview. Use a long, unique random value; do not put it in
   source control.
3. Deploy the site. The first consent submission creates the `consent_events`
   table and its indexes automatically.

## Viewing records

Visit `/consent-records`, enter `CONSENT_ADMIN_TOKEN`, then select **Load
records**. The page lists the latest 500 selections and can download them as a
CSV file.

Do not link this URL publicly. For stronger access control, enable Vercel
Deployment Protection or place the route behind your organisation's existing
authentication service.
