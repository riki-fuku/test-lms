import type { Pagination } from '@/constants/paginate'
import type { FetchMeetingsQuery } from '@/features/meeting/api/fetchMeetings'
import fetchMeetings from '@/features/meeting/api/fetchMeetings'
import type { Meeting } from '@/features/meeting/types/Meeting'
import { Http } from '@/lib/api-client'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'

export default function useFetchMeetings(
  workspaceId: string,
  query: FetchMeetingsQuery,
  swrOptions?: SWRConfiguration,
) {
  const fetcher = () => fetchMeetings(workspaceId, query)
  return useSWR([`/api/workspaces/${workspaceId}/meetings`, query], fetcher, swrOptions)
}

export function useFetchMeetingsInfinite(workspaceId: string, query: FetchMeetingsQuery) {
  const fetcher = (url: string) => {
    return Http.axios()
      .get<{ data: Meeting[]; meta: Pagination }>(url)
      .then((res) => res.data)
  }

  return useSWRInfinite((key) => {
    query.page = key + 1
    // objectをparam=valueの形式に変換
    const queryParams = Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
    return `/api/workspaces/${workspaceId}/meetings?${queryParams}`
  }, fetcher)
}
