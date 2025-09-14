import type { FetchManageQuestionsQuery } from '@/features/questions/api/fetchManageQuestions'
import fetchManageQuestions from '@/features/questions/api/fetchManageQuestions'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchManageQuestions(
  workspaceId: string,
  query: FetchManageQuestionsQuery,
  swrOptions?: SWRConfiguration,
) {
  const fetcher = () => fetchManageQuestions(workspaceId, query)
  return useSWR([`/api/workspaces/${workspaceId}/management/questions`, query], fetcher, swrOptions)
}
