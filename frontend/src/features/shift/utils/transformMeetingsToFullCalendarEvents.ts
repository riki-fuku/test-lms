import type { Meeting } from '@/features/meeting/types/Meeting'
import type { EventInput } from '@fullcalendar/core/index.js'

export const transformMeetingsToFullCalendarEvents = (meetings: Meeting[]) => {
  return meetings
    .map((meeting) => {
      const fullCalendarEvent: EventInput = {
        meetingId: meeting.id,
        googleEventId: meeting.googleEventId,
        start: meeting.startDatetime,
        end: meeting.endDatetime,
        title: `${meeting.user?.name}様との面談`,
        textColor: '#ffffff',
        editable: false,
        studentId: meeting.user?.id,
        classNames: ['h-auto', 'bg-gradient-to-r', 'from-sub-color', 'to-main-color'],
      }

      return fullCalendarEvent
    })
    .filter((event): event is EventInput => !!event.start && !!event.end)
}
