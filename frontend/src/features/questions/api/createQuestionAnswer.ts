import { Http } from '@/lib/api-client'

export type CreateQuestionAnswerBody = {
  content: string
  guardType: 'user' | 'employee'
  policyAgreedAt: string
}

export default async function createQuestionAnswer(
  workspaceId: string,
  questionId: string,
  body: CreateQuestionAnswerBody,
) {
  return Http.axios()
    .post(`/api/workspaces/${workspaceId}/questions/${questionId}/answers`, body)
    .then((res) => res.data.data)
}
