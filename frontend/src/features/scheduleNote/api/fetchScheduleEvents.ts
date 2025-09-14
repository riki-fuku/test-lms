import type { ScheduleEvent } from '@/features/scheduleNote/types/Event'
import { Http } from '@/lib/api-client'

export type FetchScheduleEventsQuery = {
  userId: string
  startDatetime: string
  endDatetime: string
}

export default function fetchScheduleEvents(query: FetchScheduleEventsQuery) {
  return Http.axios()
    .get<{ data: ScheduleEvent[] }>(`/api/user-schedule-events`, {
      params: query,
    })
    .then((res) => res.data.data)
}
