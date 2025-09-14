import type { Question } from '@/features/questions/types/Question'
import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'

export default async function fetchQuestion(workspaceId: string, questionId: string) {
  return Http.axios()
    .get<AxiosResponse<Question>>(`/api/workspaces/${workspaceId}/questions/${questionId}`)
    .then((res) => res.data.data)
}
