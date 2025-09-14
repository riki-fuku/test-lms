import type { FetchScheduleEventsQuery } from '@/features/scheduleNote/api/fetchScheduleEvents'
import fetchScheduleEvents from '@/features/scheduleNote/api/fetchScheduleEvents'
import useSWR from 'swr'

export default function useFetchScheduleEvents(query: FetchScheduleEventsQuery) {
  const fetcher = () => fetchScheduleEvents(query)
  return useSWR([`/api/user-schedule-events`, query], fetcher)
}
