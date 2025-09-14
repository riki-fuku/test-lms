export type LeaveOfAbsenceReq = {
  userId: string
  employeeId: string
  interviewDatetime: string
  interviewAgenda: string
  reason: string
  reasonDetail: string
  startDate: string
  endDate: string
  fileUrl: string
}

export type LeaveOfAbsenceRes = {
  id: number
  userId: string
  employeeId: string
  interviewDatetime: string
  interviewAgenda: string | null
  reason: string
  reasonDetail: string
  startDate: string
  endDate: string
  status: string
  confirmationDate: null
}
