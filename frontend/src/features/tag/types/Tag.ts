import type { User } from '@/features/user/types/User'

export type Tag = {
  id: number
  name: string
  created_user_id: string
  created_user?: User
}
