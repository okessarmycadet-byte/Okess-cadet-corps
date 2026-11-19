-- OKESS Army Cadet Corps
-- Initial database structure

create extension if not exists pgcrypto;

-- =====================================================
-- ADMIN PROFILES AND ACCESS
-- =====================================================

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'viewer'
    check (role in ('super_admin','administrator','editor','media_officer','historian','viewer')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.has_admin_access()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where id = auth.uid()
      and active = true
  );
$$;

-- =====================================================
-- GENERATIONS AND CADET RECORDS
-- =====================================================

create table if not exists public.generations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  start_year integer,
  end_year integer,
  description text,
  cover_image text,
  status text not null default 'draft'
    check (status in ('draft','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cadets (
  id uuid primary key default gen_random_uuid(),
  generation_id uuid references public.generations(id) on delete set null,
  full_name text not null,
  rank text,
  service_year text,
  biography text,
  photo_url text,
  visibility text not null default 'public'
    check (visibility in ('public','restricted','private')),
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified','submitted','verified')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =====================================================
-- LEADERSHIP
-- =====================================================

create table if not exists public.leadership (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  position text not null,
  generation_id uuid references public.generations(id) on delete set null,
  start_date date,
  end_date date,
  biography text,
  photo_url text,
  status text not null default 'draft'
    check (status in ('draft','published','archived')),
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified','submitted','verified')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =====================================================
-- HISTORY, MEMORIES AND ARTICLES
-- =====================================================

create table if not exists public.memories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  content text not null,
  excerpt text,
  author_name text,
  generation_id uuid references public.generations(id) on delete set null,
  memory_date date,
  category text,
  tags text[] default '{}',
  cover_image text,
  featured boolean not null default false,
  verification_status text not null default 'submitted'
    check (verification_status in ('submitted','awaiting_verification','verified')),
  status text not null default 'draft'
    check (status in ('draft','published','archived')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.history_records (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  event_date date,
  era text,
  source_notes text,
  source_reference text,
  verification_status text not null default 'awaiting_verification'
    check (verification_status in ('awaiting_verification','verified','disputed')),
  status text not null default 'draft'
    check (status in ('draft','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =====================================================
-- EVENTS AND ACTIVITIES
-- =====================================================

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_type text,
  location text,
  start_date timestamptz,
  end_date timestamptz,
  cover_image text,
  status text not null default 'draft'
    check (status in ('draft','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =====================================================
-- HALL OF HONOUR
-- =====================================================

create table if not exists public.honours (
  id uuid primary key default gen_random_uuid(),
  recipient_name text not null,
  title text not null,
  description text,
  award_date date,
  generation_id uuid references public.generations(id) on delete set null,
  image_url text,
  verification_status text not null default 'awaiting_verification'
    check (verification_status in ('awaiting_verification','verified')),
  status text not null default 'draft'
    check (status in ('draft','published','archived')),
  created_at timestamptz not null default now()
);

-- =====================================================
-- MEDIA AND ALBUMS
-- =====================================================

create table if not exists public.albums (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_id uuid references public.events(id) on delete set null,
  generation_id uuid references public.generations(id) on delete set null,
  cover_image text,
  status text not null default 'draft'
    check (status in ('draft','published','archived')),
  created_at timestamptz not null default now()
);

create table if not exists public.media_items (
  id uuid primary key default gen_random_uuid(),
  album_id uuid references public.albums(id) on delete set null,
  title text,
  description text,
  media_type text not null
    check (media_type in ('image','video','audio','document')),
  storage_path text not null,
  thumbnail_path text,
  captured_at date,
  verification_status text not null default 'submitted'
    check (verification_status in ('submitted','verified')),
  status text not null default 'draft'
    check (status in ('draft','published','archived')),
  created_at timestamptz not null default now()
);

-- =====================================================
-- DONATIONS AND PAYMENT RECORDS
-- =====================================================

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  donor_name text,
  donor_email text,
  anonymous boolean not null default false,
  amount numeric(12,2) not null check (amount > 0),
  currency text not null default 'GHS',
  provider text not null default 'paystack',
  provider_reference text unique not null,
  provider_transaction_id text,
  payment_channel text,
  payment_status text not null default 'pending'
    check (payment_status in ('pending','success','failed','abandoned','refunded')),
  paid_at timestamptz,
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =====================================================
-- ADMIN NOTIFICATIONS
-- =====================================================

create table if not exists public.admin_notifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text not null,
  notification_type text not null default 'system',
  related_record_id uuid,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

-- =====================================================
-- CONTACT MESSAGES
-- =====================================================

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  sender_name text not null,
  sender_email text not null,
  subject text,
  message text not null,
  status text not null default 'unread'
    check (status in ('unread','read','replied','archived')),
  created_at timestamptz not null default now()
);

-- =====================================================
-- ANALYTICS
-- =====================================================

create table if not exists public.site_analytics (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  page_path text,
  event_metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- =====================================================
-- AUDIT LOGS
-- =====================================================

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references auth.users(id) on delete set null,
  action text not null,
  resource_type text,
  resource_id uuid,
  details jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- =====================================================
-- SITE SETTINGS
-- =====================================================

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  setting_key text unique not null,
  setting_value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

-- =====================================================
-- INDEXES
-- =====================================================

create index if not exists idx_memories_status_date
  on public.memories(status, memory_date desc);

create index if not exists idx_generations_status
  on public.generations(status);

create index if not exists idx_events_start_date
  on public.events(start_date);

create index if not exists idx_donations_status_created
  on public.donations(payment_status, created_at desc);

create index if not exists idx_media_album
  on public.media_items(album_id);

create index if not exists idx_analytics_created
  on public.site_analytics(created_at desc);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

alter table public.admin_profiles enable row level security;
alter table public.generations enable row level security;
alter table public.cadets enable row level security;
alter table public.leadership enable row level security;
alter table public.memories enable row level security;
alter table public.history_records enable row level security;
alter table public.events enable row level security;
alter table public.honours enable row level security;
alter table public.albums enable row level security;
alter table public.media_items enable row level security;
alter table public.donations enable row level security;
alter table public.admin_notifications enable row level security;
alter table public.contact_messages enable row level security;
alter table public.site_analytics enable row level security;
alter table public.audit_logs enable row level security;
alter table public.site_settings enable row level security;

-- Admin-only access policies
do $$
declare
  t text;
begin
  foreach t in array array[
    'admin_profiles','generations','cadets','leadership','memories',
    'history_records','events','honours','albums','media_items',
    'donations','admin_notifications','contact_messages','site_analytics',
    'audit_logs','site_settings'
  ]
  loop
    execute format(
      'create policy "admin full access %1$s" on public.%1$I for all to authenticated using (public.has_admin_access()) with check (public.has_admin_access())',
      t
    );
  end loop;
end $$;

-- Public read access to published content only
create policy "public read published generations"
on public.generations for select to anon, authenticated
using (status = 'published');

create policy "public read published leadership"
on public.leadership for select to anon, authenticated
using (status = 'published' and verification_status = 'verified');

create policy "public read published memories"
on public.memories for select to anon, authenticated
using (status = 'published' and verification_status = 'verified');

create policy "public read published history"
on public.history_records for select to anon, authenticated
using (status = 'published' and verification_status = 'verified');

create policy "public read published events"
on public.events for select to anon, authenticated
using (status = 'published');

create policy "public read published honours"
on public.honours for select to anon, authenticated
using (status = 'published' and verification_status = 'verified');

create policy "public read published albums"
on public.albums for select to anon, authenticated
using (status = 'published');

create policy "public read published media"
on public.media_items for select to anon, authenticated
using (status = 'published');

-- Contact form public submission
create policy "public submit contact messages"
on public.contact_messages for insert to anon, authenticated
with check (true);

-- Public analytics event submission
create policy "public submit analytics events"
on public.site_analytics for insert to anon, authenticated
with check (true);

-- Public access to safe site settings
create policy "public read public settings"
on public.site_settings for select to anon, authenticated
using (setting_key in ('public_branding','public_contact','public_donation_info'));

-- Donations intentionally have no public SELECT, UPDATE, or INSERT policy.
-- Secure payment creation and verification must be handled server-side.
