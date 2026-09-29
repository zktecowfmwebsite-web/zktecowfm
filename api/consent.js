import { neon } from '@neondatabase/serverless';

const tableSql = `
  CREATE TABLE IF NOT EXISTS consent_events (
    id BIGSERIAL PRIMARY KEY,
    visitor_id VARCHAR(100) NOT NULL,
    necessary BOOLEAN NOT NULL DEFAULT TRUE,
    analytics BOOLEAN NOT NULL DEFAULT FALSE,
    marketing BOOLEAN NOT NULL DEFAULT FALSE,
    consent_time TIMESTAMPTZ NOT NULL,
    policy_version VARCHAR(40) NOT NULL,
    source VARCHAR(500),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  CREATE INDEX IF NOT EXISTS consent_events_created_at_idx ON consent_events (created_at DESC);
  CREATE INDEX IF NOT EXISTS consent_events_visitor_id_idx ON consent_events (visitor_id);
`;

function database() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is not configured.');
  return neon(connectionString);
}

function bool(value) {
  return value === true;
}

function send(res, status, body) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(status).json(body);
}

export default async function handler(req, res) {
  try {
    const sql = database();
    await sql.query(tableSql);

    if (req.method === 'POST') {
      const { visitorId, necessary, analytics, marketing, consentTime, policyVersion, source } = req.body || {};
      if (typeof visitorId !== 'string' || visitorId.length < 12 || visitorId.length > 100) {
        return send(res, 400, { error: 'A valid anonymous visitor ID is required.' });
      }
      const date = new Date(consentTime);
      if (Number.isNaN(date.getTime())) return send(res, 400, { error: 'A valid consent time is required.' });

      await sql`
        INSERT INTO consent_events (visitor_id, necessary, analytics, marketing, consent_time, policy_version, source)
        VALUES (${visitorId}, ${bool(necessary)}, ${bool(analytics)}, ${bool(marketing)}, ${date.toISOString()}, ${String(policyVersion || 'unknown').slice(0, 40)}, ${String(source || '').slice(0, 500)})
      `;
      return send(res, 201, { ok: true });
    }

    if (req.method === 'GET') {
      const suppliedToken = req.headers.authorization?.replace(/^Bearer\s+/i, '');
      if (!process.env.CONSENT_ADMIN_TOKEN || suppliedToken !== process.env.CONSENT_ADMIN_TOKEN) {
        return send(res, 401, { error: 'Unauthorized.' });
      }
      const requested = Number.parseInt(req.query.limit, 10);
      const limit = Number.isFinite(requested) ? Math.min(Math.max(requested, 1), 500) : 100;
      const events = await sql`
        SELECT id, visitor_id, necessary, analytics, marketing, consent_time, policy_version, source, created_at
        FROM consent_events
        ORDER BY created_at DESC
        LIMIT ${limit}
      `;
      return send(res, 200, { events });
    }

    res.setHeader('Allow', 'GET, POST');
    return send(res, 405, { error: 'Method not allowed.' });
  } catch (error) {
    console.error('Consent endpoint error', error);
    return send(res, 500, { error: 'Unable to process consent data.' });
  }
}
