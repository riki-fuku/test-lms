'use client'

import Avatar from '@/components/ui/Avatar'
import Image from '@/components/ui/Image'
import type { EmployeeStudent } from '@/features/employee/types/EmployeeStudent'
import cn from '@/hooks/cn'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'

type UserListItemProps = {
  workspaceId: string
  student: EmployeeStudent
}

export default function UserListItem({ workspaceId, student }: UserListItemProps) {
  const StudentName = useCallback(() => {
    return (
      <div className='flex items-center gap-1'>
        <Avatar className='bg-white' size='xs'>
          {student.avatar ? (
            <Image src={student.avatar} alt='Avatar' fill />
          ) : (
            <FaUserCircle className='size-full fill-text-secondary text-white' />
          )}
        </Avatar>
        <div className='flex items-center gap-2.5'>
          <p className='text-md'>{student.name}</p>
          <p className='text-sm text-text-secondary'>{student.nickname}</p>
        </div>
      </div>
    )
  }, [student])

  const router = useRouter()
  const handleClickRow = () => {
    router.push(`/renewal/employee/${workspaceId}/users/${student.userId}/profile`)
  }

  return (
    <tr
      className={cn('h-12 cursor-pointer items-center border-b [&>td]:p-2')}
      onClick={handleClickRow}
    >
      <td>
        <StudentName />
      </td>
      <td>
        <div className='flex items-end gap-1'>
          <span className='min-w-14 text-center'>{student.daysElapsed}</span>
          <span className='text-sm'>日</span>
        </div>
      </td>
      <td>{dayjs(student.graduationDate).format('YYYY年MM月DD日')}</td>
      <td>
        <div className='flex items-end gap-1'>
          <p className='min-w-12 text-center'>{student.totalMeetings}</p>
          <span className='text-sm'>回目</span>
        </div>
      </td>
      <td className='text-center'>
        <IoIosArrowForward className='m-auto' size={20} />
      </td>
    </tr>
  )
}
