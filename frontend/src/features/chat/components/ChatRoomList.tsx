'use client'

import type { FetchChatRoomsQuery } from '@/features/chat/api/fetchChatRooms'
import ChatRoom from '@/features/chat/components/ChatRoom'
import { useFetchChatRoomsInfinite } from '@/features/chat/hooks/useFetchChatRooms'
import type { ChatRoom as ChatRoomType } from '@/features/chat/types/ChatRoom'
import { TextField } from '@mui/material'
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

type ChatRoomListProps = {
  workspaceId: string
  actorId?: string
  onSelect: (chatRoom: ChatRoomType) => void
}

const ChatRoomList = forwardRef(({ workspaceId, actorId, onSelect }: ChatRoomListProps, ref) => {
  const [keyword, setKeyword] = useState('')

  const query = useMemo<FetchChatRoomsQuery>(() => {
    const query: FetchChatRoomsQuery = {}

    if (actorId) {
      query.actorId = actorId
    }

    if (keyword) {
      query.keyword = keyword
    }

    return query
  }, [actorId, keyword])

  const { data, isLoading, mutate, setSize } = useFetchChatRoomsInfinite(workspaceId, query)
  const chatRooms = useMemo(() => {
    return data?.flatMap((page) => page.data) ?? []
  }, [data])
  const meta = useMemo(() => data?.[data.length - 1]?.meta, [data])
  const canFetchMore = useMemo(() => {
    return meta && meta.currentPage < meta.lastPage
  }, [meta])

  const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoomType | null>(null)

  // 親コンポーネントからアクセスできる関数
  useImperativeHandle(ref, () => ({
    updateChatRooms: () => {
      mutate()
    },
  }))

  const handleClickChatRoom = (room: ChatRoomType) => {
    setSelectedChatRoom(room)
    onSelect(room)
  }

  const handleSearch = useDebouncedCallback((keyword: string) => {
    setKeyword(keyword)
    setSize(1)
  }, 1000)

  const observer = useRef<IntersectionObserver | null>(null)
  const lastElementRef = useCallback(
    (node: Element | null) => {
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting && canFetchMore) {
          setSize((prev) => prev + 1)
        }
      })

      if (node) observer.current.observe(node)
    },
    [canFetchMore, setSize],
  )

  return (
    <div className='relative flex h-full flex-col gap-2 overflow-y-auto'>
      <div className='sticky top-0 z-10 w-full'>
        <TextField
          label='検索'
          className='w-full bg-white'
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {!chatRooms.length && !isLoading && <div>チャットルームがありません</div>}
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div className='grow'>
          {chatRooms.map((chatRoom, index) => {
            const isLastChatRoom = index === chatRooms.length - 1
            return (
              <div key={chatRoom.id} ref={isLastChatRoom ? lastElementRef : null}>
                <ChatRoom
                  chatRoom={chatRoom}
                  isSelected={selectedChatRoom?.id === chatRoom.id}
                  onClick={handleClickChatRoom}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
})

ChatRoomList.displayName = 'ChatRoomList'
export default ChatRoomList
