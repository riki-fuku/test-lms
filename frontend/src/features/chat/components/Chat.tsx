import markAsReadChatMessage from '@/features/chat/api/markAsReadChatMessage'
import sendChatMessage from '@/features/chat/api/sendChatMessage'
import { ChatHeader, ChatMessageForm, ChatMessages } from '@/features/chat/components'
import { useFetchChatMessageInfinite } from '@/features/chat/hooks/useFetchChatMessages'
import type { ChatMessage } from '@/features/chat/types/ChatMessage'
import type { ChatRoom } from '@/features/chat/types/ChatRoom'
import fileUpload from '@/features/file/api/fileUpload'
import cn from '@/hooks/cn'
import { Box, CircularProgress, Modal } from '@mui/material'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const sortMessagesByAsc = (messages: ChatMessage[]) => {
  return messages.sort((a, b) => {
    return a.createdAt > b.createdAt ? 1 : -1
  })
}

type ChatProps = {
  guardType: 'employee' | 'user'
  senderId: string
  chatRoom: ChatRoom
  onClickDetail?: () => void
  onUpdateChat?: () => void
}

export const Chat: React.FC<ChatProps> = ({
  guardType,
  senderId,
  chatRoom,
  onClickDetail,
  onUpdateChat,
}) => {
  const chatRef = useRef<HTMLDivElement>(null)

  const [isOpenStudentDetail, setIsOpenStudentDetail] = useState(false)
  const [uploadingFlag, setUploadingFlag] = useState(false)
  const currentScrollHeight = useRef(0)
  const { data, isLoading, setSize, mutate } = useFetchChatMessageInfinite(
    chatRoom.workspaceId,
    chatRoom.id,
    {
      guardType,
      chatRoomId: chatRoom.id,
    },
    {
      refreshInterval: 1000 * 30, // ポーリングによって最新のメッセージを取得
      revalidateOnFocus: false,
    },
  )

  const messages = useMemo(() => {
    return data?.flatMap((page) => page.data) || []
  }, [data])

  const meta = useMemo(() => data?.[data.length - 1]?.meta, [data])

  useEffect(() => {
    const messageIds = messages
      .map((message) => {
        if (!message.isMyMessage && !message.isRead) {
          return message.id
        }
      })
      .filter((id) => id !== undefined)

    if (messageIds.length > 0) {
      markAsReadChatMessage(chatRoom.workspaceId, chatRoom.id, messageIds)
    }

    mutate()
  }, [messages, chatRoom, mutate])

  // チャットルーム更新された時一番下までスクロール
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight - currentScrollHeight.current
      currentScrollHeight.current = -1
    }
  }, [chatRoom])

  useEffect(() => {
    // fetchMore時にのみスクロール位置を保持する
    // メッセージ追加時にスクロールされないように-1を利用して制御
    if (currentScrollHeight.current !== -1) {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight - currentScrollHeight.current
        currentScrollHeight.current = 0
      }
    }
  }, [messages])

  const sortedMessages = useMemo(() => sortMessagesByAsc(messages), [messages])

  const handleClickStudentDetail = () => {
    setIsOpenStudentDetail(true)
    onClickDetail?.()
  }

  const handleSendMessage = useCallback(
    async (inputMessage: string) => {
      await sendChatMessage(chatRoom.workspaceId, chatRoom.id, {
        guardType,
        chatRoomId: chatRoom.id,
        senderId,
        content: inputMessage,
        type: 'text',
      })

      mutate()
      onUpdateChat?.()
      currentScrollHeight.current = 0
    },
    [chatRoom, senderId, guardType, mutate, onUpdateChat],
  )

  const handleSendImage = useCallback(
    async (files: File[]) => {
      if (uploadingFlag) return
      setUploadingFlag(true)

      try {
        const formData = new FormData()
        files.forEach((file) => {
          formData.append('files[]', file)
          formData.append('key', 'chat_message')
        })

        const imageUrls = await fileUpload(chatRoom.workspaceId, formData)

        await Promise.all(
          imageUrls.map((imageUrl: string) => {
            sendChatMessage(chatRoom.workspaceId, chatRoom.id, {
              guardType,
              chatRoomId: chatRoom.id,
              senderId,
              content: imageUrl,
              type: 'image',
            })
          }),
        )

        mutate()
        onUpdateChat?.()
        currentScrollHeight.current = 0
      } catch (error) {
        console.error(error)
      } finally {
        setUploadingFlag(false)
      }
    },
    [chatRoom, senderId, guardType, mutate, onUpdateChat, uploadingFlag],
  )

  const handleFetchMore = useCallback(() => {
    if (meta && meta.currentPage < meta.lastPage) {
      setSize((prev) => prev + 1)
      currentScrollHeight.current = chatRef.current?.scrollHeight || 0
    }
  }, [setSize, meta])

  if (isLoading) return <div>Loading...</div>

  return (
    <div className={cn('flex h-full flex-col overflow-hidden bg-white')}>
      {guardType === 'employee' && (
        <ChatHeader
          name={chatRoom.roomName || ''}
          nickname={chatRoom.latestMessage?.sender?.nickname || ''}
          avatar={chatRoom.latestMessage?.sender?.avatar || ''}
          isStudentDetail={isOpenStudentDetail}
          onClickStudentDetail={handleClickStudentDetail}
          onChangeSearch={() => {}}
        />
      )}

      <ChatMessages
        ref={chatRef}
        messages={sortedMessages}
        onFetchMore={handleFetchMore}
        onDeleteMessage={mutate}
      />

      <ChatMessageForm onSendMessage={handleSendMessage} onSendImage={handleSendImage} />

      {uploadingFlag && (
        <Modal open={uploadingFlag} onClose={() => {}}>
          <Box className='flex size-full items-center justify-center'>
            <CircularProgress />
          </Box>
        </Modal>
      )}
    </div>
  )
}
