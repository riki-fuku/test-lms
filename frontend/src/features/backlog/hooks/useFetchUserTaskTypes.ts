import fetchUserTaskTypes from '@/features/backlog/api/fetchUserTaskTypes'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchUserTaskTypes(swrOptions?: SWRConfiguration) {
  const fetcher = () => fetchUserTaskTypes()
  return useSWR(`/api/masters/user-task-types`, fetcher, swrOptions)
}
