import { Http } from '@/lib/api-client'

export default async function deleteQuestionAnswerComment(
  workspaceId: string,
  questionId: string,
  questionAnswerId: string,
  questionAnswerCommentId: string
) {
  return await Http.axios()
    .delete(
      `/api/workspaces/${workspaceId}/questions/${questionId}/answers/${questionAnswerId}/comments/${questionAnswerCommentId}`,
    )
    .then((res) => res.data.data)
}
