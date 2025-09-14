import type { Question } from '@/features/questions/types/Question'
import { Http } from '@/lib/api-client'

type FetchQuestionsMeta = {
  currentPage: number
  from: number
  lastPage: number
  perPage: number
  to: number
  total: number
}

export type FetchQuestionsQuery = {
  page: number
  filterType: string
  keyword: string
  guardType: 'user' | 'employee'
}

export default async function fetchQuestions(workspaceId: string, query: FetchQuestionsQuery) {
  return Http.axios()
    .get<{ data: Question[]; meta: FetchQuestionsMeta }>(
      `/api/workspaces/${workspaceId}/questions`,
      {
        params: query,
      },
    )
    .then((res) => res.data)
}
