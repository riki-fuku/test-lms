import MarkDown2HTML from '@/components/base/MarkDown2HTML'
import Divider from '@/components/ui/Divider'
import type { Section } from '@/features/curriculum/types/Section'
import ChoiceList from '@/features/quiz/components/ChoiceList'
import ReferenceTextBook from '@/features/quiz/components/ReferenceTextBook'
import type { Choice } from '@/features/quiz/types/Choice'
import type { QuizSessionQuestionChoice } from '@/features/quiz/types/QuizSessionQuestionChoice'
import type { SessionQuestionWithChoices } from '@/features/quiz/types/QuizSessionResult'
import cn from '@/hooks/cn'
import { FaRegCircle } from 'react-icons/fa'
import { RxCross1 } from 'react-icons/rx'

type ChoiceQuestionsWithCurriculumLinkProps = {
  currentPage: number
  question: SessionQuestionWithChoices
  section: Section
  className?: string
}

export default function ChoiceQuestionsWithCurriculumLink({
  currentPage,
  question,
  section,
  className,
}: ChoiceQuestionsWithCurriculumLinkProps) {
  function Icon() {
    return (
      <span>
        {question.isCorrect ? (
          <FaRegCircle className='text-choice-qa-correct' size={15} />
        ) : (
          <RxCross1 className='text-choice-qa-incorrect' size={15} />
        )}
      </span>
    )
  }

  function makeChoiceListByAnswerList(): Choice[] {
    return question.choices.map((choice, index) => {
      return {
        prefix: ['A', 'B', 'C', 'D'][index],
        text: choice.choiceText,
        type: getChoiceItemType(choice),
        value: ['CORRECT', 'INCORRECT'].includes(getChoiceItemType(choice)),
      }
    })
  }

  function getChoiceItemType(choice: QuizSessionQuestionChoice) {
    if (choice.isCorrect) {
      return 'CORRECT'
    }

    if (!choice.isCorrect) {
      if (question.userAnswer === choice.choiceText) {
        return 'INCORRECT'
      }
    }

    return 'DEFAULT'
  }

  return (
    <div className={cn(`flex w-full flex-col gap-5 text-left`, className)}>
      {/* 問題内容 */}
      <div>
        <div className='flex items-center gap-2 text-xl font-bold'>
          Q{currentPage}
          <Icon />
        </div>
        <MarkDown2HTML>{question.question.questionText ?? ''}</MarkDown2HTML>
      </div>
      <Divider />
      <ChoiceList choices={makeChoiceListByAnswerList()} />
      <Divider />
      <ReferenceTextBook section={section} className='w-full' />
    </div>
  )
}
