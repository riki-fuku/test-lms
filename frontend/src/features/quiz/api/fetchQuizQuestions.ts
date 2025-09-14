import type { Quiz } from '@/features/quiz/types/Quiz'
import { Http } from '@/lib/api-client'

export default function fetchQuizQuestions(workspaceId: string, chapterId: string) {
  return Http.axios()
    .get<{ data: Quiz }>(`/api/workspaces/${workspaceId}/quizzes/chapters/${chapterId}/questions`)
    .then((res) => res.data.data)
}
