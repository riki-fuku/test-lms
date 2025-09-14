import Modal from '@/components/base/Modal'
import Button from '@/components/ui/Button'
import Check from '@/components/ui/Check'
import useFetchScheduleEvents from '@/features/scheduleNote/hooks/useFetchScheduleEvents'
import useFetchTimerLogs from '@/features/timer/hooks/useFetchTimerLogs'
import type { TimerLog } from '@/features/timer/types/TimerLog'
import useFetchTimerLog from '@/features/timerLog/hooks/useFetchTimerLog'
import dayjs from '@/lib/dayjs'
import { useLearningTimerStore } from '@/store/learning-timer-store'
import { useUserStore } from '@/store/user-store'
import { useEffect } from 'react'

const formatSeconds = (sec: number) => {
  const hours = Math.floor(sec / 3600)
  const minutes = Math.floor((sec % 3600) / 60)
  const seconds = sec % 60
  return `${hours > 0 ? hours + ':' : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export type ModalStudyLogProps = {
  isOpen: boolean
  onClose: () => void
  onOpenStudyRecord: () => void
}

export default function CompleteTimerModal({
  isOpen,
  onClose,
  onOpenStudyRecord,
}: ModalStudyLogProps) {
  const user = useUserStore((state) => state.user)
  const timerId = useLearningTimerStore((state) => state.timerId)

  const { data: timerLogData, mutate: mutateTimerLog } = useFetchTimerLog(
    user?.activeWorkspace.workspaceId ?? '',
    timerId,
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
    },
  )

  const startDatetime = timerLogData?.startDatetime ? dayjs(timerLogData?.startDatetime) : dayjs()
  const endDatetime = timerLogData?.endDatetime ? dayjs(timerLogData?.endDatetime) : dayjs()

  const { data: timerLogsData } = useFetchTimerLogs(user?.activeWorkspace.workspaceId ?? '', {
    userId: user?.id ?? '',
    startDatetime: startDatetime.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    endDatetime: endDatetime.endOf('day').format('YYYY-MM-DD HH:mm:ss'),
  })
  const timerLogs = timerLogsData ?? []

  const { data: scheduleEventsData } = useFetchScheduleEvents({
    userId: user?.id ?? '',
    startDatetime: startDatetime.format('YYYY-MM-DD 00:00:00'),
    endDatetime: endDatetime.format('YYYY-MM-DD 23:59:59'),
  })
  const scheduleEvents = scheduleEventsData ?? []

  const totalPlannedStudyTime = scheduleEvents.reduce((acc, curr) => {
    if (curr.title !== '学習時間') return acc
    const plannedStudyTime = dayjs(curr.endDatetime).diff(dayjs(curr.startDatetime), 'seconds')
    return acc + plannedStudyTime
  }, 0)

  // 今の学習時間を計算
  const calculateCurrentStudyTime = (logs: TimerLog[]) => {
    if (logs.length === 0) return '00:00'

    const latestTimerLog = logs.reduce((prev, current) => {
      return dayjs(prev.startDatetime).isAfter(dayjs(current.startDatetime)) ? prev : current
    })
    const latestStudyTimeInSeconds = latestTimerLog.elapsedSeconds
    const minutes = Math.floor(latestStudyTimeInSeconds / 60)
    const seconds = latestStudyTimeInSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }
  const currentStudyTime = calculateCurrentStudyTime(timerLogs)

  // 本日の学習時間を計算
  const calculateTotalStudyTime = (logs: TimerLog[]) => {
    if (logs.length === 0) return '00:00'

    const totalStudyTime = logs.reduce((total, log) => total + log.elapsedSeconds, 0)
    return formatSeconds(totalStudyTime)
  }
  const totalStudyTimeToday = calculateTotalStudyTime(timerLogs)

  // 目標達成までの時間を計算
  const calculateRemainingTimeToGoal = (logs: TimerLog[]) => {
    if (logs.length === 0) return '00:00'

    const totalStudySeconds = logs.reduce((total, log) => total + log.elapsedSeconds, 0)
    const diffSeconds = totalStudySeconds - totalPlannedStudyTime
    return (diffSeconds < 0 ? '-' : '+') + formatSeconds(Math.abs(diffSeconds))
  }
  const remainingTimeToGoal = calculateRemainingTimeToGoal(timerLogs)

  const handleCloseModal = () => {
    onClose()
  }

  useEffect(() => {
    if (!isOpen) return
    mutateTimerLog()
  }, [isOpen, mutateTimerLog])

  return (
    <>
      <Modal visible={isOpen}>
        <div className='flex flex-col gap-8'>
          <p className='text-xl font-bold'>お疲れさまでした!</p>
          <div className='flex flex-col gap-5'>
            <div className='flex justify-between'>
              <h2>お疲れさまでした！</h2>
              <p>{currentStudyTime}</p>
            </div>
            <div className='flex justify-between'>
              <h2>本日の学習時間合計</h2>
              <p>{totalStudyTimeToday}</p>
            </div>
            <div className='border-b border-gray-300'></div>
            <div className='flex justify-between'>
              <h2>本日の目標達成まで</h2>
              {remainingTimeToGoal[0] == '+' && (
                <div className='flex items-center justify-between'>
                  <div className='mr-1'>
                    <Check value={true} size='xs' />
                  </div>
                  <p className='text-sky-500'>{remainingTimeToGoal}</p>
                </div>
              )}
              {remainingTimeToGoal[0] !== '+' && (
                <div className='flex items-center justify-between'>
                  <p className='text-red-500'>{remainingTimeToGoal}</p>
                </div>
              )}
            </div>
          </div>
          <div className='mx-auto flex justify-center gap-5'>
            <Button
              onClick={() => {
                onOpenStudyRecord()
                onClose()
              }}
              intent='secondary'
            >
              学習ログを確認
            </Button>
            <Button onClick={handleCloseModal} intent='secondary'>
              閉じる
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
