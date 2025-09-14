import type { Chapter } from '@/features/curriculum/types/Chapter'
import { Http } from '@/lib/api-client'

export default function fetchChapterByChapterId(workspaceId: string, chapterId: string) {
  return Http.axios()
    .get<{ data: Chapter }>(`/api/workspaces/${workspaceId}/curriculum-chapters/${chapterId}`)
    .then((res) => res.data.data)
}
