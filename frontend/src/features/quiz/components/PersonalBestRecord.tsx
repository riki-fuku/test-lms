import formatMilliseconds from '@/features/quiz/hooks/formatMilliseconds'
import cn from '@/hooks/cn'
import { GiAlarmClock } from 'react-icons/gi'
import { MdOutlineIncompleteCircle } from 'react-icons/md'
import { TfiTarget } from 'react-icons/tfi'

type BestScore = {
  totalTimeMs: number
  score: number
  accuracy: string
}

type PersonalBestRecordProps = {
  className?: string
  bestRecord: BestScore
}

export default function PersonalBestRecord({ className, bestRecord }: PersonalBestRecordProps) {
  return (
    <>
      <div
        className={cn(
          `w-full flex-col rounded border-border-primary bg-white p-5 text-sm`,
          className,
        )}
      >
        <p className='border-b pb-2 font-bold'>自己ベスト</p>
        <ul className='mt-4 flex flex-col gap-2'>
          <li className='flex items-center justify-between'>
            <div className='flex items-center gap-1'>
              <TfiTarget size={18} />
              <span>ベストスコア</span>
            </div>
            <p>{bestRecord.score}</p>
          </li>
          <li className='flex items-center justify-between'>
            <div className='flex items-center gap-1'>
              <GiAlarmClock size={18} />
              <span>ベストタイム</span>
            </div>
            <p>{formatMilliseconds(bestRecord.totalTimeMs)}</p>
          </li>
          <li className='flex items-center justify-between'>
            <div className='flex items-center gap-1'>
              <MdOutlineIncompleteCircle size={18} />
              <span>ベスト正答率</span>
            </div>
            <p>{bestRecord.accuracy}</p>
          </li>
        </ul>
      </div>
    </>
  )
}
