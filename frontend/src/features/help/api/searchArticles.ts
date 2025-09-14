import type { PaginationResponse } from '@/features/dashboard/types/PaginationResponse'
import type { Article } from '@/features/help/types/Article'
import { Http } from '@/lib/api-client'

export type SearchArticlesRequest = {
  keyword: string
  page?: number
}

export type SearchArticlesResponse = PaginationResponse<Article>

export default function searchArticles(workspaceId: string, query: SearchArticlesRequest) {
  return Http.axios()
    .get<SearchArticlesResponse>(`/api/workspaces/${workspaceId}/guide/articles`, { params: query })
    .then((res) => res.data)
}
