import { Http } from '@/lib/api-client'

export type CreateQuestionCommentBody = {
  content: string
  guardType: 'user' | 'employee'
}

export default async function createQuestionComment(
  workspaceId: string,
  questionId: string,
  body: CreateQuestionCommentBody,
) {
  return Http.axios()
    .post(`/api/workspaces/${workspaceId}/questions/${questionId}/comments`, body)
    .then((res) => res.data.data)
}
