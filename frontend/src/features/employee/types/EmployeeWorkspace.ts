import type { Workspace } from '@/features/workspace/types/Workspace'

export type EmployeeWorkspace = {
  id: string
  employeeId: string
  workspaceId: string
  possibleMeetings: number | null
  userCapacity: number | null
  priority: number | null
  meetingUrl: string | null
  wages: number
  isActive: boolean
  workspace?: Workspace
}
