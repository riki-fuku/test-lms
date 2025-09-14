export type ApplicationMeetingAvailableSlots = {
  dates: string[]
  times: DateLabel
}

export type DateLabel = {
  [key: string]: DateTimeSlot[]
}

export type DateTimeSlot = {
  dateTime: string
  isAvailable: boolean
  employeeId: string | null
}
