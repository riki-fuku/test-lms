export type FirstMeetingAvailableSlots = {
  meta: {
    dates: string[]
  }
  data: DateTimeSlots[]
}

export type DateTimeSlots = {
  date: string
  slots: TimeSlot[]
}

export type TimeSlot = {
  time: string
  employeeId: string
}
