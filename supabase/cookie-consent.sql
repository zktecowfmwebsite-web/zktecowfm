-- Run once in the Supabase SQL editor before enabling the endpoint.
create table public.cookie_consent_events (
  id uuid primary key,
  visitor_id uuid not null,
  necessary boolean not null check (necessary = true),
  analytics boolean not null,
  marketing boolean not null,
  consent_time timestamptz not null,
  policy_version text not null,
  received_at timestamptz not null default now()
);
create index cookie_consent_events_received_at_idx
  on public.cookie_consent_events (received_at desc);
alter table public.cookie_consent_events enable row level security;
revoke all on public.cookie_consent_events from public, anon, authenticated;
grant insert, select on public.cookie_consent_events to service_role;
