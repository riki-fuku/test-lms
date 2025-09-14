import { Http } from '@/lib/api-client'

export type SendChatMessageBody = {
  guardType: 'employee' | 'user'
  chatRoomId: string
  senderId: string
  content: string
  type: string
}

export default async function sendChatMessage(
  workspaceId: string,
  chatRoomId: string,
  body: SendChatMessageBody,
) {
  return await Http.axios()
    .post(`/api/workspaces/${workspaceId}/chat-rooms/${chatRoomId}/chat-messages`, body)
    .then((res) => res.data.data)
}
