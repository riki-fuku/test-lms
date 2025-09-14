import fetchQuizSessionResult from '@/features/quiz/api/fetchQuizSessionResult'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchQuizSessionResult(
  workspaceId: string,
  sessionId: string,
  options: SWRConfiguration,
) {
  const fetcher = () => fetchQuizSessionResult(workspaceId, sessionId)

  return useSWR(
    `/api/workspaces/${workspaceId}/quizzes/sessions/${sessionId}/result`,
    fetcher,
    options,
  )
}
