import type { FetchQuestionsQuery } from '@/features/questions/api/fetchQuestions'
import fetchQuestions from '@/features/questions/api/fetchQuestions'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchQuestions(
  workspaceId: string,
  query: FetchQuestionsQuery,
  swrOptions?: SWRConfiguration,
) {
  const fetcher = () => fetchQuestions(workspaceId, query)
  return useSWR([`/api/workspaces/${workspaceId}/questions`, query], fetcher, swrOptions)
}
