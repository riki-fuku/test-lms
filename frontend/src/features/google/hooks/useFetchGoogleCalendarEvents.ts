import type { FetchGoogleCalendarEventsQuery } from '@/features/google/api/googleCalendar/fetchGoogleCalendarEvents'
import fetchGoogleCalendarEvents from '@/features/google/api/googleCalendar/fetchGoogleCalendarEvents'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchGoogleCalendarEvents(
  query: FetchGoogleCalendarEventsQuery,
  options?: SWRConfiguration,
) {
  const fetcher = () => fetchGoogleCalendarEvents(query)
  return useSWR([`/api/google-calendar-events`, query], fetcher, options)
}
