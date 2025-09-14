import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

type CreateCoachChangeApplicationHttpDocument = HttpDocument<
  { workspaceId: string },
  undefined,
  {
    user_id: string
    employee_id: string
    reason: string
    reason_detail: string
    interview_datetime: string
  },
  undefined
>

export const createCoachChangeApplication = async (
  params: CreateCoachChangeApplicationHttpDocument['params'],
  options?: CreateCoachChangeApplicationHttpDocument['options'],
) => {
  return await http<CreateCoachChangeApplicationHttpDocument>(
    `/api/workspaces/:workspaceId/coach-change-applications`,
    'POST',
    params,
    options,
  )
}
