import { Http } from '@/lib/api-client'

export default function markAsReadChatMessage(
  workspaceId: string,
  chatRoomId: string,
  chatMessageIds: string[],
) {
  return Http.axios()
    .patch(`/api/workspaces/${workspaceId}/chat-rooms/${chatRoomId}/chat-messages/mark-as-read`, {
      chatMessageIds,
    })
    .then((res) => res.data.data)
}
