import fetchQuizQuestions from '@/features/quiz/api/fetchQuizQuestions'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchQuizQuestion(
  workspaceId: string,
  chapterId: string,
  options?: SWRConfiguration,
) {
  const fetcher = () => fetchQuizQuestions(workspaceId, chapterId)

  return useSWR(
    `/api/workspaces/${workspaceId}/quizzes/chapters/${chapterId}/questions`,
    fetcher,
    options,
  )
}
