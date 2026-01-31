# Product Requirements Document (PRD)
## Curation: What’s for Dinner? (Pantry Edition)

**Version:** 1.0  
**Status:** Draft  
**Date:** 2026-01-31

---

### 1. Vision & Value Proposition
- **Vision Statement:** To eliminate daily decision fatigue for home cooks by transforming a handful of pantry staples into instant, globally-inspired culinary inspiration.
- **Target Persona:** Busy home cooks aged 18-45 who experience "decision fatigue" at the end of the day and need a quick, no-friction way to use what they already have.
- **Core Value:** Zero-learning-curve recipe inspiration generated from exactly 3 pantry ingredients, with an optional "Surprise Me" global cuisine twist.

---

### 2. Functional Requirements
- **2.1 Ingredient Input:**
    - A single text field accepting exactly 3 comma-separated ingredients.
    - Validation: Each ingredient must be 2–25 characters.
    - Filter: Must pass a profanity and common allergen filter (client-side and server-side).
- **2.2 “Surprise Me” Toggle:**
    - A button that randomly selects one cuisine style from a curated list of 30 global cuisines stored in Supabase.
    - UI should clearly display the selected cuisine style (e.g., "Make it Spicy Thai style").
- **2.3 Recipe Generation:**
    - Triggered by a POST request to Google Gemini API (gemini-2.5-flash).
    - Fallback providers: Chutes.ai (Kimi K2.5) or OpenAI (gpt-4o-mini).
    - Response Format: Strict minified JSON object containing:
        - `recipeTitle`: String
        - `vibeName`: String (e.g., "Cozy Sunday Dinner")
        - `ingredients`: Array of Strings
        - `instructions`: Array of Strings
        - `prepTime`: String
        - `cookTime`: String
        - `servings`: Number/String
- **2.4 Offline Fallback:**
    - Use IndexedDB to cache the last 5 generated recipes.
    - If the network is unavailable, serve these cached recipes with a clear "Offline Mode" indicator.
- **2.5 Progressive Enhancement (PWA):**
    - Fully installable PWA.
    - Target 100 Lighthouse PWA score.
    - Service-worker-based cache-first strategy for all static assets.

---

### 3. Non-Functional Requirements
- **3.1 Performance:**
    - Time to Interactive (TTI) < 1.5s on 4G networks.
    - Largest Contentful Paint (LCP) < 2s.
- **3.2 Accessibility:**
    - Compliance with WCAG 2.2 AA standards.
    - Fully keyboard navigable.
    - Aria-labels on all interactive elements and dynamic updates.
- **3.3 Security:**
    - HTTPS only.
    - Content Security Policy (CSP) header restricting scripts to `self` and `vercel.live`.
    - LLM API keys stored securely in Vercel environment variables and rotated weekly.
- **3.4 Privacy:**
    - No user accounts or persistent Personally Identifiable Information (PII).
    - Supabase Row-Level Security (RLS) configured to deny read access on IP addresses or sensitive metadata.

---

### 4. User Stories & Acceptance Criteria
- **US-1: Instant Inspiration**
    - *As a user, I type “chicken, tomato, basil” and receive a recipe in <3s so that I can decide what to cook.*
    - **AC:** 95th percentile latency ≤ 3s; recipe must include all 3 input ingredients; `vibeName` length ≤ 30 characters.
- **US-2: Global Twist**
    - *As a user, I click “Surprise Me” and see “Make it Spicy Thai style” so that I feel delighted.*
    - **AC:** Cuisine selection is uniformly random; the selected style is injected into the LLM prompt instructions; UI updates instantly without a full page reload.

---

### 5. KPIs & Success Metrics
- **Daily Active Users (DAU):** ≥ 500 within 30 days of launch.
- **Retention:** Average session length ≥ 45s.
- **Reliability:** Recipe generation error rate ≤ 1%.
- **Growth:** PWA install rate ≥ 15% of unique visitors.

---

### 6. Risks & Mitigations
- **LLM API Quota Exhaustion:** Implement Redis-based rate limiting (10 requests/IP/hour) via Vercel KV.
- **Vercel Function Cold Starts:** Use Edge Runtime for API routes and keep functions warm via Vercel Cron Jobs.

---

### 7. Future Roadmap (Post-MVP)
- Multi-language support (Spanish, French, etc.).
- Dietary filters (Vegan, Keto, Gluten-Free).
- Social sharing capabilities (Share to Instagram/WhatsApp).
- "Save Favorites" functionality using optional Supabase authentication.

---

### 8. Quality Assurance Strategy
- **Unit Testing:** Focus on necessary unit tests for core business logic and utility functions.
- **Coverage:** No strict percentage requirement for code coverage; priority is given to stability of critical features.
- **End-to-End (E2E) Testing:** Manual E2E testing will be conducted in the production environment to verify real-world performance and user experience.
