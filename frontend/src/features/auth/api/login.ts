import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

export type LoginType = 'user' | 'employee'

type LoginHttpDocument = HttpDocument<
  undefined,
  undefined,
  {
    type: LoginType
    email: string
    password: string
  },
  undefined
>

export default function login(
  tenantId: string,
  params: LoginHttpDocument['params'],
  options?: LoginHttpDocument['options'],
) {
  return http<LoginHttpDocument>(`/api/t/${tenantId}/login`, 'POST', params, options)
}
