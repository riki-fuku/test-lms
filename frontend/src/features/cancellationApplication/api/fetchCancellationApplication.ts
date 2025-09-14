import type { CancellationApplication } from '@/features/cancellationApplication/types'
import type { HttpDocument } from '@/lib/fetch'
import { http } from '@/lib/fetch'
export type FetchCancellationApplicationHttpDocument = HttpDocument<
  {
    workspaceId: string
    cancellationApplicationId: string
  },
  undefined,
  undefined,
  { data: CancellationApplication }
>
export async function fetchCancellationApplication(
  params: FetchCancellationApplicationHttpDocument['params'],
  options?: FetchCancellationApplicationHttpDocument['options'],
) {
  return await http<FetchCancellationApplicationHttpDocument>(
    `/api/workspaces/:workspaceId/cancellation-applications/:cancellationApplicationId`,
    'GET',
    params,
    options,
  )
}
