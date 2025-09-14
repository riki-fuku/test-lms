import type { ScheduleEvent } from '@/features/scheduleNote/types/Event'
import type { UserPeriodicScheduleEvent } from '@/features/scheduleNote/types/UserPeriodicScheduleEvent'
import dayjs from 'dayjs'

export const getDayOfWeek = (selectDate: Date) => {
  // 週の最初の日付 (日曜日) を計算
  const startOfWeek = dayjs(selectDate).startOf('week')
  const startDate = startOfWeek.format('YYYY-MM-DD')

  // 週の最後の日付 (土曜日) を計算
  const endOfWeek = dayjs(selectDate).endOf('week')
  const endDate = endOfWeek.format('YYYY-MM-DD')

  return {
    startDate,
    endDate,
  }
}

export const convertToScheduleNoteEvents = (events: ScheduleEvent[] = []) => {
  const result = events.map((event) => {
    if (event.title === '学習時間') {
      return {
        id: event.id,
        start: event.startDatetime,
        end: event.endDatetime,
        title: event.title,
        className: ['h-auto', 'bg-gradient-to-r', 'from-sub-color', 'to-main-color'],
      }
    } else {
      return {
        id: event.id,
        start: event.startDatetime,
        end: event.endDatetime,
        title: event.title,
        backgroundColor: '#EFEFEF',
        textColor: '#000',
      }
    }
  })
  return result
}

export const convertToPeriodicScheduleNoteEvents = (events: UserPeriodicScheduleEvent[] = []) => {
  const result = events.map((event) => {
    let daysOfWeek = [event.startDayOfWeek]
    if (event.startDayOfWeek !== event.endDayOfWeek) {
      daysOfWeek = Array.from(
        { length: event.endDayOfWeek - event.startDayOfWeek + 1 },
        (_, i) => event.startDayOfWeek + i,
      )
    }
    if (event.title === '学習時間') {
      return {
        id: event.id,
        title: '学習時間',
        startTime: event.startTime,
        endTime: event.endTime,
        daysOfWeek,
        className: ['h-auto', 'bg-gradient-to-r', 'from-sub-color', 'to-main-color'],
      }
    } else {
      return {
        id: event.id,
        title: event.title,
        startTime: event.startTime,
        endTime: event.endTime,
        daysOfWeek,
        backgroundColor: '#EFEFEF',
        textColor: '#000',
      }
    }
  })
  return result
}
