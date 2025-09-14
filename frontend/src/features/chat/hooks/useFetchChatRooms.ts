import type { FetchChatRoomsQuery } from '@/features/chat/api/fetchChatRooms'
import fetchChatRooms from '@/features/chat/api/fetchChatRooms'
import { Http } from '@/lib/api-client'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'

export default function useFetchChatRooms(
  workspaceId: string,
  query: FetchChatRoomsQuery,
  swrOptions?: SWRConfiguration,
) {
  const fetcher = () => fetchChatRooms(workspaceId, query)
  return useSWR([`/api/workspaces/${workspaceId}/chat-rooms`, query], fetcher, swrOptions)
}

export function useFetchChatRoomsInfinite(
  workspaceId: string,
  query: FetchChatRoomsQuery,
  swrOptions?: SWRConfiguration,
) {
  const fetcher = (url: string) =>
    Http.axios()
      .get(url)
      .then((res) => res.data)
  return useSWRInfinite(
    (key) => {
      query.page = key + 1
      const queryParams = Object.entries(query)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
      return `/api/workspaces/${workspaceId}/chat-rooms?${queryParams}`
    },
    fetcher,
    swrOptions,
  )
}
