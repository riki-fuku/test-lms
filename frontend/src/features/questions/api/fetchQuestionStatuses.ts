import type { QuestionStatus } from '@/features/questions/types/QuestionStatus'
import { Http } from '@/lib/api-client'

export default async function fetchQuestionStatuses() {
  return Http.axios()
    .get<QuestionStatus[]>(`/api/masters/question-statuses`)
    .then((res) => res.data)
}
