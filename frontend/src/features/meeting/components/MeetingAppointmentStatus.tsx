import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import MeetingAppointmentForm from '@/features/meeting/components/MeetingAppointmentForm'
import type { Meeting } from '@/features/meeting/types/Meeting'
import cn from '@/hooks/cn'
import dayjs from '@/lib/dayjs'

import type { AvailableSlot } from '@/features/meeting/types/AvailableSlot'
import type { Slot } from '@/features/meeting/types/MeetingAvailableSlots'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useState } from 'react'
import { IoPersonSharp } from 'react-icons/io5'

type MeetingAppointmentStatusProps = {
  meeting: Meeting | null
  cancelRequestPending: boolean
  onCancel: () => void
  onConfirm: (availableSlot: AvailableSlot) => void
}

export default function MeetingAppointmentStatus({
  meeting,
  cancelRequestPending,
  onCancel,
  onConfirm,
}: MeetingAppointmentStatusProps) {
  const { showSnackbar } = useSnackbar()
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const handleClickMenu = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  const handleCancel = () => {
    onCancel()
    setIsOpenMenu(false)
  }

  const handleConfirm = (availableSlot: Slot) => {
    // @ts-expect-error TODO: 型を確認する
    onConfirm(availableSlot)
  }

  const handleJoinMeeting = () => {
    if (!meeting?.meetingUrl) {
      showSnackbar('面談のURLがありません', 'warning')
      return
    }
    window.location.href = meeting.meetingUrl
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-5'>
        {!meeting && (
          <>
            <div className='rounded bg-bg-primary p-5'>
              <p className='text-md text-text-secondary lg:text-base'>
                次回面談が予約されていません。以下のカレンダーから面談予約を行いましょう。
              </p>
            </div>
          </>
        )}
        <MeetingAppointmentForm onConfirm={handleConfirm} />

        <div className='relative'>
          {meeting && (
            <div className='relative w-full bg-bg-primary p-5'>
              <div>
                <h2 className='text-xl font-bold lg:text-xl lg:font-normal'>次の面談</h2>
              </div>
              {/* PC画面 */}
              <div className='hidden lg:flex lg:items-center lg:justify-between'>
                <div className='flex items-center gap-1'>
                  <Avatar size='sm'>
                    <IoPersonSharp color='#ffffff' />
                  </Avatar>
                  <span>{meeting.employee?.name}</span>
                </div>

                <p className='text-xl font-bold'>
                  {dayjs(meeting.startDatetime).format('YYYY年MM月DD日(ddd) HH:mm~')}
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
              </div>

              {/* SP画面 */}
              <div className='flex justify-between lg:hidden'>
                <div className='flex flex-col gap-5'>
                  <div className='flex items-center gap-1'>
                    <Avatar size='sm'>
                      <IoPersonSharp color='#ffffff' />
                    </Avatar>
                    <span>{meeting.employee?.name}</span>
                  </div>

                  <p className='text-base font-bold'>
                    {dayjs(meeting.startDatetime).format('YYYY年MM月DD日(ddd) HH:mm~')}
                  </p>
                </div>

                {/* <div className='flex gap-5'>
                  <div
                    className='relative flex size-12 cursor-pointer items-center justify-center rounded bg-bg-secondary'
                    onClick={handleClickMenu}
                  >
                    <BsThreeDotsVertical size={20} />
                  </div>
                </div> */}
              </div>
            </div>
          )}

          {isOpenMenu && (
            <div
              className={cn(
                'absolute right-4 top-20 cursor-pointer rounded bg-white px-5 py-4 text-center drop-shadow',
                cancelRequestPending && 'pointer-events-none',
              )}
              onClick={handleCancel}
            >
              <p>{cancelRequestPending ? '面談予約キャンセル申請済み' : '面談予約キャンセル'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
