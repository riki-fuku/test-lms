import fetchCurriculum from '@/features/curriculum/api/fetchCurriculum'
import useSWR from 'swr'

export default function useFetchCurriculum(workspaceId: string, id: string) {
  const fetcher = () => fetchCurriculum(workspaceId, id)
  return useSWR(`/api/workspaces/${workspaceId}/curriculums/${id}`, fetcher)
}
