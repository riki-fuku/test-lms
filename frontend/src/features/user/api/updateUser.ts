import { Http } from '@/lib/api-client'

export type UpdateUserBody = {
  firstName?: string
  lastName?: string
  lastLoginAt?: string
  avatar?: string
  nickname?: string
  birthDate?: string | null
  introduction?: string | null
  termsAgreedAt?: string
  profileSetupCompleted?: boolean
  startingDate?: string
}

export default function updateUser(workspaceId: string, userId: string, body: UpdateUserBody) {
  return Http.axios()
    .patch(`/api/workspaces/${workspaceId}/users/${userId}`, body)
    .then((res) => res.data.data)
}
