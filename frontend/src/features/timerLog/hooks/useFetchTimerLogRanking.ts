import fetchTimerLogRanking from '@/features/timerLog/api/fetchTimerLogRanking'
import useSWR from 'swr'

export default function useFetchTimerLogRanking(workspaceId: string, userId: string) {
  const fetcher = () => fetchTimerLogRanking(workspaceId, userId)
  return useSWR(`/api/workspaces/${workspaceId}/timer-logs/ranking`, fetcher)
}
