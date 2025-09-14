import MarkDown2HTML from '@/components/base/MarkDown2HTML'
import Avatar from '@/components/ui/Avatar'
import Image from '@/components/ui/Image'
import type { Employee } from '@/features/employee/types'
import deleteQuestionAnswer from '@/features/questions/api/deleteQuestionAnswer'
import updateQuestionAnswer from '@/features/questions/api/updateQuestionAnswer'
import AnswerCommentList from '@/features/questions/components/AnswerCommentList'
import BestAnswer from '@/features/questions/components/BestAnswer'
import type { QuestionAnswer } from '@/features/questions/types/QuestionAnswer'
import type { User } from '@/features/user/types/User'
import cn from '@/hooks/cn'
import useDateTools from '@/hooks/useDateTools'
import { useSnackbar } from '@/hooks/useSnackbar'
import { Divider } from '@mui/material'
import { BsTrash } from 'react-icons/bs'
import { FaRegCommentDots, FaUserCircle } from 'react-icons/fa'

type AnswerCardProps = {
  isUser: boolean
  loginUser: Pick<User, 'id'> | Pick<Employee, 'id'>
  workspaceId: string
  questionId: string
  questionUserId: string
  answer: QuestionAnswer
  hasBestAnswer: boolean
  canDelete: boolean
  onSelectBestAnswer: () => void
  onCreateAnswerComment: () => void
  onDelete: () => void
}

export default function AnswerCard({
  isUser,
  loginUser,
  workspaceId,
  questionId,
  questionUserId,
  answer,
  hasBestAnswer,
  canDelete,
  onSelectBestAnswer,
  onCreateAnswerComment,
  onDelete,
}: AnswerCardProps) {
  const { showSnackbar } = useSnackbar()
  const dateTools = useDateTools()
  const isBestAnswerSelectable =
    !answer.isBestAnswer &&
    !hasBestAnswer &&
    loginUser?.id !== answer.actor.id &&
    loginUser?.id === questionUserId

  const handleBestAnswerClick = async () => {
    try {
      await updateQuestionAnswer(workspaceId, questionId, answer.id, { isBestAnswer: true })
      onSelectBestAnswer()
    } catch (error) {
      console.error(error)
      showSnackbar('ベストアンサー決定に失敗しました', 'error')
    }
  }

  return (
    <div className='flex flex-col gap-5 border-b border-weakGrey p-5'>
      <div className='flex w-full items-center justify-between'>
        <div className='flex items-center gap-5'>
          <div className='flex items-center gap-2'>
            <Avatar className='bg-white' size='xs'>
              {answer.actor.avatar ? (
                <Image src={answer.actor.avatar} alt='Avatar' fill />
              ) : (
                <FaUserCircle className='size-full fill-text-secondary text-weakBlack' />
              )}
            </Avatar>
            <p className='text-sm'>{answer.actor.nickname ?? answer.actor.name ?? ''}</p>
          </div>
          <p className='text-sm text-weakBlack'>
            {dateTools.formatDate(answer.createdAt, 'YYYY/MM/DD HH:mm')}
          </p>
          <div className='flex justify-end'>
            {canDelete ? (
              <div className='flex w-full items-center justify-end pr-3'>
                <BsTrash
                  className='cursor-pointer'
                  size={20}
                  color='red'
                  onClick={async () => {
                    if (confirm('本当に削除しますか？')) {
                      await deleteQuestionAnswer(workspaceId, questionId, answer.id)
                      onDelete()
                    }
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
        {Boolean(answer.isBestAnswer) && <BestAnswer />}
      </div>
      <MarkDown2HTML>{answer.content}</MarkDown2HTML>
      <div className='flex items-center gap-7 text-md text-weakBlack'>
        {Boolean(answer.comments?.length) && (
          <div className='flex cursor-pointer items-center'>
            <FaRegCommentDots className='mr-2 -scale-x-100' />
            {answer.comments?.length}
          </div>
        )}
        <div className='flex items-center gap-5'>
          {isBestAnswerSelectable && (
            <div
              className='flex cursor-pointer items-center rounded-sm border border-weakBlack px-2.5 py-1'
              onClick={handleBestAnswerClick}
            >
              <div className='relative mr-1 size-5'>
                <Image src='/images/best_answer.png' alt='ベストアンサー' fill />
              </div>
              ベストアンサーに選ぶ
            </div>
          )}
        </div>
      </div>
      <Divider className={cn(answer.comments?.length === 0 && 'hidden')} />
      <AnswerCommentList
        isUser={isUser}
        workspaceId={workspaceId}
        questionId={questionId}
        answerId={answer.id}
        comments={answer.comments ?? []}
        onCreateAnswerComment={onCreateAnswerComment}
        canDelete={canDelete}
        onDelete={onDelete}
      />
    </div>
  )
}
