import TimerItemMobile from '@/features/timer/components/TimerItemMobile'
import type { BreakTimer } from '@/features/timer/types/BreakTimer'
import type { Timer } from '@/features/timer/types/Timer'
import { RiPencilFill } from 'react-icons/ri'

type TimerListMobileProps = {
  timers: Timer[]
  onClickedEditIcon: () => void
  onSelectTimer: (timer: Timer) => void
}

export default function TimerListMobile(props: TimerListMobileProps) {
  // 編集アイコンをクリックしたときの処理
  function handleClickedEditIcon() {
    props.onClickedEditIcon()
  }

  function handleSelectTimer(timer: Timer | BreakTimer) {
    if ('id' in timer) {
      props.onSelectTimer(timer)
    }
  }

  return (
    <>
      <div className='flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
          <p className='text-xl font-bold'>タイマーをセット</p>
          <div
            className='flex size-12 items-center justify-center text-text-secondary'
            onClick={handleClickedEditIcon}
          >
            <RiPencilFill size={20} />
          </div>
        </div>
        <ul>
          {props.timers.map((timer, index) => (
            <li key={index}>
              <TimerItemMobile timer={timer} onClick={handleSelectTimer} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
