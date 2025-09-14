import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

export type UpdateCoachChangeApplicationHttpDocument = HttpDocument<
  { workspaceId: string; coachChangeApplicationId: string },
  undefined,
  {
    status_id?: number
    result_status_id?: number
    changed_reason?: string
  },
  undefined
>

export async function updateCoachChangeApplication(
  params: UpdateCoachChangeApplicationHttpDocument['params'],
  options?: UpdateCoachChangeApplicationHttpDocument['options'],
) {
  return await http<UpdateCoachChangeApplicationHttpDocument>(
    `/api/workspaces/:workspaceId/coach-change-applications/:coachChangeApplicationId`,
    'PATCH',
    params,
    options,
  )
}
