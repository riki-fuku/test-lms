import { Http } from '@/lib/api-client'

export type UpdateEmployeeBody = {
  firstName?: string
  lastName?: string
  nickname?: string
  phoneNumber?: string | null
  birthDate?: string | null
  workStyle?: string | null
  engineerHistory?: string | null
  os?: string | null
  avatar?: string
  introduction?: string | null
  termsAgreedAt?: string
  meetingUrl?: string
  profileSetupCompleted?: boolean
  wages?: number
  priority?: number | null
  userCapacity?: number | null
}

export default function updateEmployee(
  workspaceId: string,
  employeeId: string,
  body: UpdateEmployeeBody,
) {
  return Http.axios()
    .patch(`/api/workspaces/${workspaceId}/employees/${employeeId}`, body)
    .then((res) => res.data.data)
}
