import type { EventInput } from '@fullcalendar/core/index.js'

export type EventsOfDatabase = {
  events: ScheduleEvent[]
}

export type RecurringEventOfFullCalendar = EventInput & {
  id: number
  title: string
  startTime: Date | string
  endTime: Date | string
  daysOfWeek: number[]
}

export type ScheduleEvent = {
  id: number
  userId: number
  title: string
  description: string
  startDatetime: string
  endDatetime: string
  eventType: string
  recurringRule: object
}

export type ScheduleEventOfCreateBody = {
  userId: string
  title: string
  startDatetime: string
  endDatetime: string
}

export type ScheduleEventOfUpdateBody = {
  title: string
  startDatetime: string
  endDatetime: string
  description?: string
  recurringRule?: object
}

// 定期イベント周りの型
export type FetchUserPeriodicScheduleEventQuery = {
  userId: string
}

export type UserPeriodicScheduleEventOfCreateBody = {
  userId: string
  title: string
  startDayOfWeek: number
  startTime: string
  endDayOfWeek: number
  endTime: string
}

export type UserPeriodicScheduleEventOfUpdateBody = {
  title: string
  startDayOfWeek: number
  startTime: string
  endDayOfWeek: number
  endTime: string
}

export type ModalMode = 'CREATE' | 'UPDATE'
