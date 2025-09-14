import TimeLineCommentCard from '@/features/timeLine/components/TimeLineCommentCard'
import type { Comment } from '@/features/timeLine/types/Comment'
import { useState } from 'react'
import { BsChatDots } from 'react-icons/bs'

type TimeLineCommentCardProps = {
  comments: Comment[]
  onClick: () => void
}

export default function TimeLineCommentCardList(props: TimeLineCommentCardProps) {
  const [isShowLink, setIsShowLink] = useState(true)

  function handleClick() {
    setIsShowLink(false)
    props.onClick()
  }

  return (
    <div className='flex flex-col overflow-hidden border-b py-8'>
      {props.comments.map((comment, index) => (
        <TimeLineCommentCard key={index} comment={comment} />
      ))}

      {isShowLink && (
        <div
          className='flex cursor-pointer items-center gap-1 text-md text-text-secondary'
          onClick={handleClick}
        >
          <BsChatDots className='-scale-x-100' size={20} />
          <p>コメントを追加</p>
        </div>
      )}
    </div>
  )
}
