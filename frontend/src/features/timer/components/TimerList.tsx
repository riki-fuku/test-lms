import TimerEditor from '@/features/timer/components/TimerEditor'
import TimerItem from '@/features/timer/components/TimerItem'
import useFetchMyTimers from '@/features/timer/hooks/useFetchMyTimers'
import type { BreakTimer } from '@/features/timer/types/BreakTimer'
import type { Timer } from '@/features/timer/types/Timer'
import { useState } from 'react'
import { GoPencil } from 'react-icons/go'

type TimerListProps = {
  onSelectTimer: (timer: Timer) => void
}

export default function TimerList({ onSelectTimer }: TimerListProps) {
  const { data, isLoading } = useFetchMyTimers()
  const timers = data ?? []

  const [isEdit, setIsEdit] = useState(false)

  const handleSelectTimer = (timer: Timer | BreakTimer) => {
    if ('id' in timer) {
      onSelectTimer(timer)
    }
  }

  const closeEditor = () => {
    setIsEdit(false)
  }

  if (isLoading) {
    return <p>loading...</p>
  }

  return (
    <>
      {!isEdit && (
        <div className='flex flex-col gap-5 p-5'>
          <div className='flex justify-between'>
            <p className='font-bold'>タイマーをセット</p>
            <button onClick={() => setIsEdit(true)}>
              <GoPencil />
            </button>
          </div>

          <ul>
            {timers.map((timer, index) => (
              <li key={index}>
                <TimerItem timer={timer} onClick={handleSelectTimer} />
              </li>
            ))}
          </ul>

          {timers.length === 0 && (
            <p className='text-center text-sm text-form-gray'>
              タイマーがセットされていません。
              <br />
              右上のペンをクリックしてタイマーをセットしてください。
            </p>
          )}
        </div>
      )}

      {isEdit && (
        <TimerEditor
          onClickEditIcon={closeEditor}
          onCancelButton={closeEditor}
          onSave={closeEditor}
        />
      )}
    </>
  )
}
