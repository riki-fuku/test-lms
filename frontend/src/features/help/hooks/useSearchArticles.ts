import type { SearchArticlesRequest } from '@/features/help/api/searchArticles'
import SearchArticles from '@/features/help/api/searchArticles'
import useSWR from 'swr'

export default function useSearchArticles(workspaceId: string, query: SearchArticlesRequest) {
  const fetcher = () => SearchArticles(workspaceId, query)
  return useSWR(
    `/api/workspaces/${workspaceId}/guide/articles?keyword=${query.keyword}&page=${query.page}`,
    fetcher,
  )
}
