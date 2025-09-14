import fetchSection from '@/features/curriculum/api/fetchSection'
import useSWR from 'swr'

export default function useFetchSection(workspaceId: string, id: string) {
  const fetcher = () => fetchSection(workspaceId, id)
  return useSWR(`/api/workspaces/${workspaceId}/sections/${id}`, fetcher)
}
