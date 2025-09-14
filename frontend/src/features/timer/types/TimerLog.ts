export const INPROGRESS = 'in_progress'
export const PAUSED = 'paused'
export const COMPLETED = 'completed'
export type TimerLogStatus = typeof INPROGRESS | typeof COMPLETED | typeof PAUSED

export type TimerLog = {
  id: string
  userId: string
  workspaceId: string
  startDatetime: string
  endDatetime: string
  originalSeconds: number
  elapsedSeconds: number
  status: TimerLogStatus
}
