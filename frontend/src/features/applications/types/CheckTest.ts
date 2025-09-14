import type { User } from '@/features/user/types/User'

export type CheckTestReq = {
  userId: string
  workspaceId?: string
  startDatetime?: string
  githubRepositoryUrl?: string | null
}

export type CheckTestRes = {
  id: string
  userId: string
  workspaceId?: string
  startDatetime: string
  endDatetime: string
  githubRepositoryUrl: string | null
  submissionDate: string | null
  status: {
    id: number
    name: string
  }
  user: User
}
