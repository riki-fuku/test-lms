export type GoogleCalendarEvent = {
  id: string
  summary: string
  start: {
    date: string | null
    dateTime: string | null
    timeZone: string | null
  }
  end: {
    date: string | null
    dateTime: string | null
    timeZone: string | null
  }
}
