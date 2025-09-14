import type { FetchLineNotifyOAuthUrlQuery } from '@/features/lineNotify/api/fetchLineNotifyOAuthUrl'
import { fetchLineNotifyOAuthUrl } from '@/features/lineNotify/api/fetchLineNotifyOAuthUrl'
import useSWR from 'swr'

export default function useFetchLineNotifyOAuthUrl(query: FetchLineNotifyOAuthUrlQuery) {
  const fetcher = () => fetchLineNotifyOAuthUrl(query)
  return useSWR(`/api/line-notify/oauth-link`, fetcher)
}
