import TimerItemMobile from '@/features/timer/components/TimerItemMobile'
import type { BreakTimer } from '@/features/timer/types/BreakTimer'
import type { Timer } from '@/features/timer/types/Timer'

type BreakTimerListMobileProps = {
  onSelectTimer: (timer: Timer | BreakTimer) => void
  onEndTimer: () => void
}
export default function BreakTimerListMobile({
  onSelectTimer,
  onEndTimer,
}: BreakTimerListMobileProps) {
  const breakTimers: BreakTimer[] = [
    { minutes: 1 },
    { minutes: 3 },
    { minutes: 5 },
    { minutes: 10 },
  ]

  function handleSelectTimer(timer: Timer | BreakTimer) {
    onSelectTimer(timer)
  }

  return (
    <>
      <div className='flex flex-col gap-5'>
        <div className='flex justify-between'>
          <p className='text-xl font-bold'>休憩をセット</p>
        </div>
        <ul>
          {breakTimers.map((timer, index) => (
            <li key={index}>
              <TimerItemMobile timer={timer} onClick={handleSelectTimer} />
            </li>
          ))}
        </ul>
        <div
          className='flex h-12 w-full items-center justify-center rounded bg-bg-tertiary text-white'
          onClick={onEndTimer}
        >
          終了
        </div>
      </div>
    </>
  )
}
