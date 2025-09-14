import { Http } from '@/lib/api-client'

export default function updateSection(
  workspaceId: string,
  sectionId: string,
  body: {
    title: string
    text: string
    isPublic: number
    order: number
  },
) {
  return Http.axios()
    .patch(`/api/workspaces/${workspaceId}/sections/${sectionId}`, body)
    .then((res) => res.data.data)
}
