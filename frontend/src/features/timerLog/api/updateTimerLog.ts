import type { TimerLog, TimerLogStatus } from '@/features/timer/types/TimerLog'
import { Http } from '@/lib/api-client'

export type UpdateTimerLogBody = {
  startDatetime?: string
  endDatetime?: string
  elapsedSeconds?: number
  status?: TimerLogStatus
}

export default function updateTimerLog(
  workspaceId: string,
  timerLogId: string,
  body: UpdateTimerLogBody,
): Promise<TimerLog> {
  return Http.axios()
    .patch<{ data: TimerLog }>(`/api/workspaces/${workspaceId}/timer-logs/${timerLogId}`, body)
    .then((res) => res.data.data)
}
