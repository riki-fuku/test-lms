import fetchQuestionStatuses from '@/features/questions/api/fetchQuestionStatuses'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchQuestionStatuses(swrOptions?: SWRConfiguration) {
  const fetcher = () => fetchQuestionStatuses()
  return useSWR(`/api/masters/question-statuses`, fetcher, swrOptions)
}
