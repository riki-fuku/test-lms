'use client'

import useFetchEmployeeStudents from '@/features/employee/hooks/useFetchEmployeeStudents'
import UserListItem from '@/features/user/components/employee/UserListItem'

type UserListProps = {
  employeeId: string
  workspaceId: string
}

export default function UserList({ employeeId, workspaceId }: UserListProps) {
  const { data } = useFetchEmployeeStudents(workspaceId, employeeId, {
    revalidateOnFocus: false,
  })
  const students = data ?? []

  return (
    <div className='w-full'>
      <div className='mb-5 flex items-center justify-between'>
        <h2 className='text-3xl font-bold'>担当生徒一覧</h2>
      </div>
      <table className='w-full'>
        <thead>
          <tr className='border-b text-left font-normal text-text-secondary [&>th]:p-2 [&>th]:font-normal'>
            <th className='min-w-56'>生徒名</th>
            <th className='min-w-24'>経過日数</th>
            <th className='min-w-40'>卒業日</th>
            <th className='min-w-24'>面談回数</th>
            <td></td>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <UserListItem key={student.userId} workspaceId={workspaceId} student={student} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
