import { Http } from '@/lib/api-client'

export type LogoutBody = {
  guard_type: 'user' | 'employee'
}

export default function logout(tenantId: string, body: LogoutBody) {
  return Http.axios()
    .post(`/api/t/${tenantId}/logout`, body)
    .then((res) => res.data.data)
}
