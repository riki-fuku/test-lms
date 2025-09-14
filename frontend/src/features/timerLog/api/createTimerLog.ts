import type { TimerLog } from '@/features/timer/types/TimerLog'
import { Http } from '@/lib/api-client'

export type CreateTimerLogBody = {
  id?: string
  userId: string
  startDatetime: string
  endDatetime?: string
  originalSeconds?: number
  elapsedSeconds?: number
}

export default function createTimerLog(
  workspaceId: string,
  body: CreateTimerLogBody,
): Promise<TimerLog> {
  return Http.axios()
    .post<{ data: TimerLog }>(`/api/workspaces/${workspaceId}/timer-logs`, body)
    .then((res) => res.data.data)
}
