import type { TimerLog } from '@/features/timer/types/TimerLog'
import { Http } from '@/lib/api-client'

export default function fetchTimerLog(workspaceId: string, timerLogId: string) {
  return Http.axios()
    .get<{ data: TimerLog }>(`/api/workspaces/${workspaceId}/timer-logs/${timerLogId}`)
    .then((res) => res.data.data)
}
