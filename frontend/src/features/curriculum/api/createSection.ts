import { Http } from '@/lib/api-client'

export default function createSection(
  workspaceId: string,
  body: {
    chapterId: string
    title: string
    text: string
    isPublic: number
    order: number
  },
) {
  return Http.axios()
    .post(`/api/workspaces/${workspaceId}/sections`, body)
    .then((res) => res.data.data)
}
