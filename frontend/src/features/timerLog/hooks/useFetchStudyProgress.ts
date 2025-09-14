import fetchStudyProgresses from '@/features/timerLog/api/fetchStudyProgresses'
import useSWR from 'swr'

export default function useFetchStudyProgress() {
  const { data, error, mutate } = useSWR('/api/timer-log', fetchStudyProgresses)
  return { data, error, mutate }
}
