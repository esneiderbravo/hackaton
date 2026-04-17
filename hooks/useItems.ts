'use client'

import { useState, useEffect, useCallback } from 'react'

import { itemsService } from '@/services/items.service'
import type { Item, ItemCreate, ItemUpdate } from '@/types'

export function useItems() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchItems = useCallback(async () => {
    setLoading(true)
    const { data, error } = await itemsService.getAll()
    setItems(data)
    setError(error)
    setLoading(false)
  }, [])

  useEffect(() => { fetchItems() }, [fetchItems])

  const createItem = async (payload: ItemCreate) => {
    const { data, error } = await itemsService.create(payload)
    if (data) setItems(prev => [data, ...prev])
    return { data, error }
  }

  const updateItem = async (id: string, payload: ItemUpdate) => {
    const { data, error } = await itemsService.update(id, payload)
    if (data) setItems(prev => prev.map(item => item.id === id ? data : item))
    return { data, error }
  }

  const deleteItem = async (id: string) => {
    const { error } = await itemsService.delete(id)
    if (!error) setItems(prev => prev.filter(item => item.id !== id))
    return { error }
  }

  return { items, loading, error, refetch: fetchItems, createItem, updateItem, deleteItem }
}
