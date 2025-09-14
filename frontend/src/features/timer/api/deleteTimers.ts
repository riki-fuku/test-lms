import type { Timer } from '@/features/timer/types/Timer'
import { Http } from '@/lib/api-client'

type DeleteTimersQuery = {
  timerIds: string[]
}

export default function deleteTimers(query: DeleteTimersQuery): Promise<Timer[]> {
  return Http.axios()
    .delete<{ data: Timer[] }>(`/api/timers`, { params: query })
    .then((res) => res.data.data)
}
