import { Http } from '@/lib/api-client'

export default async function deleteQuestionComment(
  workspaceId: string,
  questionId: string,
  questionCommentId: string,
) {
  return await Http.axios()
    .delete(`/api/workspaces/${workspaceId}/questions/${questionId}/comments/${questionCommentId}`)
    .then((res) => res.data.data)
}
