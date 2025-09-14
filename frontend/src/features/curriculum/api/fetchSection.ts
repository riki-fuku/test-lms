import type { Section } from '@/features/curriculum/types/Section'
import { Http } from '@/lib/api-client'

export default function fetchSection(workspaceId: string, id: string) {
  return Http.axios()
    .get<{ data: Section }>(`/api/workspaces/${workspaceId}/sections/${id}`)
    .then((res) => res.data.data)
}
