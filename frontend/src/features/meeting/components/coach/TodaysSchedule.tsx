import type { Meeting } from '@/features/meeting/types/CoachMeetingListTypes'
import useDateTools from '@/hooks/useDateTools'

import cn from '@/hooks/cn'

type TodaysScheduleProps = {
  TodaysMeetingList: Meeting[]
  className?: string
}

export default function TodaysSchedule(props: TodaysScheduleProps) {
  const { TodaysMeetingList } = props
  const { formatDate } = useDateTools()

  return (
    <div
      className={cn(
        'flex h-full flex-col gap-5 rounded border bg-white px-4 pb-2 pt-6',
        props.className,
      )}
    >
      <h2 className='font-bold'>今日予定されている面談</h2>
      <div className='relative grow overflow-y-hidden'>
        <div className='flex h-full flex-col gap-4 overflow-y-scroll'>
          {TodaysMeetingList.map((meeting, index) => (
            <div key={index} className='flex justify-between gap-2.5 border-b'>
              {/* <p>{meeting.user.name}</p>
              <p>{formatDate(meeting.date, 'HH:mm〜')}</p> */}
            </div>
          ))}
        </div>
        <div className='absolute bottom-0 left-0 h-10 w-full overflow-y-scroll bg-gradient-to-b from-white/0 to-white' />
      </div>
    </div>
  )
}
