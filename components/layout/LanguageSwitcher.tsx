'use client'

import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

const LOCALES = [
  { code: 'es', label: 'ES', flag: '🇪🇸' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
] as const

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()

  const switchTo = (code: string) => {
    if (code === locale) return
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000`
    router.refresh()
  }

  const activeIndex = LOCALES.findIndex((l) => l.code === locale)

  return (
    <div
      role="group"
      aria-label="Language selector"
      className="relative flex items-center rounded-full border border-border bg-muted p-0.5"
    >
      {/* sliding active pill */}
      <span
        aria-hidden
        className="absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-background shadow-sm transition-transform duration-200 ease-in-out"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />

      {LOCALES.map(({ code, label, flag }) => (
        <button
          key={code}
          onClick={() => switchTo(code)}
          aria-pressed={locale === code}
          className={[
            'relative z-10 flex select-none items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors duration-200',
            locale === code ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
          ].join(' ')}
        >
          <span className="text-sm leading-none">{flag}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  )
}
