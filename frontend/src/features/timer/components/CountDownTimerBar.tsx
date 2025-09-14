import type { CountDownTimer } from '@/features/timer/hooks/useCountDownTimer'

type CountDownTimerBarProps = {
  timer: CountDownTimer
}

export default function CountDownTimerBar(props: CountDownTimerBarProps) {
  //直線の算出機能
  function getLineDasharray(): string {
    const lineLength = 250
    let dash: number, gap: number
    if (props.timer.status === 'READY') {
      dash = lineLength
      gap = 0
    } else {
      const timeFraction = props.timer.currentSeconds / props.timer.originalSeconds
      dash = Math.floor(timeFraction * lineLength)
      gap = lineLength - dash
    }
    return `${dash} ${gap}`
  }

  function getLineDashoffset(): number {
    if (!props.timer.originalSeconds) return 0

    const lineLength = 250
    const timeFraction = props.timer.currentSeconds / props.timer.originalSeconds
    const dash = Math.floor(timeFraction * lineLength)
    return dash
  }

  return (
    <>
      <svg className='w-full' width='250' height='10'>
        <line className='stroke-current stroke-2 text-form-gray' x1='0' y1='5' x2='250' y2='5' />
        <line
          className='stroke-current stroke-2 text-text-secondary'
          x1='0'
          y1='5'
          x2='250'
          y2='5'
          strokeDasharray={getLineDasharray()}
          strokeDashoffset={getLineDashoffset()}
        />
      </svg>
    </>
  )
}
