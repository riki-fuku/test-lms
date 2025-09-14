import Avatar from '@/components/ui/Avatar'
import Check from '@/components/ui/Check'
import TimeLineCommentCardForm from '@/features/timeLine/components/TimeLineCommentCardForm'
import TimeLineCommentCardList from '@/features/timeLine/components/TimeLineCommentCardList'
import type { Comment } from '@/features/timeLine/types/Comment'
import type { Post } from '@/features/timeLine/types/Post'
import dayjs from 'dayjs'
import { useState } from 'react'
import { BsChatDots } from 'react-icons/bs'
import { IoPersonSharp } from 'react-icons/io5'

type TimeLinePostCardProps = {
  post: Post
  onSubmit: (value: { text: string }, post: Post) => void
}

export default function TimeLinePostCard(props: TimeLinePostCardProps) {
  const [isShowCommentForm, setIsShowCommentForm] = useState(false)

  function getHasComment(comments: Comment[]): boolean {
    return comments.length !== 0
  }

  function showCommentForm() {
    setIsShowCommentForm(true)
  }

  function handelSubmit(value: { text: string }) {
    props.onSubmit(value, props.post)
  }

  return (
    <div>
      <div className='flex flex-col gap-5 overflow-hidden border-b py-8'>
        <div className='flex items-center gap-5'>
          <div className='flex items-center gap-1 text-sm'>
            <Avatar size='xs'>
              <IoPersonSharp color='#ffffff' />
            </Avatar>
            <span>
              {props.post.operation.last_name}
              {}
              {props.post.operation.first_name}
            </span>
          </div>

          <span className='text-xs text-text-secondary'>
            {dayjs(props.post.date).format('YYYY/MM/DD HH:MM')}
          </span>
        </div>

        <p>{props.post.content}</p>

        <div className='flex gap-6 p-3 text-md text-text-secondary'>
          <div className='flex cursor-pointer items-center gap-1' onClick={showCommentForm}>
            <BsChatDots className='-scale-x-100' size={20} />
            <span>
              {getHasComment(props.post.comments) ? props.post.comments.length : 'コメント'}
            </span>
          </div>
          <div className='flex items-center gap-1'>
            <Check value={props.post.completed} />
            <span>完了</span>
          </div>
        </div>
      </div>

      {getHasComment(props.post.comments) && (
        <TimeLineCommentCardList comments={props.post.comments} onClick={showCommentForm} />
      )}

      {isShowCommentForm && <TimeLineCommentCardForm onSubmit={handelSubmit} />}
    </div>
  )
}
