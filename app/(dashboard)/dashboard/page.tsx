import { Database, Users, Activity, TrendingUp } from 'lucide-react'
import type { Metadata } from 'next'

import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = { title: 'Dashboard' }

const stats = [
  { title: 'Total Items', value: '0', icon: Database, change: '+0% from last month' },
  { title: 'Active Users', value: '1', icon: Users, change: 'You are here!' },
  { title: 'Activity', value: '100%', icon: Activity, change: 'All systems nominal' },
  { title: 'Growth', value: 'Infinity', icon: TrendingUp, change: 'Just getting started' },
]

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const name = user?.user_metadata?.full_name ?? user?.email ?? 'Developer'

  return (
    <>
      <Header
        title={`Welcome back, ${name.split(' ')[0]}!`}
        description="Here is what is happening today."
      />
      <div className="flex-1 space-y-6 p-6">
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

        {/* Quick start */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Your hackathon base is ready. Here is what to do next:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Navigate to <strong>Items</strong> to test the CRUD operations</li>
              <li>Visit <strong>AI Assistant</strong> to try the Claude integration</li>
              <li>Run the Supabase SQL migration to create the items table</li>
              <li>Customize the sidebar nav items for your use case</li>
              <li>Deploy to Vercel with one click</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
