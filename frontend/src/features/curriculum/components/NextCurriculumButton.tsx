import type { Section } from '@/features/curriculum/types/Section'
import cn from '@/hooks/cn'
import { HiOutlineChevronRight } from 'react-icons/hi'

type NextCurriculumButtonProps = {
  className?: string
  section: Section
  onClick?: () => void
}

export default function NextCurriculumButton({
  className,
  section,
  onClick,
}: NextCurriculumButtonProps) {
  function handleClick() {
    if (onClick) {
      onClick()
    }
  }

  return (
    <button
      className={cn(
        'min-w-44 cursor-pointer rounded px-5 py-2 hover:drop-shadow',
        'flex items-center justify-between',
        'border border-border-primary',
        'bg-white hover:bg-bg-hover-primary',
        className,
      )}
      onClick={handleClick}
    >
      <div className='flex flex-col gap-1'>
        <span className='text-left text-xs text-text-secondary'>Next</span>
        <p className='line-clamp-1 text-md font-bold'>{section.title || 'タイトルがありません'}</p>
      </div>
      <HiOutlineChevronRight className='text-text-secondary' size={20} />
    </button>
  )
}
