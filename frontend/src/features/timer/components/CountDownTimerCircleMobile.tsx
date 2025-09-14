import type { CountDownTimer } from '@/features/timer/hooks/useCountDownTimer'

type CountDownTimerCircleMobileProps = {
  timer: CountDownTimer
}

export default function CountDownTimerCircleMobile(props: CountDownTimerCircleMobileProps) {
  const position = {
    x: 50,
    y: 50,
  }
  const radius = 45
  //円の算出機能
  function getStrokeDasharray() {
    const circumference = 2 * Math.PI * radius
    let dash, gap
    if (props.timer.status === 'READY') {
      dash = circumference
      gap = 0
    } else {
      const timeFraction = props.timer.currentSeconds / props.timer.originalSeconds
      dash = Math.floor(timeFraction * circumference)
      gap = circumference - dash
    }
    return `${dash} ${gap}`
  }

  function getStrokeDashoffset() {
    if (!props.timer.originalSeconds) return 0

    const circumference = 2 * Math.PI * radius
    const timeFraction = props.timer.currentSeconds / props.timer.originalSeconds
    const dash = Math.floor(timeFraction * circumference) + 70.65
    return dash
  }

  return (
    <>
      <svg width='380' height='380' viewBox='0 0 100 100'>
        <defs>
          <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' style={{ stopColor: '#14BBBB', stopOpacity: 1 }} />
            <stop offset='100%' style={{ stopColor: '#328CE6', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <circle
          cx={position.x}
          cy={position.y}
          r={radius}
          stroke='#efefef'
          strokeWidth='3'
          fill='white'
        />
        <circle
          cx={position.x}
          cy={position.y}
          r={radius}
          stroke='url(#gradient)'
          strokeWidth='3'
          strokeDasharray={getStrokeDasharray()}
          strokeDashoffset={getStrokeDashoffset()}
          fill='transparent'
        />
        <text
          x={position.x}
          y={position.y + 1}
          fill='text-primary'
          textAnchor='middle'
          dominantBaseline='middle'
        >
          {props.timer.formattedTime}
        </text>
      </svg>
    </>
  )
}
