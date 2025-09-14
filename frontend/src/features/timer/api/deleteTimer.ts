import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'

export default function deleteTimer(timerId: number) {
  return Http.axios().delete<AxiosResponse>(`api/timers/${timerId}`)
}
