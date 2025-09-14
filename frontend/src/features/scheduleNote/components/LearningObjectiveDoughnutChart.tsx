'use client'

import useFetchScheduleEvents from '@/features/scheduleNote/hooks/useFetchScheduleEvents'
import useFetchTimerLogs from '@/features/timer/hooks/useFetchTimerLogs'
import type { User } from '@/features/user/types/User'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

type LearningObjectiveDoughnutChartProps = {
  workspaceId: string
  title: string
  unit: string
  user: Pick<User, 'id'> | null
  startDatetime: string
  endDatetime: string
}

export default function LearningObjectiveDoughnutChart({
  workspaceId,
  title,
  unit,
  user,
  startDatetime,
  endDatetime,
}: LearningObjectiveDoughnutChartProps) {
  const radius = 45
  // 円周（2πr）
  const circumference = Math.floor(2 * Math.PI * radius)

  const getStrokeDasharray = () => {
    if (numerator === 0 && denominator === 0) return '0 100'
    const percentage = numerator / denominator
    const dash = Math.floor(percentage * circumference)
    const gap = circumference - dash
    return `${dash} ${gap}`
  }

  const [gradientId, setGradientId] = useState('')

  const generateUuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  useEffect(() => {
    setGradientId(generateUuid())
  }, [])

  // タイマーログの取得
  const { data: timerLogsRes, isLoading: isLoadingTimerLogs } = useFetchTimerLogs(workspaceId, {
    userId: user?.id ?? '',
    startDatetime,
    endDatetime,
  })

  // スケジュールイベントの取得
  const { data: scheduleEventsRes, isLoading: isLoadingScheduleEvents } = useFetchScheduleEvents({
    userId: user?.id ?? '',
    startDatetime,
    endDatetime,
  })

  if (isLoadingTimerLogs || isLoadingScheduleEvents) return

  // タイマーログの集計
  const elapsedTime = timerLogsRes?.reduce((acc, curr) => acc + curr.elapsedSeconds, 0) ?? 0
  // 時間に変換（秒から時間へ）
  const numerator = elapsedTime / (60 * 60)

  // 学習時間の取得
  const totalPlannedStudyTime =
    scheduleEventsRes
      ?.filter((event) => event.title === '学習時間')
      .reduce((acc, curr) => {
        const plannedStudyTime = dayjs(curr.endDatetime).diff(dayjs(curr.startDatetime), 'seconds')
        return acc + plannedStudyTime
      }, 0) ?? 0

  const denominator = totalPlannedStudyTime / (60 * 60)
  const textNum = denominator.toFixed(1)

  return (
    <>
      <svg viewBox='0 0 100 100' style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id={gradientId}>
            <stop offset='0%' stopColor='#14bbbb' stopOpacity='1' />
            <stop offset='100%' stopColor='#328ce6' stopOpacity='1' />
          </linearGradient>
        </defs>
        <circle cx='50' cy='50' r='45' stroke='#d3d3d3' strokeWidth='10' fill='white' />
        <circle
          cx='50'
          cy='50'
          r='45'
          stroke={`url(#${gradientId})`}
          strokeWidth='10'
          strokeDasharray={getStrokeDasharray()}
          transform='rotate(-90 50 50)' // グラフの回転（度、cx, cy）
          fill='transparent'
        />
        <text
          x='50'
          y='35'
          fill='black'
          textAnchor='middle'
          dominantBaseline='middle'
          fontSize='0.5rem'
        >
          {title}
        </text>
        <text
          x='50'
          y='55'
          fill='black'
          textAnchor='middle'
          dominantBaseline='middle'
          fontSize='1.4rem'
          fontWeight='bold'
        >
          {/* 小数点2以下切り捨て */}
          {textNum}
        </text>
        <text
          x='50'
          y='75'
          fill='black'
          textAnchor='middle'
          dominantBaseline='middle'
          fontSize='0.5rem'
        >
          {unit}
        </text>
      </svg>
    </>
  )
}
