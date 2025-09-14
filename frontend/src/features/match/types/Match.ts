import type { Employee } from '@/features/employee/types'
import type { User } from '@/features/user/types/User'

export type Match = {
  id: string
  isActive: boolean
  user: User
  employee: Employee
}
