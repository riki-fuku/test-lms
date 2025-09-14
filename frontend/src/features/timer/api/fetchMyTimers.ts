import type { Timer } from '@/features/timer/types/Timer'
import { Http } from '@/lib/api-client'

export default function fetchMyTimers(): Promise<Timer[]> {
  return Http.axios()
    .get('/api/my/timers')
    .then((res) => res.data.data)
}
