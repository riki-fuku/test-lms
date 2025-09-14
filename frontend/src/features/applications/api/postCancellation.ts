import type { CancellationReq, CancellationRes } from '@/features/applications/types/Cancellation'
import { Http } from '@/lib/api-client'

export default function postCancellation(data: CancellationReq) {
  return Http.axios()
    .post<{ data: CancellationRes }>(
      `/api/workspaces/${data.workspaceId}/applications/cancellation`,
      data,
    )
    .then((res) => res.data.data)
}
