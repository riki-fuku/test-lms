import fetchHelpChapter from '@/features/help/api/fetchHelpChapter'
import useSWR from 'swr'

export default function useFetchHelpChapter(
  workspaceId: string,
  categoryId: string,
  chapterId: string,
) {
  const fetcher = () => fetchHelpChapter(workspaceId, categoryId, chapterId)
  return useSWR(
    `/api/workspaces/${workspaceId}/guide/categories/${categoryId}/chapters/${chapterId}`,
    fetcher,
  )
}
