import type { Employee } from '@/features/employee/types'
import AnswerCard from '@/features/questions/components/AnswerCard'
import NewAnswerBox from '@/features/questions/components/NewAnswerBox'
import type { QuestionAnswer } from '@/features/questions/types/QuestionAnswer'
import type { User } from '@/features/user/types/User'

type AnswerListProps = {
  isUser: boolean
  loginUser:
    | Pick<User, 'id' | 'avatar' | 'nickname' | 'name'>
    | Pick<Employee, 'id' | 'avatar' | 'nickname' | 'name'>
  workspaceId: string
  questionId: string
  questionUserId: string
  answers: QuestionAnswer[]
  className?: string
  canDelete: boolean
  onCreateAnswer: () => void
  onSelectBestAnswer: () => void
  onCreateAnswerComment: () => void
  onDelete: () => void
}

export default function AnswerList({
  isUser,
  loginUser,
  workspaceId,
  questionId,
  questionUserId,
  answers,
  className,
  canDelete,
  onCreateAnswer,
  onSelectBestAnswer,
  onCreateAnswerComment,
  onDelete,
}: AnswerListProps) {
  const checkHasBestAnswer = (answers: QuestionAnswer[]) => {
    return answers.some((answer) => answer.isBestAnswer)
  }

  return (
    <div className={`rounded-sm border border-weakGrey bg-white ${className}`}>
      <div className='border-b border-weakGrey p-5 px-4'>
        <p className='text-xl font-bold'>回答{answers.length}件</p>
      </div>
      <div className=' bg-white'>
        {answers.map((answer) => (
          <AnswerCard
            key={answer.id}
            isUser={isUser}
            loginUser={loginUser}
            workspaceId={workspaceId}
            questionId={questionId}
            questionUserId={questionUserId}
            answer={answer}
            canDelete={canDelete}
            hasBestAnswer={checkHasBestAnswer(answers)}
            onSelectBestAnswer={onSelectBestAnswer}
            onCreateAnswerComment={onCreateAnswerComment}
            onDelete={onDelete}
          />
        ))}
        <div className='p-5'>
          <NewAnswerBox
            isUser={isUser}
            loginUser={loginUser}
            workspaceId={workspaceId}
            questionId={questionId}
            onCreateAnswer={onCreateAnswer}
          />
        </div>
      </div>
    </div>
  )
}
