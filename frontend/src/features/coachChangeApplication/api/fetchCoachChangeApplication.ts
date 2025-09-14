import type { CoachChangeApplication } from '@/features/coachChangeApplication/types'
import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

export type FetchCoachChangeApplicationHttpDocument = HttpDocument<
  {
    workspaceId: string
    coachChangeApplicationId: string
  },
  undefined,
  undefined,
  { data: CoachChangeApplication }
>

export async function fetchCoachChangeApplication(
  params: FetchCoachChangeApplicationHttpDocument['params'],
  options?: FetchCoachChangeApplicationHttpDocument['options'],
) {
  return await http<FetchCoachChangeApplicationHttpDocument>(
    `/api/workspaces/:workspaceId/coach-change-applications/:coachChangeApplicationId`,
    'GET',
    params,
    options,
  )
}
