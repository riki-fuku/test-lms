import fetchUserPeriodicScheduleEvents from '@/features/scheduleNote/api/fetchUserPeriodicScheduleEvents'
import type { FetchUserPeriodicScheduleEventQuery } from '@/features/scheduleNote/types/Event'
import useSWR from 'swr'

export default function useFetchUserPeriodicScheduleEvents(
  query: FetchUserPeriodicScheduleEventQuery,
) {
  const fetcher = () => fetchUserPeriodicScheduleEvents(query)
  return useSWR([`/api/user-periodic-schedule-events`, query], fetcher)
}
