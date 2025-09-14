import type { TimerLogRanking } from '@/features/timerLog/types/TimerLogRanking'
import { Http } from '@/lib/api-client'

export type TimerLogsRankingsResponse = {
  topRanking: TimerLogRanking[]
  userRanking: TimerLogRanking
}

export default function fetchTimerLogRanking(workspaceId: string, userId: string) {
  return Http.axios()
    .get<{ data: TimerLogsRankingsResponse }>(`/api/workspaces/${workspaceId}/timer-logs/ranking`, {
      params: { userId },
    })
    .then((res) => res.data.data)
}
