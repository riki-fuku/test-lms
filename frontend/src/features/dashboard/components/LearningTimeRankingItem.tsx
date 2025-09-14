import Avatar from '@/components/ui/Avatar'
import Image from '@/components/ui/Image'
import type { TimerLogRanking } from '@/features/timerLog/types/TimerLogRanking'
import cn from '@/hooks/cn'
import { FaUserCircle } from 'react-icons/fa'

type LearningTimeRankingListProps = {
  rankingData: TimerLogRanking
  position?: number
  isMyData: boolean
}

export default function LearningTimeRankingItem({
  rankingData,
  position,
  isMyData,
}: LearningTimeRankingListProps) {
  const rankingName = (ranking: number) => {
    switch (ranking) {
      case 1:
        return 'gold'
      case 2:
        return 'silver'
      case 3:
        return 'bronze'
      default:
        return ''
    }
  }

  return (
    <>
      <div className={cn('flex flex-col border-b py-2 text-xs', isMyData && 'bg-bg-primary')}>
        <div className='flex items-center gap-2 text-center'>
          <div className='flex w-8 justify-center'>
            {position && (
              <div className='relative flex w-3.5 items-center'>
                <div
                  className={`absolute flex size-3.5 items-center justify-center text-xxs ${position <= 3 && 'top-0.5 text-white'}`}
                >
                  {position}
                </div>
                {position <= 3 && (
                  <Image
                    src={`/images/${rankingName(position)}.png`}
                    alt='ranking'
                    width={14}
                    height={14}
                  />
                )}
              </div>
            )}
          </div>
          <div className='flex w-32 flex-1 items-center gap-2 '>
            {rankingData.avatar ? (
              <Avatar size='xs' className='shrink-0'>
                <Image src={rankingData.avatar} alt={rankingData.avatar} fill />
              </Avatar>
            ) : (
              <FaUserCircle className='shrink-0 fill-text-secondary' size={20} />
            )}
            <p className='truncate text-left'>{rankingData.name}</p>
          </div>
          <div className='ml-auto flex w-fit flex-row-reverse items-center pr-8'>
            <p>
              <span className='text-xl'>{rankingData.totalStudyTime}</span>時間
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
