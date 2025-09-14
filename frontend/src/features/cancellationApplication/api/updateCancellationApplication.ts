import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

export type UpdateCancellationApplicationHttpDocument = HttpDocument<
  { workspaceId: string; cancellationApplicationId: string },
  undefined,
  {
    cancellation_date?: string
    status_id: string
    result_status_id?: string
    reason?: string
    changed_reason?: string
  },
  undefined
>

export async function updateCancellationApplication(
  params: UpdateCancellationApplicationHttpDocument['params'],
  options?: UpdateCancellationApplicationHttpDocument['options'],
) {
  return await http<UpdateCancellationApplicationHttpDocument>(
    `/api/workspaces/:workspaceId/cancellation-applications/:cancellationApplicationId`,
    'PATCH',
    params,
    options,
  )
}
