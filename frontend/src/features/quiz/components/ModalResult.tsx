'use client'

import Modal from '@/components/base/Modal'
import formatMilliseconds from '@/features/quiz/hooks/formatMilliseconds'
import type { JudgeUserAnswer } from '@/features/quiz/types/Answer'
import cn from '@/hooks/cn'
import { useEffect, useRef, useState } from 'react'
import { FaRegCircle } from 'react-icons/fa'
import { RxCross1 } from 'react-icons/rx'

type ModalResultProps = {
  visible: boolean
  answerResult?: JudgeUserAnswer
  onEndTimer: () => void
}

export default function ModalResult({ visible, answerResult, onEndTimer }: ModalResultProps) {
  const [milliseconds, setMilliseconds] = useState(0)
  const intervalId = useRef<NodeJS.Timeout>()

  useEffect(() => {
    init()
    if (visible) {
      start()
    }
  }, [visible])

  useEffect(() => {
    if (milliseconds < 0) {
      end()
    }
  }, [milliseconds])

  const init = () => {
    // モーダルを表示させる時間(ms)
    setMilliseconds(2000)
  }

  const start = () => {
    intervalId.current = setInterval(() => {
      if (milliseconds > 0) {
        setMilliseconds((prev) => prev - 10)
      }
    }, 10)
  }

  const end = () => {
    clearInterval(intervalId.current)
    onEndTimer()
  }

  const style = cn('text-4xl flex gap-2 justify-center items-center', [
    answerResult?.isCorrect ? 'text-text-blue-primary' : 'text-text-red-primary',
  ])

  return (
    <Modal visible={visible}>
      <div className='m-auto flex flex-col gap-7 text-center'>
        {answerResult?.isCorrect ? (
          <div className={style}>
            <FaRegCircle size={50} />
            <p>正解</p>
          </div>
        ) : (
          <div className={style}>
            <RxCross1 size={50} />
            <p>不正解</p>
          </div>
        )}
        <p className='text-xl'>{answerResult?.correctAnswer}</p>
        <div className='flex justify-center gap-5 text-xs'>
          <p>次の問題まで</p>
          <p>{formatMilliseconds(milliseconds)}</p>
        </div>
      </div>
    </Modal>
  )
}
