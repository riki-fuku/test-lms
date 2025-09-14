import type { ChatRoom } from '@/features/chat/types/ChatRoom'
import { Http } from '@/lib/api-client'

export type FetchChatRoomsQuery = {
  keyword?: string
  actorId?: string
  page?: number
}

export default async function fetchChatRooms(workspaceId: string, query: FetchChatRoomsQuery) {
  return await Http.axios()
    .get<{ data: ChatRoom[] }>(`/api/workspaces/${workspaceId}/chat-rooms`, { params: query })
    .then((res) => res.data.data)
}
