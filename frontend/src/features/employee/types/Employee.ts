import type { EmployeeWorkspace } from '@/features/employee/types/EmployeeWorkspace'

export type EmployeeRole = 'admin' | 'cs' | 'coach'

export type Employee = {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string | null
  nickname: string | null
  phoneNumber: string | null
  birthDate: string | null
  workStyle: string | null
  engineerHistory: string | null
  os: string | null
  introduction: string | null
  lastLoginAt: string
  name: string
  profileSetupCompleted: boolean
  role: EmployeeRole
  activeWorkspace: EmployeeWorkspace
}
