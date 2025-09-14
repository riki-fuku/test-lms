import type { QuestionCategory } from '@/features/questions/types/QuestionCategory'
import { Http } from '@/lib/api-client'

export default async function fetchQuestionCategories() {
  return Http.axios()
    .get<QuestionCategory[]>(`/api/masters/question-categories`)
    .then((res) => res.data)
}
