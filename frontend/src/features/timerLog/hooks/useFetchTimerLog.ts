import fetchTimerLog from '@/features/timerLog/api/fetchTimerLog'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchTimerLog(
  workspaceId: string,
  timerLogId: string,
  swrOptions?: SWRConfiguration,
) {
  const fetcher = () => fetchTimerLog(workspaceId, timerLogId)
  return useSWR(`/api/workspaces/${workspaceId}/timer-logs/${timerLogId}`, fetcher, swrOptions)
}
