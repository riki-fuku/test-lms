import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'
import type { GoogleCalendarToken } from '../types/GoogleCalendarToken'

export default function deleteGoogleCalendarToken(calendarTokenId: string, calendarId: string) {
  return Http.axios()
    .patch<AxiosResponse<GoogleCalendarToken>>(`/api/google-calendar-tokens/${calendarTokenId}`, {
      calendar_id: calendarId,
    })
    .then((res) => res.data.data)
}
