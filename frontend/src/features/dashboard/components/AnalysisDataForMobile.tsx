import LearningTimeRanking from '@/features/dashboard/components/LearningTimeRanking'
import RadarChart from '@/features/dashboard/components/RadarChart'
import { useUser } from '@/features/user/contexts/userContext'

type LearningTimeRankingProps = {
  radarChartData?: number[]
}

export default function AnalysisDataForMobile({ radarChartData }: LearningTimeRankingProps) {
  const { user } = useUser()
  if (!user) return <div>Loading...</div>

  return (
    <div className='flex flex-col gap-14 bg-white px-5 py-6'>
      <RadarChart data={radarChartData || []} />
      <LearningTimeRanking />
    </div>
  )
}
