import createTimeTrackingLog from '@/features/timeTrackingLog/api/createTimeTrackingLog'
import updateTimeTrackingLog from '@/features/timeTrackingLog/api/updateTimeTrackingLog'
import dayjs from 'dayjs'
import { useCallback, useEffect, useRef } from 'react'

const ACTIVITY_EVENTS = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'] // アクティブ監視対象のイベント
const DEFAULT_INACTIVE_INTERVAL_MS = 300000 // 非アクティブによって学習時間記録を終了する時間のデフォルト値
const INACTIVITY_CHECK_INTERVAL_MS = 1000 // 非アクティブ状態をチェックする間隔のデフォルト値

interface TimeTrackingState {
  isUserActive: boolean
  lastActivityTime: number
  timeTrackingLogId: string | null
}

interface UseSectionTimeTrackingProps {
  userId: string
  sectionId: string
  workspaceId: string
  inactiveIntervalMs?: number // 非アクティブによって学習時間記録を終了する時間（ミリ秒）
}

export default function useSectionTimeTracking({
  userId,
  sectionId,
  workspaceId,
  inactiveIntervalMs = DEFAULT_INACTIVE_INTERVAL_MS,
}: UseSectionTimeTrackingProps) {
  const timeTrackingState = useRef<TimeTrackingState>({
    isUserActive: false, // ユーザのアクティブ状態
    lastActivityTime: Date.now(), // ユーザの最後のアクティビティ時間
    timeTrackingLogId: null, // 学習時間記録履歴のID
  })

  // 非アクティブ監視タイマーの参照を保持
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null)

  // 学習時間記録開始
  const startSectionTimeTracking = useCallback(async () => {
    const result = await createTimeTrackingLog(workspaceId, {
      userId,
      sectionId,
      startedAt: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    })
    timeTrackingState.current.timeTrackingLogId = result.id
  }, [userId, sectionId, workspaceId])

  // 学習時間記録終了
  const stopSectionTimeTracking = useCallback(
    async (isInactive = false) => {
      if (!timeTrackingState.current.timeTrackingLogId) return

      // 非アクティブによる記録終了の場合は、非アクティブだった時間を減算
      const endTime = isInactive
        ? dayjs(new Date(Date.now() - inactiveIntervalMs)).format('YYYY-MM-DD HH:mm:ss')
        : dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')

      await updateTimeTrackingLog(workspaceId, timeTrackingState.current.timeTrackingLogId, {
        endedAt: endTime,
      })
    },
    [workspaceId, inactiveIntervalMs],
  )

  // ユーザーアクティビティ検知関数
  const handleUserActivity = useCallback(() => {
    // 最後のアクティビティ時間を更新
    timeTrackingState.current.lastActivityTime = Date.now()

    // 非アクティブ状態から復帰した場合、学習時間記録を再開
    if (!timeTrackingState.current.isUserActive) {
      timeTrackingState.current.isUserActive = true
      startSectionTimeTracking()
    }
  }, [startSectionTimeTracking])

  // 非アクティブ状態チェック関数
  const checkInactivity = useCallback(() => {
    const currentTime = Date.now()
    const inactiveTime = currentTime - timeTrackingState.current.lastActivityTime

    // 非アクティブ状態を検出して指定時間を超えていた場合は、学習時間記録を終了
    if (inactiveTime >= inactiveIntervalMs && timeTrackingState.current.isUserActive) {
      timeTrackingState.current.isUserActive = false
      stopSectionTimeTracking(true)
    }
  }, [inactiveIntervalMs, stopSectionTimeTracking])

  // アクティビティ監視
  useEffect(() => {
    if (userId === '') return

    // アクティブ監視を開始
    ACTIVITY_EVENTS.forEach((event) => {
      window.addEventListener(event, handleUserActivity)
    })

    // 非アクティブ状態チェックを開始
    inactivityTimerRef.current = setInterval(checkInactivity, INACTIVITY_CHECK_INTERVAL_MS)

    return () => {
      // 学習時間記録を終了
      stopSectionTimeTracking()

      // アクティブ監視を停止
      ACTIVITY_EVENTS.forEach((event) => {
        window.removeEventListener(event, handleUserActivity)
      })

      // 非アクティブ状態チェックを停止
      if (inactivityTimerRef.current) {
        clearInterval(inactivityTimerRef.current)
      }
    }
  }, [
    handleUserActivity,
    checkInactivity,
    startSectionTimeTracking,
    stopSectionTimeTracking,
    userId,
  ])

  // 画面離脱監視
  useEffect(() => {
    if (userId === '') return

    // 画面離脱時に学習時間記録を終了
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      stopSectionTimeTracking()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [stopSectionTimeTracking, userId])
}
