import CommentCardForm from '@/components/ui/CommentCardForm'
import type { CreateQuestionCommentBody } from '@/features/questions/api/createQuestionComment'
import createQuestionComment from '@/features/questions/api/createQuestionComment'
import deleteQuestionComment from '@/features/questions/api/deleteQuestionComment'
import CommentCard from '@/features/questions/components/CommentCard'
import { UNSET } from '@/features/questions/constants/reactionType'
import type { QuestionComment } from '@/features/questions/types/QuestionComment'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useState } from 'react'
import { FaRegCommentDots } from 'react-icons/fa'

type CommentListProps = {
  isUser: boolean
  workspaceId: string
  questionId: string
  comments: QuestionComment[]
  canDelete: boolean
  onCreateComment: () => void
  onDelete: () => void
}

export default function QuestionCommentList({
  isUser,
  workspaceId,
  questionId,
  comments,
  canDelete,
  onCreateComment,
  onDelete,
}: CommentListProps) {
  const { showSnackbar } = useSnackbar()
  const [isOpenCommentCardForm, setIsOpenCommentCardForm] = useState(false)

  const sendComment = async (value: { text: string }) => {
    try {
      const body: CreateQuestionCommentBody = {
        content: value.text,
        guardType: isUser ? 'user' : 'employee',
      }
      await createQuestionComment(workspaceId, questionId, body)
      showSnackbar('コメントしました', 'success')
      onCreateComment()
      setIsOpenCommentCardForm(false)
    } catch (error) {
      console.error(error)
      showSnackbar('コメントできませんでした', 'error')
    }
  }

  return (
    <>
      <div>
        {comments.map((comment) => (
          <CommentCard
            comment={comment}
            key={comment.id}
            type={UNSET}
            canDelete={canDelete}
            onDelete={async (value: { id: string }) => {
              if (confirm('本当に削除しますか？')) {
                await deleteQuestionComment(workspaceId, questionId, value.id)
                onDelete()
              }
            }}
          />
        ))}
        <div
          className='flex cursor-pointer text-form-gray'
          onClick={() => setIsOpenCommentCardForm(!isOpenCommentCardForm)}
        >
          <FaRegCommentDots className='mr-2 -scale-x-100 ' />
          <p className='text-md '>コメントを追加</p>
        </div>
        {isOpenCommentCardForm && <CommentCardForm onSubmit={sendComment} />}
      </div>
    </>
  )
}
