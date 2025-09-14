import Avatar from '@/components/ui/Avatar'
import type { Comment } from '@/features/timeLine/types/Comment'
import dayjs from 'dayjs'
import { IoPersonSharp } from 'react-icons/io5'

type TimeLineCommentCardProps = {
  comment: Comment
}

export default function TimeLineCommentCard(props: TimeLineCommentCardProps) {
  return (
    <>
      <div className='flex items-center gap-5'>
        <div className='flex items-center gap-1 text-sm'>
          <Avatar size='xs'>
            <IoPersonSharp color='#ffffff' />
          </Avatar>
          <span>
            {props.comment.user.last_name}
            {}
            {props.comment.user.first_name}
          </span>
        </div>

        <span className='text-xs text-text-secondary'>
          {dayjs(props.comment.date).format('YYYY/MM/DD HH:MM')}
        </span>
      </div>

      <div className='relative'>
        <div className='absolute left-2 h-full w-0.5 bg-bg-secondary'></div>
        <p className='p-6'>{props.comment.message}</p>
      </div>
    </>
  )
}
