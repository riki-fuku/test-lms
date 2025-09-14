import type {
  ScheduleEvent,
  UserPeriodicScheduleEventOfCreateBody,
} from '@/features/scheduleNote/types/Event'
import { Http } from '@/lib/api-client'

export default function createUserPeriodicScheduleEvent(
  event: UserPeriodicScheduleEventOfCreateBody,
) {
  return Http.axios()
    .post<{ data: ScheduleEvent }>('/api/user-periodic-schedule-events', event)
    .then((res) => {
      return res.data.data
    })
}
