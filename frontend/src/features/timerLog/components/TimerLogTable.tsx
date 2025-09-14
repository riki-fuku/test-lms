import type { GraphRecord } from '@/features/studentInformation/types/GraphData'
import useFetchTimerLogGraph from '@/features/timerLog/hooks/useFetchTimerLogGraph'
import cn from '@/hooks/cn'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { MdExpandMore } from 'react-icons/md'

type TimerLogTableProps = {
  workspaceId: string
  userId: string
  segment: 'day' | 'week' | 'month'
}

export default function TimerLogTable({ workspaceId, userId, segment }: TimerLogTableProps) {
  const { data } = useFetchTimerLogGraph(workspaceId, {
    period: segment,
    userId,
  })

  const [displayCount, setDisplayCount] = useState(20)
  const timerLogs = useMemo(() => {
    return data?.records.slice(0, displayCount)
  }, [data, displayCount])

  const canShowMore = (data?.records.length ?? 0) > displayCount

  const formatPeriod = (studentLog: GraphRecord) => {
    switch (segment) {
      case 'day':
        return dayjs(studentLog.startDatetime).format('YYYY年M月D日')
      case 'week':
        return `${dayjs(studentLog.startDatetime).format('YYYY年M月D日')} ~ ${dayjs(studentLog.endDatetime).format('M月D日')}`
      case 'month':
        return `${dayjs(studentLog.startDatetime).format('YYYY年M月D日')} ~ ${dayjs(studentLog.endDatetime).format('M月D日')}`
    }
  }

  const formatRatioData = (data: number, unit: string) => {
    const className = cn(
      'text-sm text-text-secondary min-w-9 m-aut',
      { 'text-text-red-primary': data < 0 },
      { 'text-text-blue-primary': data > 0 },
    )
    const sign = data === 0 ? '±' : data > 0 && '+'

    return (
      <span className={className}>
        {sign}
        {data}
        {unit}
      </span>
    )
  }

  const tableRecordStyle = 'flex items-end justify-center gap-2'

  return (
    <div className='overflow-y-auto'>
      <table className='w-full border-spacing-11 text-center text-md [&_td]:p-2'>
        <thead>
          <tr className='h-10 border-spacing-1.5 border-b font-medium text-text-secondary'>
            <td className='text-left'>期間</td>
            <td>
              目標時間 <span className='text-xs'>(前比)</span>
            </td>
            <td>
              学習時間 <span className='text-xs'>(前比)</span>
            </td>
            {/* <td>
              定着率 <span className='text-xs'>(前比)</span>
            </td> */}
            <td>達成率</td>
          </tr>
        </thead>
        <tbody>
          {timerLogs?.map((record, i) => {
            return (
              <tr className='h-10 border-b' key={i}>
                <td className='text-left'>{formatPeriod(record)}</td>

                <td>
                  <div className={tableRecordStyle}>
                    <span>{record.target}時間</span>
                    <span className='text-sm text-text-secondary'>
                      {formatRatioData(record.targetPreviousRatio, '時間')}
                    </span>
                  </div>
                </td>

                <td>
                  <div className={tableRecordStyle}>
                    <span className='min-w-12'>{record.studyData}時間</span>
                    <span>{formatRatioData(record.studyDataPreviousRatio, '時間')}</span>
                  </div>
                </td>

                {/* <td>
                  <div className={tableRecordStyle}>
                    <span>{record.retentionRate}%</span>
                    {getRetentionRateRatio(i)}
                  </div>
                </td> */}
                <td>{record.achievementRatio}%</td>
              </tr>
            )
          })}

          {canShowMore && (
            <tr className='border-b text-text-secondary'>
              <td className='text-left text-md'>
                <div
                  className='flex cursor-pointer items-center gap-1'
                  onClick={() => setDisplayCount((prevCount) => prevCount + 20)}
                >
                  <MdExpandMore size={22} />
                  <span>もっとみる</span>
                </div>
              </td>
            </tr>
          )}

          {timerLogs && timerLogs.length === 0 && (
            <tr>
              <td className='text-left'>学習データがありません</td>
            </tr>
          )}

          <tr className='text-sm'>
            <td className='text-left'>総期間</td>
            <td>合計 {data?.totalTarget}時間</td>
            <td>合計 {data?.totalStudyData}時間</td>
            {/* <td>平均 {formatRatioData(averageRetentionRate, '%')}</td> */}
            <td>平均 {data?.averageAchievementRatio}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
