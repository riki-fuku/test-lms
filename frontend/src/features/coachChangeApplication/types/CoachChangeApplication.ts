export type CoachChangeApplication = {
  id: string
  userId: string
  employeeId: string
  workspaceId: string
  applicationDatetime: string
  reason: string
  reasonDetail: string
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
  latestApplicationInterview: null | {
    id: string
    interviewDatetime: string
    interviewUrl: string
    googleEventId: string
  }
  latestApplicationStatusLog: null | {
    reason: string
  }
}
