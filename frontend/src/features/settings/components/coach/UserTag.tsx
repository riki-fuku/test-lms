import Avatar from '@/components/ui/Avatar'
import Image from '@/components/ui/Image'
import type { User } from '@/features/settings/components/coach/TagSettingList'
import { FaUserCircle } from 'react-icons/fa'

export default function UserTag({ user }: { user: User }) {
  return (
    <div className='flex h-6 items-center gap-1 rounded bg-bg-primary px-2.5'>
      <Avatar className='size-4 bg-bg-primary'>
        {user.avatar ? (
          <Image src={user.avatar} alt={user.name} />
        ) : (
          <FaUserCircle className='text-text-secondary' />
        )}
      </Avatar>
      <p className='text-sm'>{user.name}</p>
      <p className='text-xs text-text-secondary'>{user.roman}</p>
    </div>
  )
}
