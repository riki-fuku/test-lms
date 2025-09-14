import cn from '@/hooks/cn'
import { HiOutlineChevronLeft } from 'react-icons/hi'

type PrevCurriculumButtonProps = {
  className?: string
  sectionTitle: string
}

export default function PrevCurriculumButton(props: PrevCurriculumButtonProps) {
  const className = cn(
    'hover:drop-shadow min-w-44 cursor-pointer rounded px-5 py-2',
    'flex justify-between items-center',
    'border border-border-primary',
    'bg-white hover:bg-bg-hover-primary',
    props.className,
  )

  return (
    <button className={className}>
      <HiOutlineChevronLeft className='text-text-secondary' size={20} />
      <div className='flex flex-col gap-1'>
        <span className='text-right text-xs text-text-secondary'>Prev</span>
        <p className='line-clamp-1 text-md font-bold'>{props.sectionTitle}</p>
      </div>
    </button>
  )
}
