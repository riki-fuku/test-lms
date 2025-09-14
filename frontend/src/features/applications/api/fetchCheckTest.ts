import type { CheckTestRes } from '@/features/applications/types/CheckTest'
import { Http } from '@/lib/api-client'

export type FetchCheckTestQuery = {
  page: number
}

export default function fetchCheckTest(workspaceId: string, testId: string) {
  return Http.axios()
    .get<{ data: CheckTestRes }>(`/api/workspaces/${workspaceId}/applications/check-test/${testId}`)
    .then((res) => res.data)
}
