import { Http } from '@/lib/api-client'

export type LogoutBody = {
  guard_type: 'user' | 'employee'
}

export default function logout(body: LogoutBody) {
  return Http.axios()
    .post('/api/logout', body)
    .then((res) => res.data.data)
}
