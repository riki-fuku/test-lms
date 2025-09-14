import type ROLE from '@/features/user/constants/role'

export type Role = (typeof ROLE)[keyof typeof ROLE]
