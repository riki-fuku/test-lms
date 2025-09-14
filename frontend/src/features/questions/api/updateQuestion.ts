import { Http } from '@/lib/api-client'

export type UpdateQuestionBody = {
  questionResponderId?: string | null
  category?: number
  title?: string
  content?: string
  status?: number
  isPublic?: boolean
}

export default async function updateQuestion(
  workspaceId: string,
  questionId: string,
  body: UpdateQuestionBody,
) {
  return Http.axios()
    .patch(`/api/workspaces/${workspaceId}/questions/${questionId}`, body)
    .then((res) => res.data.data)
}
