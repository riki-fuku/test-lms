'use client'

import Modal from '@/components/base/Modal'
import Avatar from '@/components/ui/Avatar'
import BreakCountTimer from '@/features/timer/components/BreakCountTimer'
import BreakTimerList from '@/features/timer/components/BreakTimerList'
import CountTimer from '@/features/timer/components/CountTimer'
import TimerList from '@/features/timer/components/TimerList'
import fetchTimerLog from '@/features/timerLog/api/fetchTimerLog'

import CompleteTimerModal from '@/features/timer/components/CompleteTimerModal'
import { useCountDownTimer } from '@/features/timer/hooks/useCountDownTimer'
import type { BreakTimer } from '@/features/timer/types/BreakTimer'
import type { Timer } from '@/features/timer/types/Timer'
import { COMPLETED, INPROGRESS, PAUSED } from '@/features/timer/types/TimerLog'
import createTimerLog from '@/features/timerLog/api/createTimerLog'
import type { UpdateTimerLogBody } from '@/features/timerLog/api/updateTimerLog'
import updateTimerLog from '@/features/timerLog/api/updateTimerLog'
import { TimerLogList } from '@/features/timerLog/components'
import cn from '@/hooks/cn'
import useDisclosure from '@/hooks/useDisclosure'
import { useLearningTimerStore } from '@/store/learning-timer-store'
import { useUserStore } from '@/store/user-store'
import dayjs from 'dayjs'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { GrAlarm } from 'react-icons/gr'
import { ulid } from 'ulid'

type DisplayMode = 'TIMER_LIST' | 'EDITOR' | 'TIMER' | 'BREAK_TIMER_LIST' | 'BREAK_TIMER'

export default function RenewalTimer() {
  const countTimer = useCountDownTimer()
  const breakTimer = useCountDownTimer()
  const modal = useDisclosure()
  const recordModal = useDisclosure()
  const timer = useDisclosure()
  const user = useUserStore((state) => state.user)
  const { timerId, setTimerId } = useLearningTimerStore()

  const [displayMode, setDisplayMode] = useState<DisplayMode>('TIMER_LIST')

  const [isFirstTime, setIsFirstTime] = useState(true)

  useEffect(() => {
    if (isFirstTime && user && timerId) {
      const fetcher = async () => {
        const timerLog = await fetchTimerLog(user.activeWorkspace.workspaceId, timerId).catch(
          () => null,
        )
        setIsFirstTime(false)

        if (!timerLog) return
        if (timerLog.status === COMPLETED) return

        if (timerLog.status === INPROGRESS) {
          setDisplayMode('TIMER')
          countTimer.setOriginalSeconds(timerLog.originalSeconds)
          countTimer.setCurrentSeconds(timerLog.originalSeconds - timerLog.elapsedSeconds)
          countTimer.restart()
        } else if (timerLog.status === PAUSED) {
          setDisplayMode('TIMER')
          countTimer.setOriginalSeconds(timerLog.originalSeconds)
          countTimer.setCurrentSeconds(timerLog.originalSeconds - timerLog.elapsedSeconds)
          countTimer.pause({ disableCallback: true })
        }
        return timerLog
      }
      fetcher()
    }
  }, [isFirstTime, user, timerId, countTimer])

  const actionUpdateTimerLog = useCallback(
    async (body: UpdateTimerLogBody) => {
      if (!user) return
      if (!timerId) return
      await updateTimerLog(user.activeWorkspace.workspaceId, timerId, body)
    },
    [user, timerId],
  )

  const handleSelectTimer = (timer: Timer) => {
    if (!user) return
    countTimer.setTimer(timer.minutes * 60)
    countTimer.ready()
    setDisplayMode('TIMER')
  }

  const handleSelectBreakTimer = (timer: BreakTimer) => {
    breakTimer.setTimer(timer.minutes * 60)
    breakTimer.start()
    setDisplayMode('BREAK_TIMER')
  }

  const isRunning = useMemo(() => {
    return countTimer.status === 'RUNNING' || breakTimer.status === 'RUNNING'
  }, [countTimer.status, breakTimer.status])

  useEffect(() => {
    countTimer.setOnStartCallback(() => () => {
      if (!user) return
      const timerId = ulid()
      createTimerLog(user.activeWorkspace.workspaceId, {
        id: timerId,
        userId: user.id,
        startDatetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        originalSeconds: countTimer.originalSeconds,
      }).then(() => setTimerId(timerId))
    })

    countTimer.setOnPauseCallback(() => () => {
      actionUpdateTimerLog({
        elapsedSeconds: countTimer.elapsedSeconds,
        status: PAUSED,
      })
    })

    countTimer.setOnRestartCallback(() => () => actionUpdateTimerLog({ status: INPROGRESS }))

    countTimer.setOnEndCallback(() => () => {
      setDisplayMode('BREAK_TIMER_LIST')
      actionUpdateTimerLog({
        endDatetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        elapsedSeconds: countTimer.elapsedSeconds,
        status: COMPLETED,
      }).then(() => modal.open())
    })

    breakTimer.setOnEndCallback(() => () => {
      timer.close()
    })
  }, [
    user,
    actionUpdateTimerLog,
    setTimerId,
    countTimer.originalSeconds,
    countTimer.elapsedSeconds,
    countTimer.setOnStartCallback,
    countTimer.setOnPauseCallback,
    countTimer.setOnRestartCallback,
    countTimer.setOnEndCallback,
    breakTimer.setOnEndCallback,
  ])

  useEffect(() => {
    if (countTimer.elapsedSeconds === 0) return
    // 30秒経過するごとに途中経過を記録する
    if (countTimer.elapsedSeconds % 30 === 0) {
      actionUpdateTimerLog({
        elapsedSeconds: countTimer.elapsedSeconds,
      })
    }
  }, [countTimer.elapsedSeconds, actionUpdateTimerLog])

  return (
    <>
      <div className='relative'>
        {/* タイマーのアイコン */}
        <div className='flex gap-7'>
          <div onClick={timer.toggle}>
            <Avatar size='sm' className={cn(isRunning && 'bg-blue-400')}>
              <GrAlarm color='#ffffff' />
            </Avatar>
          </div>
        </div>

        <div
          className={cn(
            'absolute right-0 top-11 w-72 border border-border-primary bg-white',
            timer.isOpen ? 'block' : 'hidden',
          )}
        >
          {/* タイマーリストUI */}
          {displayMode === 'TIMER_LIST' && <TimerList onSelectTimer={handleSelectTimer} />}

          {/* タイマーカウントUI */}
          {displayMode === 'TIMER' && (
            <div>
              <CountTimer
                timer={countTimer}
                onMinimize={timer.close}
                onBack={() => setDisplayMode('TIMER_LIST')}
                onEndTimer={() => setDisplayMode('BREAK_TIMER_LIST')}
              />
            </div>
          )}

          {/* 休憩タイマーリストUI */}
          {displayMode === 'BREAK_TIMER_LIST' && (
            <BreakTimerList onSelectTimer={handleSelectBreakTimer} />
          )}

          {/* 休憩タイマーカウントUI */}
          {displayMode === 'BREAK_TIMER' && (
            <BreakCountTimer
              timer={breakTimer}
              onContinueTimer={() => setDisplayMode('TIMER_LIST')}
            />
          )}
        </div>

        <CompleteTimerModal
          isOpen={modal.isOpen}
          onClose={modal.close}
          onOpenStudyRecord={recordModal.open}
        />

        {/* 学習記録モーダル */}
        <Modal visible={recordModal.isOpen} onClose={recordModal.close}>
          <TimerLogList />
        </Modal>
      </div>
    </>
  )
}
