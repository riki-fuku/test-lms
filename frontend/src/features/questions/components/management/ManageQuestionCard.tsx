import Image from '@/components/ui/Image'
import { getBreakpointValue } from '@/constants/breakpoint'
import updateQuestion from '@/features/questions/api/updateQuestion'
import Label from '@/features/questions/components/Label'
import LabelCategory from '@/features/questions/components/LabelCategory'
import TagLabel from '@/features/questions/components/TagLabel'
import StatusSelectMenu from '@/features/questions/components/management/StatusSelectMenu'
import type { Question } from '@/features/questions/types/Question'
import { RESOLVED, UNHANDLED } from '@/features/questions/types/QuestionStatus'
import cn from '@/hooks/cn'
import { useSnackbar } from '@/hooks/useSnackbar'
import useWindowSize from '@/hooks/useWindowSize'
import { useEmployeeStore } from '@/store/employee-store'
import { BiLinkExternal } from 'react-icons/bi'
import { FaUserCircle } from 'react-icons/fa'

export type ManageQuestionCardProps = {
  workspaceId: string
  question: Question
  onUpdateQuestion: () => void
}

export default function ManageQuestionCard({
  workspaceId,
  question,
  onUpdateQuestion,
}: ManageQuestionCardProps) {
  const { showSnackbar } = useSnackbar()
  const loginEmployee = useEmployeeStore((state) => state.employee)
  const resolvedStyle =
    question.status === RESOLVED
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

  const calculateTimeAgo = (createdAtString: string) => {
    const createdAtDate = new Date(createdAtString)
    const elapsedMs = new Date().getTime() - createdAtDate.getTime()
    const minutesAgo = Math.floor(elapsedMs / (1000 * 60))
    const hoursAgo = Math.floor(elapsedMs / (1000 * 60 * 60))
    const daysAgo = Math.floor(hoursAgo / 24)

    if (minutesAgo < 1) {
      return '1分'
    } else if (minutesAgo < 60) {
      return `${minutesAgo}分前`
    } else if (hoursAgo < 24) {
      return `${hoursAgo}時間前`
    } else {
      return `${daysAgo}日前`
    }
  }

  const getBestAnswerUser = () => {
    const bestAnswer = question.answers?.find((answer) => answer.isBestAnswer)
    return bestAnswer && bestAnswer.actor.nickname
  }

  const handleOpenQuestion = async () => {
    try {
      if (loginEmployee && question.status === UNHANDLED && question.questionResponder === null) {
        await updateQuestion(workspaceId, question.id, { questionResponderId: loginEmployee.id })
        onUpdateQuestion()
      }
    } catch (error) {
      console.error(error)
      showSnackbar('ステータスを変更できませんでした', 'error')
    }
    window.open(`/renewal/${workspaceId}/questions/posts/${question.id}`, 'noopener,noreferrer')
  }

  const handleChangeStatus = async (status?: number, questionResponderId?: string | null) => {
    try {
      const body = {
        status,
        questionResponderId,
      }
      await updateQuestion(workspaceId, question.id, body)
      showSnackbar('ステータスを変更しました', 'success')
      onUpdateQuestion()
    } catch (error) {
      console.error(error)
      showSnackbar('ステータスを変更できませんでした', 'error')
    }
  }

  const { width } = useWindowSize()

  const tags = question.tags || []
  const displayedTags = width && width <= getBreakpointValue('md') ? tags.slice(0, 2) : tags

  return (
    <div className='flex flex-col gap-2.5 border-b border-border-primary px-2 py-5'>
      <div className='flex items-center justify-between'>
        <StatusSelectMenu
          status={question.status}
          questionResponder={question.questionResponder}
          lastResponder={question.lastResponder}
          onChangeStatus={handleChangeStatus}
        />
        {question.lastResponder !== null && (
          <div className='flex items-center gap-2.5 text-sm'>
            <p>最終対応者</p>
            <div className='flex items-center gap-1'>
              <FaUserCircle className='text-text-secondary' size={20} />
              <p className='text-sm text-text-secondary'>{question.lastResponder?.name ?? ''}</p>
            </div>
          </div>
        )}
      </div>
      <div className='flex gap-5'>
        <div className='flex flex-col text-center'>
          <Label label={resolvedStyle.label} className={resolvedStyle.labelStyle} />
          <p className={`text-xl ${resolvedStyle.textColor}`}>{question.answers?.length || 0}</p>
          <p className={`text-xs ${resolvedStyle.textColor}`}>回答</p>
        </div>
        <div className='grow'>
          <div className='mb-2 flex items-center gap-1 text-mainColor' onClick={handleOpenQuestion}>
            <BiLinkExternal size={16} />
            <p className='cursor-pointer text-md lg:text-base'>{question.title}</p>
          </div>
          <div className='flex justify-between'>
            <div className='align-center flex items-center gap-2'>
              <div className='flex items-center gap-1'>
                <div
                  className={cn(
                    'size-2.5 rounded',
                    question.isPublic === true
                      ? 'bg-gradient-to-r from-sub-color to-main-color'
                      : 'bg-bg-tertiary',
                  )}
                ></div>
                <p
                  className={cn(
                    question.isPublic == true ? 'text-main-color' : 'text-text-secondary',
                  )}
                >
                  {question.isPublic ? '公開中' : '非公開'}
                </p>
              </div>
              <LabelCategory id={question.category} />
              <div className='h-5 border-l border-weakGrey'></div>
              {displayedTags.map((tag) => (
                <TagLabel key={tag.id} label={tag.name} />
              ))}
              {question.hasBestAnswer == true && (
                <div className='flex items-center gap-1'>
                  <div className='relative mr-1 size-5'>
                    <Image src='/images/best_answer.png' alt='ベストアンサー' fill />
                  </div>
                  <div className='flex gap-1'>
                    <FaUserCircle className='text-text-secondary' size={20} />
                    <p className='text-sm text-text-secondary'>{getBestAnswerUser()}</p>
                  </div>
                </div>
              )}
            </div>
            <div className='flex items-center gap-2.5 lg:gap-5'>
              <div className='flex gap-1'>
                <FaUserCircle className='text-text-secondary' size={20} />
                <p className='text-sm text-text-secondary'>{question.user.name}</p>
              </div>
              <p className='text-xs lg:text-md'>{calculateTimeAgo(question.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
