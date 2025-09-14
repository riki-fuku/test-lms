import type { CoachChangeReq, CoachChangeRes } from '@/features/applications/types/CoachChange'
import { Http } from '@/lib/api-client'

export default function postCoachChange(data: CoachChangeReq) {
  return Http.axios()
    .post<{ data: CoachChangeRes }>(
      `/api/workspaces/${data.workspaceId}/applications/coach-change`,
      data,
    )
    .then((res) => res.data.data)
}
