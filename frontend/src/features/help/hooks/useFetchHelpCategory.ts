import fetchHelpCategory from '@/features/help/api/fetchHelpCategory'
import useSWR from 'swr'

export default function useFetchHelpCategory(workspaceId: string, categoryId: string) {
  const fetcher = () => fetchHelpCategory(workspaceId, categoryId)
  return useSWR(`/api/workspaces/${workspaceId}/guide/categories/${categoryId}`, fetcher)
}
