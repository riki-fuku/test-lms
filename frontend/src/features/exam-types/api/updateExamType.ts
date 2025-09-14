import { Http } from '@/lib/api-client'

type RequestBody = {
  name: string
}

export default function updateExamType(workspaceId: string, examTypeId: string, body: RequestBody) {
  return Http.axios()
    .patch(`/api/workspaces/${workspaceId}/exam-types/${examTypeId}`, body)
    .then((res) => res.data.data)
}
