import { Http } from '@/lib/api-client'

type RequestBody = {
  name: string
}

export default function createExamType(workspaceId: string, body: RequestBody) {
  return Http.axios()
    .post(`/api/workspaces/${workspaceId}/exam-types`, body)
    .then((res) => res.data.data)
}
