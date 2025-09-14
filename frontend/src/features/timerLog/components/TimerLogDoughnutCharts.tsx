import DoughnutChart from '@/components/ui/DoughnutChart'
import useFetchTimerLogGraph from '@/features/timerLog/hooks/useFetchTimerLogGraph'
import cn from '@/hooks/cn'

export type TimerLogDoughnutChartsProps = {
  className?: string
  userId: string
  workspaceId: string
}

export default function TimerLogDoughnutCharts({
  className,
  userId,
  workspaceId,
}: TimerLogDoughnutChartsProps) {
  const { data, isLoading } = useFetchTimerLogGraph(
    workspaceId,
    {
      period: 'week',
      userId,
    },
    { revalidateOnFocus: false },
  )

  if (!data || isLoading) return

  return (
    <div className={cn('flex w-1/2', className)}>
      <div className='flex items-end gap-2'>
        <div className='w-4/12' style={{ flexGrow: 4 }}>
          <DoughnutChart
            title='今週の学習時間'
            unit='時間'
            denominator={data.weeklyTargetStudyTime}
            numerator={data.weeklyStudyTime}
            textNum={`${data.weeklyStudyTime.toFixed(1)}`}
          />
        </div>
        <div className='w-3/12' style={{ flexGrow: 3 }}>
          <DoughnutChart
            title='今週の目標時間'
            unit='時間'
            denominator={data.weeklyTargetStudyTime}
            numerator={data.weeklyStudyTime}
            textNum={`${data.weeklyTargetStudyTime.toFixed(1)}`}
          />
        </div>
        <div className='w-3/12' style={{ flexGrow: 3 }}>
          <DoughnutChart
            title='今日の学習時間'
            unit='時間'
            denominator={data.dailyTargetStudyTime}
            numerator={data.dailyStudyTime}
            textNum={`${data.dailyStudyTime.toFixed(1)}`}
          />
        </div>
      </div>
    </div>
  )
}
