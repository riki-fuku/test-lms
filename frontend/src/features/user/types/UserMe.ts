import type { UserWorkspace } from '@/features/userWorkspace/types'

export type UserMe = {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string | null
  nickname: string | null
  name: string
  introduction: string | null
  gender: string | null
  age: number | null
  os: string | null
  birthDate: string | null
  profileSetupCompleted: boolean
  activeWorkspace: UserWorkspace
}
