export type SuspendApplication = {
  id: string
  userId: string
  employeeId: string
  workspaceId: string
  applicationDatetime: string
  reason: string
  reasonDetail: string
  preferredStartDate: string
  preferredEndDate: string
  startDate: string
  endDate: string | null
  status: {
    value: number
    label: string
  }
  resultStatus: {
    value: number
    label: string
  }
  user: {
    id: string
    fullName: string
    email: string
  }
  employee: {
    id: string
    fullName: string
  }
  latestApplicationInterview: {
    id: string
    interviewDatetime: string
    interviewUrl: string
    googleEventId: string
  } | null
  latestApplicationStatusLog: {
    reason: string
  } | null
}
