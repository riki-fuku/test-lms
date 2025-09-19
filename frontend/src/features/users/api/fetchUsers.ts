import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

type UserListResponse = {
  data: Array<{
    id: string | number
    name: string
    email: string
  }>
}

type UserListDocument = HttpDocument<undefined, undefined, undefined, UserListResponse>

export default function fetchUsers(
  tenantId: string,
  params?: UserListDocument['params'],
  options?: UserListDocument['options'],
) {
  return http<UserListDocument>(`/api/t/${tenantId}/users`, 'GET', params, options)
}

