import { useTimerSounds } from '@/features/timer/hooks/useTimerSounds'
import type { TimerStatus } from '@/features/timer/types/TimerStatus'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export interface CountDownTimer {
  originalSeconds: number
  currentSeconds: number
  status: TimerStatus
  formattedTime: string
  elapsedSeconds: number
  setOriginalSeconds: (seconds: number) => void
  setCurrentSeconds: (seconds: number) => void
  setStatus: (status: TimerStatus) => void
  setTimer: (seconds: number) => void
  init: () => void
  ready: () => void
  start: () => void
  pause: (options?: { disableCallback?: boolean }) => void
  restart: () => void
  end: () => void
  setOnStartCallback: (event: () => void) => void
  setOnPauseCallback: (event: () => void) => void
  setOnRestartCallback: (event: () => void) => void
  setOnEndCallback: (event: () => void) => void
}

export function useCountDownTimer(): CountDownTimer {
  const [originalSeconds, setOriginalSeconds] = useState(0)
  const [currentSeconds, setCurrentSeconds] = useState(0)
  const [status, setStatus] = useState<TimerStatus>('END')
  const workerRef = useRef<Worker>()
  const intervalIdRef = useRef<ReturnType<typeof setInterval>>()

  const [onStartCallback, setOnStartCallback] = useState<() => void>()
  const [onPauseCallback, setOnPauseCallback] = useState<() => void>()
  const [onRestartCallback, setOnRestartCallback] = useState<() => void>()
  const [onEndCallback, setOnEndCallback] = useState<() => void>()

  const { finish } = useTimerSounds()

  const setTimer = useCallback((seconds: number) => {
    setOriginalSeconds(seconds)
    setCurrentSeconds(seconds)
  }, [])

  const init = useCallback(() => {
    setOriginalSeconds(0)
    setCurrentSeconds(0)
    setStatus('END')
  }, [])

  const ready = useCallback(() => setStatus('READY'), [])

  const start = useCallback(() => {
    setStatus('RUNNING')
    onStartCallback?.()
  }, [onStartCallback])

  const pause = useCallback(
    (options: { disableCallback?: boolean } = { disableCallback: false }) => {
      setStatus('PAUSE')
      if (!options?.disableCallback) onPauseCallback?.()
    },
    [onPauseCallback],
  )

  const restart = useCallback(() => {
    setStatus('RUNNING')
    onRestartCallback?.()
  }, [onRestartCallback])

  const end = useCallback(() => {
    setStatus('END')
    onEndCallback?.()
  }, [onEndCallback])

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(currentSeconds / 60)
    const sec = Math.floor(currentSeconds % 60)
    return `${minutes}:${sec.toString().padStart(2, '0')}`
  }, [currentSeconds])

  const elapsedSeconds = useMemo(() => {
    return originalSeconds - currentSeconds
  }, [originalSeconds, currentSeconds])

  const timer = useMemo(() => {
    return {
      originalSeconds,
      currentSeconds,
      status,
      formattedTime,
      elapsedSeconds,
      setOriginalSeconds,
      setCurrentSeconds,
      setStatus,
      setTimer,
      init,
      ready,
      start,
      pause,
      restart,
      end,
      setOnStartCallback,
      setOnPauseCallback,
      setOnRestartCallback,
      setOnEndCallback,
    }
  }, [
    originalSeconds,
    currentSeconds,
    status,
    formattedTime,
    elapsedSeconds,
    setTimer,
    init,
    ready,
    start,
    pause,
    restart,
    end,
  ])

  useEffect(() => {
    workerRef.current = new Worker(new URL('src/lib/count-down.ts', import.meta.url))

    if (!workerRef.current) return

    if (status === 'RUNNING') {
      workerRef.current.onmessage = (e) => {
        intervalIdRef.current = e.data.intervalId
        setCurrentSeconds(e.data.remainSecond)
        if (e.data.remainSecond < 0) {
          finish?.play()
          end()
        }
      }
      workerRef.current.postMessage({ time: currentSeconds })
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate()
        workerRef.current = undefined
      }
      if (intervalIdRef.current) clearInterval(intervalIdRef.current)
    }
  }, [workerRef, status, currentSeconds, finish, end])

  return timer
}
