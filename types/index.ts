export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
}

export interface Item {
  id: string
  user_id: string
  title: string
  description?: string
  status: 'active' | 'inactive' | 'archived'
  created_at: string
  updated_at: string
}

export type ItemCreate = Pick<Item, 'title' | 'description' | 'status'>
export type ItemUpdate = Partial<ItemCreate>

export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  pageSize: number
}
