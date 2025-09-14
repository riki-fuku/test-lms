import { Http } from '@/lib/api-client'

export default function updateCurriculum(
  workspaceId: string,
  curriculumId: string,
  body: {
    title: string
    isPublic: number
    order: number
    detail: string
    eyeCatchUrl: string
  },
) {
  return Http.axios()
    .patch(`/api/workspaces/${workspaceId}/curriculums/${curriculumId}`, body)
    .then((res) => res.data.data)
}
