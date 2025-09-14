import MarkDown2HTML from '@/components/base/MarkDown2HTML'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Image from '@/components/ui/Image'
import { getBreakpointValue } from '@/constants/breakpoint'
import updateQuestion from '@/features/questions/api/updateQuestion'
import Label from '@/features/questions/components/Label'
import LabelCategory from '@/features/questions/components/LabelCategory'
import QuestionCommentList from '@/features/questions/components/QuestionCommentList'
import TagLabelList from '@/features/questions/components/TagLabelList'
import type { Question } from '@/features/questions/types/Question'
import { RESOLVED } from '@/features/questions/types/QuestionStatus'
import useDateTools from '@/hooks/useDateTools'
import { useSnackbar } from '@/hooks/useSnackbar'
import useWindowSize from '@/hooks/useWindowSize'
import { useMemo, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

type DetailQuestionProps = {
  className?: string
  isUser: boolean
  workspaceId: string
  question: Question
  canDelete: boolean
  onUpdateQuestion: () => void
  onDelete: () => void
}

export default function DetailQuestion({
  isUser,
  workspaceId,
  question,
  className,
  canDelete,
  onUpdateQuestion,
  onDelete,
}: DetailQuestionProps) {
  const dateTools = useDateTools()
  const { showSnackbar } = useSnackbar()
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false)

  const resolvedStyle = useMemo(() => {
    return question.status === RESOLVED
      ? {
          label: '解決済',
          labelStyle: 'bg-warn-red text-white w-9 p-1 lg:p-1',
          textColor: 'text-warn',
        }
      : {
          label: '未解決',
          labelStyle: 'text-white w-9 p-1 lg:p-1',
          textColor: 'text-text-secondary',
        }
  }, [question.status])

  const handleClickPublish = async () => {
    try {
      await updateQuestion(workspaceId, question.id, { isPublic: true })
      showSnackbar('質問を公開しました', 'success')
      onUpdateQuestion()
    } catch (error) {
      console.error(error)
      showSnackbar('質問を公開できませんでした', 'error')
    }
  }

  const handleClickUnpublish = async () => {
    try {
      await updateQuestion(workspaceId, question.id, { isPublic: false })
      showSnackbar('質問を非公開にしました', 'success')
      onUpdateQuestion()
    } catch (error) {
      console.error(error)
      showSnackbar('質問を非公開にできませんでした', 'error')
    }
  }

  const { width } = useWindowSize()

  const displayedTags =
    width && width <= getBreakpointValue('lg') ? question.tags?.slice(0, 2) : question.tags

  return (
    <div className={`rounded-sm bg-white ${className}`}>
      <div className='px-4 lg:px-5 lg:py-8'>
        <div className='flex h-12 justify-end gap-4'>
          {!isUser && (
            <>
              {question.isPublic ? (
                <Button intent='secondary' onClick={handleClickUnpublish}>
                  非公開にする
                </Button>
              ) : (
                <Button onClick={handleClickPublish}>公開する</Button>
              )}
            </>
          )}
        </div>

        <div className='mb-2.5 flex items-center gap-2.5 text-sm'>
          {question.category && <LabelCategory id={question.category} className='p-2' />}
          <Label label={resolvedStyle.label} className={resolvedStyle.labelStyle} />
        </div>

        <p className='mb-5 text-xl font-bold lg:text-2xl'>{question.title}</p>

        <div className='flex h-5 justify-between text-xs'>
          <TagLabelList tags={displayedTags || []} />
          <div className='flex items-center justify-between gap-5'>
            <div className='flex items-center gap-2'>
              <Avatar className='bg-white' size='xs'>
                {question.user.avatar ? (
                  <Image src={question.user.avatar} alt='Avatar' fill />
                ) : (
                  <FaUserCircle className='size-full fill-text-secondary text-weakBlack' />
                )}
              </Avatar>
              <p>{question.user.nickname}</p>
            </div>
            <p>投稿 {dateTools.formatDate(question.createdAt, 'YYYY/MM/DD HH:mm')}</p>
          </div>
        </div>

        <hr className='my-5 bg-weakGrey'></hr>

        <MarkDown2HTML>{question.content}</MarkDown2HTML>

        <hr className='my-5 bg-weakGrey'></hr>

        <h2 className='text-2xl font-bold'>質問へのコメント</h2>

        <div
          className='flex cursor-pointer items-center gap-2.5 p-4'
          onClick={() => setIsCommentOpen(!isCommentOpen)}
        >
          {question.comments.length >= 3 ? (
            <p>過去{question.comments.length}件のコメントを表示</p>
          ) : (
            <p>コメント</p>
          )}
          {isCommentOpen ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
        </div>
        {isCommentOpen && (
          <QuestionCommentList
            isUser={isUser}
            workspaceId={workspaceId}
            questionId={question.id}
            comments={question.comments}
            canDelete={canDelete}
            onCreateComment={onUpdateQuestion}
            onDelete={onDelete}
          />
        )}
      </div>
    </div>
  )
}
