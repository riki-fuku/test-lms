import type { FetchTimerLogGraphQuery } from '@/features/timerLog/api/fetchTimerLogGraph'
import fetchTimerLogGraph from '@/features/timerLog/api/fetchTimerLogGraph'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchTimerLogGraph(
  workspaceId: string,
  query: FetchTimerLogGraphQuery,
  swrOptions?: SWRConfiguration,
) {
  const fetcher = () => fetchTimerLogGraph(workspaceId, query)
  return useSWR([`/api/workspaces/${workspaceId}/timer-logs/graph`, query], fetcher, swrOptions)
}
