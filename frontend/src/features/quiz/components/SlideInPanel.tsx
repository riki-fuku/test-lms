import type { Section } from '@/features/curriculum/types/Section'
import ChoiceQuestionsWithCurriculumLink from '@/features/quiz/components/ChoiceQuestionsWithCurriculumLink'
import type { SessionQuestionWithChoices } from '@/features/quiz/types/QuizSessionResult'
import cn from '@/hooks/cn'
import { GrNext, GrPrevious } from 'react-icons/gr'

type SlideInPanelProps = {
  currentPage: number
  lastPage: number
  question: SessionQuestionWithChoices
  section: Section
  slideIn: boolean
  className?: string
  onClick?: (page: number) => void
  onClose?: () => void
}

export default function SlideInPanel({
  currentPage,
  lastPage,
  question,
  section,
  slideIn,
  className,
  onClick,
  onClose,
}: SlideInPanelProps) {
  const handleNextQuestionButton = () => {
    if (onClick) {
      onClick(currentPage + 1)
    }
  }

  const handlePrevQuestionButton = () => {
    if (onClick) {
      onClick(currentPage - 1)
    }
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  const slidePanelStyle = cn(
    'z-10 fixed overflow-auto top-0 left-0 w-screen h-full bg-white pb-5',
    {
      'animate-slideIn': slideIn,
      'animate-slideOut': !slideIn,
    },
  )

  const nextButtonStyle = cn('flex items-center gap-1 col-start-2 text-left', {
    hidden: lastPage <= currentPage,
  })

  const prevButtonStyle = cn('flex items-center gap-1', {
    hidden: currentPage === 1,
  })

  return (
    <div className={cn(slidePanelStyle, className)}>
      <header className='col-span-3 grid items-center border-b px-7 py-5'>
        <GrPrevious className='cursor-pointer font-bold' onClick={handleClose} />
        <span className=' col-start-2 m-auto font-bold'>問題解答</span>
        <span className='col-start-3'></span>
      </header>

      <div className='mt-10 px-4'>
        <ChoiceQuestionsWithCurriculumLink
          className='gap-5 bg-white lg:block'
          currentPage={currentPage}
          question={question}
          section={section}
        />
        <div className='col-span-2 mt-10 grid justify-between'>
          <button className={prevButtonStyle} onClick={handlePrevQuestionButton}>
            <GrPrevious />
            <span>前の問題へ</span>
          </button>
          <button className={nextButtonStyle} onClick={handleNextQuestionButton}>
            <span>次の問題へ</span>
            <GrNext />
          </button>
        </div>
      </div>
    </div>
  )
}
