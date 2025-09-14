import ManageQuestionCard from '@/features/questions/components/management/ManageQuestionCard'
import type { Question } from '@/features/questions/types/Question'

type ManageQuestionCardListProps = {
  workspaceId: string
  questions: Question[]
  onUpdateQuestion: () => void
}

export default function ManageQuestionCardList({
  workspaceId,
  questions,
  onUpdateQuestion,
}: ManageQuestionCardListProps) {
  return (
    <div>
      {questions.map((question) => (
        <ManageQuestionCard
          workspaceId={workspaceId}
          question={question}
          key={question.id}
          onUpdateQuestion={onUpdateQuestion}
        />
      ))}
    </div>
  )
}
