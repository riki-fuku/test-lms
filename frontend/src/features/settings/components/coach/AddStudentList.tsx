import Avatar from '@/components/ui/Avatar'
import Image from '@/components/ui/Image'
import type { User } from '@/features/settings/components/coach/TagSettingList'
import cn from '@/hooks/cn'
import { useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'

export default function AddStudentList({
  user,
  onSelect,
}: {
  user: User
  onSelect: (id: number, isSelect: boolean) => void
}) {
  const [isSelect, setIsSelect] = useState(false)

  useEffect(() => {
    onSelect(user.id, isSelect)
  }, [isSelect])

  return (
    <div className='flex h-12 w-1/2 items-center justify-between gap-1 rounded px-2.5'>
      <div className='flex shrink-0 items-center gap-1'>
        <Avatar className='size-5 '>
          {user.avatar ? (
            <Image src={user.avatar} alt={user.name} />
          ) : (
            <FaUserCircle className='size-5 bg-white text-text-secondary' />
          )}
        </Avatar>
        <p>{user.name}</p>
        <p className='text-md text-text-secondary'>{user.roman}</p>
      </div>
      <div
        className={cn(
          'flex size-5 cursor-pointer items-center justify-center rounded-full',
          isSelect ? 'bg-main-color' : 'bg-bg-primary',
        )}
        onClick={() => setIsSelect(!isSelect)}
      >
        <div
          className={cn(
            'flex size-4 items-center justify-center rounded-full border border-white',
            isSelect ? 'bg-main-color' : 'bg-bg-primary',
          )}
        ></div>
      </div>
    </div>
  )
}
