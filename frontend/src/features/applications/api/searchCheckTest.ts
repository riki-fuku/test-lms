import type { CheckTestRes } from '@/features/applications/types/CheckTest'
import { Http } from '@/lib/api-client'

type searchCheckTestQuery = {
  userId: string
}

export default function searchCheckTest(workspaceId: string, query: searchCheckTestQuery) {
  return Http.axios()
    .get<{ data: CheckTestRes[] }>(
      `/api/workspaces/${workspaceId}/applications/check-test/search`,
      { params: query },
    )
    .then((res) => res.data.data)
}
