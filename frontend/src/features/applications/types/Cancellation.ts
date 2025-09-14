export type CancellationReq = {
  userId: string
  employeeId: string
  workspaceId: string
  interviewDatetime: string
  reason: string
  reasonDetail: string
  request: string
  interviewAgenda: string
}

export type CancellationRes = {
  id: number
  userId: string
  employeeId: string
  reason: string
  reasonDetail: string
  interviewDatetime: string
  interviewMemo: string | null
  interviewAgenda: string | null
  interviewUrl: string
  googleEventId: string | null
  status: string
  holdPeriod: null
  cancellationDate: string | null
  confirmationDate: string | null
  learningStartDate: string | null
  cancellationFee: string | null
}
