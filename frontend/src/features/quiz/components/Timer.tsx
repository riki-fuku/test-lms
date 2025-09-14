import formatMilliseconds from '@/features/quiz/hooks/formatMilliseconds'
import cn from '@/hooks/cn'
import { useEffect, useRef, useState } from 'react'
import { GiAlarmClock } from 'react-icons/gi'

type TimerProps = {
  isRunning: boolean
  onStop: (ms: number) => void
  className?: string
}

export default function Timer(props: TimerProps) {
  const [milliseconds, setMilliseconds] = useState(0)
  const intervalId = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (props.isRunning) {
      startTimer()
    } else {
      stopTimer()
    }
  }, [props.isRunning])

  function startTimer() {
    intervalId.current = setInterval(() => {
      setMilliseconds((prev) => prev + 10)
    }, 10)
  }

  function stopTimer() {
    clearInterval(intervalId.current)
    props.onStop(milliseconds)
  }

  return (
    <>
      <div
        className={cn(
          `flex items-center gap-2 rounded border-border-primary bg-white lg:p-5`,
          props.className,
        )}
      >
        <GiAlarmClock size={24} />
        <span className='text-md lg:text-xl'>{formatMilliseconds(milliseconds)}</span>
      </div>
    </>
  )
}
