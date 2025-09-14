import type { ApplicationByUser } from '@/features/applications/types'
import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

export type FetchApplicationsByUserIdHttpDocument = HttpDocument<
  {
    workspaceId: string
    userId: string
  },
  undefined,
  undefined,
  {
    data: ApplicationByUser[]
  }
>

export async function fetchApplicationsByUserId(
  params: FetchApplicationsByUserIdHttpDocument['params'],
  options?: FetchApplicationsByUserIdHttpDocument['options'],
) {
  return await http<FetchApplicationsByUserIdHttpDocument>(
    `/api/workspaces/:workspaceId/users/:userId/applications`,
    'GET',
    params,
    options,
  )
}
