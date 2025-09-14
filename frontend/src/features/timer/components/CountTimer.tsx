'use client'

import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import CountDownTimerBar from '@/features/timer/components/CountDownTimerBar'
import CountDownTimerCircle from '@/features/timer/components/CountDownTimerCircle'
import { type CountDownTimer } from '@/features/timer/hooks/useCountDownTimer'
import cn from '@/hooks/cn'
import { useState } from 'react'
import { BsArrowsAngleContract } from 'react-icons/bs'
import { FaMinus } from 'react-icons/fa6'

type CountTimerProps = {
  timer: CountDownTimer
  onMinimize: () => void
  onEndTimer: () => void
  onBack: () => void
}

export default function CountTimer({ timer, onMinimize, onBack }: CountTimerProps) {
  const [displaySize, setDisplaySize] = useState<'MAX' | 'MIN'>('MAX')

  return (
    <div className={cn('flex items-center justify-center')}>
      <div className='w-64 pb-2 pt-5'>
        {/* サイズコントロールUI */}
        <SizeController
          onClose={onMinimize}
          onToggleSize={() => setDisplaySize((prev) => (prev === 'MAX' ? 'MIN' : 'MAX'))}
        />

        {/* 拡大UI */}
        {displaySize === 'MAX' && (
          <div className='px-5 pb-5'>
            <TimerHeading timer={timer} />
            <div className='mt-2 flex justify-center'>
              <CountDownTimerCircle timer={timer} />
            </div>
            <div className='flex justify-between text-md text-white'>
              {timer.status === 'READY' && (
                <Avatar onClick={onBack} size='lg' className='bg-zinc-400'>
                  戻る
                </Avatar>
              )}
              {timer.status !== 'READY' && (
                <Avatar onClick={timer.end} size='lg' className='bg-zinc-400'>
                  終了
                </Avatar>
              )}
              {timer.status === 'READY' && (
                <Avatar
                  onClick={timer.start}
                  size='lg'
                  className='bg-gradient-to-r from-teal-400 to-blue-500'
                >
                  開始
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
            </div>
          </div>
        )}

        {/* 縮小UI */}
        {displaySize === 'MIN' && (
          <div className='px-2'>
            <div className='text-text-secondary'>{timer.formattedTime}</div>
            <div className='my-2'>
              <CountDownTimerBar timer={timer} />
            </div>
            <div className='flex justify-between gap-2'>
              {timer.status === 'READY' && (
                <Button onClick={onBack} intent='secondary' size='sm'>
                  戻る
                </Button>
              )}
              {timer.status !== 'READY' && (
                <Button onClick={timer.end} intent='secondary' size='sm'>
                  終了
                </Button>
              )}
              {timer.status === 'READY' && (
                <Button onClick={timer.start} size='sm'>
                  開始
                </Button>
              )}
              {timer.status === 'RUNNING' && (
                <Button onClick={() => timer.pause()} intent='secondary' size='sm'>
                  一時停止
                </Button>
              )}
              {timer.status === 'PAUSE' && (
                <Button onClick={timer.restart} size='sm'>
                  再開
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const TimerHeading = ({ timer }: { timer: CountDownTimer }) => {
  let heading
  switch (timer.status) {
    case 'READY':
      heading = 'タイマーをセット'
      break
    case 'RUNNING':
      heading = 'カウント中'
      break
    case 'PAUSE':
      heading = '一時停止中'
      break
  }
  return <p className='font-bold'>{heading}</p>
}

const SizeController = ({
  onToggleSize,
  onClose,
}: {
  onToggleSize: () => void
  onClose: () => void
}) => {
  return (
    <div className='flex justify-end gap-2 px-2'>
      <button onClick={onToggleSize}>
        <BsArrowsAngleContract size={10} />
      </button>
      <button onClick={onClose}>
        <FaMinus size={10} />
      </button>
    </div>
  )
}
