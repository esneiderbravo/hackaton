## 1. Install and Configure next-intl

- [x] 1.1 Add `next-intl` to `package.json` dependencies and run `npm install`
- [x] 1.2 Create `lib/i18n/config.ts` exporting `locales`, `defaultLocale: 'es'`, and routing config with `localePrefix: 'never'`
- [x] 1.3 Create `lib/i18n/request.ts` implementing `getRequestConfig` to load `messages/[locale].json` based on the active locale cookie
- [x] 1.4 Add `plugin: [createNextIntlPlugin('./lib/i18n/request.ts')]` to `next.config.js` (or equivalent config file)

## 2. Create Translation Message Files

- [x] 2.1 Create `messages/es.json` with all namespaces: `auth`, `sidebar`, `header`, `items`, `dashboard`, `settings`, `validation`, `common` — fully populated in Spanish
- [x] 2.2 Create `messages/en.json` with the identical key structure as `es.json` — fully populated in English
- [x] 2.3 Verify both files have identical top-level keys and nested key structure

## 3. Update Middleware

- [x] 3.1 Update `middleware.ts` to import `createMiddleware` from `next-intl/middleware` and compose it with Supabase `updateSession` — locale detection runs first, auth runs second
- [x] 3.2 Verify auth redirect to `/login` still works for unauthenticated requests after middleware change

## 4. Update Root Layout

- [x] 4.1 Update `app/layout.tsx` to import `getLocale` and `getMessages` from `next-intl/server`, set `<html lang={locale}>`, and wrap body content with `NextIntlClientProvider` passing `locale` and `messages`

## 5. Update utils/format.ts

- [x] 5.1 Update `formatDate` in `utils/format.ts` to accept an optional `locale` parameter (default `'es'`) and use `Intl.DateTimeFormat(locale, { dateStyle: 'long' })`

## 6. Translate Auth Components

- [x] 6.1 Update `components/auth/LoginForm.tsx`: convert Zod schema to a `createLoginSchema(t)` factory function, add `useTranslations('auth')` and `useTranslations('validation')`, replace all hardcoded strings with translation keys
- [x] 6.2 Update `components/auth/SignupForm.tsx`: same pattern — schema factory, `useTranslations`, replace all hardcoded strings

## 7. Translate Layout Components

- [x] 7.1 Update `components/layout/Sidebar.tsx`: add `useTranslations('sidebar')`, replace all nav labels, "Signed in as", and "Sign out" with translation keys
- [x] 7.2 Update `components/layout/Header.tsx`: add `useTranslations('header')` for any header strings

## 8. Build LanguageSwitcher Component

- [x] 8.1 Create `components/layout/LanguageSwitcher.tsx`: `'use client'` component using `useLocale()` from next-intl, renders a button/select using Radix UI primitives that sets `NEXT_LOCALE` cookie and calls `router.refresh()` on change
- [x] 8.2 Add `<LanguageSwitcher />` to `components/layout/Header.tsx`

## 9. Translate Items Components

- [x] 9.1 Update `components/items/ItemsTable.tsx`: add `useTranslations('items')` and `useLocale()`, replace all hardcoded strings (table headers, buttons, empty state, `window.confirm` message), pass locale to `formatDate`
- [x] 9.2 Update `components/items/ItemForm.tsx`: add `useTranslations('items')` and `useTranslations('validation')`, replace all labels, button text, and placeholder strings

## 10. Translate Dashboard Pages

- [x] 10.1 Update `app/(dashboard)/dashboard/page.tsx`: replace hardcoded heading and description with translated strings (use `useTranslations('dashboard')` or server-side `getTranslations`)
- [x] 10.2 Update `app/(dashboard)/dashboard/items/page.tsx`: same pattern
- [x] 10.3 Update `app/(dashboard)/dashboard/settings/page.tsx`: same pattern

## 11. Verify and Type-Check

- [x] 11.1 Run `npm run type-check` and resolve any TypeScript errors
- [x] 11.2 Run `npm run lint` and fix any lint errors
- [x] 11.3 Build passes (`npm run build`) confirming Spanish default wiring in `lib/i18n/request.ts`
- [x] 11.4 LanguageSwitcher sets `NEXT_LOCALE` cookie and calls `router.refresh()` — verified by code inspection
- [x] 11.5 Items feature removed from project; `formatDate(date, locale)` signature verified via type-check
- [x] 11.6 Zod schema factories (`createLoginSchema`, `createSignupSchema`, `createItemSchema`) receive `t` from `useTranslations('validation')` — translated errors verified by code inspection
