import type { ChatRoom } from '@/features/chat/types/ChatRoom'
import { Http } from '@/lib/api-client'

export default async function fetchMatchedChatRoom(workspaceId: string) {
  return await Http.axios()
    .get<{ data: ChatRoom }>(`/api/workspaces/${workspaceId}/chat-rooms/matched`)
    .then((res) => res.data.data)
}
