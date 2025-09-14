import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

export type RescheduleSuspendApplicationHttpDocument = HttpDocument<
  { workspaceId: string; suspendApplicationId: string },
  undefined,
  {
    interview_datetime: string
  },
  undefined
>

export async function rescheduleSuspendApplication(
  params: RescheduleSuspendApplicationHttpDocument['params'],
  options?: RescheduleSuspendApplicationHttpDocument['options'],
) {
  return await http<RescheduleSuspendApplicationHttpDocument>(
    `/api/workspaces/:workspaceId/suspend-applications/:suspendApplicationId/reschedule`,
    'PATCH',
    params,
    options,
  )
}
