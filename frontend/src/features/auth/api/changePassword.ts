import { Http } from '@/lib/api-client'

export type ResetPasswordBody = {
  guardType: 'user' | 'employee'
  password: string
  passwordConfirmation: string
}

export const changePassword = async (body: ResetPasswordBody) => {
  return await Http.axios()
    .post('/api/password/reset', body)
    .then((res) => res.data)
}
