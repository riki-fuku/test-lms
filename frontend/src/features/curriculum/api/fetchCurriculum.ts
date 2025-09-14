import type { Curriculum } from '@/features/curriculum/types/Curriculum'
import { Http } from '@/lib/api-client'

export default function fetchCurriculum(workspaceId: string, id: string) {
  return Http.axios()
    .get<{ data: Curriculum }>(`/api/workspaces/${workspaceId}/curriculums/${id}`)
    .then((res) => res.data.data)
}
