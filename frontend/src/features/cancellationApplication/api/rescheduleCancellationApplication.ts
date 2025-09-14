import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

export type RescheduleCancellationApplicationHttpDocument = HttpDocument<
  { workspaceId: string; cancellationApplicationId: string },
  undefined,
  {
    interview_datetime: string
  },
  undefined
>

export async function rescheduleCancellationApplication(
  params: RescheduleCancellationApplicationHttpDocument['params'],
  options?: RescheduleCancellationApplicationHttpDocument['options'],
) {
  return await http<RescheduleCancellationApplicationHttpDocument>(
    `/api/workspaces/:workspaceId/cancellation-applications/:cancellationApplicationId/reschedule`,
    'PATCH',
    params,
    options,
  )
}
