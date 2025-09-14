import fetchQuestions from '@/features/timeLine/api/fetchQuestions'
import useSWR from 'swr'

export default function useFetchQuestions() {
  const { data } = useSWR('/api/users/question', fetchQuestions)
  return { data }
}
