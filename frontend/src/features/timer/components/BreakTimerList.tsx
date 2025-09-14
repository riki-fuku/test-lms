import TimerItem from '@/features/timer/components/TimerItem'
import type { BreakTimer } from '@/features/timer/types/BreakTimer'
import type { Timer } from '@/features/timer/types/Timer'

type BreakTimerListProps = {
  onSelectTimer: (timer: Timer | BreakTimer) => void
}
export default function BreakTimerList({ onSelectTimer }: BreakTimerListProps) {
  const breakTimers: BreakTimer[] = [
    { minutes: 1 },
    { minutes: 3 },
    { minutes: 5 },
    { minutes: 10 },
  ]

  return (
    <>
      <div className='p-5'>
        <div className='flex justify-between'>
          <p className='font-bold'>
            学習お疲れさまでした！
            <br />
            ちょっと休憩しましょう！
          </p>
        </div>
        <ul>
          {breakTimers.map((timer, index) => (
            <li key={index}>
              <TimerItem timer={timer} onClick={() => onSelectTimer(timer)} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
