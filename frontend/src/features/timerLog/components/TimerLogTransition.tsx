import type { Segment } from '@/components/ui/SegmentedControl'
import SegmentedControl from '@/components/ui/SegmentedControl'
import { getBreakpointValue } from '@/constants/breakpoint'
import TimerLogTable from '@/features/timerLog/components/TimerLogTable'
import useFetchTimerLogGraph from '@/features/timerLog/hooks/useFetchTimerLogGraph'
import cn from '@/hooks/cn'
import useWindowSize from '@/hooks/useWindowSize'
import { useActorStore } from '@/store/actor-store'
import type { ChartArea, ChartOptions, ScriptableContext } from 'chart.js'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from 'react-icons/ri'

type TimerLogSegmentKey = 'day' | 'week' | 'month'
const segments: Segment<TimerLogSegmentKey>[] = [
  { key: 'day', label: '日' },
  { key: 'week', label: '週' },
  { key: 'month', label: '月' },
]

ChartJS.register(CategoryScale, LinearScale, BarElement, annotationPlugin, Title, Tooltip, Legend)

type TimerLogTransitionProps = {
  className?: string
  userId: string
  workspaceId: string
  onClickTimerLogGraph?: () => void
}

export function TimerLogTransition({
  className,
  userId,
  workspaceId,
  onClickTimerLogGraph,
}: TimerLogTransitionProps) {
  const workspaceName = useActorStore((state) => state.actor?.activeWorkspace.workspace?.name)

  const [segmentKey, setSegmentKey] = useState<TimerLogSegmentKey>('week')

  const { data: graphData } = useFetchTimerLogGraph(workspaceId, {
    period: segmentKey,
    userId,
  })

  const timerLogs = useMemo(() => graphData?.records ?? [], [graphData])

  const displayGraphLabels = useMemo(() => {
    return timerLogs.map((data) => {
      switch (segmentKey) {
        case 'day':
          return `${dayjs(data.startDatetime).format('M/DD')}`
        case 'week':
          return `${dayjs(data.startDatetime).format('M/D')} ~ ${dayjs(data.endDatetime).format('M/D')}`
        case 'month':
          return `${dayjs(data.startDatetime).format('YYYY/M')}`
      }
    })
  }, [segmentKey, timerLogs])

  const displayCountLimit: number = 14
  const displayGraphData = useMemo(() => {
    return timerLogs.slice(0, displayCountLimit).toReversed()
  }, [timerLogs])

  const [visibleRange, setVisibleRange] = useState({
    start: displayCountLimit - 7,
    end: displayCountLimit,
  })

  const targetStudyTime = 20
  const getBackgroundColor = (context: ScriptableContext<'bar'>) => {
    const { chart, dataIndex } = context
    const { ctx, chartArea } = chart

    if (!chartArea) return

    const barChartData = data.datasets[0].data[dataIndex]

    if (barChartData >= targetStudyTime) {
      return createGradient(ctx, chartArea)
    } else {
      return 'rgba(140, 140, 140, 1)'
    }
  }

  // 棒グラフにグラデーションをつける関数
  const createGradient = (ctx: CanvasRenderingContext2D, chartArea: ChartArea) => {
    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
    gradient.addColorStop(0, 'rgba(20, 187, 187, 1)')
    gradient.addColorStop(1, 'rgba(50, 140, 230, 1)')

    return gradient
  }

  const data = {
    labels: displayGraphLabels,
    datasets: [
      {
        data: displayGraphData.reverse().map((data) => data.studyData),
        backgroundColor: getBackgroundColor,
        barPercentage: 0.5,
        borderRadius: 5,
      },
    ],
  }

  const { width } = useWindowSize()
  const isSp = width && width <= getBreakpointValue('lg') ? true : false
  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      annotation: {
        annotations: {
          line: {
            type: 'line',
            yMin: targetStudyTime,
            yMax: targetStudyTime,
            borderColor: 'rgba(233, 0, 0, 1)',
            borderWidth: 2,
          },
        },
      },
    },
    scales: {
      x: {
        min: isSp ? visibleRange.start : undefined,
        max: isSp ? visibleRange.end - 1 : undefined,
      },
    },
  }

  const handleScrollLeft = (scrollNum: number) => {
    setVisibleRange((prev) => ({
      start: Math.max(0, prev.start - scrollNum),
      end: Math.max(7, prev.end - scrollNum),
    }))
  }

  const handleScrollRight = (scrollNum: number) => {
    setVisibleRange((prev) => ({
      start: Math.min(data.labels.length - 7, prev.start + scrollNum),
      end: Math.min(data.labels.length, prev.end + scrollNum),
    }))
  }

  const changeSegmentKey = async (segmentKey: Segment<TimerLogSegmentKey>) => {
    setSegmentKey(segmentKey.key)
  }

  return (
    <div className={cn('flex size-full flex-col gap-5 bg-white', className)}>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-bold'>学習時間推移</h3>
        <SegmentedControl segments={segments} defaultTabKey='week' onChange={changeSegmentKey} />
      </div>

      <div className='grow cursor-pointer' onClick={onClickTimerLogGraph}>
        <Bar options={options} data={data} />
      </div>

      <p className='relative pl-6 text-sm text-text-red-primary'>
        <span className='absolute left-0 top-1/2 w-5 -translate-y-1/2 border-t border-border-red-primary'></span>
        {workspaceName}が定める学習時間目安
      </p>

      <TimerLogTable userId={userId} workspaceId={workspaceId} segment={segmentKey} />

      {/* モバイルUI */}
      <div className='flex justify-between px-3 lg:hidden'>
        <div className='flex items-center gap-6'>
          <RiArrowLeftDoubleFill size={30} onClick={() => handleScrollLeft(displayCountLimit)} />
          <IoIosArrowBack size={24} onClick={() => handleScrollLeft(1)} />
        </div>

        <div className='flex items-center gap-6'>
          <IoIosArrowForward size={24} onClick={() => handleScrollRight(1)} />
          <RiArrowRightDoubleFill size={30} onClick={() => handleScrollRight(displayCountLimit)} />
        </div>
      </div>
    </div>
  )
}
