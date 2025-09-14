import fetchCurriculumsAll from '@/features/curriculum/api/fetchCurriculumsAll'
import useSWR from 'swr'

export default function useFetchCurriculumsAll(workspaceId: string) {
  const fetcher = () => fetchCurriculumsAll(workspaceId)
  return useSWR(`/api/workspaces/${workspaceId}/curriculums/all`, fetcher)
}
