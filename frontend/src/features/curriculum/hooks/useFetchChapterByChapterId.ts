import fetchChapterByChapterId from '@/features/curriculum/api/fetchChapterByChapterId'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchChapterByChapterId(
  workspaceId: string,
  chapterId: string,
  options: SWRConfiguration,
) {
  const fetcher = () => fetchChapterByChapterId(workspaceId, chapterId)
  return useSWR(`/api/workspaces/${workspaceId}/curriculum-chapters/${chapterId}`, fetcher, options)
}
