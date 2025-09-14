import Avatar from '@/components/ui/Avatar'
import Image from '@/components/ui/Image'
import type { TaskComment } from '@/features/backlog/types/TaskComment'
import type { DISLIKE, LIKE, UNSET } from '@/features/questions/constants/reactionType'
import type { QuestionComment } from '@/features/questions/types/QuestionComment'
import useDateTools from '@/hooks/useDateTools'
import { BsTrash } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'

type CommentCardProps = {
  comment: TaskComment | QuestionComment
  type: typeof UNSET | typeof LIKE | typeof DISLIKE
  canDelete: boolean
  onDelete?: (value: { id: string }) => void
}

export default function CommentCard({ comment, type, canDelete, onDelete }: CommentCardProps) {
  const dateTools = useDateTools()
  // const [reactionType, setReactionType] = useState(type)

  // const handleLikeClick = () => {
  //   setReactionType(reactionType === 1 ? 0 : 1)
  // }

  // const handleDislikeClick = () => {
  //   setReactionType(reactionType === 2 ? 0 : 2)
  // }

  const getActorName = () => {
    if ('actor' in comment) {
      return comment.actor.nickname ?? comment.actor.name ?? ''
    } else {
      return comment.actorName ?? ''
    }
  }

  const getAvatarUrl = () => {
    if ('actor' in comment) {
      return comment.actor.avatar ?? ''
    } else {
      return comment.actorAvatar ?? ''
    }
  }

  return (
    <div>
      <div className='flex items-center gap-5 border-weakGrey'>
        <div className='flex items-center gap-2'>
          <Avatar className='bg-white' size='xs'>
            {getAvatarUrl() ? (
              <Image src={getAvatarUrl()} alt='Avatar' fill />
            ) : (
              <FaUserCircle className='size-full fill-text-secondary text-weakBlack' />
            )}
          </Avatar>
          <p className='text-sm'>{getActorName()}</p>
        </div>
        <p className='text-sm text-weakBlack'>
          {dateTools.formatDate(comment.createdAt, 'YYYY/MM/DD HH:mm')}
        </p>
        <div className='flex justify-end'>
          {canDelete ? (
            <div className='flex w-full items-center justify-end pr-3'>
              <BsTrash
                className='cursor-pointer'
                size={20}
                color='red'
                onClick={() => onDelete?.({ id: comment.id })}
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className='ml-2 flex flex-col gap-2.5 border-l px-2.5 py-5'>
        <p className='whitespace-pre-wrap'>{comment.content}</p>
        {/* <div className='flex items-center gap-7 text-md text-weakBlack'>
          <SlLike
            className='cursor-pointer'
            style={{ color: reactionType === 1 ? 'blue' : 'grey' }}
            onClick={handleLikeClick}
          />
          <SlDislike
            className='cursor-pointer'
            style={{ color: reactionType === 2 ? '#E25B74' : 'grey' }}
            onClick={handleDislikeClick}
          />
        </div> */}
      </div>
    </div>
  )
}
