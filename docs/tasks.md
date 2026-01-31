# Pending Tasks

## Phase 0 - Setup & Tooling (Remaining)

- [x] **Initialize Supabase Project**
  - Run `supabase init` to generate the local configuration folder.

- [x] **Create Database Schema**
  - Create a migration file for the `cuisine_styles` table.
  - Schema: `id (uuid)`, `name (text)`, `emoji (text)`.

- [x] **Generate Seed Data**
  - Create `supabase/seed.sql`.
  - Populate with 30 global cuisines.

- [x] **Fix Vercel Configuration**
  - Remove the SPA rewrite rule (`source: /(.*)`) from `vercel.json` as it conflicts with Next.js App Router.
