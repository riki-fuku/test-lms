import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'

type CreateCancellationApplicationHttpDocument = HttpDocument<
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

export const createCancellationApplication = async (
  params: CreateCancellationApplicationHttpDocument['params'],
  options?: CreateCancellationApplicationHttpDocument['options'],
) => {
  return await http<CreateCancellationApplicationHttpDocument>(
    `/api/workspaces/:workspaceId/cancellation-applications`,
    'POST',
    params,
    options,
  )
}
