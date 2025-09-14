import type { TimerLog } from '@/features/timer/types/TimerLog'
import { Http } from '@/lib/api-client'

export type FetchTimerLogQuery = {
  userId: string
  startDatetime: string
  endDatetime: string
}

export default function fetchTimerLogs(workspaceId: string, query: FetchTimerLogQuery) {
  return Http.axios()
    .get<{ data: TimerLog[] }>(`/api/workspaces/${workspaceId}/timer-logs`, { params: query })
    .then((res) => res.data.data)
}
