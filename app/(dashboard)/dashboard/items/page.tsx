import type { Metadata } from 'next'

import { ItemsTable } from '@/components/items/ItemsTable'
import { Header } from '@/components/layout/Header'

export const metadata: Metadata = { title: 'Items' }

export default function ItemsPage() {
  return (
    <>
      <Header
        title="Items"
        description="Manage your items. Full CRUD powered by Supabase."
      />
      <div className="flex-1 p-6">
        <ItemsTable />
      </div>
    </>
  )
}
