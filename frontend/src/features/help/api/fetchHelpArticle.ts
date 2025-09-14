import type { Article } from '@/features/help/types/Article'
import { Http } from '@/lib/api-client'

export default function fetchHelpArticle(
  workspaceId: string,
  categoryId: string,
  chapterId: string,
  articleId: string,
) {
  return Http.axios()
    .get<{ data: Article }>(
      `/api/workspaces/${workspaceId}/guide/categories/${categoryId}/chapters/${chapterId}/articles/${articleId}`,
    )
    .then((res) => res.data.data)
}
