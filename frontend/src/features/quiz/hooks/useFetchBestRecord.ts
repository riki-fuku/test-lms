import fetchBestRecord from '@/features/quiz/api/fetchBestRecord'
import useSWR from 'swr'

export default function useFetchBestRecord(workspaceId: string, chapterId: string) {
  const fetchKey =
    workspaceId && chapterId
      ? `/api/workspaces/${workspaceId}/quizzes/chapters/${chapterId}/best-score`
      : null

  return useSWR(fetchKey, () => fetchBestRecord(workspaceId, chapterId), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
}
