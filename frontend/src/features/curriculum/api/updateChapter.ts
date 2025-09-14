import { Http } from '@/lib/api-client'

export default function updateChapter(
  workspaceId: string,
  chapterId: string,
  body: {
    curriculumId: string
    title: string
    isPublic: number
    order: number
  },
) {
  return Http.axios()
    .patch(`/api/workspaces/${workspaceId}/curriculum-chapters/${chapterId}`, body)
    .then((res) => res.data.data)
}
