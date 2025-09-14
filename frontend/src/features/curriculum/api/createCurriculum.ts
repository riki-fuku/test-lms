import { Http } from '@/lib/api-client'

export default function createCurriculum(
  workspaceId: string,
  body: {
    title: string
    isPublic: number
    order: number
    detail: string
    eyeCatchUrl: string
  },
) {
  return Http.axios()
    .post(`/api/workspaces/${workspaceId}/curriculums`, body)
    .then((res) => res.data.data)
}
