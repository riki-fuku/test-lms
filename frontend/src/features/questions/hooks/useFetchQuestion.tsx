import fetchQuestion from '@/features/questions/api/fetchQuestion'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchQuestion(
  workspaceId: string,
  questionId: string,
  swrOptions?: SWRConfiguration,
) {
  const fetcher = () => fetchQuestion(workspaceId, questionId)
  return useSWR(`/api/workspaces/${workspaceId}/questions/${questionId}`, fetcher, swrOptions)
}
