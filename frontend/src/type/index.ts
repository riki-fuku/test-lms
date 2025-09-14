// グローバルな型管理

import type { Employee } from '@/features/employee/types'
import type { UserMe } from '@/features/user/types'

export type Actor = UserMe | Employee

export type ActorType = 'user' | 'employee'
