import Avatar from '@/components/ui/Avatar'
import Image from '@/components/ui/Image'
import type { ChatRoom as ChatRoomType } from '@/features/chat/types/ChatRoom'
import useDateTools from '@/hooks/useDateTools'
import { useMemo } from 'react'
import { FaUserCircle } from 'react-icons/fa'

type ChatRoomProps = {
  chatRoom: ChatRoomType
  isSelected: boolean
  onClick: (room: ChatRoomType) => void
}

export default function ChatRoom({ chatRoom, isSelected, onClick }: ChatRoomProps) {
  const dateTools = useDateTools()

  const lastMessageContent = useMemo(() => {
    switch (chatRoom.latestMessage?.type) {
      case 'text':
        return chatRoom.latestMessage.content
      case 'image':
        return '画像が送信されました'
      default:
        return ''
    }
  }, [chatRoom.latestMessage?.content, chatRoom.latestMessage?.type])

  const lastMessageTime = useMemo(() => {
    const createdAt = chatRoom.latestMessage?.createdAt
    if (!createdAt) return ''

    const now = new Date()
    const diff = now.getTime() - new Date(createdAt).getTime()
    const minutes = Math.floor((diff / 60) * 1000)
    const hour = Math.floor(minutes / 60)

    // 1時間以内
    if (minutes < 60) return `${minutes}分前`

    // 24時間以内
    if (hour < 24) return `${Math.floor(minutes / 60)}時間前`

    // 2日前以内
    if (hour < 24 * 2) return `${Math.floor(hour / 24)}日前`

    // n曜日
    if (hour < 24 * 7) return `${dateTools.formatDate(createdAt, 'dd曜日')}`

    return dateTools.formatDate(createdAt, 'YYYY/MM/DD')
  }, [chatRoom.latestMessage?.createdAt])

  return (
    <div
      className='flex cursor-pointer items-center gap-2 overflow-hidden p-2.5'
      onClick={() => onClick(chatRoom)}
    >
      <div className='size-12'>
        <Avatar size='md'>
          {chatRoom.latestMessage?.sender?.avatar ? (
            <Image src={chatRoom.latestMessage.sender.avatar} fill alt='avatar' />
          ) : (
            <FaUserCircle className='size-full bg-white text-text-secondary' />
          )}
        </Avatar>
      </div>

      <div className='grow'>
        <div className='flex w-full justify-between'>
          <p className='text-nowrap'>
            {chatRoom.roomName || ''}
            <span className='text-sm text-form-gray'>
              {chatRoom.latestMessage?.sender?.nickname || ''}
            </span>
          </p>

          <p className='text-sm text-form-gray'>{chatRoom.latestMessage && lastMessageTime}</p>
        </div>

        <p className='line-clamp-1 w-full break-all text-sm leading-4'>{lastMessageContent}</p>
      </div>
    </div>
  )
}
