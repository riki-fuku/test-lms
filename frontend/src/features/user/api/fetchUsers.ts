import type { Pagination } from '@/constants/paginate'
import type { User } from '@/features/user/types/User'
import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

type FetchUsersHttpDocument = HttpDocument<
  undefined,
  {
    page?: number
  },
  undefined,
  { data: User[]; meta: Pagination }
>

export async function fetchUsers(
  params?: FetchUsersHttpDocument['params'],
  options?: FetchUsersHttpDocument['options'],
) {
  return await http<FetchUsersHttpDocument>(
    '/api/users',
    'GET',
    params,
    options,
  )
}
