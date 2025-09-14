import type { ActorType } from '@/type'

export const ACCOUNT_TYPE: Record<'USER' | 'EMPLOYEE', ActorType> = {
  USER: 'user',
  EMPLOYEE: 'employee',
} as const

export const EMPLOYEE_ROLE = {
  ADMIN: 'admin',
  CS: 'cs',
  COACH: 'coach',
} as const

export const ABILITY_TEST_STATUS = {
  BEFORE_TEST: {
    id: 1,
    name: 'テスト前',
  },
  TESTING: {
    id: 2,
    name: 'テスト中',
  },
  NOT_SUBMITTED: {
    id: 3,
    name: '未提出',
  },
  SUBMITTED: {
    id: 4,
    name: '提出済み',
  },
  GRADED: {
    id: 5,
    name: '採点済み',
  },
} as const

export * from './env'
