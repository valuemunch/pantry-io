## Implement Phase 0 Pending Tasks

### 1. Initialize Supabase Local Environment
- **Action**: Run `npx supabase init` to set up the local Supabase configuration.
- **Output**: This will create a `supabase` directory containing `config.toml`, `migrations/`, and `seed.sql`.

### 2. Database Schema Migration
- **Action**: Create a new migration file to define the `CuisineStyle` table.
- **Technical Detail**: Following your **T-SQL Naming Conventions** (PascalCase, Singular, and specific ID pattern):
    - Table Name: `CuisineStyle`
    - Primary Key: `CuisineStyleId` (UUID)
    - Columns: `Name` (NVARCHAR), `Emoji` (NVARCHAR), `CreatedAt` (DATETIMEOFFSET).

### 3. Seed Data Generation
- **Action**: Populate `supabase/seed.sql` with 30 global cuisines.
- **Content**: A diverse list including Italian 🇮🇹, Mexican 🇲🇽, Japanese 🇯🇵, Indian 🇮🇳, Thai 🇹🇭, etc.

### 4. Vercel Configuration Fix
- **Action**: Modify [vercel.json](file:///c:/dev/playground/trae-hackathon/vercel.json).
- **Change**: Remove the rewrite rule `{"source": "/(.*)", "destination": "/index.html"}` which is intended for SPAs and conflicts with the Next.js App Router.

---

## Manual Steps Required

To sync these changes with your live Supabase project, please follow these steps:

1.  **Login to Supabase CLI** (if not already done):
    ```powershell
    npx supabase login
    ```
2.  **Link to your Project**:
    - Go to your [Supabase Dashboard](https://supabase.com/dashboard/projects), find your **Project Ref** in Project Settings.
    - Run:
    ```powershell
    npx supabase link --project-ref <your-project-ref>
    ```
3.  **Push Changes to Remote**:
    - This will apply the migration and seed the data to your live database:
    ```powershell
    npx supabase db push
    ```

**Do you want me to proceed with the implementation of the local files?**