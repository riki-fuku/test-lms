import { Http } from '@/lib/api-client'

export default function createChapter(
  workspaceId: string,
  body: {
    curriculumId: string
    title: string
    isPublic: number
    order: number
  },
) {
  return Http.axios()
    .post(`/api/workspaces/${workspaceId}/curriculum-chapters`, body)
    .then((res) => res.data.data)
}
