import Avatar from '@/components/ui/Avatar'
import CountDownTimerCircle from '@/features/timer/components/CountDownTimerCircle'
import type { CountDownTimer } from '@/features/timer/hooks/useCountDownTimer'

type BreakCountTimerProps = {
  timer: CountDownTimer
  onContinueTimer: () => void
}

export default function BreakCountTimer({ timer, onContinueTimer }: BreakCountTimerProps) {
  return (
    <>
      <div className='flex items-center justify-center'>
        <div className='w-64 p-5'>
          {/* タイマーUI */}
          <div>
            <h2 className='font-bold'>休憩開始</h2>
            <div className='mt-2 flex justify-center'>
              <CountDownTimerCircle timer={timer} />
            </div>
            <div className='flex justify-between text-md text-white'>
              {timer.status !== 'READY' && (
                <Avatar onClick={timer.end} size='lg' className='bg-zinc-400'>
                  終了
                </Avatar>
              )}

              {timer.status === 'RUNNING' && (
                <Avatar onClick={timer.pause} size='lg' className='bg-zinc-400'>
                  一時停止
                </Avatar>
              )}
              {timer.status === 'PAUSE' && (
                <Avatar
                  onClick={timer.restart}
                  size='lg'
                  className='bg-gradient-to-r from-teal-400 to-blue-500'
                >
                  再開
                </Avatar>
              )}

              {timer.status === 'END' && (
                <Avatar onClick={onContinueTimer} size='lg' className='bg-zinc-400 p-2'>
                  学習を続ける
                </Avatar>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
