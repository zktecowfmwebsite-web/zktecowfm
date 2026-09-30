import handler from '../api/cookie-consent.js';
import assert from 'node:assert/strict';

process.env.SUPABASE_URL = 'https://example.supabase.co';
process.env.SUPABASE_SECRET_KEY = 'test-only';
process.env.CONSENT_ALLOWED_ORIGINS = 'https://example.com';
const payload = {
  eventId: '12345678-1234-4234-8234-123456789abc',
  visitorId: '12345678-1234-4234-8234-123456789abd',
  necessary: true, analytics: false, marketing: false,
  timestamp: '2026-09-30T00:00:00Z',
};
const request = { method: 'POST', headers: { origin: 'https://example.com', 'content-type': 'application/json' }, body: payload };
async function call(req) {
  let status;
  await handler(req, { setHeader() {}, status(value) { status = value; return this; }, json() {} });
  return status;
}
let writes = 0;
globalThis.fetch = async (url, options) => {
  writes++;
  assert.equal(url.hostname, 'example.supabase.co');
  const row = JSON.parse(options.body);
  assert.equal(row.analytics, false);
  assert.equal(row.marketing, false);
  assert.equal(row.visitor_id, payload.visitorId);
  assert.equal(options.headers.apikey, 'test-only');
  return { ok: true };
};
assert.equal(await call({ ...request, method: 'GET' }), 405);
assert.equal(await call({ ...request, headers: { ...request.headers, origin: 'https://bad.example' } }), 403);
assert.equal(await call({ ...request, body: { ...payload, analytics: 'true' } }), 400);
assert.equal(await call(request), 201);
assert.equal(writes, 1);
globalThis.fetch = async () => ({ ok: false });
assert.equal(await call(request), 502);
delete process.env.SUPABASE_SECRET_KEY;
assert.equal(await call(request), 503);
console.log('PASS: method, origin, validation, rejection-choice insert, upstream failure, missing configuration.');
