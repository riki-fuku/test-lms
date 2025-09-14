import type { CheckTestReq, CheckTestRes } from '@/features/applications/types/CheckTest'
import { Http } from '@/lib/api-client'

export default function postCheckTest(workspaceId: string, body: CheckTestReq) {
  return Http.axios()
    .post<{ body: CheckTestRes }>(`/api/workspaces/${workspaceId}/applications/check-test`, body)
    .then((res) => res.data.body)
}
