import type { Workspace } from '@/features/workspace/types/Workspace'

export type UserWorkspace = {
  id: string
  workspaceId: string
  planId: string
  startAt: string
  maxMeetings: number
  isActive: boolean
  workspace?: Workspace
  status: {
    value: number
    label: string
  }
}
