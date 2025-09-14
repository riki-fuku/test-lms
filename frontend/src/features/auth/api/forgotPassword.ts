import { Http } from '@/lib/api-client'

export type ForgotPasswordBody = {
  guardType: 'user' | 'employee'
  email: string
}

export default function forgotPassword(body: ForgotPasswordBody) {
  return Http.axios()
    .post(`api/forgot-password`, body)
    .then((res) => res.data.data)
}
