import CommentCardForm from '@/components/ui/CommentCardForm'
import type { CreateQuestionAnswerCommentBody } from '@/features/questions/api/createQuestionAnswerComment'
import createQuestionAnswerComment from '@/features/questions/api/createQuestionAnswerComment'
import deleteQuestionAnswerComment from '@/features/questions/api/deleteQuestionAnswerComment'
import CommentCard from '@/features/questions/components/CommentCard'
import { UNSET } from '@/features/questions/constants/reactionType'
import type { QuestionComment } from '@/features/questions/types/QuestionComment'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useState } from 'react'
import { FaRegCommentDots } from 'react-icons/fa'

type AnswerCommentListProps = {
  isUser: boolean
  workspaceId: string
  questionId: string
  answerId: string
  comments: QuestionComment[]
  canDelete: boolean
  onCreateAnswerComment: () => void
  onDelete: () => void
}
export default function AnswerCommentList({
  isUser,
  workspaceId,
  questionId,
  answerId,
  comments,
  canDelete,
  onCreateAnswerComment,
  onDelete,
}: AnswerCommentListProps) {
  const { showSnackbar } = useSnackbar()
  const [isOpenCommentCardForm, setIsOpenCommentCardForm] = useState(false)

  const sendComment = async (value: { text: string }) => {
    if (!value.text) {
      showSnackbar('コメントを入力してください', 'warning')
      return
    }
    try {
      const body: CreateQuestionAnswerCommentBody = {
        content: value.text,
        guardType: isUser ? 'user' : 'employee',
      }
      await createQuestionAnswerComment(workspaceId, questionId, answerId, body)
      showSnackbar('コメントしました', 'success')
      onCreateAnswerComment()
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
                await deleteQuestionAnswerComment(workspaceId, questionId, answerId, value.id)
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
