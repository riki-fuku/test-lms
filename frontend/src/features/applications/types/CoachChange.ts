export type CoachChangeReq = {
  id: number
  userId: string
  employeeId: string
  workspaceId: string
  interviewDatetime: string
  googleEventId: string
  reason: string
  request: string
  interviewAgenda: string
}

export type CoachChangeRes = {
  id: number
  userId: string
  employeeId: string
  interviewDatetime: string
  interviewUrl: string
  googleEventId: string
  reason: string
  interviewAgenda: string
  interviewMemo: null | string
  status: null
  oldEmployeeId: string
  newEmployeeId: string
}
