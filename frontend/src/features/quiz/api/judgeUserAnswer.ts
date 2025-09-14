import type { JudgeUserAnswer, UserAnswerBody } from '@/features/quiz/types/Answer'
import { Http } from '@/lib/api-client'

export default function judgeUserAnswer(workspaceId: string, body: UserAnswerBody) {
  return Http.axios()
    .patch<{ data: JudgeUserAnswer }>(`/api/workspaces/${workspaceId}/quizzes/judge`, body)
    .then((res) => res.data.data)
}
