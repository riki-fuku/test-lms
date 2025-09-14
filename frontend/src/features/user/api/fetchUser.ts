import type { Plan } from '@/features/plan/types/Plan'
import { Http } from '@/lib/api-client'

type Response = {
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
  workspaceId: string
  planId: string
  startingDate: string | null
  maxMeetings: number | null
  isActive: boolean
  lastLoginAt: string | null
  graduateMeetingDatetime: string | null
  daysElapsed: number | null
  plan: Plan
  graduateDate: string | null
  workspace: {
    id: string
    clientId: string
    name: string
  }
  status: {
    value: number
    label: string
  }
  isRecentlyActive: boolean
  proCertification: {
    id: string
    userWorkspaceId: string
    passedAt: string
    comment: string | null
  } | null
}

export default function fetchUser(workspaceId: string, userId: string) {
  return Http.axios()
    .get<{ data: Response }>(`/api/workspaces/${workspaceId}/users/${userId}`)
    .then((res) => res.data.data)
}
