## Why

HackApp displays all UI text in hardcoded English strings. To support Spanish-speaking users (the primary audience) and English as a secondary language, the app needs a full internationalization layer with Spanish as the default locale and a runtime language switcher.

## What Changes

- Install and configure `next-intl` with `localePrefix: 'never'` (cookie-based locale, no URL changes)
- Create translation message files for Spanish (`es`) and English (`en`) covering all UI strings
- Replace every hardcoded string across all active components, pages, forms, and Zod validation messages with `useTranslations()` calls
- Add a `LanguageSwitcher` segmented pill component to the Header for runtime locale toggling
- Update `middleware.ts` to compose next-intl locale detection with existing Supabase session middleware
- Update `utils/format.ts` to accept a locale parameter for locale-aware date formatting
- Convert all Zod schemas in form components to factory functions that accept a translation function, enabling translated validation error messages

> **Note**: The Items feature was removed from the project during this change. Tasks 9.1, 9.2, and 10.2 (Items component translations) were completed then became moot when `components/items/`, `hooks/useItems.ts`, `services/items.service.ts`, and `app/(dashboard)/dashboard/items/page.tsx` were deleted. The `items` message namespace was also removed.

## Capabilities

### New Capabilities

- `i18n-core`: Translation infrastructure — next-intl config, message files (es/en), middleware composition, NextIntlClientProvider setup in root layout
- `i18n-language-switcher`: Header language switcher component that reads and sets the NEXT_LOCALE cookie
- `i18n-translations`: Full translation coverage across all components, pages, forms, and Zod validation schemas

### Modified Capabilities

## Impact

- **Dependencies**: adds `next-intl`
- **Middleware**: `middleware.ts` gains locale detection logic composed before Supabase `updateSession`
- **All components**: every `components/` file with hardcoded strings updated
- **All pages**: every `app/` page with hardcoded text updated
- **Forms**: Zod schemas refactored from module-level constants to factory functions
- **Utils**: `formatDate` in `utils/format.ts` gains a `locale` parameter
- **Layout**: `app/layout.tsx` gains `NextIntlClientProvider` wrapping
- **No URL changes**: routes remain `/dashboard`, `/login`, etc. — locale lives in `NEXT_LOCALE` cookie
