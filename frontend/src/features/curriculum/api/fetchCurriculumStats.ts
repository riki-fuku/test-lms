import type { CurriculumStats } from '@/features/curriculum/types/CurriculumStats'
import { Http } from '@/lib/api-client'

export type FetchCurriculumStatsQuery = {
  userId: string
}

export default function fetchCurriculumStats(
  workspaceId: string,
  query: FetchCurriculumStatsQuery,
) {
  return Http.axios()
    .get<{ data: CurriculumStats }>(`/api/workspaces/${workspaceId}/curriculums/stats`, {
      params: query,
    })
    .then((res) => res.data.data)
}
