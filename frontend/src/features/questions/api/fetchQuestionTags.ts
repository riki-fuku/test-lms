import type { QuestionTag } from '@/features/questions/types/QuestionTag'
import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'

export default async function fetchQuestionTags(workspaceId: string) {
  return Http.axios()
    .get<AxiosResponse<QuestionTag[]>>(`/api/workspaces/${workspaceId}/question-tags`)
    .then((res) => res.data.data)
}
