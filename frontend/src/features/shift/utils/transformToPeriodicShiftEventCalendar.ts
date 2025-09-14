import type { EmployeePeriodicShift } from '@/features/shift/type/EmployeePeriodicShift'

export const transformToPeriodicShiftEventCalendar = (events: EmployeePeriodicShift[]) => {
  return events.map((event) => ({
    shiftId: event.id,
    startTime: event.startTime,
    endTime: event.endTime,
    title: 'シフト',
    daysOfWeek: [event.day],
    backgroundColor: '#fff',
    textColor: '#328CE6',
    classNames: ['h-auto', 'border-2', 'border-dotted', 'fc-event-border'],
  }))
}
