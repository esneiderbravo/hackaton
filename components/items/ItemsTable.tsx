'use client'

import { Pencil, Trash2, Plus } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'
import { useItems } from '@/hooks/useItems'
import type { Item, ItemCreate } from '@/types'
import { formatDate } from '@/utils/format'

import { ItemForm } from './ItemForm'

const statusVariant: Record<Item['status'], 'success' | 'secondary' | 'outline'> = {
  active: 'success',
  inactive: 'secondary',
  archived: 'outline',
}

export function ItemsTable() {
  const { items, loading, createItem, updateItem, deleteItem } = useItems()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [editItem, setEditItem] = useState<Item | null>(null)

  const handleCreate = async (data: ItemCreate) => {
    setIsSubmitting(true)
    await createItem(data)
    setIsSubmitting(false)
    setCreateOpen(false)
  }

  const handleUpdate = async (data: ItemCreate) => {
    if (!editItem) return
    setIsSubmitting(true)
    await updateItem(editItem.id, data)
    setIsSubmitting(false)
    setEditItem(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return
    await deleteItem(id)
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} items total</p>
        <Button size="sm" onClick={() => setCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Item
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="flex h-48 flex-col items-center justify-center rounded-lg border border-dashed">
          <p className="text-muted-foreground">No items yet</p>
          <Button variant="link" onClick={() => setCreateOpen(true)}>
            Create your first item
          </Button>
        </div>
      ) : (
        <div className="rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Title</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Created</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      {item.description && (
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant[item.status]}>{item.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDate(item.created_at)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditItem(item)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Item</DialogTitle>
          </DialogHeader>
          <ItemForm
            onSubmit={handleCreate}
            onCancel={() => setCreateOpen(false)}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          {editItem && (
            <ItemForm
              initialData={editItem}
              onSubmit={handleUpdate}
              onCancel={() => setEditItem(null)}
              isSubmitting={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
