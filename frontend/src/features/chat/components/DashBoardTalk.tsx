import Avatar from '@/components/ui/Avatar'
import Image from '@/components/ui/Image'
import { Chat } from '@/features/chat/components'
import useFetchMatchedChatRoom from '@/features/chat/hooks/useFetchMatchedChatRoom'
import useFetchMatches from '@/features/match/hooks/useFetchMatches'
import useDisclosure from '@/hooks/useDisclosure'
import { useUserStore } from '@/store/user-store'
import { FaUserCircle } from 'react-icons/fa'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { RxCross2 } from 'react-icons/rx'

type DashBoardTalkProps = {
  isHidden?: boolean
  onHidden?: () => void
}

export function DashBoardTalk({ isHidden, onHidden }: DashBoardTalkProps) {
  const chat = useDisclosure(true)
  const user = useUserStore((state) => state.user)
  const workspaceId = user?.activeWorkspace.workspaceId ?? ''
  const senderId = user?.id ?? ''

  const { data: matchesData, isLoading: isMatchLoading } = useFetchMatches(
    workspaceId,
    {
      userIds: [senderId],
      isActive: true,
    },
    {
      revalidateOnFocus: false,
    },
  )
  const matches = matchesData ?? []

  // 担当employee
  const matchingEmployee = matches?.find((match) => match.isActive)?.employee

  const { data: chatRoom, isLoading } = useFetchMatchedChatRoom(workspaceId, {
    revalidateOnFocus: false,
  })

  if (isHidden) return

  return (
    <div className='relative flex h-full max-h-screen flex-col overflow-hidden rounded border bg-white'>
      <div
        className='flex h-12 shrink-0 cursor-pointer items-center justify-between bg-bg-tertiary px-2.5 text-white'
        onClick={chat.toggle}
      >
        <div className='flex items-center gap-1'>
          {matchingEmployee?.avatar ? (
            <Avatar className='bg-bg-tertiary' size='xs'>
              <Image src={matchingEmployee.avatar} alt='avatar' fill />
            </Avatar>
          ) : (
            <FaUserCircle className='size-5 fill-bg-secondary' />
          )}
          <p className='text-md'>
            {isMatchLoading && 'コーチ情報を読み込んでいます...'}
            {!isLoading && !isMatchLoading && matchingEmployee
              ? `${matchingEmployee.name}コーチ`
              : '担当コーチがいません'}
          </p>
        </div>

        <div className='flex items-center gap-6 pr-2'>
          {chat.isOpen ? (
            <IoIosArrowDown className='size-5' />
          ) : (
            <IoIosArrowUp className='size-5' />
          )}
          <div
            className='hidden cursor-pointer lg:block'
            onClick={(e) => {
              e.stopPropagation()
              onHidden?.()
            }}
          >
            <RxCross2 size={16} />
          </div>
        </div>
      </div>

      {chatRoom && chat.isOpen && <Chat guardType='user' senderId={senderId} chatRoom={chatRoom} />}
    </div>
  )
}
