import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import destroyMeeting from '@/features/meeting/api/destroyMeeting'
import type { Meeting } from '@/features/meeting/types/Meeting'
import cn from '@/hooks/cn'
import useDateTools from '@/hooks/useDateTools'
import useDisclosure from '@/hooks/useDisclosure'
import { FaUserCircle } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'

type MeetingListItemProps = {
  workspaceId: string
  className?: string
  meeting: Meeting
  onDelete: () => void
  onJoinMeeting?: (meeting: Meeting) => void
}

export default function MeetingListItem({
  workspaceId,
  className,
  meeting,
  onJoinMeeting,
  onDelete,
}: MeetingListItemProps) {
  const cancelDialog = useDisclosure()
  const dateTools = useDateTools()

  const handleJoinMeeting = () => {
    if (onJoinMeeting) {
      onJoinMeeting(meeting)
    }
  }

  const handleCancel = async () => {
    cancelDialog.close()
    await destroyMeeting(workspaceId, meeting.id)
    onDelete()
  }

  const CancelDialog = () => {
    return (
      <>
        <div className='absolute right-2 top-16 z-20 flex h-12 w-48 items-center justify-center rounded bg-white drop-shadow-md'>
          <div
            className='flex size-full cursor-pointer flex-col items-center justify-center'
            onClick={handleCancel}
          >
            <p>面談予約をキャンセル</p>
          </div>
        </div>
        <div
          className='fixed left-0 top-0 z-10 h-screen w-screen'
          onClick={cancelDialog.close}
        ></div>
      </>
    )
  }

  const gridParentStyle = cn(
    'relative h-16 grid w-full grid-cols-5 items-center rounded bg-bg-primary text-md px-5',
    className,
  )

  const gridChildStyle = 'h-full flex items-center gap-1'

  return (
    <>
      <div className={gridParentStyle}>
        <div className={gridChildStyle}>
          <Avatar className='bg-white' size='xs'>
            {meeting.user?.avatar ? (
              <img src={meeting.user.avatar} alt='Avatar' />
            ) : (
              <FaUserCircle className='size-full fill-text-secondary text-white' />
            )}
          </Avatar>
          <p>{meeting.user?.name}</p>
        </div>
        <div className={cn('col-span-2', gridChildStyle)}>
          <p className='font-bold'>
            {dateTools.formatDate(meeting.startDatetime, 'YYYY年MM月DD日(ddd) HH:mm〜')}
          </p>
        </div>
        <div className={cn('flex justify-center gap-5', gridChildStyle)}>
          <p>
            {meeting.meetingCount} / {meeting.user?.maxMeetings}
            <span className='text-xs'>回目</span>
          </p>
        </div>
        <div className={cn('justify-start', gridChildStyle)}>
          <div className='flex items-center gap-5'>
            <Button onClick={handleJoinMeeting} size='sm' className='h-12 w-32'>
              面談に参加
            </Button>
            <div className='relative flex h-12 flex-col justify-center'>
              <HiDotsVertical className='size-5 cursor-pointer' onClick={cancelDialog.open} />
            </div>
          </div>
        </div>
        {cancelDialog.isOpen && <CancelDialog />}
      </div>
    </>
  )
}
