import type { UserWorkspace } from '@/features/userWorkspace/types/UserWorkspace'
import { Http } from '@/lib/api-client'

type Response = {
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
  activeWorkspace: UserWorkspace
}
export default function fetchMeAsUser(): Promise<Response> {
  return Http.axios()
    .get<{ data: Response }>('/api/user/me')
    .then((res) => res.data.data)
}
