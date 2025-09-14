import type { ChatMessage } from '@/features/chat/types/ChatMessage'
import type { PaginationResponse } from '@/features/dashboard/types/PaginationResponse'
import { Http } from '@/lib/api-client'

export type FetchChatMessagesQuery = {
  guardType: 'employee' | 'user'
  chatRoomId: string
  page?: number
}

export type FetchChatMessagesResponse = PaginationResponse<ChatMessage>

export default async function fetchChatMessages(
  workspaceId: string,
  chatRoomId: string,
  query: FetchChatMessagesQuery,
) {
  return await Http.axios()
    .get<FetchChatMessagesResponse>(
      `/api/workspaces/${workspaceId}/chat-rooms/${chatRoomId}/chat-messages`,
      { params: query },
    )
    .then((res) => res.data)
}
