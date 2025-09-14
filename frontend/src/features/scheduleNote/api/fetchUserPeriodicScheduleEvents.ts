import type { FetchUserPeriodicScheduleEventQuery } from '@/features/scheduleNote/types/Event'
import type { UserPeriodicScheduleEvent } from '@/features/scheduleNote/types/UserPeriodicScheduleEvent'

import { Http } from '@/lib/api-client'

export default function fetchUserPeriodicScheduleEvents(
  query: FetchUserPeriodicScheduleEventQuery,
) {
  return Http.axios()
    .get<{ data: UserPeriodicScheduleEvent[] }>('/api/user-periodic-schedule-events', {
      params: query,
    })
    .then((res) => res.data.data)
}
