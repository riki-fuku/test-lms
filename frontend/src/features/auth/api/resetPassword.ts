import { Http } from '@/lib/api-client'

export type ResetPasswordBody = {
  guardType: 'user' | 'employee'
  email: string
  token: string
  password: string
  passwordConfirmation: string
}

export const resetPassword = async (body: ResetPasswordBody) => {
  return await Http.axios()
    .post('/api/reset-password', body)
    .then((res) => res.data)
}
