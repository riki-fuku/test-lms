import { Http } from '@/lib/api-client'

export default function recordCurriculumProgress(
  workspaceId: string,
  body: { userId: string; sectionId: string },
) {
  return Http.axios()
    .post(`api/workspaces/${workspaceId}/curriculum-progresses`, {
      user_id: body.userId,
      section_id: body.sectionId,
    })
    .then((res) => res.data)
}
