import DashBoardProfile from '@/features/dashboard/components/DashBoardProfile'
import LearningTimeRanking from '@/features/dashboard/components/LearningTimeRanking'
import TimerLogDoughnutCharts from '@/features/timerLog/components/TimerLogDoughnutCharts'
import { BsClipboardData } from 'react-icons/bs'

export type LearningDataProps = {
  userId: string
  workspaceId: string
}

export default function LearningData({ userId, workspaceId }: LearningDataProps) {
  return (
    <div className='flex h-full flex-col gap-5'>
      <DashBoardProfile />
      <div className='grid grow grid-cols-2 gap-5'>
        <div className='flex flex-col gap-5'>
          <div className='flex items-center gap-1'>
            <BsClipboardData />
            <p className='font-bold'>学習データ</p>
          </div>
          <TimerLogDoughnutCharts className='w-full' userId={userId} workspaceId={workspaceId} />
        </div>

        <div className='flex flex-col gap-5'>
          <LearningTimeRanking />
        </div>
      </div>
    </div>
  )
}
