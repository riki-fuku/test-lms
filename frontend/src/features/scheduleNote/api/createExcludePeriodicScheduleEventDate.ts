import type { ExcludePeriodicScheduleEventDateBody } from '@/features/scheduleNote/types/ExcludePeriodicScheduleEventDate'
import { Http } from '@/lib/api-client'

export default function createExcludePeriodicScheduleEventDate(
  body: ExcludePeriodicScheduleEventDateBody,
) {
  return Http.axios()
    .post(`/api/exclude-periodic-schedule-event-dates`, body)
    .then((res) => {
      return res.data.data
    })
}
