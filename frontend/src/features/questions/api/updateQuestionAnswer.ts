import { Http } from '@/lib/api-client'

type UpdateQuestionAnswerBody = {
  content?: string
  isBestAnswer?: boolean
}

export default async function updateQuestionAnswer(
  workspaceId: string,
  questionId: string,
  questionAnswerId: string,
  body: UpdateQuestionAnswerBody,
) {
  return Http.axios()
    .patch(
      `/api/workspaces/${workspaceId}/questions/${questionId}/answers/${questionAnswerId}`,
      body,
    )
    .then((res) => res.data.data)
}
