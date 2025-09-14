import fetchUserTaskStatuses from '@/features/backlog/api/fetchUserTaskStatuses'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchUserTaskStatuses(swrOptions?: SWRConfiguration) {
  const fetcher = () => fetchUserTaskStatuses()
  return useSWR(`/api/masters/user-tasks-statuses`, fetcher, swrOptions)
}
