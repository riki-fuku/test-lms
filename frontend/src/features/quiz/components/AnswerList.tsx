import Answer from '@/features/quiz/components/Answer'
import type { SessionQuestionWithChoices } from '@/features/quiz/types/QuizSessionResult'
import cn from '@/hooks/cn'

type AnswerListProps = {
  questions: SessionQuestionWithChoices[]
  selected: SessionQuestionWithChoices
  className?: string
  onClick?: (index: number) => void
}

export default function AnswerList({ questions, selected, className, onClick }: AnswerListProps) {
  const handleSelect = (index: number) => {
    if (onClick) {
      onClick(index + 1)
    }
  }

  return (
    <>
      <ul className={cn(`w-full gap-10 lg:columns-2`, className)}>
        {(questions ?? []).map((question, index) => {
          return (
            <li key={index} className='cursor-pointer hover:bg-bg-hover-primary'>
              <Answer
                question={question}
                index={index}
                value={question.id === selected?.id}
                onClick={() => handleSelect(index)}
              />
            </li>
          )
        })}
      </ul>
    </>
  )
}
