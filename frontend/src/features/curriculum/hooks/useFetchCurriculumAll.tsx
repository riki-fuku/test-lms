import fetchCurriculumAll from '@/features/curriculum/api/fetchCurriculumAll'
import useSWR from 'swr'

export default function useFetchCurriculumAll(workspaceId: string, curriculumId: string) {
  const fetcher = () => fetchCurriculumAll(workspaceId, curriculumId)
  return useSWR(`/api/workspaces/${workspaceId}/curriculums/all/${curriculumId}/.`, fetcher)
}
