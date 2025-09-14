import type { FetchLineStatusQuery } from '@/features/line/api/fetchLineStatus'
import { fetchLineStatus } from '@/features/line/api/fetchLineStatus'
import useSWR from 'swr'

export default function useFetchLineStatus(query: FetchLineStatusQuery) {
  const fetcher = () => fetchLineStatus(query)
  return useSWR(`/api/line/status`, fetcher)
}
