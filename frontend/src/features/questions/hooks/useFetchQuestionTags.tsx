import fetchQuestionTags from '@/features/questions/api/fetchQuestionTags'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchQuestionTags(workspaceId: string, swrOptions?: SWRConfiguration) {
  const fetcher = () => fetchQuestionTags(workspaceId)
  return useSWR(`/api/workspaces/${workspaceId}/question-tags`, fetcher, swrOptions)
}
