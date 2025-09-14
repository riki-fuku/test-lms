import { Http } from '@/lib/api-client'

export type CreateQuestionAnswerCommentBody = {
  content: string
  guardType: 'user' | 'employee'
}

export default async function createQuestionAnswerComment(
  workspaceId: string,
  questionId: string,
  questionAnswerId: string,
  body: CreateQuestionAnswerCommentBody,
) {
  return Http.axios()
    .post(
      `/api/workspaces/${workspaceId}/questions/${questionId}/answers/${questionAnswerId}/comments`,
      body,
    )
    .then((res) => res.data.data)
}
