import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Image from '@/components/ui/Image'
import useFetchMeetingsByUserId from '@/features/meeting/hooks/useFetchMeetingsByUserId'
import type { Meeting } from '@/features/meeting/types/Meeting'
import { useUserStore } from '@/store/user-store'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useMemo } from 'react'
import { FaUserCircle } from 'react-icons/fa'

type MeetingLinkProps = {
  onClickContact: () => void
}

export default function NextMeetingOverview({ onClickContact }: MeetingLinkProps) {
  const user = useUserStore((state) => state.user)
  const workspaceId = user?.activeWorkspace.workspaceId ?? ''
  const userId = user?.id ?? ''
  const { data } = useFetchMeetingsByUserId(workspaceId, userId)

  const meetings = useMemo(() => data?.data ?? [], [data])

  const nextMeeting = useMemo(() => {
    if (!meetings || meetings.length === 0) return null

    const futureMeetings = meetings.filter((meeting) => dayjs(meeting.endDatetime).isAfter(dayjs()))

    const nextMeeting = futureMeetings.reduce((a, b) => {
      return dayjs(b.startDatetime).isBefore(dayjs(a.startDatetime)) ? b : a
    }, futureMeetings[0])

    return nextMeeting
  }, [meetings])

  return (
    <div className='flex flex-col gap-5'>
      <div className='border-b pb-2.5'>
        <p>次回面談予定</p>
      </div>

      <NextMeeting meeting={nextMeeting} />

      <div className='flex gap-2.5'>
        <Button className='h-12 min-w-0 flex-1' intent='secondary' onClick={onClickContact}>
          コーチに連絡
        </Button>

        <NextMeetingLink meeting={nextMeeting} />
      </div>
    </div>
  )
}

const NextMeeting = ({ meeting }: { meeting: Meeting | null }) => {
  if (!meeting) {
    return (
      <p className='text-md'>
        次回の面談予約がされておりません。面談予約ページより面談予約を行なってください。
      </p>
    )
  }

  return (
    <>
      <div className='flex flex-col gap-2.5 text-md leading-3'>
        <div className='flex items-center justify-between gap-2.5'>
          <p>日時</p>
          <p>
            {dayjs(meeting.startDatetime).format('MM月DD日 (ddd) HH:mm~') +
              dayjs(meeting.endDatetime).format('HH:mm')}
          </p>
        </div>
        <div className='flex items-center justify-between'>
          <p>担当コーチ</p>
          <div className='flex items-center gap-1'>
            {meeting.employee?.avatar ? (
              <Avatar size='sm'>
                <Image src={meeting.employee?.avatar} alt='avatar' fill />
              </Avatar>
            ) : (
              <FaUserCircle className='fill-text-secondary' size={14} />
            )}
            <p>{meeting.employee?.name}</p>
          </div>
        </div>
      </div>
    </>
  )
}

const NextMeetingLink = ({ meeting }: { meeting: Meeting | null }) => {
  const user = useUserStore((state) => state.user)
  const workspaceId = user?.activeWorkspace.workspaceId ?? ''

  if (!meeting) {
    return (
      <Link href={`/renewal/user/${workspaceId}/meetings`} className='block flex-1'>
        <Button className='h-12 w-full min-w-0'>面談予約</Button>
      </Link>
    )
  }

  return (
    <Link href={meeting.meetingUrl || ''} className='flex-1' target='_blank'>
      <Button className='h-12 w-full min-w-0'>面談に参加</Button>
    </Link>
  )
}
