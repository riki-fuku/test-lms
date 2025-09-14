import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

export type FetchUserMatchesHttpDocument = HttpDocument<
  {
    workspaceId: string
    userId: string
  },
  undefined,
  undefined,
  {
    data: {
      isActive: boolean
      changedAt: string
      reason: string
      employee: {
        name: string
      }
    }[]
  }
>

export async function fetchUserMatches(
  params: FetchUserMatchesHttpDocument['params'],
  options?: FetchUserMatchesHttpDocument['options'],
) {
  return await http<FetchUserMatchesHttpDocument>(
    `/api/workspaces/:workspaceId/users/:userId/matches`,
    'GET',
    params,
    options,
  )
}
