import { Http } from '@/lib/api-client'

export default function updateArticle(
  workspaceId: string,
  categoryId: string,
  chapterId: string,
  articleId: string,
  body: {
    title: string
    content: string
  },
) {
  return Http.axios()
    .patch(
      `/api/workspaces/${workspaceId}/guide/categories/${categoryId}/chapters/${chapterId}/articles/${articleId}`,
      body,
    )
    .then((res) => res.data.data)
}
