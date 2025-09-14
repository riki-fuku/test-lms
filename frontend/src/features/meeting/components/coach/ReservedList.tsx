import MeetingListItem from '@/features/meeting/components/coach/MeetingListItem'
import MeetingStatusClass from '@/features/meeting/constants/MeetingStatusClass'
import useFetchMeetings from '@/features/meeting/hooks/useFetchMeetings'
import type { Meeting } from '@/features/meeting/types/Meeting'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useEmployeeStore } from '@/store/employee-store'

export default function ReservedList() {
  const employee = useEmployeeStore((state) => state.employee)
  const workspaceId = employee?.activeWorkspace?.workspaceId

  const { showSnackbar } = useSnackbar()

  const { data, isLoading, mutate, error } = useFetchMeetings(workspaceId ?? '', {
    employeeId: employee?.id ?? '',
    status: MeetingStatusClass.NOT_IMPLEMENTED.id,
    sort: 'asc',
  })
  const meetings = data?.data ?? []

  if (isLoading) return <div>loading...</div>
  if (error) return <div>error. {error.message}</div>

  const handleJoinMeeting = (meeting: Meeting) => {
    if (!meeting.meetingUrl) {
      showSnackbar('面談のURLがありません', 'warning')
      return
    }
    window.open(meeting.meetingUrl, 'noopener,noreferrer')
  }

  return (
    <>
      <div className='flex flex-col gap-2'>
        {meetings &&
          meetings.map((meeting) => (
            <MeetingListItem
              key={meeting.id}
              className='h-16'
              workspaceId={workspaceId ?? ''}
              meeting={meeting}
              onJoinMeeting={handleJoinMeeting}
              onDelete={mutate}
            />
          ))}
        {meetings.length === 0 && <div>予約済みの面談はありません</div>}
      </div>
    </>
  )
}
