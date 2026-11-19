alter table public.albums
add column if not exists updated_at timestamptz not null default now();

alter table public.media_items
add column if not exists updated_at timestamptz not null default now();

alter table public.honours
add column if not exists updated_at timestamptz not null default now();
