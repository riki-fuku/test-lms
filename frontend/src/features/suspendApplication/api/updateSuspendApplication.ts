import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

export type UpdateSuspendApplicationHttpDocument = HttpDocument<
  { workspaceId: string; suspendApplicationId: string },
  undefined,
  {
    start_date?: string
    end_date?: string | null
    status_id?: number
    result_status_id?: number
    reason?: string
    changed_reason?: string
  },
  undefined
>

export async function updateSuspendApplication(
  params: UpdateSuspendApplicationHttpDocument['params'],
  options?: UpdateSuspendApplicationHttpDocument['options'],
) {
  return await http<UpdateSuspendApplicationHttpDocument>(
    `/api/workspaces/:workspaceId/suspend-applications/:suspendApplicationId`,
    'PATCH',
    params,
    options,
  )
}
