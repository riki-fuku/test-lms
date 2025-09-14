import type { ChatMessage } from '@/features/chat/types/ChatMessage'

export type ChatRoom = {
  id: string
  workspaceId: string
  latestMessage: ChatMessage | null
  roomName: string
}
