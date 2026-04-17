## ADDED Requirements

### Requirement: No hardcoded strings in any component or page
The system SHALL have zero hardcoded user-visible strings in components or pages. Every string MUST use `useTranslations()` with a key from the message files.

#### Scenario: Auth forms translated
- **WHEN** a user views the login or signup page in Spanish
- **THEN** all labels, placeholders, button text, and link text appear in Spanish

#### Scenario: Auth forms in English
- **WHEN** locale is English
- **THEN** all auth form strings appear in English

### Requirement: Zod validation messages are translated
The system SHALL translate all Zod validation error messages in `LoginForm` and `SignupForm`. Schemas MUST be constructed inside the component as factory functions receiving the translation function.

#### Scenario: Validation error in Spanish
- **WHEN** a user submits the login form with an invalid email in Spanish locale
- **THEN** the error message reads in Spanish (e.g. "Correo electrónico inválido")

#### Scenario: Validation error in English
- **WHEN** locale is English and user submits with an invalid email
- **THEN** the error message reads in English (e.g. "Invalid email address")

### Requirement: Sidebar navigation labels translated
The system SHALL display all navigation item labels in `components/layout/Sidebar.tsx` using the active locale. "Signed in as" and "Sign out" text MUST also be translated.

#### Scenario: Spanish nav labels
- **WHEN** locale is Spanish
- **THEN** sidebar shows "Panel", "Configuración", "Cerrar sesión"

#### Scenario: English nav labels
- **WHEN** locale is English
- **THEN** sidebar shows "Dashboard", "Settings", "Sign out"

### Requirement: Dashboard page headings translated
The system SHALL translate all page `<h1>` headings and descriptive `<p>` subtitles in active dashboard pages (`/dashboard`, `/dashboard/settings`).

> **Note**: `/dashboard/items` was removed from the project. Items components (`ItemsTable`, `ItemForm`) were translated during implementation then deleted when the Items feature was removed.

#### Scenario: Dashboard page in Spanish
- **WHEN** locale is Spanish
- **THEN** all page headings and subtitles render in Spanish

### Requirement: Date formatting is locale-aware
The system SHALL format dates using the active locale. `utils/format.ts` `formatDate()` SHALL accept a `locale` parameter and use `Intl.DateTimeFormat` with `dateStyle: 'long'`.

#### Scenario: Spanish date format
- **WHEN** locale is Spanish and a date is formatted
- **THEN** date renders as "17 de abril de 2026" style

#### Scenario: English date format
- **WHEN** locale is English and a date is formatted
- **THEN** date renders as "April 17, 2026" style

### Requirement: `useLocale()` passed to formatDate in components
The system SHALL use `useLocale()` from next-intl in components that call `formatDate` to pass the active locale. The `formatDate(date, locale)` signature accepts an optional locale parameter defaulting to `'es'`.
