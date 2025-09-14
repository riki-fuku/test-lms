import { Http } from '@/lib/api-client'

export default function deleteUserPeriodicScheduleEvent(id: string) {
  return Http.axios()
    .delete<string>(`/api/user-periodic-schedule-events/${id}`)
    .then((res) => res.data)
}
