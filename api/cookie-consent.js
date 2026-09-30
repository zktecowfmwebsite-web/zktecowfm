// Server-only: never expose SUPABASE_SECRET_KEY in browser code.
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { SUPABASE_URL, SUPABASE_SECRET_KEY, CONSENT_ALLOWED_ORIGINS } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY || !CONSENT_ALLOWED_ORIGINS) {
    return res.status(503).json({ error: 'Consent storage is not configured' });
  }
  const origins = CONSENT_ALLOWED_ORIGINS.split(',').map(value => value.trim());
  if (!origins.includes(req.headers.origin)) return res.status(403).json({ error: 'Origin not allowed' });
  if (!(req.headers['content-type'] || '').startsWith('application/json')) {
    return res.status(415).json({ error: 'JSON required' });
  }
  let body;
  try {
    const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    if (!raw || Buffer.byteLength(raw) > 2048) return res.status(413).json({ error: 'Invalid payload size' });
    body = JSON.parse(raw);
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!body || !uuid.test(body.eventId || '') || !uuid.test(body.visitorId || '') ||
      body.necessary !== true || typeof body.analytics !== 'boolean' || typeof body.marketing !== 'boolean' ||
      typeof body.timestamp !== 'string' || !Number.isFinite(Date.parse(body.timestamp))) {
    return res.status(400).json({ error: 'Invalid consent choice' });
  }
  try {
    const response = await fetch(new URL('/rest/v1/cookie_consent_events?on_conflict=id', SUPABASE_URL), {
      method: 'POST',
      headers: {
        apikey: SUPABASE_SECRET_KEY,
        'Content-Type': 'application/json',
        Prefer: 'resolution=ignore-duplicates,return=minimal',
      },
      body: JSON.stringify({
        id: body.eventId, visitor_id: body.visitorId, necessary: true,
        analytics: body.analytics, marketing: body.marketing,
        consent_time: new Date(body.timestamp).toISOString(), policy_version: 'v1',
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return res.status(502).json({ error: 'Consent storage unavailable' });
    return res.status(201).json({ ok: true });
  } catch {
    return res.status(502).json({ error: 'Consent storage unavailable' });
  }
}
