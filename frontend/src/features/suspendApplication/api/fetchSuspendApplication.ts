import type { SuspendApplication } from '@/features/suspendApplication/types'
import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'
export type FetchSuspendApplicationHttpDocument = HttpDocument<
  {
    workspaceId: string
    suspendApplicationId: string
  },
  undefined,
  undefined,
  { data: SuspendApplication }
>
export async function fetchSuspendApplication(
  params: FetchSuspendApplicationHttpDocument['params'],
  options?: FetchSuspendApplicationHttpDocument['options'],
) {
  return await http<FetchSuspendApplicationHttpDocument>(
    `/api/workspaces/:workspaceId/suspend-applications/:suspendApplicationId`,
    'GET',
    params,
    options,
  )
}
