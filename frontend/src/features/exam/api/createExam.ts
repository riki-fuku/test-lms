import { Http } from '@/lib/api-client'

type RequestBody = {
  examTypeId: string
  name: string
}

export default function createExam(workspaceId: string, body: RequestBody) {
  return Http.axios()
    .post(`/api/workspaces/${workspaceId}/exams`, body)
    .then((res) => res.data.data)
}
