import type {
  EventsOfDatabase,
  ScheduleEventOfCreateBody,
} from '@/features/scheduleNote/types/Event'
import { Http } from '@/lib/api-client'

export default function createScheduleEvent(body: ScheduleEventOfCreateBody) {
  return Http.axios()
    .post<{ data: EventsOfDatabase }>(`/api/user-schedule-events/`, body)
    .then((res) => {
      return res.data.data
    })
}
