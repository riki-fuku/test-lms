import type { AvatarSize } from '@/components/elements/Avatar'
import Avatar from '@/components/elements/Avatar'
import Image from '@/components/elements/Image'
import { IoPersonSharp } from 'react-icons/io5'

interface UserAvatarProps {
  user?: { name?: string; avatar?: string | null }
  size?: AvatarSize
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user, size }) => {
  if (!user) return null

  return (
    <div className='flex gap-1 text-sm'>
      <Avatar size={size}>
        {user.avatar ? (
          <Image src={user.avatar} alt='プロフィール' fill />
        ) : (
          <IoPersonSharp color='#ffffff' />
        )}
      </Avatar>
      <p className='text-text-secondary'> {user.name} </p>
    </div>
  )
}
