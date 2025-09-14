import type { GoogleCalendarEvent } from '@/features/google/types/GoogleCalendar/GoogleCalendarEvent'
import { Http } from '@/lib/api-client'

export type FetchGoogleCalendarEventsQuery = {
  employeeId: string
  startDate: string
  endDate: string
}

export default function fetchGoogleCalendarEvents(query: FetchGoogleCalendarEventsQuery) {
  return Http.axios()
    .get<GoogleCalendarEvent[]>(`/api/google-calendar-events`, {
      params: query,
    })
    .then((res) => res.data)
}
