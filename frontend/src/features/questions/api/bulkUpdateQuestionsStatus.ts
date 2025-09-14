import { Http } from '@/lib/api-client'
import type { AxiosResponse } from 'axios'

type BulkUpdateQuestionsStatusBody = {
  status: number
  filter: {
    questionResponderId: string
  }
}

export default async function bulkUpdateQuestionsStatus(
  workspaceId: string,
  body: BulkUpdateQuestionsStatusBody,
) {
  return Http.axios()
    .patch<AxiosResponse>(`/api/workspaces/${workspaceId}/management/questions/status`, body)
    .then((res) => res.data.data)
}
