import type { Curriculum } from '@/features/curriculum/types/Curriculum'
import { Http } from '@/lib/api-client'

export type SearchCurriculumsQuery = {
  keyword: string
}

export default async function searchCurriculums(
  workspaceId: string,
  query: SearchCurriculumsQuery,
) {
  return Http.axios()
    .get<{ data: Curriculum[] }>(`/api/workspaces/${workspaceId}/curriculums/search`, {
      params: query,
    })
    .then((res) => res.data.data)
}
