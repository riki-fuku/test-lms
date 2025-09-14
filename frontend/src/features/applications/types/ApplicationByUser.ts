export type ApplicationByUser = {
  id: number
  applicationType: {
    id: number
    label: string
  }
  interviewDatetime: string
  status: {
    id: number
    label: string
  }
  createdAt: string
}
