import QuestionCard from '@/features/questions/components/QuestionCard'
import type { Question } from '@/features/questions/types/Question'

type QuestionCardListProps = {
  isUser: boolean
  workspaceId: string
  questions: Question[]
}

export default function QuestionCardList({
  isUser,
  workspaceId,
  questions,
}: QuestionCardListProps) {
  return (
    <div>
      {questions.map((question) => (
        <QuestionCard
          isUser={isUser}
          workspaceId={workspaceId}
          question={question}
          key={question.id}
        />
      ))}
    </div>
  )
}
