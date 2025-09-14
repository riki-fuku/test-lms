import fetchCurriculums from '@/features/curriculum/api/fetchCurriculums'
import useSWR from 'swr'

export default function useFetchCurriculums(workspaceId: string) {
  const fetcher = () => fetchCurriculums(workspaceId)
  return useSWR(`/api/workspaces/${workspaceId}/curriculums`, fetcher)
}
