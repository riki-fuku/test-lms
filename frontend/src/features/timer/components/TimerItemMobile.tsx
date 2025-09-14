import type { BreakTimer } from '@/features/timer/types/BreakTimer'
import type { Timer } from '@/features/timer/types/Timer'
import { HiOutlineChevronRight } from 'react-icons/hi'

type TimerItemMobileProps = {
  timer: Timer | BreakTimer
  onClick: (timer: Timer | BreakTimer) => void
}

export default function TimerItemMobile(props: TimerItemMobileProps) {
  function handleClick() {
    props.onClick(props.timer)
  }
  return (
    <>
      <div onClick={handleClick} className='cursor-pointer'>
        <div className='flex items-center justify-between border-b border-border-primary p-3'>
          <div className='flex items-center'>
            <p className='mr-0.5 text-xl'>{props.timer.minutes}</p>
            <label className='cursor-pointer text-sm'>分</label>
          </div>
          <div>
            <HiOutlineChevronRight size={20} />
          </div>
        </div>
      </div>
    </>
  )
}
