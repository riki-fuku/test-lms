import type { FetchChatMessagesQuery } from '@/features/chat/api/fetchChatMessages'
import fetchChatMessages from '@/features/chat/api/fetchChatMessages'
import { Http } from '@/lib/api-client'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'

export default function useFetchChatMessages(
  workspaceId: string,
  chatRoomId: string,
  query: FetchChatMessagesQuery,
  swrOptions?: SWRConfiguration,
) {
  const fetcher = () => fetchChatMessages(workspaceId, chatRoomId, query)
  return useSWR(
    `/api/workspaces/${workspaceId}/chat-rooms/${chatRoomId}/chat-messages`,
    fetcher,
    swrOptions,
  )
}

export function useFetchChatMessageInfinite(
  workspaceId: string,
  chatRoomId: string,
  query: FetchChatMessagesQuery,
  swrOptions?: SWRConfiguration,
) {
  const fetcher = (url: string) =>
    Http.axios()
      .get(url)
      .then((res) => res.data)
  return useSWRInfinite(
    (key) => {
      return `/api/workspaces/${workspaceId}/chat-rooms/${chatRoomId}/chat-messages?guardType=${query.guardType}&chatRoomId=${query.chatRoomId}&page=${key + 1}`
    },
    fetcher,
    swrOptions,
  )
}
