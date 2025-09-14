import { Http } from '@/lib/api-client'

export default function deleteScheduleEvent(id: string) {
  return Http.axios()
    .delete<number>(`/api/user-schedule-events/${id}`)
    .then((res) => res.data)
}
