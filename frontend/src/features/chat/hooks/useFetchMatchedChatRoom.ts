import fetchMatchedChatRoom from '@/features/chat/api/fetchMatchedChatRoom'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'

export default function useFetchMatchedChatRoom(
  workspaceId: string,
  swrOptions?: SWRConfiguration,
) {
  const fetcher = () => fetchMatchedChatRoom(workspaceId)
  return useSWR(`/api/workspaces/${workspaceId}/chat-rooms/matched`, fetcher, swrOptions)
}
