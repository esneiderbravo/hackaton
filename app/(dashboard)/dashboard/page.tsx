import { Users, Activity, TrendingUp } from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const t = await getTranslations('dashboard')

  const name = user?.user_metadata?.full_name ?? user?.email ?? 'Developer'

  const stats = [
    { title: t('activeUsers'), value: '1', icon: Users, change: t('youAreHere') },
    { title: t('activity'), value: '100%', icon: Activity, change: t('systemsNominal') },
    { title: t('growth'), value: 'Infinity', icon: TrendingUp, change: t('gettingStarted') },
  ]

  return (
    <>
      <Header
        title={t('welcomeBack', { name: name.split(' ')[0] })}
        description={t('todayOverview')}
      />
      <div className="flex-1 space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map(({ title, value, icon: Icon, change }) => (
            <Card key={title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('quickStart')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>{t('quickStartDescription')}</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>{t('quickStartItem1')}</li>
              <li>{t('quickStartItem2')}</li>
              <li>{t('quickStartItem3')}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
