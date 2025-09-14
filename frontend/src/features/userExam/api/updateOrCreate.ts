import { Http } from '@/lib/api-client'

type RequestBody = {
  examId: string
  userId: string
  score: string
}

export default function updateOrCreate(workspaceId: string, body: RequestBody) {
  return Http.axios()
    .patch(`/api/workspaces/${workspaceId}/user-exams`, body)
    .then((res) => res.data.data)
}
