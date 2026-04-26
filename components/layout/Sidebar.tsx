'use client'

import { LayoutDashboard, Settings, LogOut, UserPlus, LogIn } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/utils/cn'

export function Sidebar() {
  const pathname = usePathname()
  const { signOut, user } = useAuth()
  const t = useTranslations('sidebar')

  const navItems = [
    { href: '/dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { href: '/dashboard/settings', label: t('settings'), icon: Settings },
    { href: '/onboarding', label: 'Registro', icon: UserPlus },
    { href: '/login', label: 'Login', icon: LogIn },
  ]

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <span className="text-xl font-bold text-primary">HackApp</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              pathname === href
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="border-t p-4">
        <div className="mb-3 px-3">
          <p className="text-xs text-muted-foreground">{t('signedInAs')}</p>
          <p className="truncate text-sm font-medium">{user?.email}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-3 text-muted-foreground"
          onClick={signOut}
        >
          <LogOut className="h-4 w-4" />
          {t('signOut')}
        </Button>
      </div>
    </aside>
  )
}
