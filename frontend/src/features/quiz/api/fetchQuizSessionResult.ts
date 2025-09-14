import type { QuizSessionResult } from '@/features/quiz/types/QuizSessionResult'
import { Http } from '@/lib/api-client'

export default function fetchQuizSessionResult(workspaceId: string, sessionId: string) {
  return Http.axios()
    .get<{ data: QuizSessionResult }>(
      `/api/workspaces/${workspaceId}/quizzes/sessions/${sessionId}/result`,
    )
    .then((res) => res.data.data)
}
