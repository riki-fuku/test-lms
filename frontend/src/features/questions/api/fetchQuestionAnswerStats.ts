import type { QuestionAnswerStats } from '@/features/questions/types/QuestionAnswerStats'
import { Http } from '@/lib/api-client'

export default async function fetchQuestionAnswerStats(
  workspaceId: string,
  query: { guardType: 'user' | 'employee' },
) {
  return await Http.axios()
    .get<{ data: QuestionAnswerStats }>(`/api/workspaces/${workspaceId}/question-answers/stats`, {
      params: query,
    })
    .then((res) => res.data.data)
}
