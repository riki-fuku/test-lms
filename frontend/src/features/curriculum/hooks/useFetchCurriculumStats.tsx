import type { FetchCurriculumStatsQuery } from '@/features/curriculum/api/fetchCurriculumStats'
import fetchCurriculumStats from '@/features/curriculum/api/fetchCurriculumStats'
import useSWR from 'swr'

export default function useFetchCurriculumStats(
  workspaceId: string,
  query: FetchCurriculumStatsQuery,
) {
  const fetcher = () => fetchCurriculumStats(workspaceId, query)
  return useSWR(`/api/workspaces/${workspaceId}/curriculums/stats`, fetcher)
}
