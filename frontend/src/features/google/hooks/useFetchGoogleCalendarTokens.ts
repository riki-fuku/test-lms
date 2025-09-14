import type { FetchGoogleCalendarTokenQuery } from '@/features/google/api/fetchGoogleCalendarToken'
import fetchGoogleCalendarTokens from '@/features/google/api/fetchGoogleCalendarToken'
import useSWR from 'swr'

export default function useFetchGoogleCalendarTokens(query: FetchGoogleCalendarTokenQuery) {
  const fetcher = () => fetchGoogleCalendarTokens(query)
  return useSWR([`/api/google-calendar-tokens`, query], fetcher)
}
