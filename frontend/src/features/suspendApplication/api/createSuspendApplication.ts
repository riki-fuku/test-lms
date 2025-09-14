import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

type CreateSuspendApplicationHttpDocument = HttpDocument<
  { workspaceId: string },
  undefined,
  {
    user_id: string
    employee_id: string
    reason: string
    reason_detail: string
    preferred_start_date: string
    preferred_end_date: string
    interview_datetime: string
  },
  undefined
>

export const createSuspendApplication = async (
  params: CreateSuspendApplicationHttpDocument['params'],
  options?: CreateSuspendApplicationHttpDocument['options'],
) => {
  return await http<CreateSuspendApplicationHttpDocument>(
    `/api/workspaces/:workspaceId/suspend-applications`,
    'POST',
    params,
    options,
  )
}
