'use client'

import type { AvatarSize } from '@/components/elements/Avatar'
import Divider from '@/components/elements/Divider'
import { UserAvatar } from '@/components/elements/UserAvatar'
import type { Meeting } from '@/features/meeting/types/Meeting'
import dayjs from 'dayjs'

interface MeetingPropertyPanelProps {
  meeting: Meeting
  size?: AvatarSize
}

interface MeetingPropertyItemProps {
  label: string
  children: React.ReactNode
}

function MeetingPropertyItem({ label, children }: MeetingPropertyItemProps) {
  return (
    <div className='flex items-start gap-4'>
      <p className='min-w-20 text-sm font-bold'>{label}</p>
      <div>{children}</div>
    </div>
  )
}

export default function MeetingPropertyPanel({ meeting, size }: MeetingPropertyPanelProps) {
  return (
    <>
      <div className='flex flex-col gap-5'>
        <div className='border-b text-xl font-bold'>面談データ</div>

        <MeetingPropertyItem label='日時'>
          <p className='text-sm'>
            {dayjs(meeting.startDatetime).format('YYYY年MM月DD日 (ddd) HH:mm')}〜
          </p>
        </MeetingPropertyItem>

        <MeetingPropertyItem label='面談回数'>
          <p className='text-sm'>
            <span className='text-base'>
              {meeting.meetingCount} / {meeting.user?.maxMeetings}
            </span>
            回目
          </p>
        </MeetingPropertyItem>

        <MeetingPropertyItem label='生徒名'>
          <UserAvatar user={meeting.user} size={size} />
        </MeetingPropertyItem>

        <MeetingPropertyItem label='ステータス'>
          <p className='text-sm'>{meeting.status.name}</p>
        </MeetingPropertyItem>

        <MeetingPropertyItem label='コーチ名'>
          <UserAvatar user={meeting.employee} size={size} />
        </MeetingPropertyItem>
      </div>

      <Divider className='hidden lg:block' />
    </>
  )
}
