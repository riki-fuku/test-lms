import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

export type RescheduleCoachChangeApplicationHttpDocument = HttpDocument<
  { workspaceId: string; coachChangeApplicationId: string },
  undefined,
  {
    interview_datetime: string
  },
  undefined
>

export async function rescheduleCoachChangeApplication(
  params: RescheduleCoachChangeApplicationHttpDocument['params'],
  options?: RescheduleCoachChangeApplicationHttpDocument['options'],
) {
  return await http<RescheduleCoachChangeApplicationHttpDocument>(
    `/api/workspaces/:workspaceId/coach-change-applications/:coachChangeApplicationId/reschedule`,
    'PATCH',
    params,
    options,
  )
}
