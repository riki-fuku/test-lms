import type { NoMeetingUser } from '@/features/employee/api/fetchNoMeetingUsers'
import useFetchNoMeetingUsers from '@/features/employee/hooks/useFetchNoMeetingUsers'
import UnReservedListItem from '@/features/meeting/components/coach/UnReservedListItem'
import { useEmployeeStore } from '@/store/employee-store'

export default function UnReservedList() {
  const employee = useEmployeeStore((state) => state.employee)
  const workspaceId = employee?.activeWorkspace?.workspaceId

  const { data, isLoading, error } = useFetchNoMeetingUsers(workspaceId ?? '', {
    employeeId: employee?.id ?? '',
  })

  if (isLoading) return <div>loading...</div>
  if (error) return <div>error</div>

  const users = data ?? []

  return (
    <>
      <div className='flex flex-col gap-2'>
        {users &&
          users.map((user: NoMeetingUser) => (
            <UnReservedListItem key={user.id} user={user} workspaceId={workspaceId ?? ''} />
          ))}
        {users.length === 0 && <div>予約していない生徒はいません</div>}
      </div>
    </>
  )
}
