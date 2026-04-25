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

All schema changes live in `supabase/migrations/` as versioned SQL files. **Migrations are manual-only — never executed automatically.**

### Migration naming convention

```
YYYYMMDDHHMMSS_description.sql
```

Example: `20260424194500_add_profiles_table.sql`

### How to apply a migration

Apply manually via the Supabase SQL editor or:

```bash
supabase db push   # run deliberately, never from CI/CD
```

### Rules

- **Never modify a committed migration.** If a correction is needed, create a new migration file.
- **Never run `supabase db push` automatically.** All applications are deliberate and reviewed.
- The baseline schema is `supabase/migrations/20260424000000_initial_items_table.sql` — run this first on a fresh environment.

See `supabase/migrations/README.md` for the full workflow guide.

---

## Adding New Features

1. Add Supabase table → write migration SQL
2. Add TypeScript types to `types/index.ts`
3. Add service functions to `services/`
4. Add hook to `hooks/`
5. Build component in `components/`
6. Add page in `app/(dashboard)/dashboard/`
7. Add nav item in `components/layout/Sidebar.tsx`
