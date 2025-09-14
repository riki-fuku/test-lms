import fetchQuestionAnswerStats from '@/features/questions/api/fetchQuestionAnswerStats'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchQuestionAnswerStats(
  workspaceId: string,
  query: { guardType: 'user' | 'employee' },
  swrOptions?: SWRConfiguration,
) {
  const fetcher = () => fetchQuestionAnswerStats(workspaceId, query)
  return useSWR(
    [`/api/workspaces/${workspaceId}/question-answers/stats`, query],
    fetcher,
    swrOptions,
  )
}
