import type { Pagination } from '@/constants/paginate'
import type { CheckTestRes } from '@/features/applications/types/CheckTest'
import { Http } from '@/lib/api-client'

export type FetchCheckTestsQuery = {
  page: number
}

export default function fetchCheckTests(workspaceId: string, query: FetchCheckTestsQuery) {
  return Http.axios()
    .get<{ data: CheckTestRes[]; meta: Pagination }>(
      `/api/workspaces/${workspaceId}/applications/check-test`,
      { params: query },
    )
    .then((res) => res.data)
}
