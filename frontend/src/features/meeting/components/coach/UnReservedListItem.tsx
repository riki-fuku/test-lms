import cn from '@/hooks/cn'

import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import type { NoMeetingUser } from '@/features/employee/api/fetchNoMeetingUsers'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaUserCircle } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'

type UnReservedListItemProps = {
  className?: string
  user: NoMeetingUser
  workspaceId: string
}

export default function UnReservedListItem({
  user,
  className,
  workspaceId,
}: UnReservedListItemProps) {
  const router = useRouter()

  const handleClickContact = () => {
    router.push(`/renewal/employee/${workspaceId}/chat?userId=${user.id}`)
  }

  const gridParentStyle = cn(
    'relative h-16 grid w-full grid-cols-3 items-center rounded bg-bg-primary text-md px-5',
    className,
  )
  const gridChildStyle = 'flex items-center gap-1'

  return (
    <>
      <div className={gridParentStyle}>
        <div className={cn('', gridChildStyle)}>
          <Avatar className='bg-white' size='xs'>
            {user.avatar ? (
              <img src={user.avatar} alt='Avatar' />
            ) : (
              <FaUserCircle className='size-full fill-text-secondary text-white' />
            )}
          </Avatar>
          <p>{user.name}</p>
        </div>

        <div className={cn('justify-start gap-5', gridChildStyle)}>
          {user.daysSinceLastMeeting ? (
            <>
              <p>前回の面談から</p>
              <p className='font-bold'>{`${user.daysSinceLastMeeting}日経過`}</p>
            </>
          ) : (
            <p>初回面談を実施してください</p>
          )}
        </div>

        <div className={cn('justify-end', gridChildStyle)}>
          <div className='flex items-center gap-5'>
            <Button onClick={handleClickContact} size='sm' className='h-12 w-32'>
              生徒に連絡
            </Button>
            <div className='relative flex h-12 flex-col justify-center'>
              <Link href={`/renewal/employee/${workspaceId}/users/${user.id}/profile`}>
                <HiDotsVertical className='size-5 cursor-pointer' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
