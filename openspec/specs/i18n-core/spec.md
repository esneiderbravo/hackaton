## ADDED Requirements

### Requirement: next-intl installed and configured
The system SHALL have `next-intl` installed as a dependency with `localePrefix: 'never'`, `defaultLocale: 'es'`, and supported locales `['es', 'en']`.

#### Scenario: Package present
- **WHEN** the project dependencies are installed
- **THEN** `next-intl` is present in `package.json` dependencies

#### Scenario: Config file exists
- **WHEN** `lib/i18n/config.ts` is read
- **THEN** it exports `locales`, `defaultLocale`, and a routing config with `localePrefix: 'never'`

### Requirement: Request config provides messages to next-intl
The system SHALL have a `lib/i18n/request.ts` that implements `getRequestConfig` to load the correct message file based on the active locale cookie.

#### Scenario: Spanish messages loaded
- **WHEN** the `NEXT_LOCALE` cookie is `es` (or absent)
- **THEN** messages from `messages/es.json` are loaded for the request

#### Scenario: English messages loaded
- **WHEN** the `NEXT_LOCALE` cookie is `en`
- **THEN** messages from `messages/en.json` are loaded for the request

### Requirement: Middleware composes locale detection with Supabase auth
The system SHALL compose next-intl's `createMiddleware` with Supabase's `updateSession` in `middleware.ts` so that every request gets a locale cookie set before session management runs.

#### Scenario: Locale cookie set on first visit
- **WHEN** a user visits the app without a `NEXT_LOCALE` cookie
- **THEN** the middleware sets `NEXT_LOCALE=es` (default locale)

#### Scenario: Existing locale cookie preserved
- **WHEN** a user visits with `NEXT_LOCALE=en`
- **THEN** the middleware preserves the cookie and loads English messages

#### Scenario: Auth protection unchanged
- **WHEN** an unauthenticated user visits `/dashboard`
- **THEN** they are still redirected to `/login` (Supabase auth unaffected)

### Requirement: Root layout wraps app with NextIntlClientProvider
The system SHALL wrap the root layout body with `NextIntlClientProvider` passing the active locale messages, enabling `useTranslations()` in all client components.

#### Scenario: Provider present in layout
- **WHEN** `app/layout.tsx` renders
- **THEN** all children have access to translations via `useTranslations()`

#### Scenario: html lang attribute reflects active locale
- **WHEN** the page renders with locale `es`
- **THEN** `<html lang="es">` is set; when locale is `en`, `<html lang="en">` is set

### Requirement: Translation message files exist for both locales
The system SHALL have `messages/es.json` and `messages/en.json` containing all translation keys used across the application. Both files MUST contain identical key structures.

#### Scenario: Spanish file complete
- **WHEN** `messages/es.json` is loaded
- **THEN** it contains keys for namespaces: `auth`, `sidebar`, `header`, `dashboard`, `settings`, `validation`, `common`

#### Scenario: English file complete
- **WHEN** `messages/en.json` is loaded
- **THEN** it contains the same key structure as `es.json` with English translations
