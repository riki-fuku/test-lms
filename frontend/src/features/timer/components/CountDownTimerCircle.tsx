import type { CountDownTimer } from '@/features/timer/hooks/useCountDownTimer'

type CountDownTimerCircleProps = {
  timer: CountDownTimer
}

export default function CountDownTimerCircle({ timer }: CountDownTimerCircleProps) {
  //円の算出機能
  function getStrokeDasharray() {
    const radius = 45
    const circumference = 2 * Math.PI * radius
    let dash, gap
    if (timer.status === 'READY') {
      dash = circumference
      gap = 0
    } else {
      const timeFraction = timer.currentSeconds / timer.originalSeconds
      dash = Math.floor(timeFraction * circumference)
      gap = circumference - dash
    }
    return `${dash} ${gap}`
  }

  function getStrokeDashoffset() {
    if (!timer.originalSeconds) return 0

    const radius = 45
    const circumference = 2 * Math.PI * radius
    const timeFraction = timer.currentSeconds / timer.originalSeconds
    const dash = Math.floor(timeFraction * circumference) + 70.65
    return dash
  }

  return (
    <>
      <svg width='200' height='200' viewBox='0 0 100 100'>
        <defs>
          <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' style={{ stopColor: '#14bbbb', stopOpacity: 1 }} />
            <stop offset='100%' style={{ stopColor: '#328ce6', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <circle cx='50' cy='50' r='45' stroke='#d3d3d3' strokeWidth='1' fill='white' />
        <circle
          cx='50'
          cy='50'
          r='45'
          stroke='url(#gradient)'
          strokeDasharray={getStrokeDasharray()}
          strokeDashoffset={getStrokeDashoffset()}
          fill='transparent'
        />
        <text x='50' y='51' fill='black' textAnchor='middle' dominantBaseline='middle'>
          {timer.formattedTime}
        </text>
      </svg>
    </>
  )
}
