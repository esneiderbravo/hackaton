## Context

HackApp currently has all UI strings hardcoded in English. The project needs Spanish as the primary/default language and English as a secondary, with a runtime switcher in the Header. Routes must not change — no `/es/` or `/en/` prefixes. Locale is stored in a cookie (`NEXT_LOCALE`).

The existing middleware (`middleware.ts`) delegates entirely to Supabase's `updateSession`. Adding i18n requires composing a locale detection step before session management.

Current string locations:
- `components/auth/` — LoginForm, SignupForm (including inline Zod schemas)
- `components/layout/` — Sidebar, Header
- `components/items/` — ItemsTable (incl. `window.confirm`), ItemForm
- `app/(dashboard)/dashboard/*/page.tsx` — page titles and descriptions
- `utils/format.ts` — date formatting (locale-sensitive)

## Goals / Non-Goals

**Goals:**
- Spanish default, English secondary; runtime switching via cookie
- All visible strings translated — UI labels, validation errors, page titles, confirmations
- No route changes — `/dashboard` stays `/dashboard` regardless of locale
- Locale-aware date formatting
- Language switcher in Header

**Non-Goals:**
- More than 2 languages at this time
- Server-side locale detection from `Accept-Language` header (cookie is source of truth)
- Translation of dynamic content from the database
- RTL layout support

## Decisions

### Decision 1: next-intl with `localePrefix: 'never'`

**Chosen**: `next-intl` configured with `localePrefix: 'never'`.

**Why**: next-intl is purpose-built for Next.js App Router, supports both Server and Client Components natively via `useTranslations()`, has first-class TypeScript support, and handles cookie-based locale detection without URL changes.

**Alternatives considered**:
- `react-i18next`: Client-side focused, requires extra wiring for Server Components, larger bundle.
- Custom context + JSON: Zero-dep but re-invents what next-intl provides; no type-safe message keys.

### Decision 2: Cookie-based locale (no URL prefix)

**Chosen**: `NEXT_LOCALE` cookie, `localePrefix: 'never'` in next-intl config.

**Why**: Routes stay stable (`/dashboard`, `/login`). Simplest UX for a logged-in app where SEO of dashboard pages is irrelevant. URL-based routing would require restructuring the entire `app/` directory.

**Trade-off**: Not SEO-friendly for public pages (`/login`, `/signup`). Acceptable for this app's scope.

### Decision 3: Zod schema factory functions

**Chosen**: Convert module-level Zod schemas to functions that accept `t` (translation function).

```
// Before
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
})

// After
function createLoginSchema(t: (key: string) => string) {
  return z.object({
    email: z.string().email(t('validation.invalidEmail')),
  })
}
// Inside component: const schema = useMemo(() => createLoginSchema(t), [t])
```

**Why**: Zod messages are evaluated at schema construction time. Passing `t` at component render time is the only way to get translated messages without a global i18n instance.

**Alternative**: Use a global `i18n` instance outside React — couples the translation system to module scope, breaks with SSR locale isolation.

### Decision 4: Translation key structure

Namespaced flat keys grouped by area:

```
messages/
  es.json   ← default
  en.json

Key structure:
{
  "auth": { ... },         // login/signup forms
  "sidebar": { ... },      // nav labels
  "header": { ... },       // header area
  "items": { ... },        // items table and form
  "dashboard": { ... },    // page headings
  "settings": { ... },     // settings page
  "validation": { ... },   // Zod error messages
  "common": { ... }        // shared: save, cancel, loading, etc.
}
```

### Decision 5: `formatDate` locale parameter

`utils/format.ts` `formatDate()` gains a `locale` parameter defaulting to `'es'`:

```ts
export function formatDate(date: string, locale: string = 'es'): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date(date))
}
```

Components that use `formatDate` will call `useLocale()` from next-intl to pass the active locale.

## File Map

```
NEW FILES
─────────────────────────────────────────────────────
messages/
  es.json                    ← all strings in Spanish
  en.json                    ← all strings in English
lib/i18n/
  config.ts                  ← locales, defaultLocale, routing
  request.ts                 ← getRequestConfig for next-intl
components/layout/
  LanguageSwitcher.tsx        ← dropdown/toggle in Header

MODIFIED FILES
─────────────────────────────────────────────────────
package.json                 ← add next-intl
middleware.ts                ← compose createMiddleware + updateSession
app/layout.tsx               ← add NextIntlClientProvider
components/layout/Header.tsx ← add <LanguageSwitcher />
components/layout/Sidebar.tsx
components/auth/LoginForm.tsx
components/auth/SignupForm.tsx
components/items/ItemsTable.tsx
components/items/ItemForm.tsx
app/(dashboard)/dashboard/page.tsx
app/(dashboard)/dashboard/items/page.tsx
app/(dashboard)/dashboard/settings/page.tsx
utils/format.ts
```

## Middleware Composition

```
Request
    │
    ▼
┌──────────────────────────────────────────────┐
│  middleware.ts                               │
│                                              │
│  const intlMiddleware = createMiddleware({   │
│    locales: ['es', 'en'],                    │
│    defaultLocale: 'es',                      │
│    localePrefix: 'never',                    │
│    localeDetection: true  // cookie-based    │
│  })                                          │
│                                              │
│  export async function middleware(req) {     │
│    // 1. Detect/set locale cookie            │
│    intlMiddleware(req)                       │
│    // 2. Supabase session refresh            │
│    return await updateSession(req)           │
│  }                                           │
└──────────────────────────────────────────────┘
```

## Risks / Trade-offs

- **Hydration mismatch** → Mitigation: `suppressHydrationWarning` already on `<html>`. `NextIntlClientProvider` wraps body in root layout, ensuring locale is consistent.
- **`useMemo` on schema factory** → If `t` reference changes on every render, schema recreates. This is benign for Zod (cheap) but must not cause form resets — schema is passed to `useForm` via `zodResolver`, which is stable by design in react-hook-form.
- **Cookie blocked (Safari ITP etc.)** → Falls back to `defaultLocale` (Spanish). Acceptable.
- **Missing translation keys** → next-intl logs a warning in dev and renders the key path. Mitigation: create both `es.json` and `en.json` in the same task, keeping them in sync.

## Open Questions

- None — all decisions are made. Ready to implement.
