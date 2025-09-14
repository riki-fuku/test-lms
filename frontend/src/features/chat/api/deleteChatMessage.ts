import { Http } from '@/lib/api-client'

export default async function deleteChatMessage(
  workspaceId: string,
  chatRoomId: string,
  chatMessageId: string,
) {
  return await Http.axios()
    .delete(
      `/api/workspaces/${workspaceId}/chat-rooms/${chatRoomId}/chat-messages/${chatMessageId}`,
    )
    .then((res) => res.data.data)
}
