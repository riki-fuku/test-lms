import type { EmployeeShift } from '@/features/shift/type/EmployeeShift'

export const transformToShiftEventCalendar = (events: EmployeeShift[]) => {
  return events
    .filter((event) => event.shiftType === 'temporary' || event.shiftType === 'periodic')
    .map((event) => ({
      shiftId: event.shiftId,
      start: event.startDatetime,
      end: event.endDatetime,
      title: 'シフト',
      backgroundColor: '#fff',
      classNames: ['h-auto', 'border-2', 'border-dotted', 'fc-event-border'],
      ...getEventStyle(event.shiftType),
    }))
}

const getEventStyle = (shiftType: EmployeeShift['shiftType']) => {
  switch (shiftType) {
    case 'temporary':
      return {
        shiftType: 'temporary',
        textColor: '#00B900',
        borderColor: '#00B900',
      }
    case 'periodic':
      return {
        shiftType: 'periodic',
        textColor: '#328CE6',
        borderColor: '#328CE6',
      }
    default:
      return {}
  }
}
