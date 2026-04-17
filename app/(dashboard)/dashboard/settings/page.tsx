import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = { title: 'Settings' }

export default async function SettingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const t = await getTranslations('settings')

  return (
    <>
      <Header title={t('title')} description={t('description')} />
      <div className="flex-1 space-y-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('account')}</CardTitle>
            <CardDescription>{t('accountDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex gap-4">
              <span className="w-24 text-muted-foreground">{t('email')}</span>
              <span>{user?.email}</span>
            </div>
            <div className="flex gap-4">
              <span className="w-24 text-muted-foreground">{t('name')}</span>
              <span>{user?.user_metadata?.full_name ?? '—'}</span>
            </div>
            <div className="flex gap-4">
              <span className="w-24 text-muted-foreground">{t('userId')}</span>
              <span className="font-mono text-xs">{user?.id}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
