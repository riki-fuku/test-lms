import type { Chapter } from '@/features/help/types/Chapter'
import { Http } from '@/lib/api-client'

export default function fetchHelpChapter(
  workspaceId: string,
  categoryId: string,
  chapterId: string,
) {
  return Http.axios()
    .get<{ data: Chapter }>(
      `/api/workspaces/${workspaceId}/guide/categories/${categoryId}/chapters/${chapterId}`,
    )
    .then((res) => res.data.data)
}
