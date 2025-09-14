import { Http } from '@/lib/api-client'

export default function deleteGoogleCalendarToken(calendarTokenId: string) {
  return Http.axios()
    .delete(`/api/google-calendar-tokens/${calendarTokenId}`)
    .then((res) => res.data.data)
}
