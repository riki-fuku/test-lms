export type Meeting = {
  id: string
  start_datetime: string
  end_datetime: string
  meeting_url: string
  status: {
    id: number
    name: string
  }
  term_id: string
  meeting_count: number
  student: {
    id: string
    name: string
    avatar: string
    max_meetings: number
  }
  coach: {
    id: string
    name: string
    avatar: string
  }
  deletion_request?: {
    id: number
    status: {
      id: number
      name: string
    }
  }
}

export type DeletionRequest = {
  id: number
  meeting_id: string
  reason: string
  detail: string
  status: number
}

export type Payroll = {
  id: number
  payrollData: string
  month: string
}

export type CoachData = {
  id: number
  meetingCount: number
  totalAmount: number
  rank: string
  payrolls: Payroll[]
}

export type FilterOptions = {
  name: string | null
  startDate: string | null
  endDate: string | null
}

export type SortOptions = {
  name: '昇順' | '降順' | null
  date: '昇順' | '降順' | null
  count: '昇順' | '降順' | null
}
