import Avatar from '@/components/ui/Avatar'
import Image from '@/components/ui/Image'
import useDateTools from '@/hooks/useDateTools'
import { IoPersonSharp } from 'react-icons/io5'

type NotificationTabMenuItemProps = {
  user?: {
    avatar: string | null
    name: string
  }
  message: {
    content: string
    createdAt: string
  }
}

export default function NotificationTabMenuItem({ user, message }: NotificationTabMenuItemProps) {
  const { formatDate } = useDateTools()
  return (
    <div className='flex flex-col gap-2 py-2'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Avatar size='sm'>
            {user && user.avatar ? (
              <Image src={user.avatar} alt='プロフィール' fill />
            ) : (
              <IoPersonSharp color='#ffffff' />
            )}
          </Avatar>
          {user && <p className='text-sm'>{user.name}</p>}
        </div>
        <p className='text-xs'>{formatDate(message.createdAt, 'YYYY.MM.DD')}</p>
      </div>
      {/* メッセージ */}
      <div>
        <p className='line-clamp-3 text-sm'>{message.content}</p>
      </div>
    </div>
  )
}
