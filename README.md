# Curation: What’s for Dinner? (Pantry Edition)

A Progressive Web App (PWA) designed to eliminate daily decision fatigue by providing instant recipe inspiration from just 3 pantry ingredients.

## Project Links

- **GitHub Repository:** [https://github.com/valuemunch/hackathon](https://github.com/valuemunch/hackathon)

## Project Documentation

- [Product Requirements Document (PRD)](docs/prd.md)
- [Development Plan](docs/development-plan.md)

## Overview

This project is a PWA built with Next.js, Supabase, and Vercel. It leverages LLMs to generate creative recipes based on user-provided ingredients and a global cuisine twist.

## Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm
- Supabase Account
- Vercel Account
- OpenAI API key

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   LLM_API_KEY=your_llm_api_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Roadmap

See the [Development Plan](docs/development-plan.md) for detailed phases and milestones.
