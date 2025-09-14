import { Http } from '@/lib/api-client'

type CompleteSessionBody = {
  totalTimeMs: number
}

export default function completeSession(
  workspaceId: string,
  sessionId: string,
  body: CompleteSessionBody,
) {
  return Http.axios()
    .patch<void>(`/api/workspaces/${workspaceId}/quizzes/sessions/${sessionId}/complete`, body)
    .then((res) => res.data)
}
