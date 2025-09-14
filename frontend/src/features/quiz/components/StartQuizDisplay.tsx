'use client'

import Button from '@/components/ui/Button'
import { useQuizSounds } from '@/features/quiz/hooks/useQuizSounds'
import { useState } from 'react'

type StartQuizDisplayProps = {
  onStartTimer: () => void
}

export default function StartQuizDisplay({ onStartTimer }: StartQuizDisplayProps) {
  const [isStart, setIsStart] = useState(false)
  const [seconds, setSeconds] = useState(3)

  const { start } = useQuizSounds()

  const startCountDown = () => {
    setIsStart(true)

    // カウントダウンタイマー開始
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)

    // 3秒後にタイマーを終了し問題を開始
    setTimeout(() => {
      start?.play()

      clearInterval(timer)
      onStartTimer()
    }, 3000)
  }

  return (
    <div className='absolute inset-0 flex items-center justify-center bg-white'>
      {isStart ? (
        <p className='text-3xl'>{seconds}</p>
      ) : (
        <div className='flex flex-col justify-center gap-5'>
          <p className='font-bold lg:text-2xl lg:font-normal'>
            スタートボタンをクリックして4択問題を開始！
          </p>
          <Button onClick={startCountDown} className='m-auto'>
            スタート
          </Button>
        </div>
      )}
    </div>
  )
}
