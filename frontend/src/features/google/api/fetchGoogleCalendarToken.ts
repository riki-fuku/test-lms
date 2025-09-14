import { Http } from '@/lib/api-client'
import type { GoogleCalendarToken } from '../types/GoogleCalendarToken'

export type FetchGoogleCalendarTokenQuery = {
  actorId: string
}

export default function fetchGoogleCalendarTokens(query: FetchGoogleCalendarTokenQuery) {
  return Http.axios()
    .get<{ data: GoogleCalendarToken[] }>(`/api/google-calendar-tokens`, {
      params: query,
    })
    .then((res) => res.data.data)
}
