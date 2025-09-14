import fetchHelpCategories from '@/features/help/api/fetchHelpCategories'
import useSWR from 'swr'

export default function useFetchHelpCategories(workspaceId: string) {
  const fetcher = () => fetchHelpCategories(workspaceId)
  return useSWR(`/api/workspaces/${workspaceId}/guide/categories`, fetcher)
}
