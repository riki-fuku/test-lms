import type { GraphData } from '@/features/studentInformation/types/GraphData'
import { Http } from '@/lib/api-client'

export type FetchTimerLogGraphQuery = {
  userId: string
  period: 'day' | 'week' | 'month'
}

export default function fetchTimerLogGraph(workspaceId: string, query: FetchTimerLogGraphQuery) {
  return Http.axios()
    .get<{ data: GraphData }>(`/api/workspaces/${workspaceId}/timer-logs/graph`, {
      params: query,
    })
    .then((res) => res.data.data)
}
