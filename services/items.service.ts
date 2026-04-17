import type { Item, ItemCreate, ItemUpdate } from '@/types'

const MOCK_ITEMS: Item[] = [
  {
    id: '1',
    user_id: 'mock',
    title: 'First item',
    description: 'This is a mock item',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    user_id: 'mock',
    title: 'Second item',
    description: 'Another mock item',
    status: 'inactive',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

let store: Item[] = [...MOCK_ITEMS]

export const itemsService = {
  async getAll(): Promise<{ data: Item[]; error: string | null }> {
    return { data: [...store], error: null }
  },

  async getById(id: string): Promise<{ data: Item | null; error: string | null }> {
    const data = store.find(i => i.id === id) ?? null
    return { data, error: null }
  },

  async create(payload: ItemCreate): Promise<{ data: Item | null; error: string | null }> {
    const item: Item = {
      id: Math.random().toString(36).slice(2),
      user_id: 'mock',
      ...payload,
      description: payload.description ?? '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    store = [item, ...store]
    return { data: item, error: null }
  },

  async update(id: string, payload: ItemUpdate): Promise<{ data: Item | null; error: string | null }> {
    store = store.map(i =>
      i.id === id ? { ...i, ...payload, updated_at: new Date().toISOString() } : i
    )
    const data = store.find(i => i.id === id) ?? null
    return { data, error: null }
  },

  async delete(id: string): Promise<{ error: string | null }> {
    store = store.filter(i => i.id !== id)
    return { error: null }
  },
}
