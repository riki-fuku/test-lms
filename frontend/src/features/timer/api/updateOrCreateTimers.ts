import type { DraftTimer } from '@/features/timer/types/DraftTimer'
import type { Timer } from '@/features/timer/types/Timer'
import { Http } from '@/lib/api-client'

type UpdateOrCreateTimersBody = {
  timers: (Timer | DraftTimer)[]
  userId: string
}

export default function updateOrCreateTimers(body: UpdateOrCreateTimersBody): Promise<Timer[]> {
  return Http.axios()
    .put<{ data: Timer[] }>(`/api/timers/update-or-create`, body)
    .then((res) => {
      return res.data.data
    })
}
