import type { TaskComment } from '@/features/backlog/types/TaskComment'
import CommentCard from '@/features/questions/components/CommentCard'
import { UNSET } from '@/features/questions/constants/reactionType'

type TaskCommentListProps = {
  comments: TaskComment[]
}

export default function TaskCommentList({ comments }: TaskCommentListProps) {
  return (
    <>
      <div>
        {comments.map((comment) => {
          return <CommentCard comment={comment} key={comment.id} type={UNSET} canDelete={false} />
        })}
      </div>
    </>
  )
}
