import fetchHelpArticle from '@/features/help/api/fetchHelpArticle'
import useSWR from 'swr'

export default function useFetchHelpArticle(
  workspaceId: string,
  categoryId: string,
  chapterId: string,
  articleId: string,
) {
  const fetcher = () => fetchHelpArticle(workspaceId, categoryId, chapterId, articleId)
  return useSWR(
    `/api/workspaces/${workspaceId}/guide/categories/${categoryId}/chapters/${chapterId}/articles/${articleId}`,
    fetcher,
  )
}
