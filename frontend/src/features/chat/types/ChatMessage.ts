import type { Employee } from '@/features/employee/types'
import type { User } from '@/features/user/types/User'

export type ChatMessage = {
  id: string
  chatRoomId: string
  isRead: boolean
  content: string
  type: string
  createdAt: string
  deletedAt: string | null
  isMyMessage: boolean
  sender: User | Employee | null
}
