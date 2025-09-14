import type { BreakTimer } from '@/features/timer/types/BreakTimer'
import type { Timer } from '@/features/timer/types/Timer'
import { FaChevronRight } from 'react-icons/fa'

type TimerItemProps = {
  timer: Timer | BreakTimer
  onClick: (timer: Timer | BreakTimer) => void
}

export default function TimerItem(props: TimerItemProps) {
  function handleClick() {
    props.onClick(props.timer)
  }
  return (
    <>
      <div onClick={handleClick} className='cursor-pointer'>
        <div className='flex items-center justify-between border-b border-border-primary py-3 pl-3'>
          <div className='flex items-center'>
            <p className='mr-1 font-bold'>{props.timer.minutes}</p>
            <label className='cursor-pointer text-sm'>分</label>
          </div>
          <div>
            <FaChevronRight />
          </div>
        </div>
      </div>
    </>
  )
}
