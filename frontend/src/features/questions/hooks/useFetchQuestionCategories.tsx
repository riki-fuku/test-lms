import fetchQuestionCategories from '@/features/questions/api/fetchQuestionCategories'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchQuestionCategories(swrOptions?: SWRConfiguration) {
  const fetcher = () => fetchQuestionCategories()
  return useSWR(`/api/masters/question-categories`, fetcher, swrOptions)
}
