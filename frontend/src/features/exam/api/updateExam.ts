import { Http } from '@/lib/api-client'

type RequestBody = {
  examTypeId: string
  name: string
}

export default function updateExam(workspaceId: string, examId: string, body: RequestBody) {
  return Http.axios()
    .patch(`/api/workspaces/${workspaceId}/exams/${examId}`, body)
    .then((res) => res.data.data)
}
