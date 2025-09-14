import type { FetchTimerLogQuery } from '@/features/timer/api/fetchTimerLogs'
import fetchTimerLogs from '@/features/timer/api/fetchTimerLogs'
import useSWR from 'swr'

export default function useFetchTimerLogs(workspaceId: string, query: FetchTimerLogQuery) {
  const fetcher = () => fetchTimerLogs(workspaceId, query)
  return useSWR(['/api/workspaces/${workspaceId}/timer-logs', query], fetcher)
}
