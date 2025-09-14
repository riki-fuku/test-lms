import { Http } from '@/lib/api-client'

export default function updateChatMessage(
  workspaceId: string,
  chatRoomId: string,
  id: string,
  body: { isRead: boolean },
) {
  return Http.axios()
    .patch(`/api/workspaces/${workspaceId}/chat-rooms/${chatRoomId}/chat-messages/${id}`, body)
    .then((res) => res.data.data)
}
