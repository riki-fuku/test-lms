export type Meeting = {
  id: string
  termId: string
  googleEventId: string | null
  startDatetime: string
  endDatetime: string
  meetingUrl: string | null
  meetingCount: number
  status: {
    id: number
    name: string
  }
  employee?: {
    id: string
    name: string
    avatar: string | null
  }
  user?: {
    id: string
    name: string
    avatar: string | null
    maxMeetings: number
  }
  deletionRequest?: {
    id: number
    status: {
      id: number
      name: 'WAITING' | 'APPROVED' | 'REJECTED'
    }
  }
  meetingMemo?: {
    id: string
    meetingId: string
    content: string
  }
}
