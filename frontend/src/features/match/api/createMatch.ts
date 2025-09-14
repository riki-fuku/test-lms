import type { Match } from '@/features/match/types'
import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

export type CreateMatchHttpDocument = HttpDocument<
  {
    workspaceId: string
  },
  undefined,
  {
    employee_id: string | undefined
    user_id: string
    reason: string
  },
  { data: Match }
>

export async function createMatch(
  params: CreateMatchHttpDocument['params'],
  options?: CreateMatchHttpDocument['options'],
) {
  return await http<CreateMatchHttpDocument>(
    `/api/workspaces/:workspaceId/matches`,
    'POST',
    params,
    options,
  )
}
