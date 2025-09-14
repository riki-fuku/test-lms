import MarkDown2HTML from '@/components/base/MarkDown2HTML'
import Image from '@/components/ui/Image'
import deleteChatMessage from '@/features/chat/api/deleteChatMessage'
import type { ChatMessage } from '@/features/chat/types/ChatMessage'
import cn from '@/hooks/cn'
import useDateTools from '@/hooks/useDateTools'
import useDisclosure from '@/hooks/useDisclosure'
import { Box, Modal } from '@mui/material'
import { useParams } from 'next/navigation'
import { ContextMenu } from 'primereact/contextmenu'
import { useRef, useState } from 'react'
import { FaPowerOff, FaTrash } from 'react-icons/fa'

type MessageProps = {
  message: ChatMessage
  onDeleteMessage: () => void
}

export const Message: React.FC<MessageProps> = ({ message, onDeleteMessage }) => {
  const contextMenuRef = useRef<ContextMenu>(null)
  const modal = useDisclosure()
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(null)
  const { workspaceId } = useParams<{ workspaceId: string }>()
  const chatRoomId = message.chatRoomId
  const chatMessageId = message.id

  // 右クリック時にメニューを表示
  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault()

    if (message.isMyMessage) {
      // 自分のメッセージの場合のみメニューを表示
      contextMenuRef.current?.show(event)
    }
  }

  // ContextMenu のアイテム
  const menuItems = [
    {
      label: '削除',
      icon: <FaTrash className='ml-2 text-red-500' />,
      command: async () => {
        await deleteChatMessage(workspaceId, chatRoomId, chatMessageId)
        onDeleteMessage()
      },
      className: 'mb-2',
    },
    {
      label: '閉じる',
      icon: <FaPowerOff className='ml-2 text-gray-500' />,
      command: () => modal.close(),
    },
  ]

  const TimeStamp = () => {
    const time = useDateTools().formatDate(message.createdAt, 'HH:mm')
    return (
      <div className={cn('text-xs text-text-secondary')}>
        <div className='flex flex-col items-end leading-3'>
          {Boolean(message) && Boolean(message.isRead) && <p>既読</p>}
          <p>{time}</p>
        </div>
      </div>
    )
  }

  const DeleteTag = () => {
    return (
      <div className='col-start-2 flex justify-center'>
        <div className='flex h-fit justify-center text-nowrap rounded-full bg-bg-primary px-2.5 py-1 text-md'>
          <p>メッセージが削除されました。</p>
        </div>
      </div>
    )
  }

  const Content = ({ onImageClick }: { onImageClick: (message: ChatMessage) => void }) => {
    return (
      <div className='flex flex-col'>
        <p className='text-md text-text-secondary'>{message.sender?.name}</p>
        {message.type === 'image' ? (
          <div
            className='relative size-full overflow-hidden rounded-md'
            onClick={() => onImageClick(message)}
          >
            <Image src={message.content} alt='' width={500} height={0} />
          </div>
        ) : (
          <div
            className={cn(
              'relative break-all rounded-md p-2.5',
              message.isMyMessage
                ? 'bg-gradient-to-r from-sub-color to-main-color text-white'
                : 'bg-bg-primary',
            )}
          >
            {message.deletedAt && (
              <div className='absolute left-0 top-0 size-full bg-white/50'></div>
            )}
            <div
              className={cn(
                'absolute h-4 w-3 ',
                message.isMyMessage ? '-right-2.5 top-2' : '-left-2.5 top-2',
              )}
            >
              {message.deletedAt && (
                <div className='absolute left-0 top-0 z-10 size-full bg-white/50'></div>
              )}
              <Image
                src={message.isMyMessage ? '/images/tip2.png' : '/images/tip1.png'}
                alt='tip1'
                fill
              />
            </div>
            <div
              className='relative col-span-2 flex items-end gap-1'
              onContextMenu={handleRightClick} // 右クリック時にメニュー表示
            >
              <MarkDown2HTML>{message.content}</MarkDown2HTML>
            </div>
          </div>
        )}
        <TimeStamp />
      </div>
    )
  }

  return (
    <>
      <div
        className={cn(
          'relative col-span-2 flex items-end gap-1',
          message.isMyMessage ? 'col-start-2 flex-row-reverse' : 'justify-start',
        )}
      >
        <Content
          onImageClick={(message) => {
            modal.open()
            setSelectedMessage(message)
          }}
        />
      </div>
      {message.deletedAt && <DeleteTag />}

      <Modal open={modal.isOpen} onClose={modal.close}>
        <Box className='relative mx-auto size-full w-4/6'>
          <Image src={selectedMessage?.content || ''} fill alt='' />
        </Box>
      </Modal>

      <ContextMenu
        className='rounded-lg bg-white p-3 shadow-md'
        model={menuItems}
        ref={contextMenuRef}
      />
    </>
  )
}
