import Avatar from '@/components/ui/Avatar'
import type { Meeting } from '@/features/meeting/types/Meeting'
import cn from '@/hooks/cn'
import useDateTools from '@/hooks/useDateTools'
import { FaUserCircle } from 'react-icons/fa'
import { RiPencilFill } from 'react-icons/ri'

type HistoryItemProps = {
  onClick?: () => void
  className?: string
  meeting: Meeting
  // index: number
}

export default function HistoryItem(props: HistoryItemProps) {
  // const { className, meeting, index } = props
  const { className, meeting } = props
  const dateTools = useDateTools()

  function handleClickMemo() {}

  const gridParentStyle = cn(
    'grid h-10 w-full grid-cols-7 items-center justify-items-stretch overflow-hidden rounded border-t text-md [&:last-child]:border-b [&>*:last-child]:border-0 [&>*]:border-r',
  )
  const gridChildStyle = 'h-full px-5 flex items-center'

  return (
    <div className={cn('flex h-10 items-center', className)}>
      <div className={cn('h-full w-10 justify-center border-r border-t', gridChildStyle)}>
        {/* <p>{index}</p> */}
      </div>

      <div className={gridParentStyle}>
        <div className={cn('col-span-2 justify-start gap-1', gridChildStyle)}>
          <Avatar className='bg-white' size='xs'>
            {meeting.user?.avatar ? (
              <img src={meeting.user.avatar} alt='Avatar' />
            ) : (
              <FaUserCircle className='size-full fill-text-secondary text-white' />
            )}
          </Avatar>
          <p>{meeting.user?.name}</p>
        </div>

        <div className={cn('col-span-2 justify-start gap-1', gridChildStyle)}>
          <p>{dateTools.formatDate(meeting.startDatetime, 'YYYY年MM月DD日(ddd) HH:mm〜')}</p>
        </div>

        <div className={cn('justify-center gap-1', gridChildStyle)}>
          <p>
            {meeting.meetingCount} / {meeting.user?.maxMeetings}
            <span className='text-xs'>回目</span>
          </p>
        </div>

        <div className={cn('justify-center gap-1', gridChildStyle)}>
          <p>{meeting.status.name}</p>
        </div>

        <div className={cn('justify-center gap-1', gridChildStyle)}>
          <div className='relative flex flex-col justify-center'>
            <RiPencilFill
              className='size-5 cursor-pointer fill-main-color'
              onClick={handleClickMemo}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
