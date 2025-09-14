export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string | null
  nickname: string | null
  name: string
  introduction: string | null
  gender: string | null
  age: number | null
  os: string | null
  birthDate: string | null
  profileSetupCompleted: boolean
  course: string | null
  startingDate: string | null
  graduateDate: string | null
  courseProgress: string | null
  meetingCount: number | null
  maxMeetings: number | null
  status: {
    value: number
    label: string
  }
  isRecentlyActive: boolean
  proCertification: {
    userWorkspaceId: string
    passedAt: string
    comment: string | null
  } | null
}
