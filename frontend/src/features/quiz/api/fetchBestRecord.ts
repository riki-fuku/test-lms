import type { QuizSession } from '@/features/quiz/types/QuizSession'
import { Http } from '@/lib/api-client'

export default function fetchBestRecord(workspaceId: string, chapterId: string) {
  return Http.axios()
    .get<{ data: QuizSession }>(
      `/api/workspaces/${workspaceId}/quizzes/chapters/${chapterId}/best-score`,
    )
    .then((res) => res.data.data)
}
