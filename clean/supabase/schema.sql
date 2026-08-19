-- HERA by AIME — Schéma propre Supabase (remplace Base44)
-- À coller dans Supabase SQL Editor

-- 1. Mariages
create table weddings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id),
  title text not null,
  date date,
  location text,
  dj_notes text,
  validated boolean default false,
  validated_at timestamptz,
  stripe_session_id text,
  created_at timestamptz default now()
);

-- 2. Moments (timeline)
create table music_moments (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid references weddings(id) on delete cascade,
  name text not null,
  slug text,
  start_time text, -- "09:30"
  end_time text,   -- "11:30"
  ambiance text,
  description text,
  "order" int default 0,
  created_at timestamptz default now()
);

-- 3. Personnes
create table persons (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid references weddings(id) on delete cascade,
  display_name text,
  first_name text,
  last_name text,
  role text,
  created_at timestamptz default now()
);

-- 4. Catalogue morceaux
create table songs (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid references weddings(id) on delete cascade,
  title text not null,
  artist text,
  artwork_url text,
  preview_url text,
  external_url text,
  duration text, -- "3:42"
  genre text,
  year text,
  source text default 'autre',
  created_at timestamptz default now()
);

-- 5. Composition (le cœur)
create table playlist_items (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid references weddings(id) on delete cascade,
  song_id uuid references songs(id) on delete cascade,
  music_moment_id uuid references music_moments(id) on delete set null,
  person_id uuid references persons(id) on delete set null,
  "order" int default 0,
  priority text default 'normal' check (priority in ('normal','important','incontournable','interdit')),
  status text default 'proposé' check (status in ('proposé','validé','planifié')),
  reason text,
  memory text,
  atmosphere text[] default '{}',
  bpm int,
  transition text default 'crossfade',
  transition_seconds int default 6,
  audio_url text, -- fichier complet déposé
  audio_name text,
  created_at timestamptz default now()
);

-- 6. Propositions invités
create table guest_proposals (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid references weddings(id) on delete cascade,
  token text unique default encode(gen_random_bytes(16),'hex'),
  guest_name text,
  title text,
  artist text,
  reason text,
  memory text,
  moment_hint text,
  aime_code text,
  status text default 'nouveau',
  created_at timestamptz default now()
);

-- Storage pour les fichiers complets
-- Crée un bucket 'hera-audio' en public: false dans Supabase Storage
-- RLS à activer ensuite

-- Index
create index idx_items_wedding on playlist_items(wedding_id);
create index idx_songs_wedding on songs(wedding_id);
create index idx_moments_wedding on music_moments(wedding_id);

-- RLS exemple (à adapter)
alter table weddings enable row level security;
alter table music_moments enable row level security;
alter table playlist_items enable row level security;
alter table songs enable row level security;
-- Policy simple: owner peut tout faire
create policy "owner all" on weddings for all using (auth.uid() = owner_id);
create policy "moments owner" on music_moments for all using (
  exists (select 1 from weddings w where w.id = wedding_id and w.owner_id = auth.uid())
);
create policy "items owner" on playlist_items for all using (
  exists (select 1 from weddings w where w.id = wedding_id and w.owner_id = auth.uid())
);
