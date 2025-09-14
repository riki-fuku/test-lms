import fetchMyTimers from '@/features/timer/api/fetchMyTimers'
import useSWR from 'swr'

export default function useFetchMyTimers() {
  const fetcher = fetchMyTimers
  return useSWR('/api/my/timers', fetcher)
}
