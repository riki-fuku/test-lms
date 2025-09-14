import type {
  EventsOfDatabase,
  ScheduleEventOfUpdateBody,
} from '@/features/scheduleNote/types/Event'
import { Http } from '@/lib/api-client'

export default function updateScheduleEvent(id: string, body: ScheduleEventOfUpdateBody) {
  return Http.axios()
    .patch<{ data: EventsOfDatabase }>(`/api/user-schedule-events/${id}`, body)
    .then((res) => {
      return res.data.data
    })
}
