## ADDED Requirements

### Requirement: LanguageSwitcher component exists in Header
The system SHALL render a `LanguageSwitcher` component inside `components/layout/Header.tsx` that allows users to switch between Spanish and English at runtime.

#### Scenario: Switcher visible in header
- **WHEN** any authenticated dashboard page loads
- **THEN** a language switcher control is visible in the Header

#### Scenario: Current locale indicated
- **WHEN** the active locale is Spanish
- **THEN** the switcher shows the current language (e.g. "ES" or "Español") as selected

#### Scenario: Current locale indicated in English
- **WHEN** the active locale is English
- **THEN** the switcher shows "EN" or "English" as selected

### Requirement: Switching locale updates the NEXT_LOCALE cookie and reloads
The system SHALL set the `NEXT_LOCALE` cookie to the selected locale value and reload the page so that all server-rendered content refreshes with the new locale.

#### Scenario: Switch to English
- **WHEN** user selects English in the language switcher
- **THEN** `NEXT_LOCALE=en` cookie is set and the page reloads with English content

#### Scenario: Switch to Spanish
- **WHEN** user selects Spanish in the language switcher
- **THEN** `NEXT_LOCALE=es` cookie is set and the page reloads with Spanish content

#### Scenario: Cookie persists across navigation
- **WHEN** user switches to English and navigates to another dashboard page
- **THEN** the English locale is still active (cookie persists)

### Requirement: Language switcher uses design system tokens
The system SHALL implement `LanguageSwitcher` as a segmented pill control — both locales visible simultaneously (`🇪🇸 ES` / `🇬🇧 EN`) with an animated sliding background indicator — using Tailwind CSS classes and CSS variables consistent with the app's design system. No Radix UI primitives are required for this component.

#### Scenario: Uses design system tokens
- **WHEN** the LanguageSwitcher renders
- **THEN** it uses Tailwind color tokens (`text-muted-foreground`, `bg-background`, `border-border`, etc.) and the active locale is visually indicated by a sliding pill

#### Scenario: Both locales always visible
- **WHEN** the LanguageSwitcher renders
- **THEN** both ES and EN options are visible simultaneously, removing ambiguity about the current locale
