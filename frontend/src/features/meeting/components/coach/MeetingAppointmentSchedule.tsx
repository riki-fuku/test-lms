import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import type { Meeting } from '@/features/meeting/types/Meeting'
import cn from '@/hooks/cn'
import { useSnackbar } from '@/hooks/useSnackbar'
import dayjs from '@/lib/dayjs'
import { useState } from 'react'
import { IoPersonSharp } from 'react-icons/io5'

type MeetingAppointmentStatusProps = {
  meeting: Meeting | null
  isCancelRequestPending: boolean
  onCancel: () => void
}

export default function MeetingAppointmentSchedule({
  meeting,
  isCancelRequestPending,
  onCancel,
}: MeetingAppointmentStatusProps) {
  const { showSnackbar } = useSnackbar()
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  // const handleClickMenu = () => {
  //   setIsOpenMenu(!isOpenMenu)
  // }

  // const handleCancel = () => {
  //   onCancel()
  //   setIsOpenMenu(false)
  // }

  const handleJoinMeeting = () => {
    if (!meeting) return
    if (!meeting.meetingUrl) {
      showSnackbar('面談のURLがありません', 'warning')
      return
    }
    window.open(meeting.meetingUrl, 'noopener,noreferrer')
  }

  return (
    <div className='relative flex w-full items-center justify-between text-md'>
      {meeting && (
        <>
          <div className='flex items-center gap-1'>
            <Avatar size='sm'>
              <IoPersonSharp color='#ffffff' />
            </Avatar>
            <span>{meeting.user?.name}</span>
          </div>

          <p className='font-bold'>
            {dayjs(meeting.startDatetime).format('YYYY年MM月DD日(ddd) HH:mm~')}
          </p>

          <p>
            {meeting.meetingCount} / {meeting.user?.maxMeetings}回目
          </p>

          <div className='flex gap-5'>
            <Button className='p-3 text-base' size='sm' onClick={handleJoinMeeting}>
              面談に参加
            </Button>
            {/* <div
              className='relative flex size-12 cursor-pointer items-center justify-center rounded bg-bg-secondary'
              onClick={handleClickMenu}
            >
              <BsThreeDotsVertical size={20} />
            </div> */}
          </div>
        </>
      )}
      <p className={cn(meeting && 'hidden')}>次回面談が予約されていません。</p>

      {/* {isOpenMenu && (
        <div
          className={cn(
            'absolute right-0 top-14 cursor-pointer rounded bg-white px-5 py-4 text-center drop-shadow',
            isCancelRequestPending && 'pointer-events-none',
          )}
          onClick={handleCancel}
        >
          <p>{isCancelRequestPending ? '面談予約キャンセル申請済み' : '面談予約キャンセル'}</p>
        </div>
      )} */}
    </div>
  )
}
