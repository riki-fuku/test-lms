import type {
  ScheduleEvent,
  UserPeriodicScheduleEventOfUpdateBody,
} from '@/features/scheduleNote/types/Event'
import { Http } from '@/lib/api-client'

export default function updateUserPeriodicScheduleEvent(
  id: string,
  event: UserPeriodicScheduleEventOfUpdateBody,
): Promise<ScheduleEvent> {
  return Http.axios()
    .patch<{ data: ScheduleEvent }>(`/api/user-periodic-schedule-events/${id}`, event)
    .then((res) => {
      return res.data.data
    })
}
