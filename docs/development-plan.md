# Development Plan: Curation: What’s for Dinner? (Pantry Edition)

**Status:** Draft  
**Owner:** Engineering Team  
**Date:** 2026-01-31

---

## Phase 0 – Setup & Tooling
- **0.1 Repository Management:**
    - GitHub repository created: [https://github.com/valuemunch/hackathon](https://github.com/valuemunch/hackathon)
    - Setup `main` branch protection (require PRs, passing checks).
- **0.2 Tech Stack Initialization:**
    - Environment: Node 20, npm.
    - Framework: Next.js 14 (App Router).
    - Language: TypeScript (Strict Mode).
    - Styling: Tailwind CSS.
- **0.3 Infrastructure:**
    - Configure Vercel project with GitHub integration.
    - Enable Preview Deployments for all branches.
- **0.4 Database & Backend:**
    - Initialize Supabase project.
    - Create `cuisine_styles` table: `id (uuid)`, `name (text)`, `emoji (text)`.
    - Seed table with 30 global cuisines.

---

## Phase 1 – Core UI Skeleton
- **1.1 Responsive Layout:**
    - Build mobile-first layout (375px breakpoint).
    - Implement theme colors (Primary: #F97316).
- **1.2 Ingredient Input Form:**
    - Create input field for 3 comma-separated ingredients.
    - Implement client-side validation using Zod.
- **1.3 Global Twist Feature:**
    - Add “Surprise Me” button.
    - Fetch random cuisine from Supabase via RPC or simple select with random seed.
- **1.4 Testing:**
    - Setup Vitest and React Testing Library.
    - Implement necessary unit tests for core logic (validation, parsing).
    - Note: High coverage (>80%) is not required; focus on critical paths.

---

## Phase 2 – Recipe Generation API
- **2.1 API Endpoint:**
    - Create Vercel Edge Function at `/api/generateRecipe`.
    - Accept POST request with `ingredients[]` and optional `cuisine`.
- **2.2 LLM Integration:**
    - Integrate Kimi K2.5 (`moonshotai/Kimi-K2.5-TEE`) via [Chutes.ai API](https://llm.chutes.ai/v1/chat/completions).
    - Prompt Engineering: Strict JSON output, `max_tokens: 1024`, `temperature: 0.7`.
- **2.3 Validation & Error Handling:**
    - Validate LLM response against Zod schema.
    - Implement robust error handling (502 for LLM failures, 400 for bad input).
- **2.4 Observability:**
    - Add OpenTelemetry instrumentation for latency and error tracking.

---

## Phase 3 – PWA Features
- **3.1 PWA Manifest:**
    - Generate `manifest.json` (name, theme_color: #F97316, icons).
- **3.2 Service Worker:**
    - Implement Workbox for service worker management.
    - Strategy: Cache-first for static assets, Stale-while-revalidate for API responses (5 min).
- **3.3 Offline Experience:**
    - Implement IndexedDB (using `idb` library) to store last 5 recipes.
    - Create an offline fallback UI.
- **3.4 Audit:**
    - Verify 100/100 Lighthouse PWA score.

---

## Phase 4 – QA & Performance
- **4.1 CI/CD Integration:**
    - Run Lighthouse CI on every PR.
    - Enforce LCP < 2s.
- **4.2 Accessibility & Manual Testing:**
    - Audit with `axe-core`.
    - Keyboard navigation walkthrough.
    - **Manual E2E Testing**: Perform comprehensive manual testing in the production environment.
- **4.3 Load Testing:**
    - Run k6 tests: 100 RPS for 1 minute.
    - Target: p95 latency < 3s, error rate < 1%.

---

## Phase 5 – Deployment & Monitoring
- **5.1 Production Launch:**
    - Promote staging to production.
    - Configure custom domain and SSL.
- **5.2 Database Maintenance:**
    - Configure daily Supabase backups (7-day retention).
- **5.3 Monitoring & Alerts:**
    - Enable Vercel Analytics.
    - Set Supabase dashboard alerts for high error rates (> 0.5%).
- **5.4 Versioning:**
    - Tag release `v1.0.0`.
    - Generate release notes.

---

## Phase 6 – Post-Launch Review
- **6.1 KPI Tracking:**
    - Review DAU and retention after 14 days.
- **6.2 User Feedback:**
    - Embed NPS survey.
    - Target NPS ≥ 50.
- **6.3 Iteration:**
    - Update PRD to v1.1 based on findings and lessons learned.
