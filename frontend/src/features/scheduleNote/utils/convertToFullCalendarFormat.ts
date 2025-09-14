import type { Meeting } from '@/features/meeting/types/Meeting'
import type { ScheduleEvent } from '@/features/scheduleNote/types/Event'

export const convertToScheduleNoteEvents = (events: ScheduleEvent[] = []) => {
  const result = events.map((event) => {
    if (event.title === '学習時間') {
      return {
        id: event.id.toString(),
        start: event.startDatetime,
        end: event.endDatetime,
        title: event.title,
        eventType: event.eventType,
        className: ['h-auto', 'bg-gradient-to-r', 'from-sub-color', 'to-main-color'],
        isMeeting: false,
      }
    } else {
      return {
        id: event.id.toString(),
        start: event.startDatetime,
        end: event.endDatetime,
        title: event.title,
        eventType: event.eventType,
        backgroundColor: '#EFEFEF',
        textColor: '#000',
        isMeeting: false,
      }
    }
  })
  return result
}

export const convertMeetingEventsToFullCalendarFormat = (events: Meeting[] = []) => {
  const result = events.map((event) => {
    return {
      id: event.id.toString(),
      start: event.startDatetime,
      end: event.endDatetime,
      title: `面談${event.meetingCount}回目`,
      className: ['h-auto', 'bg-gradient-to-r', 'from-sub-color', 'to-main-color'],
      isMeeting: true,
    }
  })
  return result
}
