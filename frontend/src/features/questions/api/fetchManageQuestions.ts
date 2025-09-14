import type { Question } from '@/features/questions/types/Question'
import { Http } from '@/lib/api-client'

export type FetchManageQuestionsMeta = {
  currentPage: number
  from: number
  lastPage: number
  perPage: number
  to: number
  total: number
  count: {
    needsActionCount: number
    waitingUserReplyCount: number
  }
}

export type FetchManageQuestionsQuery = {
  page: number
  filterType: string
  keyword: string
}

export default async function fetchManageQuestions(
  workspaceId: string,
  query: FetchManageQuestionsQuery,
) {
  return Http.axios()
    .get<{ data: Question[]; meta: FetchManageQuestionsMeta }>(
      `/api/workspaces/${workspaceId}/management/questions`,
      {
        params: query,
      },
    )
    .then((res) => res.data)
}
