# CLAUDE.md

## Project: HackApp — Hackathon Base

Next.js 15 + Supabase + TypeScript + Tailwind CSS production-ready hackathon starter.

---

## Build & Dev Commands

```bash
npm install          # install dependencies
npm run dev          # start dev server (localhost:3000)
npm run build        # production build
npm run type-check   # TypeScript check without building
npm run lint         # ESLint
```

---

## Architecture

```
app/
  (auth)/           # login, signup — no sidebar
  (dashboard)/      # protected routes with Sidebar
  api/ai/chat/      # Claude API route (server-side, auth-gated)
  layout.tsx        # root layout + fonts
  page.tsx          # redirects to /dashboard or /login

components/
  auth/             # LoginForm, SignupForm
  ai/               # AIChat
  items/            # ItemsTable, ItemForm (CRUD)
  layout/           # Sidebar, Header
  ui/               # primitive components (Button, Input, Card, ...)

hooks/              # useAuth, useItems, useToast
services/           # auth.service, items.service, ai.service
lib/supabase/       # client.ts (browser), server.ts (SSR), middleware.ts
types/              # shared TypeScript types
utils/              # cn(), format helpers
supabase/migrations/ # SQL migrations
```

---

## Key Patterns

- **Auth**: Supabase SSR via `@supabase/ssr`. Session managed via cookies. Middleware (`middleware.ts`) protects `/dashboard/*` and redirects authed users away from `/login`, `/signup`.
- **Data fetching**: Client-side hooks (`useItems`) calling `services/`. Server components call `lib/supabase/server.ts` directly.
- **RLS**: All Supabase tables use Row Level Security — users only see their own rows.
- **AI**: Claude API calls go through `/api/ai/chat` (server route) so `ANTHROPIC_API_KEY` stays server-side.
- **Forms**: React Hook Form + Zod for all form validation.

---

## Environment Variables

Copy `.env.example` to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
ANTHROPIC_API_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Database Setup

Run `supabase/migrations/001_initial.sql` in the Supabase SQL editor to create the `items` table with RLS.

---

## Adding New Features

1. Add Supabase table → write migration SQL
2. Add TypeScript types to `types/index.ts`
3. Add service functions to `services/`
4. Add hook to `hooks/`
5. Build component in `components/`
6. Add page in `app/(dashboard)/dashboard/`
7. Add nav item in `components/layout/Sidebar.tsx`
