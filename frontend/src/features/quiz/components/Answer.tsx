import type { SessionQuestionWithChoices } from '@/features/quiz/types/QuizSessionResult'
import cn from '@/hooks/cn'
import { FaRegCircle } from 'react-icons/fa'
import { GrNext } from 'react-icons/gr'
import { RxCross1 } from 'react-icons/rx'

type AnswerProps = {
  question: SessionQuestionWithChoices
  value: boolean
  index: number
  onClick: () => void
  className?: string
}

type AnswerTipProps = {
  answer: string
}

type AnswerIconProps = {
  isCorrect: boolean
}

export default function Answer({ question, value, index, onClick, className }: AnswerProps) {
  const handleClick = () => {
    onClick()
  }

  const AnswerIcon = ({ isCorrect }: AnswerIconProps) => {
    const size = 16
    return (
      <div>
        {isCorrect ? (
          <FaRegCircle size={size} className='mx-auto text-choice-qa-correct' />
        ) : (
          <RxCross1 size={size} className='mx-auto text-choice-qa-incorrect' />
        )}
      </div>
    )
  }

  const AnswerTip = ({ answer }: AnswerTipProps) => {
    return <span className={answerStyle}>正解:{answer}</span>
  }

  const getAnswerPrefix = () => {
    const findCorrectIndex = question.choices.findIndex((choice) => choice.isCorrect)
    return ['A', 'B', 'C', 'D'][findCorrectIndex] ?? ''
  }

  const getUserChoicePrefix = () => {
    const choiceIndex = question.choices.findIndex(
      (choice) => question.userAnswer == choice.choiceText,
    )
    return ['A', 'B', 'C', 'D'][choiceIndex] ?? ''
  }

  const answerStyle = cn('font-bold px-2 py-1 rounded', [
    question.isCorrect
      ? 'bg-choice-qa-correct/10 text-choice-qa-correct'
      : 'bg-choice-qa-incorrect/10 text-choice-qa-incorrect',
  ])

  const selectStyle = cn(
    'flex items-center justify-between gap-3 py-2 px-4 border h-10 border-t-transparent',
    [
      value
        ? !!question.isCorrect
          ? 'border border-choice-qa-correct rounded'
          : 'border border-choice-qa-incorrect drop-shadow rounded'
        : 'border-x-transparent',
    ],
    className,
  )

  return (
    <div className={selectStyle} onClick={handleClick}>
      <div className='flex items-center gap-10'>
        <span className='min-w-10 text-center text-xl'>Q{index + 1}</span>
        <div>
          <AnswerIcon isCorrect={question.isCorrect} />
        </div>
        <span className=' min-w-16 text-center text-xl font-bold'>
          {!question.userAnswer ? '未回答' : getUserChoicePrefix()}
        </span>
      </div>
      <div className='text-end'>
        <AnswerTip answer={getAnswerPrefix()} />
      </div>
      <GrNext className='lg:hidden' />
    </div>
  )
}
