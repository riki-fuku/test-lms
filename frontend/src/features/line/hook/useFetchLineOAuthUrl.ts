import type { FetchLineOAuthUrlQuery } from '@/features/line/api/fetchLineOAuthUrl'
import { fetchLineOAuthUrl } from '@/features/line/api/fetchLineOAuthUrl'
import useSWR from 'swr'

export default function useFetchLineOAuthUrl(query: FetchLineOAuthUrlQuery) {
  const fetcher = () => fetchLineOAuthUrl(query)
  return useSWR(`/api/line/oauth-link`, fetcher)
}
