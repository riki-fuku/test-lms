import LearningTimeRankingItem from '@/features/dashboard/components/LearningTimeRankingItem'
import useFetchTimerLogRanking from '@/features/timerLog/hooks/useFetchTimerLogRanking'
import { useUserStore } from '@/store/user-store'
import { RiVipCrownFill } from 'react-icons/ri'

export default function LearningTimeRanking() {
  const { user } = useUserStore()

  const { data, isLoading } = useFetchTimerLogRanking(
    user?.activeWorkspace?.workspaceId ?? '',
    user?.id ?? '',
  )

  const topRanking = data?.topRanking
  const myRanking = data?.userRanking

  if (isLoading) return <div>Loading...</div>

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1 font-bold'>
          <RiVipCrownFill size={20} />
          <p>今週の学習時間ランキング</p>
        </div>
      </div>
      <div className='flex flex-col text-xs'>
        <div className='flex w-full items-center gap-2 border-b py-2.5 text-center'>
          <p className='w-8'>#</p>
          <p className='w-32 text-left'>ニックネーム</p>
          <p className='w-40 flex-1 pr-8 text-right'>学習時間</p>
        </div>
        {topRanking?.map((item, index) => (
          <LearningTimeRankingItem
            key={index}
            rankingData={item}
            position={index + 1}
            isMyData={false}
          />
        ))}
        {myRanking && (
          <LearningTimeRankingItem
            rankingData={myRanking}
            position={myRanking.rankingPosition}
            isMyData={true}
          />
        )}
      </div>
    </div>
  )
}
