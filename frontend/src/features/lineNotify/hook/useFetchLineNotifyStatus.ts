import type { FetchLineNotifyStatusQuery } from '@/features/lineNotify/api/fetchLineNotifyStatus'
import { fetchLineNotifyStatus } from '@/features/lineNotify/api/fetchLineNotifyStatus'
import useSWR from 'swr'

export default function useFetchLineNotifyStatus(query: FetchLineNotifyStatusQuery) {
  const fetcher = () => fetchLineNotifyStatus(query)
  return useSWR(`/api/line-notify/status`, fetcher)
}
