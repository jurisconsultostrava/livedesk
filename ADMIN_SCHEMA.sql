-- Production database sketch for Supabase/PostgreSQL

create table app_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text not null,
  role text not null check (role in ('client','dealer','admin')),
  kyc_status text not null default 'pending' check (kyc_status in ('pending','verified','blocked')),
  status text not null default 'active' check (status in ('active','watch','blocked')),
  created_at timestamptz default now()
);

create table metal_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references app_users(id),
  currency text not null,
  cash_balance numeric(20,6) default 0,
  au_g numeric(20,6) default 0,
  ag_g numeric(20,6) default 0,
  pt_g numeric(20,6) default 0,
  pd_g numeric(20,6) default 0,
  updated_at timestamptz default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references app_users(id),
  side text not null check (side in ('BUY','SELL')),
  market_key text not null,
  metal text not null,
  currency text not null,
  quantity_g numeric(20,6) not null,
  price_per_g numeric(20,6) not null,
  gross numeric(20,6) not null,
  fee numeric(20,6) not null,
  total numeric(20,6) not null,
  settlement text not null,
  order_type text not null,
  status text not null check (status in ('draft','pending','approved','matched','rejected','cancelled')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table pricing_settings (
  id uuid primary key default gen_random_uuid(),
  metal text not null,
  spread_bps integer not null,
  location text,
  location_premium_bps integer default 0,
  commission_bps integer default 50,
  valid_from timestamptz default now(),
  created_by uuid references app_users(id)
);

create table audit_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references app_users(id),
  event text not null,
  detail jsonb,
  created_at timestamptz default now()
);
