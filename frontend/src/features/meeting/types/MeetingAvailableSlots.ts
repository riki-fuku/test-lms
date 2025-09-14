export type MeetingAvailableSlotsResponse = {
  dates: string[]
  times: DateTimeSlots
}

export type DateTimeSlots = {
  [key: string]: Slot[]
}

export type Slot = {
  employeeId: string | null
  dateTime: string
  isAvailable: boolean
}
