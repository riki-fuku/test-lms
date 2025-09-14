import type { TimerLog } from '@/features/timer/types/TimerLog'
import useDateTools from '@/hooks/useDateTools'
import { IoIosArrowForward } from 'react-icons/io'

type TimerLogListItemProps = {
  timerLog: TimerLog
  onClick: (timerLog: TimerLog) => void
}

export function TimerLogListItem({ timerLog, onClick }: TimerLogListItemProps) {
  const dateTools = useDateTools()

  const formatElapsedTime = (elapsedSeconds: number) => {
    const hours = Math.floor(elapsedSeconds / 3600)
    const minutes = Math.floor((elapsedSeconds / 60) % 60)
    return `${hours < 10 ? hours.toString().padStart(2, '0') : hours}:${minutes < 10 ? minutes.toString().padStart(2, '0') : minutes}`
  }

  return (
    <div
      className='flex w-full cursor-pointer items-center justify-between border-b px-2.5 py-4'
      onClick={() => onClick(timerLog)}
    >
      <div className='flex items-center gap-2'>
        <p className='w-32'>{dateTools.formatDate(timerLog.startDatetime, 'MM/DD HH:mm:ss')}</p>
        <p className='w-4'>~</p>
        <p className='w-32'>{dateTools.formatDate(timerLog.endDatetime, 'MM/DD HH:mm:ss')}</p>
      </div>
      <p>{formatElapsedTime(timerLog.elapsedSeconds)}</p>
      <IoIosArrowForward className='cursor-pointer' size={16} />
    </div>
  )
}
