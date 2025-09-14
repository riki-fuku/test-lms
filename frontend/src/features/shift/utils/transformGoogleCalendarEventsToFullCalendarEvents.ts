import type { GoogleCalendarEvent } from '@/features/google/types/GoogleCalendar/GoogleCalendarEvent'
import type { EventInput } from '@fullcalendar/core/index.js'
import dayjs from 'dayjs'

export const transformGoogleCalendarEventsToFullCalendarEvents = (
  events: GoogleCalendarEvent[],
) => {
  return events
    .map((event) => {
      const fullCalendarEvent: EventInput = {
        id: event.id,
        title: event.summary,
        color: '#CAF0F8',
        textColor: '#00B4D8',
        editable: false,
        classNames: ['h-auto', 'fc-event-border', 'opacity-60'],
      }

      if (event.start.date) {
        fullCalendarEvent.start = dayjs(event.start.date).format('YYYY-MM-DD HH:mm:ss')
      } else if (event.start.dateTime) {
        fullCalendarEvent.start = dayjs(event.start.dateTime).format('YYYY-MM-DD HH:mm:ss')
      }

      if (event.end.date) {
        fullCalendarEvent.end = dayjs(event.end.date).format('YYYY-MM-DD HH:mm:ss')
      } else if (event.end.dateTime) {
        fullCalendarEvent.end = dayjs(event.end.dateTime).format('YYYY-MM-DD HH:mm:ss')
      }

      return fullCalendarEvent
    })
    .filter((event): event is EventInput => !!event.start && !!event.end)
}
