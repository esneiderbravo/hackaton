import type { Metadata } from 'next'

import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = { title: 'Settings' }

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <>
      <Header title="Settings" description="Manage your account and preferences." />
      <div className="flex-1 space-y-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex gap-4">
              <span className="w-24 text-muted-foreground">Email</span>
              <span>{user?.email}</span>
            </div>
            <div className="flex gap-4">
              <span className="w-24 text-muted-foreground">Name</span>
              <span>{user?.user_metadata?.full_name ?? '—'}</span>
            </div>
            <div className="flex gap-4">
              <span className="w-24 text-muted-foreground">User ID</span>
              <span className="font-mono text-xs">{user?.id}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
