import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'

export default async function deleteTimerLog(workspaceId: string, timerLogId: string) {
  return Http.axios()
    .delete<AxiosResponse>(`/api/workspaces/${workspaceId}/timer-logs/${timerLogId}`)
    .then((res) => res.data)
}
