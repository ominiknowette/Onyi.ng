create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  school text,
  department text,
  level integer check (level in (100, 200, 300, 400, 500)),
  avatar_url text,
  bio text,
  public_key text,
  rep_points integer not null default 0,
  is_pro boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  name text not null,
  school text,
  department text,
  level integer check (level in (100, 200, 300, 400, 500)),
  semester integer check (semester in (1, 2)),
  lecturer text,
  created_at timestamptz not null default now(),
  unique (code, school, department)
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  course_id uuid references courses(id) on delete set null,
  type text not null check (type in ('tip', 'review', 'material', 'question', 'experience')),
  title text,
  body text not null,
  upvotes integer not null default 0,
  reposts integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references posts(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  body text not null,
  parent_id uuid references comments(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists follows (
  follower_id uuid not null references users(id) on delete cascade,
  following_id uuid not null references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  check (follower_id <> following_id)
);

create table if not exists upvotes (
  user_id uuid not null references users(id) on delete cascade,
  post_id uuid not null references posts(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, post_id)
);

create table if not exists ratings (
  user_id uuid not null references users(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  difficulty integer not null check (difficulty between 1 and 5),
  usefulness integer not null check (usefulness between 1 and 5),
  lecturer_quality integer not null check (lecturer_quality between 1 and 5),
  created_at timestamptz not null default now(),
  primary key (user_id, course_id)
);

create table if not exists saves (
  user_id uuid not null references users(id) on delete cascade,
  post_id uuid not null references posts(id) on delete cascade,
  folder text default 'General',
  created_at timestamptz not null default now(),
  primary key (user_id, post_id)
);

create table if not exists materials (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references posts(id) on delete cascade,
  file_url text not null,
  file_type text,
  title text not null,
  download_count integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references users(id) on delete cascade,
  recipient_id uuid not null references users(id) on delete cascade,
  sender_public_key text not null,
  ciphertext text not null,
  nonce text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  type text not null,
  data jsonb not null default '{}'::jsonb,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  paystack_ref text unique,
  status text not null default 'inactive',
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_posts_user_id on posts(user_id);
create index if not exists idx_posts_course_id on posts(course_id);
create index if not exists idx_posts_created_at on posts(created_at desc);
create index if not exists idx_comments_post_id on comments(post_id);
create index if not exists idx_messages_sender_recipient on messages(sender_id, recipient_id, created_at desc);
create index if not exists idx_notifications_user_id on notifications(user_id, read, created_at desc);
